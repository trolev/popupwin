/*
  Popupwin.
  Version: 3.0
  https://github.com/trolev/Popupwin/
  Examples: https://github.com/trolev/Popupwin/
*/
(function (document, $) {
  var popupwinbg = $('<div style="position:fixed; left:0; right:0; top:0; bottom:0;display:none;z-index:2990;"></div>');
  $('body').append(popupwinbg);
  doc = $(document);

  var defaults = {
    pwinBlock: false,
    pwinClose: '.close',
    pwinBack: '#000',
    pwinOpacity: 0.3,
    pwinSpeed: 400,
    callbackOpen: function(block, link){},
    callbackClose: function(block, link){}
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
      item.block.hide().fadeTo(item.speed, 1);
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
      $.error( 'Method named ' +  method + ' does not exist to jQuery.popupwin' );
    } 
  };

}(document, jQuery));
