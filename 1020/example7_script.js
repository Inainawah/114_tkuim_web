// example7_script.js
// BMI 計算與等級判斷，新增理想範圍判斷函式

function calcBMI(heightCm, weightKg) {
  var h = heightCm / 100; // 轉成公尺
  var bmi = weightKg / (h * h);
  return bmi;
}

function bmiLevel(bmi) {
  if (bmi < 18.5) return '過輕';
  else if (bmi < 24) return '正常';
  else if (bmi < 27) return '過重';
  else if (bmi < 30) return '輕度肥胖';
  else if (bmi < 35) return '中度肥胖';
  else return '重度肥胖';
}

// 新增函式：判斷 BMI 是否理想
function isIdeal(bmi) {
  return bmi >= 18.5 && bmi < 24;
}

// 取得使用者輸入
var hStr = prompt('請輸入身高（公分）：');
var wStr = prompt('請輸入體重（公斤）：');
var hNum = parseFloat(hStr);
var wNum = parseFloat(wStr);

var text = '';
if (isNaN(hNum) || isNaN(wNum) || hNum <= 0) {
  text = '輸入不正確';
} else {
  var bmi = calcBMI(hNum, wNum);
  text = '身高：' + hNum + ' cm\n'
       + '體重：' + wNum + ' kg\n'
       + 'BMI：' + bmi.toFixed(2) + '\n'
       + '等級：' + bmiLevel(bmi) + '\n'
       + '是否介於18.5~24：' + (isIdeal(bmi) ? '是' : '否');
}

document.getElementById('result').textContent = text;