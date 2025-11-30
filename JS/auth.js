// auth.js - muestra el usuario en la cabecera y gestiona cierre de sesión
(function(){
    function getCurrentUser(){
        try{ return JSON.parse(localStorage.getItem('currentUser')||'null'); }catch(e){ return null; }
    }

    function renderAuthLinks(){
        const el = document.getElementById('authLinks');
        if(!el) return;
        const user = getCurrentUser();
        console.log('auth.js: renderAuthLinks, currentUser =', user);
        if(user){
            el.innerHTML = `
                <span class="greeting">Hola, ${escapeHtml(user.username)}</span>
                <a href="#" id="logoutBtn" class="btn small">Cerrar sesión</a>
            `;
            
            const btn = document.getElementById('logoutBtn');
            if(btn) btn.addEventListener('click', function(e){ e.preventDefault(); localStorage.removeItem('currentUser'); location.reload(); });
        } else {
            // contenido por defecto: enlaces a login/registro (mejor accesibilidad si JS falla)
            // hide hero button and reseñas link when not logged
            const acti = document.getElementById('pp');
            if (acti) acti.style.display = 'none';
            // hide menu reseñas link if present
            const menuRes = document.querySelector('a[href="../HTML/reseñas.html"], a[href="/HTML/reseñas.html"]');
            if (menuRes) menuRes.style.display = 'none';

            el.innerHTML = `<a class="login-link" href="login.html">Inicia sesión</a> <a class="register-link" href="registro.html">Regístrate</a>`;
        
        }

    // Ensure reseñas link and hero button visibility when user is logged
    document.addEventListener('DOMContentLoaded', function(){
        const user = getCurrentUser();
        const menuRes = document.querySelector('a[href="../HTML/reseñas.html"], a[href="/HTML/reseñas.html"]');
        const acti = document.getElementById('pp');
        if (user) {
            if (menuRes) menuRes.style.display = '';
            if (acti) acti.style.display = '';
        } else {
            if (menuRes) menuRes.style.display = 'none';
            if (acti) acti.style.display = 'none';
        }
    });
    }

    function escapeHtml(s){ return String(s).replace(/[&<>"'`]/g, function(ch){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;","`":"&#96;"}[ch]; }); }

    function handleLoginQuery() {
        try {
            const params = new URLSearchParams(window.location.search);
            if (params.has('user')) {
                const user = params.get('user');
                console.log('auth.js: found user param =', user);
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify({ username: decodeURIComponent(user) }));
                    console.log('auth.js: stored currentUser in localStorage');
                }
                // remove the query param from the URL without reloading
                const cleanUrl = window.location.pathname + window.location.hash;
                history.replaceState(null, '', cleanUrl);
            }
        } catch (e) { /* ignore */ }
    }

    document.addEventListener('DOMContentLoaded', function(){ handleLoginQuery(); renderAuthLinks(); });
})();
