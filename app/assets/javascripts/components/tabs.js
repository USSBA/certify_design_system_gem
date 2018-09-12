/**
 * Tabs
 *
 */

$(function() {
  // Define Variables
  var $tabset = $('.sba-js-tabs'),
      $tab_button = $('.sba-js-tabs .sba-c-tabs__link'),
      $tab_content = $('.sba-c-tabs__tab-content'),
      current_class= 'current',
      visible_class = 'is-visible',
      tabset_prefix = 'tabset';

  // Create tab functionality
  $tabset.each(function(i, el) {
    el = $(el);
    tabset_id = tabset_prefix + i;

    // Assign id to tabset
    el.attr('id', tabset_id);

    var $tab_box = el.find($tab_content),
        $tabs = el.find($tab_button);

    // Assign unique ID to each tab content box
    $tab_box.each(function(i, el){
      el = $(el);
      el.attr('id', tabset_id + "_tab" + i);
    });

    // Create tab controls
    $tabs.each(function(i, el){
      el = $(el);
      el
        .attr('aria-controls', tabset_id + "_tab" + i)
        .attr('aria-expanded', 'false');
    });

    // Make first tab content visisble
    $tab_box
      .eq(0)
      .addClass(visible_class);

    // Add current class and aria-expanded="true" to first tab
    $tabs
      .eq(0)
      .attr('aria-expanded', 'true')
      .addClass(current_class);
  });

  // Click actions for tab
  $tab_button.on('click', function(){
    // Define variables within current tabset
    var $this_tabset = $(this).closest($tabset),
        $this_tabsets_tabs = $($this_tabset).find($tab_button),
        this_tabs_content_id = "#" + $(this).attr('aria-controls'),
        $this_tabs_content = $(this_tabs_content_id);

    // Deactivate all tabs in current tabset
    $this_tabsets_tabs
      .removeClass(current_class)
      .attr('aria-expanded', 'false');
    $this_tabset
      .find($tab_content)
      .removeClass(visible_class);

    // Activate current tab
    $(this)
      .addClass(current_class)
      .attr('aria-expanded', 'true');

    // Show tab content
    $this_tabs_content.addClass(visible_class);

    return false;
  });

});
