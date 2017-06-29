# jQuery Form Element Value

## Overview

This is a jQuery Plugin that standardizes the values for all of the different HTML elements you can put in a form. I made this because I got tired of writing code to test if an element was a checkbox, a text field, a dropdown, or -- heaven help us -- a textarea. What I want is a function that tells me four things about the element:

1. Name.
2. Type. For input elements this is the `type` attribute, however, for elements like textarea it is the name of the element.
3. Original value. I.e. the value that the element had at page load.
4. Current value.

## Installation

## Usage



## Background

The need for Form Element Value comes from the fact that `el.val()` and `el.prop('value')` are not the same for text inputs and checkboxes. The `val()` function doesn't work at all for select elements (it only Additionally `el.defaltValue` only works for textareas and text inputs, but not selects, checkboxes, or radios. It would be great if there was a function that consistently returned the "real" value for everything matched by the jQuery ':input' selector. E.g. `$(':input').val()` should return something for checkbox and text inputs.

I think a lot of the weirdness comes from the HTML5 specification. HTML serves the purpose of organizing things on a screen and conveying information to a human user. It doesn't care as much about standardizing attributes and properties. Especially for AJAX scripts that are sending data to a backend database, this lack of standardization can be a big problem.

### Existing (partial) solutions

The jQuery Form plugin has a function called [fieldValue](https://github.com/jquery-form/form#fieldvalue) that does a good job handling selects and all (most?) types of inputs. However it doesn't deal with buttons or textareas.

### Digging in to the HTML5 specification

The [HTML5 spec for form elements](https://www.w3.org/TR/html52/sec-forms.html#form-categories) starts with this disclaimer: "Mostly for historical reasons, elements in this section fall into several overlapping (but subtly different) categories..." That sounds like an understated way to say that form elements are going to be confusing and quirky, which, as it turns out, is exactly the problem.

Here is the list of the different categories:

1. Form-associated elements
2. Listed elements
3. Submittable elements
4. Resettable elements
5. Reassociateable elements
6. Labelable elements

The jQuery `:input` selector ([jQuery Docs](https://api.jquery.com/input-selector/)) matches four elements:

1. input
2. textarea
3. select
4. button

That particular set of elements is not exactly represented by any of the 6 categories of form elements in the HTML5 spec. The "submittable" category comes the closest I think. I am going to start off this project by working on all the elements in the [submittable](https://www.w3.org/TR/html52/sec-forms.html#submittable-element) category:

1. button
2. input
3. keygen
4. object
5. select
6. textarea

(Maybe leaving out keygen and object for now because I don't use them and jQuery `:input` doesn't match them anyway.)




