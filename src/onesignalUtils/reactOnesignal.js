import { SERVER_ADDRESS } from "../constant/server"

const ONESIGNAL_SDK_ID = "onesignal-sdk"
const ONE_SIGNAL_SCRIPT_SRC =SERVER_ADDRESS
// true if the script is successfully loaded from CDN.
let isOneSignalInitialized = false
// true if the script fails to load from CDN. A separate flag is necessary
// to disambiguate between a CDN load failure and a delayed call to
// OneSignal#init.
let isOneSignalScriptFailed = false

if (typeof window !== "undefined") {
  window.OneSignalDeferred = window.OneSignalDeferred || []
  addSDKScript()
}

/* H E L P E R S */

function handleOnError() {
  isOneSignalScriptFailed = true
}

function addSDKScript() {
  const script = document.createElement("script")
  script.id = ONESIGNAL_SDK_ID
  script.defer = true
  script.src = ONE_SIGNAL_SCRIPT_SRC

  // Always resolve whether or not the script is successfully initialized.
  // This is important for users who may block cdn.onesignal.com w/ adblock.
  script.onerror = () => {
    handleOnError()
  }

  document.head.appendChild(script)
}

/**
 * The following code is copied directly from the native SDK source file BrowserSupportsPush.ts
 * S T A R T
 */

// Checks if the browser supports push notifications by checking if specific
//   classes and properties on them exist
function isPushNotificationsSupported() {
  return supportsVapidPush() || supportsSafariPush()
}

function isMacOSSafariInIframe() {
  // Fallback detection for Safari on macOS in an iframe context
  return (
    window.top !== window && // isContextIframe
    navigator.vendor === "Apple Computer, Inc." && // isSafari
    navigator.platform === "MacIntel"
  ) // isMacOS
}

function supportsSafariPush() {
  return (
    (window.safari && typeof window.safari.pushNotification !== "undefined") ||
    isMacOSSafariInIframe()
  )
}

// Does the browser support the standard Push API
function supportsVapidPush() {
  return (
    typeof PushSubscriptionOptions !== "undefined" &&
    PushSubscriptionOptions.prototype.hasOwnProperty("applicationServerKey")
  )
}
/* E N D */

/**
 * This is a SPECIAL FUNCTION
 * It is a hardcoded implementation copied from the upstream/native WebSDK since we want to return a boolean immediately
 * Natively, this is done via the shimloading mechanism (i.e. if the SDK loads, push is supported)
 * @PublicApi
 */
const isPushSupported = () => {
  return isPushNotificationsSupported()
}

/**
 * @PublicApi
 */
const init = options => {
  if (isOneSignalInitialized) {
    return Promise.reject(`OneSignal is already initialized.`)
  }

  if (!options || !options.appId) {
    throw new Error("You need to provide your OneSignal appId.")
  }

  if (!document) {
    return Promise.reject(`Document is not defined.`)
  }

  return new Promise(resolve => {
    window.OneSignalDeferred?.push(OneSignal => {
      OneSignal.init(options).then(() => {
        isOneSignalInitialized = true
        resolve()
      })
    })
  })
}

function oneSignalLogin(externalId, jwtToken) {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject()
    }

    try {
      window.OneSignalDeferred?.push(OneSignal => {
        OneSignal.login(externalId, jwtToken)
          .then(value => resolve(value))
          .catch(error => reject(error))
      })
    } catch (error) {
      reject(error)
    }
  })
}

function oneSignalLogout() {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject()
    }

    try {
      window.OneSignalDeferred?.push(OneSignal => {
        OneSignal.logout()
          .then(value => resolve(value))
          .catch(error => reject(error))
      })
    } catch (error) {
      reject(error)
    }
  })
}

function oneSignalSetConsentGiven(consent) {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject()
    }

    try {
      window.OneSignalDeferred?.push(OneSignal => {
        OneSignal.setConsentGiven(consent)
          .then(value => resolve(value))
          .catch(error => reject(error))
      })
    } catch (error) {
      reject(error)
    }
  })
}

function oneSignalSetConsentRequired(requiresConsent) {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject()
    }

    try {
      window.OneSignalDeferred?.push(OneSignal => {
        OneSignal.setConsentRequired(requiresConsent)
          .then(value => resolve(value))
          .catch(error => reject(error))
      })
    } catch (error) {
      reject(error)
    }
  })
}

function slidedownPromptPush(options) {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject()
    }

    try {
      window.OneSignalDeferred?.push(OneSignal => {
        OneSignal.Slidedown.promptPush(options)
          .then(value => resolve(value))
          .catch(error => reject(error))
      })
    } catch (error) {
      reject(error)
    }
  })
}

