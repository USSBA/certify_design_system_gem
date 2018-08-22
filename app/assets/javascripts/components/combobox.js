$(function() {

  if (typeof jQuery.ui !== 'undefined'){
        $.widget( "custom.combobox", {
          _create: function() {
            this.wrapper = $( "<span>" )
              .addClass( "sba-c-combobox__wrapper" )
              .insertAfter( this.element );

            this.element.hide();
            this._createAutocomplete();
            this._createShowAllButton();
          },

          _createAutocomplete: function() {
            var selected = this.element.children( ":selected" ),
              value = selected.val() ? selected.text() : "";

            this.input = $( "<input>" )
              .appendTo( this.wrapper )
              .val( value )
              .attr({
                title: "",
                "aria-label": "Start typing to filter",
                "id": "combobox_" + this.element[0].id,
                "name": "combobox_" + this.element[0].name,
                "placeholder": "Start typing…"
              })
              .addClass( "sba-c-combobox__input ui-widget ui-widget-content ui-state-default ui-corner-left sba-c-input" )
              .autocomplete({
                delay: 0,
                minLength: 0,
                source: $.proxy( this, "_source" )
              })
              //.tooltip({
              //  classes: {
              //    "ui-tooltip": "ui-state-highlight"
              //  }
              //})
              ;

            this._on( this.input, {
              autocompleteselect: function( event, ui ) {
                ui.item.option.selected = true;
                this._trigger( "select", event, {
                  item: ui.item.option
                });
              },

              autocompletechange: "_removeIfInvalid"
            });
          },

          _createShowAllButton: function() {
            var input = this.input,
              wasOpen = false;

            $( "<a>" )
              .attr( "tabIndex", -1 )
              .attr( "title", "Show All Items" )
              //.tooltip()
              .appendTo( this.wrapper )
              .button({
                text: false,
                label: "Show options"
              })
              .removeClass( "ui-corner-all" )
              .addClass( "sba-c-combobox__toggle ui-corner-right" )
              .on( "mousedown", function() {
                wasOpen = input.autocomplete( "widget" ).is( ":visible" );
              })
              .on( "click", function() {
                input.trigger( "focus" );

                // Close if already visible
                if ( wasOpen ) {
                  return;
                }

                // Pass empty string as value to search for, displaying all results
                input.autocomplete( "search", "" );
              });
          },

          _source: function( request, response ) {
            var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
            response( this.element.children( "option" ).map(function() {
              var text = $( this ).text();
              if ( this.value && ( !request.term || matcher.test(text) ) )
                return {
                  label: text,
                  value: text,
                  option: this
                };
            }) );
          },

          _removeIfInvalid: function( event, ui ) {

            // Selected an item, nothing to do
            if ( ui.item ) {
              return;
            }

            // Search for a match (case-insensitive)
            var value = this.input.val(),
              valueLowerCase = value.toLowerCase(),
              valid = false;
            this.element.children( "option" ).each(function() {
              if ( $( this ).text().toLowerCase() === valueLowerCase ) {
                this.selected = valid = true;
                return false;
              }
            });

            // Found a match, nothing to do
            if ( valid ) {
              return;
            }

            // Remove invalid value
            this.input
              .val( "" )
              .attr( "title", value + " didn't match any item" )
              //.tooltip( "open" );
            this.element.val( "" );
            this._delay(function() {
              this.input.tooltip( "close" ).attr( "title", "" );
            }, 12500 );
            this.input.autocomplete( "instance" ).term = "";
          },

          _destroy: function() {
            this.wrapper.remove();
            this.element.show();
          }
        });

        $.extend($.ui.autocomplete.prototype.options, {
          open: function(event, ui) {
            $(this).autocomplete("widget").addClass("sba-c-autosuggest").css({
                    "width": ($(this).width() + "px")
                });
            }
        });
      }
  });
