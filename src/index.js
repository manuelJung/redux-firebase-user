import * as fromHocs from './hocs'
import * as fromSelectors from './selectors'
import * as fromActionTypes from './actionTypes'
import * as fromActions from './actions'
import * as fromComponents from './components'
import * as fromUpdaters from './updaters'
import config from './config'

export { default as reducer } from './reducer'
// export { default as config } from './config'

// export const hocs        = fromHocs
// export const selectors   = fromSelectors
export const actionTypes = fromActionTypes
export const actions     = fromActions
// export const components  = fromComponents
export const updaters    = fromUpdaters

export default {
  initializeModule : config.setConfig,
  updateModule     : config.setConfig
}


// HOCs

export { default as withUser } from './hocs/withUser'
export { default as withAutoLogin } from './hocs/withAutoLogin'
export { default as withLoginForm } from './hocs/withLoginForm'
export { default as withLoginRequest } from './hocs/withLoginRequest'
export { default as withLogoutButton } from './hocs/withLogoutButton'
export { default as withLogoutRequest } from './hocs/withLogoutRequest'
export { default as withSignupForm } from './hocs/withSignupForm'
export { default as withSignupRequest } from './hocs/withSignupRequest'

// selectors

export { getUser } from './selectors'
export { isLoggedIn } from './selectors'
export { isFetchingLogin } from './selectors'
export { loginFetchFailed } from './selectors'
export { getLoginFetchError } from './selectors'
export { isFetchingLogout } from './selectors'
export { logoutFetchFailed } from './selectors'
export { getLogoutFetchError } from './selectors'
export { isFetchingSignup } from './selectors'
export { signupFetchFailed } from './selectors'
export { getSignupFetchError } from './selectors'

// components

export { default as GithubAuthOButton } from './components/GithubAuthOButton'
export { default as GoogleAuthOButton } from './components/GoogleAuthOButton'
export { default as FacebookAuthOButton } from './components/FacebookAuthOButton'
export { default as TwitterAuthOButton } from './components/TwitterAuthOButton'
