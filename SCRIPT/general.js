document.querySelectorAll('.site-header').forEach((header) => {
  const menuToggle = header.querySelector('.menu-toggle');
  const mainNav = header.querySelector('.main-nav');
  const drawerBackdrop = header.querySelector('.drawer-backdrop');

  if (!menuToggle || !mainNav || !drawerBackdrop) {
    return;
  }

  const mobileMenuQuery = window.matchMedia('(max-width: 880px)');

  function closeMenu() {
    menuToggle.classList.remove('is-active');
    mainNav.classList.remove('is-open');
    drawerBackdrop.classList.remove('is-active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
    document.body.classList.remove('menu-open');
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';

    if (isOpen) {
      closeMenu();
      return;
    }

    menuToggle.classList.add('is-active');
    mainNav.classList.add('is-open');
    drawerBackdrop.classList.add('is-active');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Cerrar menú');
    document.body.classList.add('menu-open');
  });

  drawerBackdrop.addEventListener('click', closeMenu);
  mainNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuToggle.focus();
    }
  });

  mobileMenuQuery.addEventListener('change', (event) => {
    if (!event.matches) {
      closeMenu();
    }
  });
});

document.querySelectorAll('.evora-header').forEach((header) => {
  const menuToggle = header.querySelector('.evora-menu-toggle');
  const mainNav = header.querySelector('.evora-nav');
  const drawerBackdrop = document.querySelector('.evora-menu-backdrop');

  if (!menuToggle || !mainNav || !drawerBackdrop) {
    return;
  }

  function closeMenu() {
    menuToggle.classList.remove('evora-open');
    mainNav.classList.remove('evora-open');
    drawerBackdrop.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
    document.body.classList.remove('menu-open');
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';

    if (isOpen) {
      closeMenu();
      return;
    }

    menuToggle.classList.add('evora-open');
    mainNav.classList.add('evora-open');
    drawerBackdrop.hidden = false;
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Cerrar menú');
    document.body.classList.add('menu-open');
  });

  drawerBackdrop.addEventListener('click', closeMenu);
  mainNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuToggle.focus();
    }
  });

  window.matchMedia('(min-width: 881px)').addEventListener('change', (event) => {
    if (event.matches) {
      closeMenu();
    }
  });
});

document.querySelectorAll('img').forEach((image, index) => {
  image.decoding = 'async';

  if (index > 0 && !image.hasAttribute('loading')) {
    image.loading = 'lazy';
  }
});
