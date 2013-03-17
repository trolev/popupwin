/*
  Popupwin.
  Version: 2.2b
  https://github.com/trolev/Popupwin/
  Examples: https://github.com/trolev/Popupwin/
*/



(function (document, $) {
  if ($('body > .popupwinback').length == 0) {
    var bg = $('<div id="popupwinback" style="position:fixed; left:0; right:0; top:0; bottom:0;display:none;"></div>');
    $('body').append(bg);  
  }
  var popupwinback = $('#popupwinback'),
  doc = $(document);
  $.popupwin = function(item, options) {
    var item = $(item),
    vars = $.extend({}, $.popupwin.defaults, options);
    methods = {
      init: function() {
        if (vars.pwinBlock) {
          var target = (typeof vars.pwinBlock === "object")? vars.pwinBlock : $(vars.pwinBlock);
        } else {
          var target = $(item.attr('href'));
        }
        if (!target.length) {
          return;
        }
        item.block = target;
        item.bg = vars.pwinBack;
        item.opacity = vars.pwinOpacity;
        item.speed = vars.pwinSpeed;
        item.close = (typeof vars.pwinClose === "object") ? vars.pwinClose : $(vars.pwinClose, target);
        item.cbopen = vars.callbackOpen;
        item.cbclose = vars.callbackClose;
        item.click(function(){
          methods.center(item.block);
          item.cbopen(item.block, item);
          methods.show(item);
          return false
        });
      },
      center: function(block){
        var wHeight = $(window).height();
        var bHeight = block.innerHeight();
        var topHeight = (wHeight - bHeight)/2;
        var scrollTop = (document.body.scrollTop || document.documentElement.scrollTop);
        var leftWidth = block.innerWidth()/2;
        var top = (wHeight > bHeight ? scrollTop + topHeight : scrollTop);
        block.css({
          'left': 50+'%',
          'margin-left': -leftWidth,
          'top': top,
          'z-index': 3000
        });
      },
      show: function(item){
        popupwinback.css({'background-color': item.bg}).fadeTo(item.speed, item.opacity);
        item.block.fadeTo(item.speed, 1);
        methods.closeEvents(item);
      },
      closeEvents: function(item) {
        popupwinback.bind('click.pw', function(){
          methods.close(item);
          return false
        });
        item.close.bind('click.pw', function(){
          methods.close(item);
          return false
        });
        doc.bind('keydown.pw', function (e) {
          var code   = e.which || e.keyCode;
          if (code === 27) {
            methods.close(item);
          }
        });
      },
      close: function(item) {
        popupwinback.fadeOut(item.speed, 0);
        item.block.fadeOut(item.speed, 0, function(){
          item.cbclose(item.block, item);
        });
        doc.unbind('.pw');
        item.close.unbind('.pw');
        popupwinback.unbind('.pw');
      }
    }
    methods.init();
  }
  $.popupwin.defaults = {
    pwinBlock: false,
    pwinClose: '.close',
    pwinBack: '#000',
    pwinOpacity: 0.3,
    pwinSpeed: 200,
    callbackOpen: function(block, link){},
    callbackClose: function(block, link){},
    start: "function(){}"
  }
  $.fn.popupwin = function(options) {
    if (options === undefined) options = {};
    if (typeof options === "object") {
      return this.each(function() {
        new $.popupwin(this, options);
      });
    } else {
      // Helper strings to quickly perform functions on the slider
      var $slider = $(this).data('flexslider');
      switch (options) {
        case "play": $slider.play(); break;
        case "pause": $slider.pause(); break;
        case "next": $slider.flexAnimate($slider.getTarget("next"), true); break;
        case "prev":
        case "previous": $slider.flexAnimate($slider.getTarget("prev"), true); break;
        default: if (typeof options === "number") $slider.flexAnimate(options, true);
      }
    }
  }

  // function ClosePopup (block, callbackClose, speed, close) {
  //   function cl() {
  //     block.fadeOut(speed, 0);
  //     $('.popupwinback').fadeOut(speed, 0);
  //     if (callbackClose) {
  //       callbackClose();
  //     }
  //   }
  //   close.unbind().bind('click', function(){
  //     cl();
  //     return false;
  //   });
  //   $('.popupwinback').unbind().bind('click', function(){
  //     cl();
  //     return false;
  //   });
  // }
  // function ShowPopup (block, color, speed, opacity, close, callbackOpen) {
  //   if (callbackOpen) {
  //     callbackOpen();
  //   }
  //   if (color) {
  //     $('.popupwinback').css('background-color', color).fadeTo(speed, opacity);
  //   }
  //   block.fadeTo(speed, 1);
  // }
  // jQuery.fn.popupwin = function(options) {
  //   var settings = jQuery.extend({
  //     pwinBlock: false,
  //     pwinClose: '.close',
  //     pwinBack: '#000',
  //     pwinOpacity: 0.3,
  //     pwinSpeed: 'slow',
  //     callbackOpen: function(block, link){},
  //     callbackClose: function(block, link){}
  //   },options);
  //   this.each(function() {
  //     $(this).click(function(){
  //       var $this = $(this);
  //       if (settings.pwinBlock) {
  //         var pwinBlock = $(settings.pwinBlock);
  //       } else {
  //         var block = $($this.attr('href'));
  //         if (block.length) {
  //           var pwinBlock = block;
  //         } else {
  //           alert('error');
  //           return;
  //         }
  //       }
  //       function cOpen () {
  //         settings.callbackOpen(pwinBlock, $this);
  //       }
  //       function cclose () {
  //         settings.callbackClose($(settings.pwinBlock), $this);
  //       }
  //       PositionPopup(pwinBlock);
  //       ShowPopup(pwinBlock, settings.pwinBack, settings.pwinSpeed, settings.pwinOpacity, $(settings.pwinClose), cOpen);
  //       ClosePopup (pwinBlock, cclose, settings.pwinSpeed, $(settings.pwinClose));
  //       return false;
  //     });
  //   });  
  // };
  // jQuery.fn.popupwinOpen = function(options) {
  //   var settings = jQuery.extend({
  //     pwinClose: '.close',
  //     pwinBack: '#000',
  //     pwinOpacity: 0.3,
  //     pwinSpeed: 'slow'
  //   },options);
  //   this.each(function() {
  //     PositionPopup($(this));
  //     ShowPopup($(this), settings.pwinBack, settings.pwinSpeed, settings.pwinOpacity, $(settings.pwinClose), false);
  //     ClosePopup ($(this), false, settings.pwinSpeed, $(settings.pwinClose));
  //     return;
  //   })
  // };
  // jQuery.fn.popupwinCenter = function() {
  //   this.each(function() {
  //     PositionPopup($(this));
  //     return;
  //   })
  // };
  // jQuery.fn.popupwinClose = function(options) {
  //   var settings = jQuery.extend({
  //     pwinSpeed: 'slow'
  //   },options);
  //   this.each(function() {
  //     var $this = $(this);
  //     $this.fadeOut(settings.pwinSpeed, 0);
  //     $('.popupwinback').fadeOut(settings.pwinSpeed, 0);
  //     return;
  //   })
  // };
  // $(document).ready(function() {
  //   if ($('body > .popupwinback').length == 0) {
  //     $('body').append('<div class="popupwinback" style="position:fixed; left:0; right:0; top:0; bottom:0;display:none;z-index:1000;"></div>');  
  //   }
  // });
}(document, jQuery));

