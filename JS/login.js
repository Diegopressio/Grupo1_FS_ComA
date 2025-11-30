
// login.js - verificación simple contra usuarios guardados en localStorage
(function(){
    // Find the login form either by id or by the form name attribute (fallback)
    const form = document.getElementById('loginForm') || document.querySelector('form[name="dbl"]');
    console.log('login.js: form found?', !!form);
    if (!form) return;
    // Attach client-side handler to perform AJAX login; if JS disabled, form still posts to server
    const message = document.getElementById('message');
    const toggleBtn = document.getElementById('togglePassword');

    function getUsers(){
        try{ return JSON.parse(localStorage.getItem('users')||'[]'); }catch(e){ return []; }
    }

    function showError(id, text){ const el = document.getElementById(id); if(el) el.textContent = text; }
    function clearErrors(){ ['usernameError','passwordError'].forEach(id => showError(id,'')); message.textContent=''; }

    form.addEventListener('submit', function(e){
        e.preventDefault(); clearErrors();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        let ok = true;
        if(username.length === 0){ showError('usernameError','Introduce tu usuario'); ok=false; }
        if(password.length === 0){ showError('passwordError','Introduce tu contraseña'); ok=false; }
        if(!ok) return;

        // Prepare form data and send to server via fetch; include an 'ajax' flag so server returns JSON
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('ingresar', '1');
        formData.append('ajax', '1');

        const actionUrl = form.getAttribute('action') || '../logi.php';

        fetch(actionUrl, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(r => r.json().catch(()=>({ success:false, message: 'Respuesta inválida del servidor' })))
        .then(data => {
            if (data && data.success) {
                // Store user in localStorage and redirect to index
                const userObj = { username: data.user };
                if (data.email) userObj.email = data.email;
                localStorage.setItem('currentUser', JSON.stringify(userObj));
                message.style.color = 'green';
                message.textContent = 'Bienvenido ' + data.user + '. Redirigiendo...';
                setTimeout(()=> location.href = 'index.html', 700);
            } else {
                message.style.color = 'red';
                message.textContent = data.message || 'Usuario o contraseña incorrectos';
            }
        }).catch(err => {
            console.error('login.js: fetch error', err);
            message.style.color = 'red';
            message.textContent = 'Error al conectar con el servidor';
        });
    });

    // Toggle show/hide password using the eye button
    const openEyeSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/><circle fill="currentColor" cx="12" cy="12" r="2.5"/></svg>';
    const closedEyeSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path fill="currentColor" d="M2 2l20 20-1.4 1.4L17.5 20A11 11 0 0 1 12 21c-7 0-11-7-11-7a19.3 19.3 0 0 1 3.2-4.6L.6 3.4 2 2zm7.1 7.1A3 3 0 0 0 12 15a3 3 0 0 0 2.9-3.9L9.1 9.1zM12 5c2.2 0 4.2.7 5.9 1.9l-1.6 1.6A8.9 8.9 0 0 0 12 7c-1.3 0-2.6.3-3.8.8L6.5 6.2A18.5 18.5 0 0 1 12 5z"/></svg>';

    if(toggleBtn){
        // ensure button shows SVG (in case markup changed)
        if(!toggleBtn.innerHTML.trim()) toggleBtn.innerHTML = openEyeSvg;
        toggleBtn.addEventListener('click', function(){
            const pwd = document.getElementById('password');
            if(!pwd) return;
            const showing = pwd.type === 'text';
            pwd.type = showing ? 'password' : 'text';
            this.innerHTML = showing ? openEyeSvg : closedEyeSvg;
            this.setAttribute('aria-pressed', String(!showing));
            this.title = showing ? 'Mostrar contraseña' : 'Ocultar contraseña';
        });
    }
})();
