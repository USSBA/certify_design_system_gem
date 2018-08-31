$(document).ready(function() {
  var $trigger = $('.sba-js-visibility-trigger'),
      visible_class = "is-visible";

  $trigger.on('click', function(){
    var target = "#" + $(this).attr('aria-controls');
    if ($(this).attr("aria-expanded") === "false" ) {
      $(this).attr("aria-expanded", "true");
      $(target).removeAttr("hidden").addClass(visible_class);
    }
    else {
      $(this).attr("aria-expanded", "false");
      $(target).attr("hidden", "").removeClass(visible_class);
    }
    return false;
  });
});
