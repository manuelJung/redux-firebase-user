import * as t from '../actionTypes'



const defaultState = {
  error       : null,
  isFetching  : false,
  fetchFailed : false,
}

export default function reducer (state = defaultState, action) {
  switch (action.type) {
    case t.FETCH_LOGIN_REQUEST: return { ...state, isFetching: true, fetchFailed: false, error: null }
    case t.FETCH_LOGIN_FAILURE: return { ...state, isFetching: false, fetchFailed: true, error: action.payload }
    case t.FETCH_LOGIN_SUCCESS: return { ...state, isFetching: false }
    
    default:
      return state
  }
}


export const selectors = {
  isFetching  : (state) => state.isFetching,
  fetchFailed : (state) => state.fetchFailed,
  getError    : (state) => state.error
}