import methods from './methods'
import Cookies from 'js-cookie'

declare global {
    interface Window {
      btracking: {
        initDefaults: (params: Record<string, string>) => void
        add: (params: Record<string, string>) => void
      }
    }
  }

export function initBeacon (): void {
    // window.btracking is imported in main.js until it is moved to CDN
    // Initialize defaults for btracking
    let sessionId = Cookies.get('session_id')
    if (!sessionId) {
      sessionId = methods.generateUUID()
      Cookies.set('session_id', sessionId)
    }

    // TODO: DL 2023-08-31, by Tommy Lee, update these variables.
    const deploy = 'developer-local'
    const pid = 'credit-package'
    const uid = 'local'
    // const deploy = window.bxp?.deploy || 'developer-local'
    // const pid = window.bxp?.pid
    // const uid = window.bxp?.uid
    const options: Record<string, string> = {}
  
    options.p = 'credit-package'
    if (pid) options.pid = pid
    if (uid) options.uid = uid
    if (sessionId) options.sessionId = sessionId
    if (deploy) options.deploy = deploy
  
    const init = () => {
      if (window.btracking) {
        window.btracking.initDefaults(options)
      } else {
        setTimeout(init, 1000)
      }
    }
    init()
  }