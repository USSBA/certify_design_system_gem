$(function() {

  var $notifications_button = $('.sba-js-notifications-toggle'),
      $search_button = $('.sba-js-search-button'),
      $search_input = $('#topnav_search_query'),
      $menu_button = $('#mobile_menu_button'),
      $close_button = $('#close_menu_button');

  $notifications_button.on('click', function(){
    // Removes the notification pip
    $('.notifications-pip').remove();
  });

  $search_button.on('click', function(){
    // Set focus when opening up the search box
    if ($(this).attr('aria-expanded') == "false") {
      setTimeout(function(){ $search_input.focus(); }, 50);
      return false;
    }
  });

  // Toggle Menu on mobile
  $menu_button.on('click', function(){
    $close_button.focus();
  });
  
  $close_button.on('click', function(){
    $menu_button.focus();
  });
});
