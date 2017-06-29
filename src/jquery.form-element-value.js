/*!
 * jQuery Form Element Value
 * version: 0
 * Requires jQuery 2ish ?
 * Project repository: https://github.com/mattmoehr/jquery-form-element-value
 * Copyright stuff
 * License stuff
 */


(function ( $ ) {

  $.fn.feValue = function() {

    this.feValue = {};
    this.feValue.name = null;
    this.feValue.type = null;
    this.feValue.currentValue = null;
    this.feValue.originalValue = null;

    if ( this.is('select') ){

      this.feValue.name = $(this).attr('name');
      this.feValue.type = 'select';
      this.feValue.currentValue = $(this).val();
      // this does not work for multi-selects
      var all_options = $(this).find('option');
      var default_selected = '';
      $.each(all_options, function(){
        if ( $(this).prop('defaultSelected') ) {
          default_selected = $(this).val();
        }
      });
      this.feValue.originalValue = default_selected;

    } else if ( this.is('textarea') ){

      this.feValue.name = $(this).attr('name');
      this.feValue.type = 'textarea';
      this.feValue.originalValue = $(this).text();
      this.feValue.currentValue = $(this).prop('value');

    } else if ( this.is('button') ) {

      this.feValue.name = $(this).attr('name');
      this.feValue.type = 'button';
      this.feValue.originalValue = 0;
      this.feValue.currentValue = 1;

    } else if (this.is('input') ) {
      this.feValue.name = $(this).attr('name') ? $(this).attr('name') : $(this).id;
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
            this.feValue.currentValue = $(this)[0].id;
            // loop through all members of this radio button group
            var all_radios = $('[name=' + this.feValue.name + ']');
            var default_selected = '';
            $.each(all_radios, function(){
              if ( $(this)[0].defaultChecked ) {
                default_selected = $(this)[0].id;
              }
            });
            this.feValue.originalValue = default_selected;
            break;
          case 'checkbox':
            if ( !this.feValue.name ){
              this.feValue.name = $(this).text();
            }
            this.feValue.currentValue = $(this).prop('checked') ? 1 : 0;
            this.feValue.originalValue = $(this)[0].defaultChecked ? 1 : 0;
            break;
          case 'submit':
          case 'button':
            this.feValue.currentValue = 1;
            this.feValue.originalValue = 0;
            break;
          default:
            input.value = object.prop('value');
            break;

        }
      } // end if type exists
    }

    return this.feValue;
  };
 
}( jQuery ));