/*Interactividad para el carrusel*/
const carouselInner = document.querySelector('.carrusel-inner');
const images = document.querySelectorAll('.carrusel img');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentIndex = 0;
const totalImages = images.length;

//Función para avanzar la diapositiva
function showNextImage() {
    currentIndex++;
    if (currentIndex >= totalImages) {
        currentIndex = 0;
    }
    updateCarousel();
}

//Función para retroceder la diapositiva
function showPrevImage() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = totalImages - 1
    }
    updateCarousel();
}
//Función para actualizar la posición del carrusel
function updateCarousel() {
    const offset = -currentIndex * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;
}

//Añadir escuchadores de eventos a los botones
nextButton.addEventListener('click', showNextImage);
prevButton.addEventListener('click', showPrevImage);