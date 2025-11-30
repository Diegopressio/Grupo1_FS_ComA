
// Reseñas almacenadas en localStorage (solo en navegador)

function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem('currentUser') || 'null'); } catch(e) { return null; }
}

function loadResenas() {
  try { return JSON.parse(localStorage.getItem('resenas') || '[]'); } catch(e) { return []; }
}

function saveResenas(arr) {
  localStorage.setItem('resenas', JSON.stringify(arr));
}

document.addEventListener('DOMContentLoaded', function() {
  console.log('reseña.js: DOMContentLoaded, currentUser =', getCurrentUser());
  renderUserState();
  renderResenas();
});

function renderUserState() {
  const user = getCurrentUser();
  console.log('reseña.js: renderUserState, user =', user);
  const formContainer = document.getElementById('form-container');
  const authMessage = document.getElementById('auth-message');
  const usuarioActual = document.getElementById('usuario-actual');

  if (user) {
    if (formContainer) formContainer.style.display = 'block';
    if (authMessage) authMessage.style.display = 'none';
    if (usuarioActual) usuarioActual.textContent = 'Usuario: ' + user.username;
  } else {
    if (formContainer) formContainer.style.display = 'none';
    if (authMessage) authMessage.style.display = 'block';
  }
}

function renderResenas() {
  const contenedor = document.getElementById('lista-reseñas');
  const resenas = loadResenas();
  contenedor.innerHTML = '<h2>Reseñas de usuarios</h2>';

  if (!resenas || resenas.length === 0) {
    contenedor.innerHTML += '<p style="color: #999;">No hay reseñas aún. ¡Sé el primero en dejar una!</p>';
    return;
  }

  resenas.slice().reverse().forEach(r => {
    const div = document.createElement('div');
    div.className = 'reseña';

    const fecha = new Date(r.fecha);
    const fechaFormato = fecha.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

    div.innerHTML = `
      <div style="border-bottom: 1px solid #ddd; padding: 15px 0; margin-bottom: 12px;">
        <strong style="font-size:1.1em;">${escapeHtml(r.pelicula)}</strong>
        <small style="color:#999; display:block; margin-top:6px;">Por <strong>${escapeHtml(r.usuario)}</strong> - ${fechaFormato}</small>
        <div style="margin:10px 0; font-size:1.2em;">${'⭐'.repeat(r.puntuacion)}</div>
        <p>${escapeHtml(r.comentario)}</p>
      </div>
    `;

    contenedor.appendChild(div);
  });
}

function escapeHtml(s){ return String(s||'').replace(/[&<>",']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c]; }); }

// Envío del formulario
const form = document.getElementById('form-reseña');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const pelicula = document.getElementById('pelicula').value.trim();
    const comentario = document.getElementById('comentario').value.trim();
    const puntuacion = parseInt(document.getElementById('puntuacion').value, 10);

    if (!pelicula || !comentario || !puntuacion) {
      alert('Por favor completa todos los campos');
      return;
    }

    const user = getCurrentUser();
    if (!user) {
      alert('Debes iniciar sesión para dejar una reseña');
      return;
    }

    const resenas = loadResenas();
    resenas.push({ usuario: user.username, pelicula: pelicula, comentario: comentario, puntuacion: puntuacion, fecha: new Date().toISOString() });
    saveResenas(resenas);

    form.reset();
    renderResenas();
  });
}
    