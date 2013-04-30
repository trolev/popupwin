/*!
 * Popupwin
 * Version: v.3.1.0 (2013-04-30)
 * 
 * https://github.com/trolev/Popupwin/
 * 
 * Popupwin plugin is MIT License released. Point free to use it for personal and commercial need
*/

(function ($) {

  var win = $(window),
      doc = $(document),
      isTouch = document.createTouch !== undefined,
      eventType = (isTouch) ? "touchend.pw" : "click.pw",
      popupwinbg = $('<div style="position:fixed; left:0; right:0; top:0; bottom:0;display:none;z-index:999;"></div>'),
      baseCSS = {
        'left': -900000,
        'top': - 900000,
        'display': 'block'
      };

  $('body').append(popupwinbg);

  var defaults = {
    pwinBlock: false,
    pwinClose: '.close',
    pwinBack: '#000',
    pwinOpacity: 0.3,
    pwinSpeed: 400,
    pwinAnimate: true,
    callbackOpen: false,
    callbackClose: false,
    fixed: false,
    resize: true
  };

  var methods = {
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
        item.cls = (typeof vars.pwinClose === "object") ? vars.pwinClose : $(vars.pwinClose, target);

        item.on(eventType, function(e){
          e.preventDefault();
          if (typeof vars.callbackOpen === 'function') {
            vars.callbackOpen(target, item);
          }
          methods.setPosition(target, false, vars.fixed);
          methods.show(item, vars);
          if (vars.resize) {
            win.on('resize.pw', function(){
              methods.setPosition(target, true, vars.fixed);
            });
          }
          return false;
        });
      });
    },
    setPosition: function(block, resize, fixed){
      if (!resize) {
        block.css(baseCSS);
      }
      var winHeight = isTouch && window.innerHeight ? window.innerHeight : win.height(),
          winWidth = isTouch && window.innerWidth ? window.innerWidth : win.width(),
          blockHeight = block.innerHeight(),
          blockWidth = block.innerWidth(),
          scrollTop = win.scrollTop(),
          scrollLeft = win.scrollLeft(),
          top = (winHeight * 0.5) - (blockHeight * 0.5),
          left = (winWidth * 0.5) - (blockWidth * 0.5);
      if (!resize) {
        block.hide();
      }
      if (fixed) {
        block.css({
          'left': (left < 0) ? 0 : left,
          'top': (top < 0) ? 0 : top,
          'z-index': 1000,
          'position': 'fixed'
        });
      } else {
        block.css({
          'left': (left < 0) ? scrollLeft : left + scrollLeft,
          'top': (top < 0) ? scrollTop : top + scrollTop,
          'z-index': 1000,
          'position': 'absolute'
        });
      }
    },
    show: function(item, vars){
      popupwinbg.css({'background-color': vars.pwinBack});
      if (vars.pwinAnimate) {
        popupwinbg.fadeTo(vars.pwinSpeed, vars.pwinOpacity);
        item.block.fadeTo(vars.pwinSpeed, 1);
      } else {
        popupwinbg.css('opacity', vars.pwinOpacity).show();
        item.block.show();
      }
      methods.closeEvents(item, vars);
    },
    closeEvents: function(item, vars) {
      popupwinbg.on(eventType, function(e){
        e.preventDefault();
        methods.close(item, vars);
        return false
      });
      item.cls.on(eventType, function(e){
        e.preventDefault();
        methods.close(item, vars);
        return false
      });
      doc.on('keydown.pw', function (e) {
        var code   = e.which || e.keyCode;
        if (code === 27) {
          methods.close(item, vars);
        }
      });
    },
    close: function(item, vars) {
      if (vars.pwinAnimate) {
        popupwinbg.fadeOut(vars.pwinSpeed);
        item.block.fadeOut(vars.pwinSpeed, function(){
          if (typeof vars.callbackClose === 'function') {
            vars.callbackClose(item.block, item);
          }
        });
      } else {
        popupwinbg.hide();
        item.block.hide();
        if (typeof vars.callbackClose === 'function') {
          vars.callbackClose(item.block, item);
        }
      }
      doc.off('.pw');
      item.cls.off('.pw');
      popupwinbg.off('.pw');
      win.off('.pw');
    },
    open: function(options) {
      return this.each(function(){
        var item = $(this),
            vars = $.extend({}, defaults, options);
        if (typeof vars.callbackOpen === 'function') {
          vars.callbackOpen(item);
        }
        item.block = item;
        item.cls = (typeof vars.pwinClose === "object") ? vars.pwinClose : $(vars.pwinClose, item);
        methods.setPosition(target, false, vars.fixed);
        methods.show(item, vars);
      });
    },
    center: function() {
      return this.each(function(){
        methods.setPosition($(this), true);
      });
    }
  };

  $.fn.popupwin = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error( 'Method named ' +  method + ' does not exist to jQuery.popupwin' );
    } 
  };

}(jQuery));