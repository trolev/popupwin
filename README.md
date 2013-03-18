# Popupwin v.3

Plugin to realization pop-ups.

~~~~{.css}
  #id-popup {
    display: none;
  }
~~~~

### Quickstart

~~~~{.bash}
  <a href="#id-popup" id="link">Link</a>
  <div id="id-popup">
    Content...
  </div>
  $('#link').popupwin();
~~~~

or:
~~~~{.bash}
  <a href="#" id="link">Link</a>
  <div id="id-popup">
    Content...
  </div>
  $('#link').popupwin({
    pwinBlock: '#id-popup'
  });
~~~~

### Callbacks

~~~~{.bash}
  <a href="#id-popup" id="link">Link</a>
  <div id="id-popup">
    Content...
  </div>
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

~~~~{.bash}
  <a href="#id-popup" id="link">Link</a>
  <div id="id-popup">
    Content...
  </div>
  $('#id-popup').popupwin('open', {
    pwinBack: '#ff0000'
  });
~~~~
Open a window when the page loads.

### All settings
*`pwinBlock` (string/object or false).
По умолчанию: false. См. пример.
*`pwinClose` (string).
Селектор на элемент внутри `pwinBlock`. 
По умолчанию: '.close'
*`pwinBack` (string).
Цвет фонаю
По умолчанию: '#000'.
*`pwinOpacity` (float).
Прозрачность фона.
По умолчанию: 0.3.
*`pwinSpeed` (integer).
Скорость анимации.
По умолчанию: 200.
*`callbackOpen` (callback).
*`callbackClose` (callback).