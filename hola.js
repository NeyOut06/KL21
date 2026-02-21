document.addEventListener("DOMContentLoaded", function () {

    // BOTÓN MENSAJE
    const boton = document.getElementById("btnRevelar");
    const mensaje = document.getElementById("mensajeSecreto");

    boton.addEventListener("click", function () {
        mensaje.classList.add("visible");
        mensaje.scrollIntoView({ behavior: "smooth" });
    });

    // LLUVIA DE CORAZONES MEJORADA
const container = document.querySelector(".hearts-container");

function crearCorazon() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤"; // ahora corazón lleno

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (Math.random() * 30 + 20) + "px"; 
    heart.style.animationDuration = (Math.random() * 4 + 6) + "s";

    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 10000);
}

setInterval(crearCorazon, 250); // más frecuentes
});