import * as t from '../actionTypes'
import config from '../config'

export const fetchLogoutRequest = () => ({
  type: t.FETCH_LOGOUT_REQUEST,
})

export const fetchLogoutSuccess = () => ({
  type: t.FETCH_LOGOUT_SUCCESS
})

export const fetchLogoutFailure = (error) => ({
  type: t.FETCH_LOGOUT_FAILURE,
  error: true,
  payload: error
})


export default () => dispatch => {
  dispatch(fetchLogoutRequest())
  
  var auth = config.getConfig().firebase.auth()
  
  return auth.signOut()
    .then(response => {
      dispatch(fetchLogoutSuccess())
      return response
    })
    .catch(error => {
      dispatch(fetchLogoutFailure(error))
      return error
    })
}