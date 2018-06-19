/**
 * jQuery UI Calendar picker
 *
 * Usage:
 * Works on any <input class="js-calendar">
 *
 */

$(document).ready(function(){
  var $calendar_picker = $( ".js-calendar-picker" );

  if ($calendar_picker.length > 0) {
    $calendar_picker.datepicker({
      beforeShow: function( input, inst){
        $(inst.dpDiv).addClass('sba-c-calendar-picker');
      },
      dateFormat: 'mm/dd/yy',
      onSelect: function(date) {
        $(this).trigger("blur")
      },
      changeYear: true
    });
  }
});
