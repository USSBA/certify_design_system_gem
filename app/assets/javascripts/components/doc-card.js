$(document).ready(function(){
  var $doc_toggle = $('.sba-c-doc__toggle')

  $doc_toggle.on('click', function() {

    // Determine which document we clicked on
    toggle = $(this)
    elem = $(this).attr("aria-controls")

    var $target = $("#" + elem);
    $target.toggle();

    if ( toggle.attr('aria-expanded') === 'false' ) {
      toggle.attr("aria-expanded","true");
      toggle.children('svg').css({'transform': 'rotate(180deg)'})
    } else {
      toggle.attr("aria-expanded","false");
      toggle.children('svg').css({'transform': 'rotate(0deg)'})
    }
  });
});
