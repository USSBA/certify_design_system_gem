$(document).ready(function(){
  // Variables
  var $doc_upload_toggle = $('.sba-c-doc-upload__toggle'),
      $doc_upload_cancel = $('.sba-c-doc-upload__cancel'),
      open_class = "open",
      visible_class = "visible",
      hidden_class = "hidden";

  // Function for handling doc upload
  $doc_upload_toggle.on('click', function(){

    // Determine which task panel we clicked on
    elem = $(this).attr("aria-controls")
    var $toggle = $('button[aria-controls=' + elem + ']');
    var $target = $("#" + elem);

    // Toggle doc uploader
    if ($toggle.attr("aria-expanded") === "false") {
      $toggle.attr("aria-expanded", "true");
      $toggle.addClass(hidden_class);
      $target.parent().addClass(open_class);
      $target.addClass(visible_class);
    }

    // Toggle cancel
    $doc_upload_cancel.on('click', function() {
      $toggle.attr("aria-expanded", "false");
      $toggle.removeClass(hidden_class);
      $target.parent().removeClass(open_class);
      $target.removeClass(visible_class);
    })

  });

});
