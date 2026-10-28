// ==========================================
// ÉVORA - PÁGINA DE PAQUETES
// Menú para celulares y tabletas
// ==========================================

const botonMenu = document.querySelector('.menu-toggle');
const navegacion = document.querySelector('#menu-principal');

// Cierra el menú cuando el usuario termina de navegar.
function cerrarMenu() {
    botonMenu.classList.remove('is-open');
    botonMenu.setAttribute('aria-expanded', 'false');
    botonMenu.setAttribute('aria-label', 'Abrir menú de navegación');
    navegacion.classList.remove('is-open');
}

// Abre y cierra el menú al presionar el botón.
botonMenu.addEventListener('click', function () {
    const abierto = botonMenu.getAttribute('aria-expanded') === 'true';

    botonMenu.classList.toggle('is-open', !abierto);
    botonMenu.setAttribute('aria-expanded', String(!abierto));
    botonMenu.setAttribute('aria-label', abierto ? 'Abrir menú de navegación' : 'Cerrar menú de navegación');
    navegacion.classList.toggle('is-open', !abierto);
});

// Cierra el menú al seleccionar una página.
navegacion.querySelectorAll('a').forEach(function (enlace) {
    enlace.addEventListener('click', cerrarMenu);
});

// Cierra el menú al presionar Escape.
document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape') {
        cerrarMenu();
    }
});

// Cierra el menú si se hace clic fuera del encabezado.
document.addEventListener('click', function (evento) {
    if (!evento.target.closest('.header')) {
        cerrarMenu();
    }
});

// Cierra el menú al pasar al tamaño de computadora.
window.addEventListener('resize', function () {
    if (window.innerWidth > 880) {
        cerrarMenu();
    }
});
