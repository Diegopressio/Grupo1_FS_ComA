document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('register-form');
  if(!form) return;

  const username = document.getElementById('reg-username');
  const password = document.getElementById('reg-password');
  const password2 = document.getElementById('reg-password2');
  const btn = document.getElementById('register-btn');
  const msg = document.getElementById('register-message');

  const usernameError = document.getElementById('reg-username-error');
  const passwordError = document.getElementById('reg-password-error');
  const password2Error = document.getElementById('reg-password2-error');

  function validateUsername(){
    if(username.validity.valueMissing) return 'El usuario es requerido.';
    if(username.value.trim().length < 3) return 'Mínimo 3 caracteres.';
    return '';
  }

  function validatePassword(){
    if(password.validity.valueMissing) return 'La contraseña es requerida.';
    if(password.value.length < 8) return 'Mínimo 8 caracteres.';
    if(!/[A-Z]/.test(password.value)) return 'Incluye al menos una mayúscula.';
    if(!/\d/.test(password.value)) return 'Incluye al menos un número.';
    return '';
  }

  function validatePassword2(){
    if(password2.validity.valueMissing) return 'Confirma la contraseña.';
    if(password2.value !== password.value) return 'Las contraseñas no coinciden.';
    return '';
  }

  username.addEventListener('input', ()=> usernameError.textContent = validateUsername());
  password.addEventListener('input', ()=> passwordError.textContent = validatePassword());
  password2.addEventListener('input', ()=> password2Error.textContent = validatePassword2());

  const toggle = document.getElementById('reg-toggle-pw');
  toggle.addEventListener('click', ()=>{
    const type = password.type === 'password' ? 'text' : 'password';
    password.type = type;
    toggle.textContent = type === 'password' ? '🔒' : '👁️';
    toggle.setAttribute('aria-label', type === 'password' ? 'Mostrar contraseña' : 'Ocultar contraseña');
  });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const uErr = validateUsername();
    const pErr = validatePassword();
    const p2Err = validatePassword2();
    usernameError.textContent = uErr;
    passwordError.textContent = pErr;
    password2Error.textContent = p2Err;
    msg.textContent = '';

    if(uErr || pErr || p2Err) return;

    btn.disabled = true; btn.textContent = 'Creando...';

    // Simulación de creación: almacenar en localStorage como demo (no para producción)
    setTimeout(()=>{
      const users = JSON.parse(localStorage.getItem('demo_users') || '[]');
      if(users.find(u=>u.username === username.value.trim())){
        msg.style.color = '#e03a3a'; msg.textContent = 'El usuario ya existe.';
      } else {
        users.push({ username: username.value.trim(), password: password.value });
        localStorage.setItem('demo_users', JSON.stringify(users));
        msg.style.color = '#0b6a3a'; msg.textContent = 'Cuenta creada correctamente (simulado). Puedes iniciar sesión.';
        form.reset();
      }
      btn.disabled = false; btn.textContent = 'Crear cuenta';
    }, 900);
  });
});
