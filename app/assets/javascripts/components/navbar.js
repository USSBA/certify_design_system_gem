$(function() {

  var $notifications_button = $('.sba-js-notifications-toggle'),
      $search_button = $('.sba-js-search-button'),
      $search_input = $('#topnav_search_query'),
      $menu_button = $('#mobile_menu_button'),
      $close_button = $('#close_menu_button'),
      $search_box = $('#topnav-search'),
      $notifications_box = $('#topnav-notifications-drawer'),
      $notifications_drawer = $('.sba-c-top-nav__notifications-drawer__list'),
      $nav_open_button = $('.sba-c-mobile-header__button'),
      $nav_close_button = $('.sba-c-topnav__close'),
      $nav = $('#top_navigation'),
      visible_class = 'is-visible';

  // Functions
  var hideItems = function($button, $box){
    $button.attr('aria-expanded', 'false');
    $box.attr("hidden", "").addClass(visible_class);
  };

  var setFocus = function($this, $target){
    if ($this.attr('aria-expanded') == "false") {
      setTimeout(function(){
        $target.focus();
      }, 50);
    }
  }

  // Notification button
  $notifications_button.on('click', function(){
    // Removes the notification pip
    $('.sba-js-notifications-pip').remove();

    // Hide search if open
    hideItems($search_button, $search_box);

    // Focus on first link
    setFocus($(this), $notifications_drawer);
    return false;
  });

  // Search button options
  $search_button.on('click', function(){

    // Hide the notificiations drawer if open
    hideItems($notifications_button, $notifications_box);

    // Set focus when opening up the search box
    setFocus($(this), $search_input);

    return false;

  });

  // Nav open and close
  $nav_open_button.on('click', function(){
    $nav.addClass(visible_class);
    hideItems($search_button, $search_box);
    hideItems($notifications_button, $notifications_box);
  });

  $nav_close_button.on('click', function(){
    $nav.removeClass(visible_class);
    hideItems($search_button, $search_box);
    hideItems($notifications_button, $notifications_box);
  });

  // Toggle Menu on mobile
  $menu_button.on('click', function(){
    $close_button.focus();
  });

  $close_button.on('click', function(){
    $menu_button.focus();
  });
});
