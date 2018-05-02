$(document).ready(function() {
  var $parent_facet = $('.sba-c-facet-set input[type="checkbox"][data-follow-up]'),
      $child_facet = $parent_facet.siblings('.sba-c-follow-up').find('input[type="checkbox"]'),
      indeterminate_class = "sba-c-checkbox--indeterminate";


  // Check for applying 'indeterminate' class
  $child_facet.on('change', function() {
    var $the_parent = $(this).closest('.sba-c-follow-up').prevAll('input[type="checkbox"]'),
        $the_siblings = $the_parent.siblings('.sba-c-follow-up').find('input[type="checkbox"]'),
        $the_siblings_checked = $the_siblings.filter(':checked');

    if ( ($the_siblings_checked.length > 0) && ($the_siblings_checked.length < $the_siblings.length)) {
      $the_parent.addClass(indeterminate_class);
    }
    else {
      $the_parent.removeClass(indeterminate_class);
    }
  });

  // Uncheck all children if a parent is unchecked
  $parent_facet.on('change',function(){
    var $these_children = $(this).siblings('.sba-c-follow-up').find('input[type="checkbox"]');
    if ($(this).prop('checked') == false ) {
      $these_children.prop('checked', false);
    }
    $(this).removeClass(indeterminate_class);
  });

});