function slidedownPromptPushCategories(options) {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject()
    }

    try {
      window.OneSignalDeferred?.push(OneSignal => {
        OneSignal.Slidedown.promptPushCategories(options)
          .then(value => resolve(value))
          .catch(error => reject(error))
      })
    } catch (error) {
      reject(error)
    }
  })
}

function slidedownPromptSms(options) {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject()
    }

    try {
      window.OneSignalDeferred?.push(OneSignal => {
        OneSignal.Slidedown.promptSms(options)
          .then(value => resolve(value))
          .catch(error => reject(error))
      })
    } catch (error) {
      reject(error)
    }
  })
}

function slidedownPromptEmail(options) {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject()
    }

    try {
      window.OneSignalDeferred?.push(OneSignal => {
        OneSignal.Slidedown.promptEmail(options)
          .then(value => resolve(value))
          .catch(error => reject(error))
      })
    } catch (error) {
      reject(error)
    }
  })
}

function slidedownPromptSmsAndEmail(options) {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject()
    }

    try {
      window.OneSignalDeferred?.push(OneSignal => {
        OneSignal.Slidedown.promptSmsAndEmail(options)
          .then(value => resolve(value))
          .catch(error => reject(error))
      })
    } catch (error) {
      reject(error)
    }
  })
}

function slidedownAddEventListener(event, listener) {
  window.OneSignalDeferred?.push(OneSignal => {
    OneSignal.Slidedown.addEventListener(event, listener)
  })
}

function slidedownRemoveEventListener(event, listener) {
  window.OneSignalDeferred?.push(OneSignal => {
    OneSignal.Slidedown.removeEventListener(event, listener)
  })
}

function notificationsSetDefaultUrl(url) {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject()
    }

    try {
      window.OneSignalDeferred?.push(OneSignal => {
        OneSignal.Notifications.setDefaultUrl(url)
          .then(value => resolve(value))
          .catch(error => reject(error))
      })
    } catch (error) {
      reject(error)
    }
  })
}

function notificationsSetDefaultTitle(title) {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject()
    }

    try {
      window.OneSignalDeferred?.push(OneSignal => {
        OneSignal.Notifications.setDefaultTitle(title)
          .then(value => resolve(value))
          .catch(error => reject(error))
      })
    } catch (error) {
      reject(error)
    }
  })
}

function notificationsRequestPermission() {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject()
    }

    try {
      window.OneSignalDeferred?.push(OneSignal => {
        OneSignal.Notifications.requestPermission()
          .then(value => resolve(value))
          .catch(error => reject(error))
      })
    } catch (error) {
      reject(error)
    }
  })
}

function notificationsAddEventListener(event, listener) {
  window.OneSignalDeferred?.push(OneSignal => {
    OneSignal.Notifications.addEventListener(event, listener)
  })
}

function notificationsRemoveEventListener(event, listener) {
  window.OneSignalDeferred?.push(OneSignal => {
    OneSignal.Notifications.removeEventListener(event, listener)
  })
}

function sessionSendOutcome(outcomeName, outcomeWeight) {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject()
    }

    try {
      window.OneSignalDeferred?.push(OneSignal => {
        OneSignal.Session.sendOutcome(outcomeName, outcomeWeight)
          .then(value => resolve(value))
          .catch(error => reject(error))
      })
    } catch (error) {
      reject(error)
    }
  })
}

function sessionSendUniqueOutcome(outcomeName) {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject()
    }

    try {
      window.OneSignalDeferred?.push(OneSignal => {
        
        OneSignal.Session.sendUniqueOutcome(outcomeName)
          .then(value => resolve(value))
          .catch(error => reject(error))
      })
    } catch (error) {
      reject(error)
    }
  })
}

function userAddAlias(label, id) {
  window.OneSignalDeferred?.push(OneSignal => {
    OneSignal.User.addAlias(label, id)
  })
}

function userAddAliases(aliases) {
  window.OneSignalDeferred?.push(OneSignal => {
    OneSignal.User.addAliases(aliases)
  })
}

function userRemoveAlias(label) {
  window.OneSignalDeferred?.push(OneSignal => {
    OneSignal.User.removeAlias(label)
  })
}

function userRemoveAliases(labels) {
  window.OneSignalDeferred?.push(OneSignal => {
    OneSignal.User.removeAliases(labels)
  })
}

function userAddEmail(email) {
  window.OneSignalDeferred?.push(OneSignal => {
    OneSignal.User.addEmail(email)
  })
}

function userRemoveEmail(email) {
  window.OneSignalDeferred?.push(OneSignal => {
    OneSignal.User.removeEmail(email)
  })
}

function userAddSms(smsNumber) {
  window.OneSignalDeferred?.push(OneSignal => {
    OneSignal.User.addSms(smsNumber)
  })
}

