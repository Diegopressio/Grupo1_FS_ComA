/*const miTitulo = document.querySelector("h1");
miTitulo.textContent = "¡Hola mundo!";*/

/*let helado = "vainilla";
if (helado === "chocolate") {
    alert("¡Si, amo el helado de chocolate!");
} else {
    alert("Awww, pero mi favorito es el de chocolate...");
}*/

/*let nombreDeLaVariable = document.querySelector("h1");
alert("¡Hola!");*/

/*function multiplicar(num1, num2) {
    let resultado = num1 * num2;
    return resultado;
}

console.log (multiplicar(4,7));*/

/*document.querySelector("html").onclick = function () {
    alert("¡Ouch! ¡Deja de pincharme!");
};

let miHTML = document.querySelector("html");
miHTML*/

let miImage = document.querySelector("img");
miImage.onclick = function () {
    let miSrc = miImage.getAttribute("src");
    if (miSrc === "../Imágenes/unnamed.png") {
        miImage.setAttribute("src", "../Imágenes/Patitas.jpeg");
    } else {
        miImage.setAttribute("src", "../Imágenes/unnamed.png");
    }
};

let miBoton = document.querySelector("button");
let miTitulo = document.querySelector("h1");

function estableceNombreUsuario () {
    let miNombre = prompt ("Por favor, ingresa tu nombre.");
    localStorage.setItem("nombre", miNombre);
    miTitulo.textContent = "¡Hola mundo! ¡Hola, " + miNombre + "!";
}

if (!localStorage.getItem ("nombre")) {
    estableceNombreUsuario();
} else {
    let nombreAlmacenado = localStorage.getItem("nombre");
    miTitulo.textContent = "¡Hola mundo! ¡Hola," + nombreAlmacenado + "!";
}

miBoton.onclick = function () {
    estableceNombreUsuario();
}

function estableceNombreUsuario() {
    let miNombre = prompt ("Introduzca su nombre.");
    if (!miNombre) {
        estableceNombreUsuario();
    } else {
        localStorage.setItem("nombre", miNombre);
        miTitulo.innerHTML = ("¡Hola mundo! Hola, " + miNombre + "!")
    }
}