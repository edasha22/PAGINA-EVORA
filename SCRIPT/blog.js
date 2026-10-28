// Regresa al inicio de la pagina al pulsar Volver arriba.
const volverArriba = document.querySelector('#volver-arriba');

volverArriba.addEventListener('click', function (evento) {
    evento.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
