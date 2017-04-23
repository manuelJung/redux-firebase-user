import * as t from '../actionTypes'
import config from '../config'


export const fetchLoginRequest = (method) => ({
  type: t.FETCH_LOGIN_REQUEST,
  meta: { method },
})

export const fetchLoginSuccess = (payload, method) => ({
  type: t.FETCH_LOGIN_SUCCESS,
  meta: { method },
  payload
})

export const fetchLoginFailure = (error, method) => ({
  type: t.FETCH_LOGIN_FAILURE,
  meta: { method },
  payload: error
})


export default (email, password) => dispatch => {
  var method = 'EMAIL_AND_PASSWORD'
  var auth = config.getConfig().firebase.auth
  
  dispatch(fetchLoginRequest(method))
  
  return auth().signInWithEmailAndPassword(email, password)
    .then(response => {
      dispatch(fetchLoginSuccess(response, method))
      return response
    })
    .catch(response => {
      var error = {
        code    : response.code || 'auth/unkown-error',
        message : response.message || 'An unkown Error appeard'
      }
      dispatch(fetchLoginFailure(error, method))
      return error
    })
}

const authOLogin = (args) => dispatch => {
  var method = args.method
  var auth = config.getConfig().firebase.auth
  var request = args.requestType === 'redirect'
    ? () => {
      auth().signInWithRedirect(args.provider)
      return auth().getRedirectResult()
    } 
    : () => auth().signInWithPopup(args.provider)

  dispatch(fetchLoginRequest(method))

  return request()
    .then(response => {
      dispatch(fetchLoginSuccess(response, method))
      return response.user
    })
    .catch(response => {
      var error = {
        code    : response.code || 'auth/unkown-error',
        message : response.message || 'An unkown Error appeard'
      }
      dispatch(fetchLoginFailure(error, method))
      return error
    })
}

export const loginWithGoogle = (args) => dispatch => {
  var method = 'GOOGLE_AUTH_O'
  var auth = config.getConfig().firebase.auth
  var provider = new auth.GoogleAuthProvider()

  return authOLogin({
    method, 
    provider,
    requestType: args ? args.requestType : ''
  })(dispatch)
}

export const loginWithFacebook = (args) => dispatch => {
  var method = 'FACEBOOK_AUTH_O'
  var auth = config.getConfig().firebase.auth
  var provider = new auth.FacebookAuthProvider()

  return authOLogin({
    method, 
    provider,
    requestType: args ? args.requestType : ''
  })(dispatch)
}

export const loginWithGithub = (args) => dispatch => {
  var method = 'GITHUB_AUTH_O'
  var auth = config.getConfig().firebase.auth
  var provider = new auth.GithubAuthProvider()

  return authOLogin({
    method, 
    provider,
    requestType: args ? args.requestType : ''
  })(dispatch)
}

export const loginWithTwitter = (args) => dispatch => {
  var method = 'TWITTER_AUTH_O'
  var auth = config.getConfig().firebase.auth
  var provider = new auth.TwitterAuthProvider()

  return authOLogin({
    method, 
    provider,
    requestType: args ? args.requestType : ''
  })(dispatch)
}
