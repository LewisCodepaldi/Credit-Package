// TEMPORARY UNTIL MOVED TO CDN
// BRING UNIT TEST FILE WITH IT btracking.spec.js
// Leave this as old-school JavaScript.
// It will be moved to an external CDN, shared with other codebases,
// and must work on all browsers

//const { param } = require("jquery");

// Please move tests from main.spec.js as well when the time comes
window.btracking = window.btracking || (function () {
    var Btracking = function () {
      return false
    }
    function beaconHubUrl () {
      //TODO: DL 2023-12-31 by Tommy Lee, to Jay Liang. restore these two lines after modifying the build process to get build info.
      //return (window.bxp && window.bxp.deploy || '').startsWith('prod')
        // ? 'https://ts.carrierxtrade.com/'
        // : 'https://devgx-ts.bluex.trade/'
        return 'https://devgx-ts.bluex.trade/'
    }
    function cacheBuster () {
      return Math.random().toString(36).substr(2, 16)
    }
    function pushBeaconEvent ({ target }) {
      if (target.dataset.eventname&&target.dataset.name&&target.dataset.value) {
        const{eventname, name, value} = target.dataset
        window.btracking.add({eventName: 'u' + eventname, name: name, value: value, u: window.location.href})
      }
    }
    function stopListening () {
      document.removeEventListener('keypress', pushBeaconEvent)
      document.removeEventListener('mouseup', pushBeaconEvent)
      document.removeEventListener('unload', this)
    }
  
    Btracking.prototype.initDefaults = function (params) {
      params.nc = cacheBuster()
      Btracking.prototype.defaultArgs = params
    }
    Btracking.prototype.add = function (params) {
      var options = JSON.parse(JSON.stringify(params))
      if (window.btracking.defaultArgs) {
        // Create clone of default args to retain immutability
        const defaults = JSON.parse(JSON.stringify(window.btracking.defaultArgs))
        options = Object.assign(defaults, options)
      }
      options.language = localStorage.getItem('chosenLanguage') || 'enUS'
      options.nc = cacheBuster()
      var queryString = Object.keys(options).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(options[key] || '')
      }).join('&')
  
      const pixel = document.createElement('img')
      pixel.style.cssText = 'opacity: 0; height: 1px; width: 1px; position: absolute; top: 0; z-index: -1;'
      pixel.src = beaconHubUrl() + 't?' + queryString
      pixel.id = 'bpixel'
      document.body.appendChild(pixel)
      window.setTimeout(function () {
        pixel.remove()
      }, 50)
    }
  
    document.addEventListener('keypress', pushBeaconEvent)
    document.addEventListener('mouseup', pushBeaconEvent)
    document.addEventListener('unload', stopListening)
  
    return new Btracking()
  })()
  