function userRemoveSms(smsNumber) {
  window.OneSignalDeferred?.push(OneSignal => {
    OneSignal.User.removeSms(smsNumber)
  })
}

function userAddTag(key, value) {
  window.OneSignalDeferred?.push(OneSignal => {
    OneSignal.User.addTag(key, value)
  })
}

function userAddTags(tags) {
  window.OneSignalDeferred?.push(OneSignal => {
    OneSignal.User.addTags(tags)
  })
}

function userRemoveTag(key) {
  window.OneSignalDeferred?.push(OneSignal => {
    OneSignal.User.removeTag(key)
  })
}

function userRemoveTags(keys) {
  window.OneSignalDeferred?.push(OneSignal => {
    OneSignal.User.removeTags(keys)
  })
}

function pushSubscriptionOptIn() {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject()
    }

    try {
      window.OneSignalDeferred?.push(OneSignal => {
        OneSignal.User.PushSubscription.optIn()
          .then(value => resolve(value))
          .catch(error => reject(error))
      })
    } catch (error) {
      reject(error)
    }
  })
}

function pushSubscriptionOptOut() {
  return new Promise((resolve, reject) => {
    if (isOneSignalScriptFailed) {
      reject()
    }

    try {
      window.OneSignalDeferred?.push(OneSignal => {
        OneSignal.User.PushSubscription.optOut()
          .then(value => resolve(value))
          .catch(error => reject(error))
      })
    } catch (error) {
      reject(error)
    }
  })
}

function pushSubscriptionAddEventListener(event, listener) {
  window.OneSignalDeferred?.push(OneSignal => {
    OneSignal.User.PushSubscription.addEventListener(event, listener)
  })
}

function pushSubscriptionRemoveEventListener(event, listener) {
  window.OneSignalDeferred?.push(OneSignal => {
    OneSignal.User.PushSubscription.removeEventListener(event, listener)
  })
}

function debugSetLogLevel(logLevel) {
  window.OneSignalDeferred?.push(OneSignal => {
    OneSignal.Debug.setLogLevel(logLevel)
  })
}
const PushSubscriptionNamespace = {
  get id() {
    return window.OneSignal?.User?.PushSubscription?.id
  },
  get token() {
    return window.OneSignal?.User?.PushSubscription?.token
  },
  get optedIn() {
    return window.OneSignal?.User?.PushSubscription?.optedIn
  },
  optIn: pushSubscriptionOptIn,
  optOut: pushSubscriptionOptOut,
  addEventListener: pushSubscriptionAddEventListener,
  removeEventListener: pushSubscriptionRemoveEventListener
}

const UserNamespace = {
  addAlias: userAddAlias,
  addAliases: userAddAliases,
  removeAlias: userRemoveAlias,
  removeAliases: userRemoveAliases,
  addEmail: userAddEmail,
  removeEmail: userRemoveEmail,
  addSms: userAddSms,
  removeSms: userRemoveSms,
  addTag: userAddTag,
  addTags: userAddTags,
  removeTag: userRemoveTag,
  removeTags: userRemoveTags,
  PushSubscription: PushSubscriptionNamespace
}

const SessionNamespace = {
  sendOutcome: sessionSendOutcome,
  sendUniqueOutcome: sessionSendUniqueOutcome
}

const DebugNamespace = {
  setLogLevel: debugSetLogLevel
}

const SlidedownNamespace = {
  promptPush: slidedownPromptPush,
  promptPushCategories: slidedownPromptPushCategories,
  promptSms: slidedownPromptSms,
  promptEmail: slidedownPromptEmail,
  promptSmsAndEmail: slidedownPromptSmsAndEmail,
  addEventListener: slidedownAddEventListener,
  removeEventListener: slidedownRemoveEventListener
}

const NotificationsNamespace = {
  get permissionNative() {
    return window.OneSignal?.Notifications?.permissionNative ?? "default"
  },
  get permission() {
    return window.OneSignal?.Notifications?.permission ?? false
  },
  setDefaultUrl: notificationsSetDefaultUrl,
  setDefaultTitle: notificationsSetDefaultTitle,
  isPushSupported,
  requestPermission: notificationsRequestPermission,
  addEventListener: notificationsAddEventListener,
  removeEventListener: notificationsRemoveEventListener
}

const OneSignalNamespace = {
  login: oneSignalLogin,
  logout: oneSignalLogout,
  init,
  setConsentGiven: oneSignalSetConsentGiven,
  setConsentRequired: oneSignalSetConsentRequired,
  Slidedown: SlidedownNamespace,
  Notifications: NotificationsNamespace,
  Session: SessionNamespace,
  User: UserNamespace,
  Debug: DebugNamespace,
  OneSignalDeferred:window.OneSignalDeferred,
}

const OneSignal = OneSignalNamespace
export default OneSignal
