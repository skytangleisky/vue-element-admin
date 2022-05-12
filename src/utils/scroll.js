(function($) {
  var special = $.event.special
  var uid1 = 'D' + (+new Date())
  var uid2 = 'D' + (+new Date() + 1)
  special.scrollstart = {
    setup: function() {
      var timer
      var handler = function(evt) {
        var _self = this
        var _args = arguments
        if (timer) {
          clearTimeout(timer)
        } else {
          evt.type = 'scrollstart'
          $.event.dispatch.apply(_self, _args)
        }
        timer = setTimeout(function() {
          timer = null
        }, special.scrollstop.latency)
      }
      $(this).bind('scroll', handler).data(uid1, handler)
    },
    teardown: function() {
      $(this).unbind('scroll', $(this).data(uid1))
    }
  }
  special.scrollstop = {
    latency: 500,
    setup: function() {
      var timer
      var handler = function(evt) {
        var _self = this
        var _args = arguments
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(function() {
          timer = null
          evt.type = 'scrollstop'
          $.event.dispatch.apply(_self, _args)
        }, special.scrollstop.latency)
      }
      $(this).bind('scroll', handler).data(uid2, handler)
    },
    teardown: function() {
      $(this).unbind('scroll', $(this).data(uid2))
    }
  }
})(window.jQuery)
