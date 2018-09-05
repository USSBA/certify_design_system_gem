$(function() {

  var $notifications_button = $('.sba-js-notifications-toggle'),
      $search_button = $('.sba-js-search-button'),
      $search_input = $('#topnav_search_query'),
      $menu_button = $('#mobile_menu_button'),
      $close_button = $('#close_menu_button'),
      $search_box = $('#topnav-search'),
      $notifications_box = $('#topnav-notifications-drawer'),
      $notifications_drawer = $('.sba-c-notifications-drawer__list'),
      visible_class = 'is-visible';

  // Notification button
  $notifications_button.on('click', function(){
    // Removes the notification pip
    $('.notifications-pip').remove();

    // Hide search if open
    $search_button.attr('aria-expanded', 'false');
    $search_box.attr("hidden", "").addClass(visible_class);

    // Focus on first link
    if ($(this).attr('aria-expanded') == "false") {
      setTimeout(function(){
        $notifications_drawer.focus();
      }, 50);
    }
    return false;
  });

  // Search button options
  $search_button.on('click', function(){

    // Hide the notificiations drawer if open
    $notifications_button.attr('aria-expanded', 'false');
    $notifications_box.attr("hidden", "").addClass(visible_class);

    // Set focus when opening up the search box
    if ($(this).attr('aria-expanded') == "false") {
      setTimeout(function(){
        $search_input.focus();
      }, 50);
    }

    return false;

  });

  // Toggle Menu on mobile
  $menu_button.on('click', function(){
    $close_button.focus();
  });

  $close_button.on('click', function(){
    $menu_button.focus();
  });
});
