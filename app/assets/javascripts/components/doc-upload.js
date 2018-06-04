window.CDS = {
  docUpload: function (){
    // Variables
    var $doc_upload_toggle = $('.sba-c-doc-upload__toggle'),
        $doc_upload_use_toggle = $('.sba-c-doc-upload__use-toggle'),
        hidden_class = "hidden",
        open_class = "is-open",
        visible_class = "is-visible";

    // Function for handling doc upload
    $doc_upload_toggle.on('click', function() {
      // Determine which task panel we clicked on
      elem = $(this).attr("aria-controls")
      var $toggle = $('button[aria-controls=' + elem + ']');
      var $cancel = $('button[aria-controls=' + elem + '-cancel]');
      var $target = $("#" + elem);

      // Toggle doc uploader
      if ($toggle.attr("aria-expanded") === "false") {
        $toggle.attr("aria-expanded", "true");
        $toggle.addClass(hidden_class);
        $target.parent().addClass(open_class);
        $target.addClass(visible_class);
      }

      // Toggle cancel
      $cancel.on('click', function() {
        $toggle.attr("aria-expanded", "false");
        $toggle.removeClass(hidden_class);
        $target.parent().removeClass(open_class);
        $target.removeClass(visible_class);
      })
    });

    // Function for handling previously uploaded custom docs
    $doc_upload_use_toggle.on('click', function() {
      elem = $(this).attr("aria-controls");
      var $container = $(this).parent().parent();
      var $cancel = $('button[aria-controls=' + elem + '-cancel]');
      var $target = $("#" + elem);

      // Toggle next step
      $container.toggle();
      $target.toggle();

      // Toggle cancel
      $cancel.on('click', function() {
        if ( $container.is(':visible') == false ){
          $container.toggle();
          $target.toggle();
        }
      })
    });
  }
}

$(document).ready( CDS.docUpload );
