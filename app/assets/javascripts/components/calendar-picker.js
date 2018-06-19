/**
 * jQuery UI Calendar picker
 *
 * Usage:
 * Works on any <input class="js-calendar">
 *
 */

$(document).ready(function(){
  var $calendar_picker = $( ".js-calendar" );

  if ($calendar_picker.length > 0) {
    $( ".js-calendar" ).datepicker({
      dateFormat: 'mm/dd/yy',
      onSelect: function(date) {
        $(this).trigger("blur")
      },
      changeYear: true
    });
  }
});
