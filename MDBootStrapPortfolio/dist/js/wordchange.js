(function ($) {
    
    function typeString($target, str, head, delay, cb) {
      $target.html(function (_, html) {
        return html + str[head];
      });
      
      if (head < str.length - 1) {
        setTimeout(function () {
          typeString($target, str, head + 1, delay, cb);
        }, delay);
      }
      else {
        cb();
      }
    }
    
    function deleteString($target, delay, cb) {
      var length;
      $target.html(function (_, html) {
        length = html.length;
        return html.substr(0, length - 1);
      });
      if (length > 1) {
        setTimeout(function () {
          deleteString($target, delay, cb);
        }, delay);
      }
      else {
        cb();
      }
    }
  
    $.fn.extend({
      teletype: function (opts) {
        var settings = $.extend({}, $.teletype.defaults, opts);
        return $(this).each(function () {
          (function loop($tar, idx) {      
            typeString($tar, settings.text[idx], 0, settings.delay, function () {
              setTimeout(function () {
                deleteString($tar, settings.delay, function () {
                  loop($tar, (idx + 1) % settings.text.length);
                });
              }, settings.pause);
            });
          
          }($(this), 0));
        });
      }
    });
  
    $.extend({
      teletype: {
        defaults: {
          delay: 100,
          pause: 2000,
          text: []
        }
      }
    });
  }(jQuery));
  
  $('#target').teletype({
    text: [
      'visiting my page.',
      'viewing my work.',
      'seeing my passion.',
      'noticing an opportunity.'
    ]
  });
  
  //jquery code to enable popovers
$(function () {
  $('[data-toggle="popover"]').popover()
})
  