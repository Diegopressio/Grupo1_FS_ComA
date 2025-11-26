document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('login-form');
  if(!form) return;
  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const submitBtn = document.getElementById('submit-btn');
  const msg = document.getElementById('form-message');

  const usernameError = document.getElementById('username-error');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');

  function validateUsername(){
    if(username.validity.valueMissing) return 'El usuario es requerido.';
    if(username.value.trim().length < 3) return 'Mínimo 3 caracteres.';
    return '';
  }
  function validateEmail(){
    if(email.validity.valueMissing) return 'El correo es requerido.';
    if(email.validity.typeMismatch) return 'Ingresa un correo válido.';
    return '';
  }
  function validatePassword(){
    if(password.validity.valueMissing) return 'La contraseña es requerida.';
    if(password.value.length < 8) return 'Mínimo 8 caracteres.';
    return '';
  }

  username.addEventListener('input', ()=> usernameError.textContent = validateUsername());
  email.addEventListener('input', ()=> emailError.textContent = validateEmail());
  password.addEventListener('input', ()=> passwordError.textContent = validatePassword());

  const toggle = document.getElementById('toggle-pw');
  if(toggle){
    toggle.addEventListener('click', ()=>{
      const type = password.type === 'password' ? 'text' : 'password';
      password.type = type;
      toggle.textContent = type === 'password' ? '🔒' : '👁️';
      toggle.setAttribute('aria-label', type === 'password' ? 'Mostrar contraseña' : 'Ocultar contraseña');
    });
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const uErr = validateUsername();
    const eErr = validateEmail();
    const pErr = validatePassword();
    usernameError.textContent = uErr;
    emailError.textContent = eErr;
    passwordError.textContent = pErr;
    if(uErr || eErr || pErr){ msg.textContent = ''; return; }

    submitBtn.disabled = true; submitBtn.textContent = 'Entrando...'; msg.textContent = '';

    // Simulación de login: aceptar si la contraseña contiene al menos un dígito
    setTimeout(()=>{
      const ok = /\d/.test(password.value);
      if(ok){ msg.style.color = '#0b6a3a'; msg.textContent = 'Login exitoso. (simulado)'; }
      else { msg.style.color = '#e03a3a'; msg.textContent = 'Credenciales inválidas.'; }
      submitBtn.disabled = false; submitBtn.textContent = 'Entrar';
    }, 800);
  });
});
