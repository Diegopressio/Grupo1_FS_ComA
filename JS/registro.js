// registro.js - gestión básica de registro usando localStorage
(function(){
    const form = document.getElementById('registerForm');
    const message = document.getElementById('message');
    const toggleBtn = document.getElementById('togglePasswordReg');

    function getUsers(){
        try{ return JSON.parse(localStorage.getItem('users')||'[]'); }catch(e){ return []; }
    }
    function saveUsers(users){ localStorage.setItem('users', JSON.stringify(users)); }

    function showError(id, text){ const el = document.getElementById(id); if(el) el.textContent = text; }
    function clearErrors(){ ['r-usernameError','r-emailError','r-passwordError','r-password2Error'].forEach(id => showError(id,'')); message.textContent=''; }

    form.addEventListener('submit', function(e){
        e.preventDefault(); clearErrors();
        const username = document.getElementById('r-username').value.trim();
        const email = document.getElementById('r-email').value.trim().toLowerCase();
    const password = document.getElementById('r-password').value;
    const password2 = document.getElementById('r-password2').value;

        let ok = true;
        if(username.length < 3){ showError('r-usernameError','El usuario debe tener al menos 3 caracteres'); ok=false; }
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ showError('r-emailError','Introduce un correo válido'); ok=false; }
    if(password.length < 6){ showError('r-passwordError','La contraseña debe tener al menos 6 caracteres'); ok=false; }
    if(password !== password2){ showError('r-password2Error','Las contraseñas no coinciden'); ok=false; }
        if(!ok) return;

        const users = getUsers();
        if(users.some(u => u.username.toLowerCase() === username.toLowerCase())){
            showError('r-usernameError','El usuario ya existe');
            return;
        }
        if(users.some(u => u.email === email)){
            showError('r-emailError','Ya existe una cuenta con ese correo');
            return;
        }

        users.push({ username, email, password });
        saveUsers(users);

        // marcar visualmente el formulario como exitoso antes de redirigir
        form.classList.add('success');
        message.style.color = 'green';
        message.textContent = 'Registro correcto. Redirigiendo al login...';
        setTimeout(()=> location.href = 'login.html', 1200);
    });

    // Toggle show/hide passwords (both fields) via eye button
    const openEyeSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/><circle fill="currentColor" cx="12" cy="12" r="2.5"/></svg>';
    const closedEyeSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path fill="currentColor" d="M2 2l20 20-1.4 1.4L17.5 20A11 11 0 0 1 12 21c-7 0-11-7-11-7a19.3 19.3 0 0 1 3.2-4.6L.6 3.4 2 2zm7.1 7.1A3 3 0 0 0 12 15a3 3 0 0 0 2.9-3.9L9.1 9.1zM12 5c2.2 0 4.2.7 5.9 1.9l-1.6 1.6A8.9 8.9 0 0 0 12 7c-1.3 0-2.6.3-3.8.8L6.5 6.2A18.5 18.5 0 0 1 12 5z"/></svg>';

    if(toggleBtn){
        if(!toggleBtn.innerHTML.trim()) toggleBtn.innerHTML = openEyeSvg;
        toggleBtn.addEventListener('click', function(){
            const p1 = document.getElementById('r-password');
            const p2 = document.getElementById('r-password2');
            if(!p1 || !p2) return;
            const showing = p1.type === 'text';
            p1.type = showing ? 'password' : 'text';
            p2.type = showing ? 'password' : 'text';
            this.innerHTML = showing ? openEyeSvg : closedEyeSvg;
            this.setAttribute('aria-pressed', String(!showing));
            this.title = showing ? 'Mostrar contraseñas' : 'Ocultar contraseñas';
        });
    }
})();