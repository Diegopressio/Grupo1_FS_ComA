// auth.js - muestra el usuario en la cabecera y gestiona cierre de sesión
(function(){
    function getCurrentUser(){
        try{ return JSON.parse(localStorage.getItem('currentUser')||'null'); }catch(e){ return null; }
    }

    function renderAuthLinks(){
        const el = document.getElementById('authLinks');
        if(!el) return;
        const user = getCurrentUser();
        if(user){
            el.innerHTML = `
                <span class="greeting">Hola, ${escapeHtml(user.username)}</span>
                <a href="#" id="logoutBtn" class="btn small">Cerrar sesión</a>
            `;
            
            const btn = document.getElementById('logoutBtn');
            if(btn) btn.addEventListener('click', function(e){ e.preventDefault(); localStorage.removeItem('currentUser'); location.reload(); });
        } else {
            // contenido por defecto: enlaces a login/registro (mejor accesibilidad si JS falla)
            const acti=document.getElementById('pp');
            acti.style.display = 'none';
            el.innerHTML = `<a class="login-link" href="login.html">Inicia sesión</a> <a class="register-link" href="registro.html">Regístrate</a>`;
        
        }
    }

    function escapeHtml(s){ return String(s).replace(/[&<>"'`]/g, function(ch){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;","`":"&#96;"}[ch]; }); }

    document.addEventListener('DOMContentLoaded', renderAuthLinks);
})();
