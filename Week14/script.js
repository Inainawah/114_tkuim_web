let currentMode = 'character';

function switchMode(mode) {
    currentMode = mode;

    // UI Updates
    document.getElementById('btn-character').classList.remove('active');
    document.getElementById('btn-weapon').classList.remove('active');
    document.getElementById('btn-' + mode).classList.add('active');

    // Reset Results if visible
    const results = document.getElementById('results-display');
    if (results.style.opacity === '1') {
        results.style.opacity = '0';
        results.style.transform = 'translateY(20px)';
    }
}

function calculate() {
    const pullsInput = document.getElementById('pulls-input');
    const pulls = parseInt(pullsInput.value);

    if (isNaN(pulls) || pulls < 0) {
        alert("請輸入有效的抽數");
        return;
    }

    const SIMULATION_COUNT = 10000; // Run 10k simulations for speed/accuracy trade-off
    const results = simulate(currentMode, pulls, SIMULATION_COUNT);

    displayResults(results, pulls);
}

function displayResults(results, pulls) {
    const display = document.getElementById('results-display');
    const resPulls = document.getElementById('res-pulls');
    const resLimited = document.getElementById('res-limited');
    const resTotal = document.getElementById('res-total');
    const resProbOne = document.getElementById('res-prob-one');

    resPulls.textContent = pulls;
    resLimited.textContent = results.avgLimited.toFixed(2);
    resTotal.textContent = results.avgTotal.toFixed(2);
    resProbOne.textContent = results.probAtLeastOne + '%';

    // Animate in
    display.style.opacity = '1';
    display.style.transform = 'translateY(0)';
}

/* 
    CORE GACHA LOGIC 
*/

function simulate(mode, totalPulls, iterations) {
    let totalLimited = 0;
    let totalFiveStars = 0;
    let countAtLeastOneLimited = 0;

    for (let i = 0; i < iterations; i++) {
        const result = runSingleSimulation(mode, totalPulls);
        totalLimited += result.limitedCount;
        totalFiveStars += result.totalFiveStarCount;
        if (result.limitedCount > 0) {
            countAtLeastOneLimited++;
        }
    }

    return {
        avgLimited: totalLimited / iterations,
        avgTotal: totalFiveStars / iterations,
        probAtLeastOne: ((countAtLeastOneLimited / iterations) * 100).toFixed(1)
    };
}

function runSingleSimulation(mode, maxPulls) {
    let limitedCount = 0;
    let totalFiveStarCount = 0;

    // State tracking
    let pity = 0;
    let isGuaranteed = false; // Next 5* is guaranteed to be limited

    for (let i = 0; i < maxPulls; i++) {
        pity++;

        const prob = getProbability(mode, pity);

        if (Math.random() < prob) {
            // Hit 5 Star!
            totalFiveStarCount++;

            // Determine if Limited or Standard
            let isLimited = false;

            if (isGuaranteed) {
                isLimited = true;
                isGuaranteed = false; // Reset guarantee status (though for weapon/char it reverts to 50/50 or 75/25 usually?)
                // Actually: "抽出限定五星後回歸初始機率" -> Guarantee is consumed. logic resets to initial state (no guarantee).
            } else {
                // Not guaranteed, check 50/50 or 75/25
                const winRate = (mode === 'character') ? 0.5 : 0.75;
                if (Math.random() < winRate) {
                    isLimited = true;
                } else {
                    isLimited = false;
                    isGuaranteed = true; // Next one is guaranteed
                }
            }

            if (isLimited) {
                limitedCount++;
            }

            pity = 0; // Reset pity after 5 star
        }
    }

    return { limitedCount, totalFiveStarCount };
}

function getProbability(mode, pity) {
    if (mode === 'character') {
        // Character Rule:
        // Base: 0.6%
        // Soft Pity: 74-89 (Every pull +6%)
        // Hard Pity: 90 (100%)

        if (pity < 74) return 0.006;
        if (pity >= 90) return 1.0;

        // 74th pull -> 0.6% + 6% = 6.6% ? Or starts increasing AFTER 74?
        // User said: "74抽之後每多抽一次，五星機率就多6%"
        // Interpretation: 
        // 1-73: 0.6%
        // 74: 0.6% + 6% ? Or just 0.6%?
        // "74抽之後" usually means starting from 74 or 75. 
        // Standard Genshin logic: Soft pity starts AT 74.
        // Let's assume:
        // 74: 0.6 + 6*1 = 6.6%
        // 75: 0.6 + 6*2 = 12.6%
        // ...
        return 0.006 + (pity - 73) * 0.06;
    } else {
        // Weapon Rule:
        // Base: 0.7%
        // "第63~73抽每多抽一次，機率就多7%"
        // "74抽之後每多抽一次，機率就多3.5%"
        // Hard Pity: 80

        if (pity >= 80) return 1.0;

        if (pity < 63) {
            return 0.007; // Base
        } else if (pity <= 73) {
            // 63-73 range.
            // "每多抽一次，機率就多7%"
            // Assuming this adds to the base rate starts at 63?
            // Or does it mean Max(0.7 + (pity-62)*0.07)? 
            // Let's assume standard soft pity ramp logic.
            // 63: 0.7 + 7 = 7.7%
            return 0.007 + (pity - 62) * 0.07;
        } else {
            // 74+
            // "74抽之後每多抽一次，機率就多3.5%"
            // This likely stacks ON TOP of the probability reached at 73.
            // Prob at 73 = 0.007 + (73-62)*0.07 = 0.007 + 11*0.07 = 0.007 + 0.77 = 0.777 (77.7%)
            // 74: 0.777 + 3.5% ?
            const baseAt73 = 0.007 + (73 - 62) * 0.07;
            return baseAt73 + (pity - 73) * 0.035;
        }
    }
}
