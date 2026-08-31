(function () {
  document.querySelectorAll('.main-page-card').forEach(function (card) {
    card.addEventListener('pointermove', function (event) {
      var rect = card.getBoundingClientRect();
      card.style.setProperty('--pointer-x', ((event.clientX - rect.left) / rect.width * 100) + '%');
    });
  });
})();
