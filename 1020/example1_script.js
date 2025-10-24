// example1_script.js
// 傳統語法：使用 var、function、字串串接

// 顯示提示窗
alert('歡迎來到 JavaScript！');

// 在 Console 顯示訊息
console.log('Hello JavaScript from console');

// 在頁面指定區域輸出文字
var el = document.getElementById('result');
el.textContent = '這行文字是由外部 JS 檔案寫入的。\n';

// 增加姓名與學號
el.textContent += '姓名：曾彥勳\n';
el.textContent += '學號：412630518\n';

var btn = document.getElementById('helloBtn');
btn.addEventListener('click', function() {
  alert('按到我了' );
});