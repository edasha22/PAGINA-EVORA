const contactConfig = {
  email: 'happyholasxd@gmail.com',
  address: 'República Federal de Alemania, Chiclayo, Perú',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Rep%C3%BAblica%20Federal%20de%20Alemania%2C%20Chiclayo%2C%20Per%C3%BA',
  socials: {
    Instagram: '',
    Facebook: '',
    Pinterest: ''
  }
};

document.querySelectorAll('[data-contact-value="whatsapp"]').forEach((element) => {
  element.textContent = 'No disponible por ahora.';
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
  link.hidden = true;
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
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const status = form.querySelector('.form-status');
    const submitButton = form.querySelector('[type="submit"]');
    const formData = new FormData(form);
    const formType = form.dataset.contactForm;
    const formSubjects = {
      cotizacion: 'Nueva solicitud de cotización',
      cita: 'Nueva solicitud de cita',
      contacto: 'Nuevo mensaje de contacto'
    };

    formData.set('access_key', '09b3acfc-da76-4c16-9cb7-db86e6c27b4d');
    formData.set('subject', formData.get('asunto') || formSubjects[formType] || 'Nuevo mensaje desde ÉVORA');
    formData.set('email', formData.get('correo'));
    const formPayload = Object.fromEntries(formData.entries());

    status.classList.add('is-visible');
    status.classList.remove('is-success', 'is-error');
    status.textContent = 'Enviando tu mensaje...';
    submitButton.disabled = true;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(formPayload)
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'El servicio no pudo procesar el formulario.');
      }

      status.textContent = 'La entrega Del Mensaje puede tardar unos minutos, pero se ha enviado correctamente. Gracias por contactarnos.';
      status.classList.add('is-success');
      form.reset();
    } catch (error) {
      status.textContent = error instanceof TypeError
        ? 'No se pudo conectar con el servicio de envío. Revisa tu conexión e inténtalo de nuevo.'
        : `No se pudo enviar el mensaje. ${error.message || 'Inténtalo de nuevo más tarde.'}`;
      status.classList.add('is-error');
    } finally {
      submitButton.disabled = false;
    }
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
