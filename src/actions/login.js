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

const authOLogin = (config) => dispatch => {
  var method = config.method

  dispatch(fetchLoginRequest(method))

  return config.request()
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

export const loginWithGoogle = () => dispatch => {
  var method = 'GOOGLE_AUTH_O'
  var auth = config.getConfig().firebase.auth
  var provider = new auth.GoogleAuthProvider()
  var request = () => auth().signInWithPopup(provider)

  return authOLogin({
    method, 
    request
  })(dispatch)
}

export const loginWithFacebook = () => dispatch => {
  var method = 'FACEBOOK_AUTH_O'
  var auth = config.getConfig().firebase.auth
  var provider = new auth.FacebookAuthProvider()
  var request = () => auth().signInWithPopup(provider)

  return authOLogin({
    method, 
    request
  })(dispatch)
}

export const loginWithGithub = () => dispatch => {
  var method = 'GITHUB_AUTH_O'
  var auth = config.getConfig().firebase.auth
  var provider = new auth.GithubAuthProvider()
  var request = () => auth().signInWithPopup(provider)

  return authOLogin({
    method, 
    request
  })(dispatch)
}

export const loginWithTwitter = () => dispatch => {
  var method = 'TWITTER_AUTH_O'
  var auth = config.getConfig().firebase.auth
  var provider = new auth.TwitterAuthProvider()
  var request = () => auth().signInWithPopup(provider)

  return authOLogin({
    method, 
    request
  })(dispatch)
}
