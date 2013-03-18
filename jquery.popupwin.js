/*
  Popupwin.
  Version: 3.0
  https://github.com/trolev/Popupwin/
  Examples: https://github.com/trolev/Popupwin/
*/



(function (document, $) {
  if ($('body > .popupwinback').length == 0) {
    var bg = $('<div id="popupwinbg" style="position:fixed; left:0; right:0; top:0; bottom:0;display:none;"></div>');
    $('body').append(bg);  
  }
  var popupwinbg = $('#popupwinbg'),
  doc = $(document);

  var defaults = {
    pwinBlock: false,
    pwinClose: '.close',
    pwinBack: '#000',
    pwinOpacity: 0.3,
    pwinSpeed: 400,
    callbackOpen: function(block, link){},
    callbackClose: function(block, link){},
  };

  var methods = {
    baseInit: function(item, vars) {
      item.bg = vars.pwinBack;
      item.opacity = vars.pwinOpacity;
      item.speed = vars.pwinSpeed;
      item.close = (typeof vars.pwinClose === "object") ? vars.pwinClose : $(vars.pwinClose, item.block);
      item.cbopen = vars.callbackOpen;
      item.cbclose = vars.callbackClose;
    },
    init : function(options) {
      return this.each(function(){
        var item = $(this),
        vars = $.extend({}, defaults, options);
        if (vars.pwinBlock) {
          var target = (typeof vars.pwinBlock === "object") ? vars.pwinBlock : $(vars.pwinBlock);
        } else {
          var target = $(item.attr('href'));
        }
        if (!target.length) {
          return;
        }
        item.block = target;
        methods.baseInit(item, vars);
        item.click(function(){
          methods.position(item.block);
          methods.show(item);
          return false
        });
      });
    },
    position: function(block){
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
      item.cbopen(item.block, item);
      popupwinbg.css({'background-color': item.bg}).fadeTo(item.speed, item.opacity);
      item.block.fadeTo(item.speed, 1);
      methods.closeEvents(item);
    },
    closeEvents: function(item) {
      popupwinbg.bind('click.pw', function(){
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
      popupwinbg.fadeOut(item.speed, 0);
      item.block.fadeOut(item.speed, 0, function(){
        item.cbclose(item.block, item);
      });
      doc.unbind('.pw');
      item.close.unbind('.pw');
      popupwinbg.unbind('.pw');
    },
    open: function(options) {
      return this.each(function(){
        var item = $(this),
        vars = $.extend({}, defaults, options);
        item.block = item;
        methods.baseInit(item, vars);
        methods.position(item.block);
        methods.show(item);
      });
    },
    center: function() {
      return this.each(function(){
        methods.position($(this));
      });
    }
  };

  $.fn.popupwin = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply(this, arguments);
    } else {
      $.error( 'Метод с именем ' +  method + ' не существует для jQuery.popupwin' );
    } 
  };

}(document, jQuery));




  // var defaults = {

  // }

  // $.fn.popupwin = function( options ) {  
  //   return this.each(function() {
  //    alert(2);
  //   });
  // };

