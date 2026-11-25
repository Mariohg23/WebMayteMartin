document.addEventListener('DOMContentLoaded', () => {
  /* ================= 1. MENÚ HAMBURGUESA (MÓVIL Y TABLET) ================= */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

  function toggleMenu() {
    const isOpen = navMenu.classList.toggle('open');
    hamburgerBtn.classList.toggle('active');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  hamburgerBtn.addEventListener('click', toggleMenu);

  // Cerrar el menú automáticamente al pulsar cualquier enlace One-Page
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Cerrar menú si se hace clic fuera del panel
  document.addEventListener('click', (e) => {
    if (
      navMenu.classList.contains('open') &&
      !navMenu.contains(e.target) &&
      !hamburgerBtn.contains(e.target)
    ) {
      closeMenu();
    }
  });

  /* ================= 2. RESALTADO DE ENLACE ACTIVO AL HACER SCROLL ================= */
  const sections = document.querySelectorAll('section[id]');
  const menuItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSection = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    menuItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  /* ================= 3. VALIDACIÓN Y ENVÍO DEL FORMULARIO ================= */
  const contactForm = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    const privacidad = document.getElementById('privacidad').checked;

    if (!nombre || !telefono || !email || !mensaje) {
      feedback.style.color = '#B03A2E';
      feedback.textContent = 'Por favor, complete todos los campos obligatorios (*).';
      return;
    }

    if (!privacidad) {
      feedback.style.color = '#B03A2E';
      feedback.textContent = 'Debe aceptar la Política de Privacidad antes de enviar la consulta.';
      return;
    }

    // Simulación de envío correcto (listo para conectar a tu backend o servicio de correo)
    feedback.style.color = '#2E7D32';
    feedback.textContent = 'Consulta recibida correctamente. Nos pondremos en contacto con usted a la mayor brevedad.';
    contactForm.reset();
  });

  /* ================= 4. AÑO ACTUAL EN FOOTER Y MODAL LEGAL ================= */
  document.getElementById('current-year').textContent = new Date().getFullYear();

  const modal = document.getElementById('legal-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const closeModalBtn = document.getElementById('modal-close-btn');

  const legalTexts = {
    aviso: {
      title: 'Aviso Legal',
      content: '<p><strong>Titular:</strong> Maite Martín [Apellidos completos]</p><p><strong>Colegiación:</strong> Colegiada n.º [XXXX] del Ilustre Colegio de Abogados de Ávila.</p><p><strong>Domicilio profesional:</strong> P.º Don Carmelo, 18, 1, 05001 Ávila.</p><p>[Espacio reservado para añadir NIF y condiciones generales de uso de la web conforme a la LSSI-CE].</p>'
    },
    privacidad: {
      title: 'Política de Privacidad',
      content: '<p>De conformidad con el Reglamento General de Protección de Datos (RGPD) y la LOPDGDD, los datos facilitados a través del formulario de contacto serán tratados por <strong>Maite Martín</strong> con la única finalidad de atender su consulta jurídica o administrativa.</p><p>Puede ejercer sus derechos de acceso, rectificación, supresión y oposición escribiendo a la dirección postal P.º Don Carmelo, 18, 1, 05001 Ávila o al correo electrónico del despacho.</p>'
    },
    cookies: {
      title: 'Política de Cookies',
      content: '<p>Este sitio web utiliza únicamente cookies técnicas necesarias para su correcto funcionamiento y visualización. En caso de incorporar herramientas de analítica en el futuro, se habilitará el panel de consentimiento previo correspondiente.</p>'
    }
  };

  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const key = trigger.getAttribute('data-modal');
      if (legalTexts[key]) {
        modalTitle.textContent = legalTexts[key].title;
        modalBody.innerHTML = legalTexts[key].content;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
});