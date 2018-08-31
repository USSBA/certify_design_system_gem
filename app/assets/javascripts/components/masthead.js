$(document).ready(function() {
  var $open = $('.sba-c-mobile-header__button'),
      $close = $('.sba-c-topnav__close'),
      $nav = $('#top_navigation'),
      visible_class = "is-visible";

  $open.on('click', function(){
    $nav.addClass(visible_class)
  });

  $close.on('click', function(){
    $nav.removeClass(visible_class)
  });
});
