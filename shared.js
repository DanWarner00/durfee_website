// Mobile nav + accessibility helpers — Durfee Plumbing & Heating
(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.menu-toggle');
  if (header && toggle) {
    toggle.addEventListener('click', function () {
      var open = header.getAttribute('data-open') === 'true';
      header.setAttribute('data-open', open ? 'false' : 'true');
      toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  }

  // Gallery filtering (only runs if present)
  var filterButtons = document.querySelectorAll('[data-filter]');
  var projectCards = document.querySelectorAll('[data-category]');
  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cat = btn.getAttribute('data-filter');
        filterButtons.forEach(function (b) {
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
        projectCards.forEach(function (card) {
          var match = cat === 'all' || card.getAttribute('data-category') === cat;
          card.style.display = match ? '' : 'none';
        });
      });
    });
  }

  // Contact form: pseudo-validate + show confirmation
  var form = document.querySelector('[data-quote-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('[data-form-status]');
      var name = form.querySelector('[name="name"]').value.trim();
      var phone = form.querySelector('[name="phone"]').value.trim();
      if (!name || !phone) {
        if (status) {
          status.textContent = 'Please add your name and phone number so we can call you back.';
          status.dataset.state = 'error';
        }
        return;
      }
      if (status) {
        status.textContent = "Got it, " + name.split(' ')[0] + ". We'll call you back within an hour during business hours.";
        status.dataset.state = 'ok';
      }
      form.reset();
    });
  }
})();
