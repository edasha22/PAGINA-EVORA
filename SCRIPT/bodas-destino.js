const gallery = document.querySelector('#galeria-grid');
const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');

if (gallery && filterButtons.length > 0) {
  const galleryItems = gallery.querySelectorAll('[data-categoria]');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((filterButton) => {
        const isSelected = filterButton === button;
        filterButton.classList.toggle('btn-primary', isSelected);
        filterButton.classList.toggle('btn-secondary', !isSelected);
        filterButton.setAttribute('aria-pressed', String(isSelected));
      });

      galleryItems.forEach((item) => {
        item.hidden = selectedFilter !== 'todos'
          && item.dataset.categoria !== selectedFilter;
      });
    });
  });
}