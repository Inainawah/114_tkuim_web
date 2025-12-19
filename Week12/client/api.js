async function apiRequest(url, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    localStorage.clear();
    alert('身分驗證失效，請重新登入');
    window.location.href = 'index.html';
    return null;
  }
  
  return response.json();
}