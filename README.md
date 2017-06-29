# jQuery Form Element Value

## Overview

This is a jQuery Plugin that standardizes the values for all of the different HTML elements you can put in a form. I made this because I got tired of writing code to test if an element was a checkbox, a text field, a dropdown, or -- heaven help us -- a textarea. What I want is a function that tells me four things about the element:

1. Name.
2. Type. For input elements this is the `type` attribute, however, for elements like textarea it is the name of the element.
3. Original value. I.e. the value that the element had at page load.
4. Current value.

## Background

The need for Form Element Value comes from the fact that `el.val()` and `el.prop('value')` are not the same for text inputs and checkboxes. Additionally `el.defaltValue` only works for textareas and text inputs, but not selects, checkboxes, or radios.

I think a lot of the weirdness comes from the HTML spec. HTML serves the purpose of organizing things on a screen and conveying information to a human user. It doesn't care as much about standardizing attributes and properties. Especially for AJAX scripts that are sending data to a backend database, this lack of standardization can be a big problem.

### Existing (partial) solutions

The jQuery Form plugin has a function called [fieldValue](https://github.com/jquery-form/form#fieldvalue) that does a good job handling selects and all (most?) types of inputs. However it doesn't deal with buttons or textareas.



## submittable elements

https://www.w3.org/TR/html5/forms.html#category-submit

1. button
2. input (text, checkbox, radio, ...)
3. keygen
4. object
5. select
6. textarea