//   if ($('body > .popupwinback').length == 0) {
//     var bg = $('<div id="popupwinbg" style="position:fixed; left:0; right:0; top:0; bottom:0;display:none;"></div>');
//     $('body').append(bg);  
//   }
//   var popupwinbg = $('#popupwinbg'),
//   doc = $(document);
//   $.popupwin = function(item, options) {
//     var item = $(item),
//     vars = $.extend({}, $.popupwin.defaults, options);
//     methods = {
//       init: function() {
//         if (vars.pwinBlock) {
//           var target = (typeof vars.pwinBlock === "object")? vars.pwinBlock : $(vars.pwinBlock);
//         } else {
//           var target = $(item.attr('href'));
//         }
//         if (!target.length) {
//           return;
//         }
//         item.block = target;
//         item.bg = vars.pwinBack;
//         item.opacity = vars.pwinOpacity;
//         item.speed = vars.pwinSpeed;
//         item.close = (typeof vars.pwinClose === "object") ? vars.pwinClose : $(vars.pwinClose, target);
//         item.cbopen = vars.callbackOpen;
//         item.cbclose = vars.callbackClose;
//         item.click(function(){
//           methods.position(item.block);
//           item.cbopen(item.block, item);
//           methods.show(item);
//           return false
//         });
//       },
//       position: function(block){
//         var wHeight = $(window).height();
//         var bHeight = block.innerHeight();
//         var topHeight = (wHeight - bHeight)/2;
//         var scrollTop = (document.body.scrollTop || document.documentElement.scrollTop);
//         var leftWidth = block.innerWidth()/2;
//         var top = (wHeight > bHeight ? scrollTop + topHeight : scrollTop);
//         block.css({
//           'left': 50+'%',
//           'margin-left': -leftWidth,
//           'top': top,
//           'z-index': 3000
//         });
//       },
//       show: function(item){
//         popupwinbg.css({'background-color': item.bg}).fadeTo(item.speed, item.opacity);
//         item.block.fadeTo(item.speed, 1);
//         methods.closeEvents(item);
//       },
//       closeEvents: function(item) {
//         popupwinbg.bind('click.pw', function(){
//           methods.close(item);
//           return false
//         });
//         item.close.bind('click.pw', function(){
//           methods.close(item);
//           return false
//         });
//         doc.bind('keydown.pw', function (e) {
//           var code   = e.which || e.keyCode;
//           if (code === 27) {
//             methods.close(item);
//           }
//         });
//       },
//       close: function(item) {
//         popupwinbg.fadeOut(item.speed, 0);
//         item.block.fadeOut(item.speed, 0, function(){
//           item.cbclose(item.block, item);
//         });
//         doc.unbind('.pw');
//         item.close.unbind('.pw');
//         popupwinbg.unbind('.pw');
//       }
//     }
//     methods.init();
//   }
//   $.popupwin.defaults = {
//     pwinBlock: false,
//     pwinClose: '.close',
//     pwinBack: '#000',
//     pwinOpacity: 0.3,
//     pwinSpeed: 200,
//     callbackOpen: function(block, link){},
//     callbackClose: function(block, link){},
//     start: "function(){}"
//   }
//   $.fn.popupwin = function(options) {
//     if (options === undefined) options = {};
//     if (typeof options === "object") {
//       return this.each(function() {
//         new $.popupwin(this, options);
//       });
//     } else {
//       var $slider = $(this).data('flexslider');
//       switch (options) {
//         case "play": $slider.play(); break;
//         case "pause": $slider.pause(); break;
//         case "next": $slider.flexAnimate($slider.getTarget("next"), true); break;
//         case "prev":
//         case "previous": $slider.flexAnimate($slider.getTarget("prev"), true); break;
//         default: if (typeof options === "number") $slider.flexAnimate(options, true);
//       }
//     }
//   }

  // function ClosePopup (block, callbackClose, speed, close) {
  //   function cl() {
  //     block.fadeOut(speed, 0);
  //     $('.popupwinbg').fadeOut(speed, 0);
  //     if (callbackClose) {
  //       callbackClose();
  //     }
  //   }
  //   close.unbind().bind('click', function(){
  //     cl();
  //     return false;
  //   });
  //   $('.popupwinbg').unbind().bind('click', function(){
  //     cl();
  //     return false;
  //   });
  // }
  // function ShowPopup (block, color, speed, opacity, close, callbackOpen) {
  //   if (callbackOpen) {
  //     callbackOpen();
  //   }
  //   if (color) {
  //     $('.popupwinbg').css('background-color', color).fadeTo(speed, opacity);
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
  // jQuery.fn.popupwinposition = function() {
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
  //     $('.popupwinbg').fadeOut(settings.pwinSpeed, 0);
  //     return;
  //   })
  // };
  // $(document).ready(function() {
  //   if ($('body > .popupwinbg').length == 0) {
  //     $('body').append('<div class="popupwinbg" style="position:fixed; left:0; right:0; top:0; bottom:0;display:none;z-index:1000;"></div>');  
  //   }
  // });

