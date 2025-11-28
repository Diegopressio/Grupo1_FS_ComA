
 
const reseñas = [];

    document.getElementById("form-reseña").addEventListener("submit", function(event) {
      event.preventDefault();

      const pelicula = document.getElementById("pelicula").value;
      const comentario = document.getElementById("comentario").value;
      const puntuacion = document.getElementById("puntuacion").value;
      
      if (!pelicula || !comentario || !puntuacion) return;

      // Guardar reseña
      reseñas.push({ pelicula, comentario, puntuacion });

      // Limpiar formulario
      document.getElementById("pelicula").value = "";
      document.getElementById("comentario").value = "";
      document.getElementById("puntuacion").value = "";
      document.getElementById("form-reseña").reset();
      // Mostrar reseñas
      mostrarReseñas();
    });
    
     
    function mostrarReseñas() {
      const contenedor = document.getElementById("lista-reseñas");
      contenedor.innerHTML = "<h2>Reseñas de usuarios </h2>";
        reseñas.forEach(r => {
        const div = document.createElement("div");
        div.className = "reseña";
        div.innerHTML = `
          <strong>${r.pelicula}</strong><br>
          
        
          
        <br>
          <span class="estrella">${"⭐".repeat(r.puntuacion)}</span><br>
          
          ${r.comentario}
        `;
           
        contenedor.appendChild(div);
      });
      

  }
    