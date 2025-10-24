// example4_script.js
// 奇偶判斷 + switch + 分數等第判斷

// === 第一部分：判斷奇偶 ===
var input = prompt('請輸入一個整數：');
var n = parseInt(input, 10);
var msg = '';

if (isNaN(n)) {
  msg = '輸入不是有效的整數！';
} else if (n % 2 === 0) {
  msg = n + ' 是偶數';
} else {
  msg = n + ' 是奇數';
}

// === 第二部分：switch 示範 ===
var choice = prompt('輸入 1/2/3 試試 switch：');
switch (choice) {
  case '1':
    msg += '\n你輸入了 1';
    break;
  case '2':
    msg += '\n你輸入了 2';
    break;
  case '3':
    msg += '\n你輸入了 3';
    break;
  default:
    msg += '\n非 1/2/3';
}

// === 第三部分：輸入分數 → 判斷等第 ===
var scoreInput = prompt('請輸入分數（0~100）：');
var score = parseInt(scoreInput, 10);
var grade = '';

if (isNaN(score) || score < 0 || score > 100) {
  grade = '（分數輸入無效）';
} else if (score >= 90) {
  grade = 'A';
} else if (score >= 80) {
  grade = 'B';
} else if (score >= 70) {
  grade = 'C';
} else if (score >= 60) {
  grade = 'D';
} else {
  grade = 'F';
}

msg += '\n你的分數等第是：' + grade;

document.getElementById('result').textContent = msg;