import * as t from '../actionTypes'
import config from '../config'


export const fetchSignupRequest = (email, password) => ({
  type: t.FETCH_SIGNUP_REQUEST,
  meta: { email, password }
})

export const fetchSignupSuccess = (email, password, payload) => ({
  type: t.FETCH_SIGNUP_SUCCESS,
  meta: { email, password },
  payload
})

export const fetchSignupFailure = (email, password, error) => ({
  type: t.FETCH_SIGNUP_FAILURE,
  meta: { email, password },
  error: true,
  payload: error
})


export default (email, password) => dispatch => {
  dispatch(fetchSignupRequest(email, password))
  
  var auth = config.getConfig().firebase.auth()
  
  return auth.createUserWithEmailAndPassword(email, password)
    .then(response => {
      dispatch(fetchSignupSuccess(email, password, response))
      return response
    })
    .catch(error => {
      dispatch(fetchSignupFailure(email, password, error))
      return error
    })
}