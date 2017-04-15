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

export const loginWithGoogle = () => dispatch => {
  var method = 'GOOGLE_SIGNIN'
  var auth = config.getConfig().firebase.auth
  var provider = new auth.GoogleAuthProvider()
  
  dispatch(fetchLoginRequest(method))
  
  return auth().signInWithPopup(provider)
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