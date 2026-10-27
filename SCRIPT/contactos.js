const contactConfig = {
  whatsappPhone: '',
  email: '',
  address: '',
  mapUrl: '',
  socials: {
    Instagram: '',
    Facebook: '',
    Pinterest: ''
  }
};

const whatsappUrl = contactConfig.whatsappPhone
  ? `https://wa.me/${contactConfig.whatsappPhone.replace(/\D/g, '')}`
  : '';

document.querySelectorAll('[data-contact-value="whatsapp"]').forEach((element) => {
  if (whatsappUrl) {
    element.textContent = `Atención directa al ${contactConfig.whatsappPhone}.`;
  }
});

document.querySelectorAll('[data-contact-value="email"]').forEach((element) => {
  if (contactConfig.email) {
    element.textContent = contactConfig.email;
  }
});

document.querySelectorAll('[data-contact-value="address"]').forEach((element) => {
  if (contactConfig.address) {
    element.textContent = contactConfig.address;
  }
});

document.querySelectorAll('[data-contact-link="map"]').forEach((link) => {
  if (contactConfig.mapUrl) {
    link.href = contactConfig.mapUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.hidden = false;
  }
});

document.querySelectorAll('[data-contact-link="whatsapp"]').forEach((link) => {
  if (whatsappUrl) {
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', 'Contactar por WhatsApp');

    if (link.classList.contains('detail-link')) {
      link.hidden = false;
    }
  }
});

document.querySelectorAll('[data-contact-link="email"]').forEach((link) => {
  if (contactConfig.email) {
    link.href = `mailto:${contactConfig.email}`;
    link.hidden = false;
  }
});

const socialLinksContainer = document.querySelector('[data-social-links]');
const socialPendingMessage = document.querySelector('[data-contact-value="social"]');
const configuredSocials = Object.entries(contactConfig.socials)
  .filter(([, url]) => url);

if (socialLinksContainer && configuredSocials.length > 0) {
  configuredSocials.forEach(([name, url]) => {
    const link = document.createElement('a');
    link.href = url;
    link.textContent = name;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    socialLinksContainer.append(link);
  });

  socialPendingMessage.hidden = true;
}

document.querySelectorAll('[data-contact-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const status = form.querySelector('.form-status');
    status.textContent = 'Tus datos pasaron la validación del navegador, pero todavía no se enviaron. El equipo debe conectar el CRM para activar este formulario.';
    status.classList.add('is-visible');
  });
});

const appointmentDate = document.querySelector('#appointment-date');

if (appointmentDate) {
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
  appointmentDate.min = localToday;
}
