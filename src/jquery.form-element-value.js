/*!
 * jQuery Form Element Value
 * version: 0
 * Requires jQuery 2ish ?
 * Project repository: https://github.com/mattmoehr/jquery-form-element-value
 * Copyright stuff
 * License stuff
 */


(function ( $ ) {

  $.fn.feValue = function( options ) {
    console.log(options);

    // TODO pass in options for some defaults:
    // TODO default values for checkboxes and radios
    // TODO default value for buttons
    // TODO if element.name is missing should we use id?
    var opt = $.extend({
                        checkbox_yes: 1,
                        checkbox_no: 0,
                        button_original: $(this).val(),
                        button_clicked: 1,
                        guaranty_name: true
                        },
                       options
                       );

    this.feValue = {};
    this.feValue.name = null;
    this.feValue.type = null;
    this.feValue.currentValue = null;
    this.feValue.originalValue = null;

    if ( this.is('select') ){

      this.feValue.name = $(this).attr('name');
      this.feValue.type = 'select';
      this.feValue.currentValue = $(this).val();
      var all_options = $(this).find('option');

      var default_selected;
      if ( $(this).attr('multiple') ){
        default_selected = [];
        $.each(all_options, function(index, this_option){
          if ( $(this_option).prop('defaultSelected') ) {
            default_selected.push($(this_option).val());
          }
        });
      } else {
        default_selected = '';
        $.each(all_options, function(index, this_option){
          if ( $(this_option).prop('defaultSelected') ){
            default_selected = $(this_option).val();
          }
        })
      }
      this.feValue.originalValue = default_selected;

    } else if ( this.is('textarea') ){

      this.feValue.name = $(this).attr('name');
      this.feValue.type = 'textarea';
      this.feValue.originalValue = $(this).text();
      this.feValue.currentValue = $(this).prop('value');

    } else if ( this.is('button') ) {

      this.feValue.name = $(this).attr('name');
      this.feValue.type = 'button';
      this.feValue.originalValue = opt.button_original;
      this.feValue.currentValue = opt.button_clicked;

    } else if (this.is('input') ) {
      this.feValue.name = $(this).attr('name');
      this.feValue.type = $(this).attr('type');

      if ( this.feValue.type ) {
        switch ( this.feValue.type ) {
          case 'hidden':
          case 'text':
          case 'search':
          case 'tel':
          case 'url':
          case 'email':
          case 'password':
          case 'number':
          case 'range':
          case 'color':
          case 'date':
          case 'datetime-local':
          case 'time':
          case 'file':
          case 'image':
            this.feValue.currentValue = $(this).prop('value');
            this.feValue.originalValue = $(this)[0].defaultValue;
            break;
          case 'radio':
            this.feValue.currentValue = $.fn.feValue.getRadioCurrent($(this)[0]);
            // loop through all members of this radio button group
            var all_radios = $('input[name="' + this.feValue.name + '"]');
            this.feValue.originalValue = $.fn.feValue.getRadioOriginal(all_radios);
            break;
          case 'checkbox':
            if ( !this.feValue.name ){
              this.feValue.name = $(this).text();
            }
            this.feValue.currentValue = $(this).prop('checked') ? opt.checkbox_yes : opt.checkbox_no;
            this.feValue.originalValue = $(this)[0].defaultChecked ? opt.checkbox_yes : opt.checkbox_no;
            break;
          case 'submit':
          case 'button':
            this.feValue.currentValue = opt.button_clicked;
            this.feValue.originalValue = opt.button_original;
            break;
          default:
            input.value = object.prop('value');
            break;
        }
      } else {
        this.feValue.type = 'unknown';
        this.feValue.currentValue = $(this).prop('value');
        this.feValue.originalValue = $(this)[0].defaultValue;
      }// end if type exists
    } // end else ifs for select, textarea, button, input

    // TODO if this.feValue.name is blank then we can default to using the element's id and if that fails we assign a name based on the input type and a sequential number

    return this.feValue;
  };

  $.fn.feValue.getRadioOriginal = function( radios ){
    var default_selected = '';
    $.each(radios, function(index, this_radio){
      console.log(this_radio);
      if ( this_radio.defaultChecked ) {
        default_selected = this_radio.id;
      }
    });
    return default_selected;
  };

  $.fn.feValue.getRadioCurrent = function( radio ){
    return radio.id;
  };
 
}( jQuery ));