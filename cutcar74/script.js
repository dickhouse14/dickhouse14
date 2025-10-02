document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('primary-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('open');
    });
  }

  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href.length <= 1) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (menu && menu.classList.contains('open')) {
        menu.classList.remove('open');
        toggle?.setAttribute('aria-expanded', 'false');
      }
    });
  });

  const forms = ['quick-form', 'order-form', 'contact-form'];
  forms.forEach((id) => {
    const form = document.getElementById(id);
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton?.textContent;
      if (submitButton) submitButton.textContent = 'Отправляем...';
      const data = Object.fromEntries(new FormData(form));

      try {
        // Placeholder: send to Telegram bot or backend here
        await new Promise((r) => setTimeout(r, 700));
        alert('Спасибо! Заявка отправлена. Мы свяжемся с вами.');
        form.reset();
      } catch (err) {
        console.error(err);
        alert('Не удалось отправить заявку. Попробуйте позже.');
      } finally {
        if (submitButton && originalText) submitButton.textContent = originalText;
      }
    });
  });
});