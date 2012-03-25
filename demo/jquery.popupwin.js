/*
  Popupwin.
  Version: 2.1b
  https://github.com/trolev/Popupwin/
	
	Example:
		  HTML:
			    <a href="#popupwin" id="a-popupwin">Link</a>
			    <div id="popupwin">
			      <a href="#?" class="close"></a>
			      <!-- content -->
			    </div>
		  CSS:
			  	#popupwin {
			  		position: absolute;
			  		display: none;
			  	}
		  JavaScript:
		  		$('#a-popupwin').popupwin();


	More examples: https://github.com/trolev/Popupwin/
*/

(function($) {
  function PositionPopup (block){
    var wHeight = $(window).height();
    var bHeight = block.innerHeight();
    var topHeight = (wHeight - bHeight)/2;
    var scrollTop = (document.body.scrollTop || document.documentElement.scrollTop);
    var leftWidth = block.innerWidth()/2;
    var top = (wHeight > bHeight ? scrollTop + topHeight : scrollTop);
    block.css({
      left: 50+'%',
      'margin-left': -leftWidth,
      top: top,
      zIndex: 1500
    });
  }
  function ClosePopup (block, callbackClose, speed, close) {
    function cl() {
      block.fadeOut(speed, 0);
      $('.popupwinback').fadeOut(speed, 0);
      if (callbackClose) {
        callbackClose();
      }
    }
    close.unbind().bind('click', function(){
      cl();
      return false;
    });
    $('.popupwinback').unbind().bind('click', function(){
      cl();
      return false;
    });
  }
  function ShowPopup (block, color, speed, opacity, close, callbackOpen) {
    if (callbackOpen) {
      callbackOpen();
    }
    if (color) {
      $('.popupwinback').css('background-color', color).fadeTo(speed, opacity);
    }
    block.fadeTo(speed, 1);
  }
  jQuery.fn.popupwin = function(options) {
    var settings = jQuery.extend({
      pwinBlock: false,
      pwinClose: '.close',
      pwinBack: '#000',
      pwinOpacity: 0.3,
      pwinSpeed: 'slow',
      callbackOpen: function(block, link){},
      callbackClose: function(block, link){}
    },options);
    this.each(function() {
      $(this).click(function(){
        var $this = $(this);
        if (settings.pwinBlock) {
          var pwinBlock = $(settings.pwinBlock);
        } else {
          var block = $($this.attr('href'));
          if (block.length) {
            var pwinBlock = block;
          } else {
            alert('error');
            return;
          }
        }
        function cOpen () {
          settings.callbackOpen(pwinBlock, $this);
        }
        function cclose () {
          settings.callbackClose($(settings.pwinBlock), $this);
        }
        PositionPopup(pwinBlock);
        ShowPopup(pwinBlock, settings.pwinBack, settings.pwinSpeed, settings.pwinOpacity, $(settings.pwinClose), cOpen);
        ClosePopup (pwinBlock, cclose, settings.pwinSpeed, $(settings.pwinClose));
        return false;
      });
    });  
  };
  jQuery.fn.popupwinOpen = function(options) {
    var settings = jQuery.extend({
      pwinClose: '.close',
      pwinBack: '#000',
      pwinOpacity: 0.3,
      pwinSpeed: 'slow'
    },options);
    this.each(function() {
      PositionPopup($(this));
      ShowPopup($(this), settings.pwinBack, settings.pwinSpeed, settings.pwinOpacity, $(settings.pwinClose), false);
      ClosePopup ($(this), false, settings.pwinSpeed, $(settings.pwinClose));
      return;
    })
  };
  jQuery.fn.popupwinCenter = function() {
    this.each(function() {
      PositionPopup($(this));
      return;
    })
  };
  $(document).ready(function() {
    if ($('body > .popupwinback').length == 0) {
      $('body').append('<div class="popupwinback" style="position:fixed; left:0; right:0; top:0; bottom:0;display:none;z-index:1000;"></div>');  
    }
  });
})(jQuery);