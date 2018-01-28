import * as fromActionTypes from './actionTypes'
import * as fromActions from './actions'
import config from './config'

export { default as reducer } from './reducer'

export const actionTypes = fromActionTypes
export const actions     = fromActions

export default {
  initializeModule : config.setConfig,
  updateModule     : config.setConfig
}


// HOCs and RenderProps

export { default as User, withUser } from './renderProps/User'
export { default as AutoLogin, withAutoLogin } from './renderProps/AutoLogin'
export { default as LoginForm, withLoginForm } from './renderProps/LoginForm'
export { default as LoginRequest, withLoginRequest } from './renderProps/LoginRequest'
export { default as LogoutForm, withLogoutForm } from './renderProps/LogoutForm'
export { default as LogoutRequest, withLogoutRequest } from './renderProps/LogoutRequest'
export { default as SignupForm, withSignupForm } from './renderProps/SignupForm'
export { default as SignupRequest, withSignupRequest } from './renderProps/SignupRequest'

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
