const form = document.getElementById('signupForm');
const submitBtn = document.getElementById('submitBtn');
const statusEl = document.getElementById('status');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm');
const interestsContainer = document.getElementById('interestContainer');
const interestsHidden = document.getElementById('interests-hidden');
const interestsError = document.getElementById('interests-error');
const termsInput = document.getElementById('terms');

function setFieldError(field, message) {
  const err = document.getElementById(field.id + '-error');
  field.setCustomValidity(message);
  err.textContent = message;
}
function clearFieldError(field) {
  const err = document.getElementById(field.id + '-error');
  field.setCustomValidity('');
  err.textContent = '';
}

function validateName() {
  if (!nameInput.value.trim()) {
    setFieldError(nameInput, '請輸入姓名。');
    return false;
  }
  clearFieldError(nameInput);
  return true;
}

function validateEmail() {
  if (!emailInput.value) {
    setFieldError(emailInput, 'Email 為必填。');
    return false;
  }

  clearFieldError(emailInput);
  return true;
}

function validatePhone() {
  const v = phoneInput.value.trim();
  if (!v) {
    setFieldError(phoneInput, '手機為必填。');
    return false;
  }
  if (!/^\d{10}$/.test(v)) {
    setFieldError(phoneInput, '請輸入 10 碼數字手機號碼（例如 0912345678）。');
    return false;
  }
  clearFieldError(phoneInput);
  return true;
}

function validatePassword() {
  const v = passwordInput.value;
  const re = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/;
  if (!v) {
    setFieldError(passwordInput, '密碼為必填。');
    return false;
  }
  if (!re.test(v)) {
    setFieldError(passwordInput, '密碼至少 8 碼，且需包含英文字母與數字。');
    return false;
  }
  clearFieldError(passwordInput);
  return true;
}

function validateConfirm() {
  if (!confirmInput.value) {
    setFieldError(confirmInput, '請再次輸入密碼以確認。');
    return false;
  }
  if (confirmInput.value !== passwordInput.value) {
    setFieldError(confirmInput, '與密碼不相符，請確認兩次輸入相同。');
    return false;
  }
  clearFieldError(confirmInput);
  return true;
}

function updateInterestsValidity() {
  const checked = interestsContainer.querySelectorAll('input[type=checkbox]:checked').length;
  if (checked === 0) {
    interestsHidden.setCustomValidity('請至少選擇一項興趣。');
    interestsError.textContent = '請至少選擇一項興趣。';
    return false;
  }
  interestsHidden.setCustomValidity('');
  interestsError.textContent = '';
  return true;
}

function validateTerms() {
  if (!termsInput.checked) {
    termsInput.setCustomValidity('您必須同意服務條款。');
    document.getElementById('terms-error').textContent = '您必須同意服務條款。';
    return false;
  }
  termsInput.setCustomValidity('');
  document.getElementById('terms-error').textContent = '';
  return true;
}

const strengthBar = document.querySelector('#password-strength .bar');
const strengthText = document.getElementById('password-strength-text');
function evaluatePasswordStrength(pw) {
  if (!pw) return {score:0,label:'未輸入'};
  let score = 0;
  if (pw.length >= 8) score += 1;
  if (/[A-Z]/.test(pw)) score += 1;
  if (/[0-9]/.test(pw)) score += 1;
  if (/[^A-Za-z0-9]/.test(pw)) score += 1;
  if (pw.length >= 12) score += 1;
  if (score <= 1) return {score:1,label:'弱'};
  if (score <= 3) return {score:2,label:'中'};
  return {score:3,label:'強'};
}
function updateStrengthUI() {
  const pw = passwordInput.value;
  const res = evaluatePasswordStrength(pw);
  strengthBar.style.width = (res.score/3*100) + '%';
  strengthText.textContent = res.label;
}

[nameInput, emailInput, phoneInput, passwordInput, confirmInput].forEach(el => {
  el.addEventListener('blur', () => {
    switch (el) {
      case nameInput: validateName(); break;
      case emailInput: validateEmail(); break;
      case phoneInput: validatePhone(); break;
      case passwordInput: validatePassword(); updateStrengthUI(); break;
      case confirmInput: validateConfirm(); break;
    }
  });

  el.addEventListener('input', () => {
    switch (el) {
      case nameInput: if (nameInput.value.trim()) clearFieldError(nameInput); break;
      case emailInput: if (emailInput.checkValidity()) clearFieldError(emailInput); break;
      case phoneInput: if (/^\d{10}$/.test(phoneInput.value.trim())) clearFieldError(phoneInput); break;
      case passwordInput:
        updateStrengthUI();
        if (/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/.test(passwordInput.value)) clearFieldError(passwordInput);
        if (confirmInput.value) validateConfirm();
        break;
      case confirmInput:
        if (confirmInput.value === passwordInput.value) clearFieldError(confirmInput);
        break;
    }
  });
});

interestsContainer.addEventListener('change', (e) => {
  const label = e.target.closest('label.tag');
  if (label) {
    label.classList.toggle('selected', e.target.checked);
  }
  const checked = interestsContainer.querySelectorAll('input[type=checkbox]:checked').length;
  interestsContainer.dataset.count = checked;
  updateInterestsValidity();
});

form.addEventListener('submit', (ev) => {
  ev.preventDefault();

  if (ev.submitter !== submitBtn) return;

  statusEl.textContent = '';

  const validators = [
    validateName,
    validateEmail,
    validatePhone,
    validatePassword,
    validateConfirm,
    updateInterestsValidity,
    validateTerms
  ];

  const results = validators.map(fn => fn());
  const firstFailedIndex = results.findIndex(r => r === false);
  if (firstFailedIndex !== -1) {
    const focusMap = [nameInput, emailInput, phoneInput, passwordInput, confirmInput, interestsContainer, termsInput];
    const toFocus = focusMap[firstFailedIndex];
    if (toFocus === interestsContainer) {
      const firstChk = interestsContainer.querySelector('input[type=checkbox]');
      if (firstChk) firstChk.focus();
    } else {
      toFocus.focus();
    }
    return;
  }

  submitBtn.disabled = true;
  submitBtn.classList.add('loading');
  statusEl.textContent = '送出中...';

  setTimeout(() => {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
    statusEl.textContent = '註冊成功';
    form.reset();
    document.querySelectorAll('.tag.selected').forEach(l => l.classList.remove('selected'));
    strengthBar.style.width = '0%';
    strengthText.textContent = '未輸入';
    interestsContainer.dataset.count = 0;
  }, 1000);
});

updateStrengthUI();
updateInterestsValidity();