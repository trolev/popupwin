(function(b){function h(c){var a=b(window).height(),f=c.innerHeight(),d=(a-f)/2,e=document.body.scrollTop||document.documentElement.scrollTop,g=c.innerWidth()/2;c.css({left:"50%","margin-left":-g,top:a>f?e+d:e,zIndex:1500})}function i(c,a,f,d){function e(){c.fadeOut(f,0);b(".popupwinback").fadeOut(f,0);a&&a()}d.unbind().bind("click",function(){e();return!1});b(".popupwinback").unbind().bind("click",function(){e();return!1})}function j(c,a,f,d,e,g){g&&g();a&&b(".popupwinback").css("background-color", a).fadeTo(f,d);c.fadeTo(f,1)}jQuery.fn.popupwin=function(c){var a=jQuery.extend({pwinBlock:!1,pwinClose:".close",pwinBack:"#000",pwinOpacity:0.3,pwinSpeed:"slow",callbackOpen:function(){},callbackClose:function(){}},c);this.each(function(){b(this).click(function(){var c=b(this);if(a.pwinBlock)var d=b(a.pwinBlock);else{var e=b(c.attr("href"));if(e.length)d=e;else{alert("error");return}}h(d);j(d,a.pwinBack,a.pwinSpeed,a.pwinOpacity,b(a.pwinClose),function(){a.callbackOpen(d,c)});i(d,function(){a.callbackClose(b(a.pwinBlock), c)},a.pwinSpeed,b(a.pwinClose));return!1})})};jQuery.fn.popupwinOpen=function(c){var a=jQuery.extend({pwinClose:".close",pwinBack:"#000",pwinOpacity:0.3,pwinSpeed:"slow"},c);this.each(function(){h(b(this));j(b(this),a.pwinBack,a.pwinSpeed,a.pwinOpacity,b(a.pwinClose),!1);i(b(this),!1,a.pwinSpeed,b(a.pwinClose))})};jQuery.fn.popupwinCenter=function(){this.each(function(){h(b(this))})};jQuery.fn.popupwinClose=function(c){var a=jQuery.extend({pwinSpeed:"slow"},c);this.each(function(){b(this).fadeOut(a.pwinSpeed, 0);b(".popupwinback").fadeOut(a.pwinSpeed,0)})};b(document).ready(function(){0==b("body > .popupwinback").length&&b("body").append('<div class="popupwinback" style="position:fixed; left:0; right:0; top:0; bottom:0;display:none;z-index:1000;"></div>')})})(jQuery);