async function loadParticipants() {
  const tbody = document.getElementById('participantList');
  const emptyMsg = document.getElementById('emptyMsg');
  tbody.innerHTML = '<tr><td colspan="4">載入中...</td></tr>';

  const data = await apiRequest('/api/signup');
  if (!data) return;

  if (data.length === 0) {
    tbody.innerHTML = '';
    emptyMsg.classList.remove('hidden');
    return;
  }

  emptyMsg.classList.add('hidden');
  tbody.innerHTML = data.map(item => `
    <tr>
      <td>${item.name}</td>
      <td>${item.department}</td>
      <td>${item.userEmail || 'N/A'}</td>
      <td>
        <button class="delete-btn" onclick="deleteEntry('${item._id}')">刪除</button>
      </td>
    </tr>
  `).join('');
}

async function deleteEntry(id) {
  if (!confirm('確定要刪除這筆報名嗎？')) return;
  
  const res = await apiRequest(`/api/signup/${id}`, { method: 'DELETE' });
  if (res) {
    alert('刪除成功');
    loadParticipants();
  }
}