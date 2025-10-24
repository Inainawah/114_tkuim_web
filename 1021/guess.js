function guessNumber() {
    let answer = Math.floor(Math.random() * 100) + 1;
    let guess, count = 0;

    do {
        guess = parseInt(prompt("請猜一個 1~100 的數字："));
        count++;

        if (guess > answer) {
            alert("再小一點！");
        } else if (guess < answer) {
            alert("再大一點！");
        } else {
            alert(`🎉 恭喜猜中！答案是 ${answer}，你總共猜了 ${count} 次！`);
        }
    } while (guess !== answer);

    document.getElementById("result").textContent =
        `🎯 答案是 ${answer}\n共猜了 ${count} 次！`;
}