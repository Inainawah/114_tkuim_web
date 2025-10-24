function toNumber(str) {
  var n = parseFloat(str);
  return isNaN(n) ? null : n;
}

function gradeFrom(avg) {
  if (avg >= 90) return 'A';
  else if (avg >= 80) return 'B';
  else if (avg >= 70) return 'C';
  else if (avg >= 60) return 'D';
  else return 'F';
}

var name = prompt('請輸入姓名：');
if (!name) name = '同學';

// 讀入五科成績
var subjects = ['國文', '英文', '數學', '自然', '社會'];
var scores = [];

for (var i = 0; i < subjects.length; i++) {
  var s = toNumber(prompt('請輸入 ' + subjects[i] + ' 成績：'));
  scores.push(s);
}

var text = '';
if (scores.some(s => s === null)) {
  text = '輸入有誤，請重新整理後再試。';
} else {
  var sum = scores.reduce((a, b) => a + b, 0);
  var avg = sum / scores.length;
  var grade = gradeFrom(avg);

  // 檢查是否有不及格科目
  var hasFail = scores.some(s => s < 60);

  text = '姓名：' + name + '\n';
  for (var i = 0; i < subjects.length; i++) {
    text += subjects[i] + '：' + scores[i] + '\n';
  }
  text += '平均：' + avg.toFixed(2) + '\n';
  text += '等第：' + grade + '\n';
  if (hasFail) {
    text += '有不及格科目';
  }
}

console.log(text);
document.getElementById('result').textContent = text;
