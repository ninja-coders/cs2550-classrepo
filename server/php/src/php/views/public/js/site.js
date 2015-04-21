function setActivePage(page) {
  $('.article-nav-item').removeClass('active');
  $('#nav-' + page).addClass('active');
}
