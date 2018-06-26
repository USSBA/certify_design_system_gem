// Tooltips

$(function() {

  var tooltip = 'data-tooltip-text',
      $element_with_tooltip = $('[' + tooltip + ']'),
      transition_class = 'transition';

  // Create Tooltip
  var createToolTip = function(){
    $element_with_tooltip.each(function(){
      var $tooltip_id = "tooltip" + (Math.floor(Math.random()*90000) + 10000),
          tooltip_text = $(this).attr(tooltip);
      $(this).attr("aria-describedby", $tooltip_id);
      $(this).wrap('<span class="sba-c-tooltip__wrapper"></span>');
      $(this).after('<span class="sba-c-tooltip" id="' + $tooltip_id + '" aria-hidden="true" aria-role="tooltip">' + tooltip_text + '</span>');
    });
  };

  var toggleTooltip = function(){
    $element_with_tooltip.on('mouseenter focus', function(){
      var $e = $(this).next();
      $e.attr('aria-hidden', 'false');
      setTimeout(function(){
        $e.addClass(transition_class);
      }, 20);

    });

    $element_with_tooltip.on('mouseleave blur', function(){
      var $e = $(this).next();
      $e.removeClass(transition_class).attr('aria-hidden', 'true');
    });
  }


  createToolTip();
  toggleTooltip();

});
