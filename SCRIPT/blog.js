// ==========================================
// EVORA - BLOG
// Menu para celulares y boton Volver arriba
// ==========================================

const botonMenu = document.querySelector('.menu-toggle');
const navegacion = document.querySelector('#menu-principal');

// Cierra el menu y restaura el texto del boton.
function cerrarMenu() {
    botonMenu.classList.remove('is-open');
    botonMenu.setAttribute('aria-expanded', 'false');
    botonMenu.setAttribute('aria-label', 'Abrir menú de navegación');
    navegacion.classList.remove('is-open');
}

// Abre o cierra el menu al pulsar el boton.
botonMenu.addEventListener('click', function () {
    const abierto = botonMenu.getAttribute('aria-expanded') === 'true';

    botonMenu.classList.toggle('is-open', !abierto);
    botonMenu.setAttribute('aria-expanded', String(!abierto));
    botonMenu.setAttribute('aria-label', abierto ? 'Abrir menú de navegación' : 'Cerrar menú de navegación');
    navegacion.classList.toggle('is-open', !abierto);
});

// Cierra el menu al seleccionar un enlace.
navegacion.querySelectorAll('a').forEach(function (enlace) {
    enlace.addEventListener('click', cerrarMenu);
});

// Cierra el menu con la tecla Escape.
document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape') {
        cerrarMenu();
    }
});

// Cierra el menu al pulsar fuera del encabezado.
document.addEventListener('click', function (evento) {
    if (!evento.target.closest('.header')) {
        cerrarMenu();
    }
});

// Cierra el menu cuando la ventana pasa al tamaño de escritorio.
window.addEventListener('resize', function () {
    if (window.innerWidth > 880) {
        cerrarMenu();
    }
});

// Regresa al inicio de la pagina al pulsar Volver arriba.
const volverArriba = document.querySelector('#volver-arriba');

volverArriba.addEventListener('click', function (evento) {
    evento.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    cerrarMenu();
});
