# Popupwin v.3

## jQuery plugin to realization pop-ups windows.
## Плагин для реализации всплывающих окон.

~~~~{.css}
  #id-popup {
    display: none;
  }
~~~~

### Quickstart

~~~~{.html}
  <a href="#id-popup" id="link">Link</a>
  <div id="id-popup">
    Content...
  </div>
~~~~
~~~~{.js}
  $('#link').popupwin();
~~~~

or:
~~~~{.html}
  <a href="#" id="link">Link</a>
  <div id="id-popup">
    Content...
  </div>
~~~~
~~~~{.js}
  $('#link').popupwin({
    pwinBlock: '#id-popup'
  });
~~~~

### Callbacks

~~~~{.html}
  <a href="#id-popup" id="link">Link</a>
  <div id="id-popup">
    Content...
  </div>
~~~~
~~~~{.js}
  $('#link').popupwin({
    callbackOpen: function(popup, link){
      alert('open');
    },
    callbackClose: function(popup, link){
      alert('close');
    }
  });
~~~~

### and...

~~~~{.html}
  <a href="#id-popup" id="link">Link</a>
  <div id="id-popup">
    Content...
  </div>
~~~~
~~~~{.js}
  $('#id-popup').popupwin('open', {
    pwinBack: '#ff0000'
  });
  $('#id-popup').popupwin('center');
~~~~
Open a window when the page loads.

### All settings
* `pwinBlock` (string/object or false).
By default: false. See example.
* `pwinClose` (string).
Selector element within `pwinBlock`. 
By default: '.close'
* `pwinBack` (string).
Background color.
By default: '#000'.
* `pwinOpacity` (float).
Opacity background.
By default: 0.3.
* `pwinSpeed` (integer).
Animation speed.
By default: 400.
* `callbackOpen` (callback).
* `callbackClose` (callback).