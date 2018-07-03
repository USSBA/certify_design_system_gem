$(document).ready(function(){

  // Toggle cards to show/hide details
  var $doc_toggle = $('.sba-c-card__toggle'),
      active_class = 'is-activated';

  $doc_toggle.on('click', function() {

    // Determine which document we clicked on
    toggle = $(this)
    elem = $(this).attr("aria-controls")

    var $target = $("#" + elem);
    $target.toggle();

    if ( toggle.attr('aria-expanded') === 'false' ) {
      toggle.attr("aria-expanded","true");
      toggle.addClass(active_class);
    } else {
      toggle.attr("aria-expanded","false");
      toggle.removeClass(active_class);
    }
  });

});
