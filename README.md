# Popupwin v.3

jQuery plugin to realization pop-ups windows.

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
По умолчанию: false. См. пример.
* `pwinClose` (string).
Селектор на элемент внутри `pwinBlock`. 
По умолчанию: '.close'
* `pwinBack` (string).
Цвет фонаю
По умолчанию: '#000'.
* `pwinOpacity` (float).
Прозрачность фона.
По умолчанию: 0.3.
* `pwinSpeed` (integer).
Скорость анимации.
По умолчанию: 200.
* `callbackOpen` (callback).
* `callbackClose` (callback).