$(document).ready(function(){

  // Toggle cards to show/hide details
  var $doc_toggle = $('.sba-c-card__toggle'),
      active_class = 'is-activated',
      hidden_attribute = 'hidden';

  $doc_toggle.on('click', function() {

    // Determine which document we clicked on
    toggle = $(this)
    elem = $(this).attr("aria-controls")

    var $target = $("#" + elem);


    if ( toggle.attr('aria-expanded') === 'false' ) {
      toggle
        .attr("aria-expanded","true")
          .addClass(active_class);
      $target.removeAttr(hidden_attribute);
    } else {
      toggle
        .attr("aria-expanded","false")
          .removeClass(active_class);
      $target.attr(hidden_attribute, "");
    }
  });

});
