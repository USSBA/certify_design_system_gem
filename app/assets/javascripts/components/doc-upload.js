$(document).ready(function(){
  // Variables
  var $doc_upload_toggle = $('.sba-c-doc-upload__toggle'),
      $doc_upload_content = $('.sba-c-doc-upload__content'),
      open_class = "open",
      // transition_class = "in-transition",
      visible_class = "visible";

  // Function for handling doc upload
  $doc_upload_toggle.on('click', function(){

    // Determine which task panel we clicked on
    var $target = $("#" + $(this).attr("aria-controls"));

    // Toggle doc uploader
    if ($(this).attr("aria-expanded") === "false") {
      $(this).attr("aria-expanded", "true");
      $target.parent()
        .addClass(open_class);
      $target.addClass(visible_class);
    }
    else {
      $(this).attr("aria-expanded", "false");
      $target.parent()
        .removeClass(open_class);
      $target.removeClass(visible_class);
    }


  });

});
