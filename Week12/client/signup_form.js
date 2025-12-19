const form = document.getElementById('signupForm');
const messageDiv = document.getElementById('message');

if (!localStorage.getItem('token')) {
  messageDiv.innerHTML = '<p style="color:orange">請先登入後才能報名</p>';
  form.querySelectorAll('input, button').forEach(el => el.disabled = true);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const payload = {
    name: document.getElementById('name').value,
    department: document.getElementById('dept').value,
    note: document.getElementById('note').value
  };

  const result = await apiRequest('/api/signup', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  if (result) {
    alert('報名成功！');
    form.reset();
    if (window.loadParticipants) loadParticipants();
  }
});