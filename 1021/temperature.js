function tempConvert() {
    let temp = parseFloat(prompt("請輸入溫度數值："));
    let unit = prompt("請輸入單位（C 或 F）：").toUpperCase();
    let result = "";

    if (unit === "C") {
        let f = temp * 9 / 5 + 32;
        result = `${temp}°C = ${f.toFixed(2)}°F`;
    } else if (unit === "F") {
        let c = (temp - 32) * 5 / 9;
        result = `${temp}°F = ${c.toFixed(2)}°C`;
    } else {
        result = "輸入錯誤，請輸入 C 或 F。";
    }

    alert(result);
    document.getElementById("result").textContent = result;
}