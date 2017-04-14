import * as t from '../actionTypes'



export const defaultState = {
  error       : null,
  isFetching  : false,
  fetchFailed : false,
}

// const updaters = {
//   waitForResponse: (state) => ({ ...state, isFetching: true, fetchFailed: false, error: null }),
//   setResponseError: (state, error) => ({ ...state, isFetching: false, fetchFailed: true, error}),
//   setResponseSuccess: (state) => ({ ...state, isFetching: false })
// }

export default function reducer (state = defaultState, action) {
  switch (action.type) {
    case t.FETCH_LOGIN_REQUEST: return { ...state, isFetching: true, fetchFailed: false, error: null }
    case t.FETCH_LOGIN_FAILURE: return { ...state, isFetching: false, fetchFailed: true, error: action.payload }
    case t.FETCH_LOGIN_SUCCESS: return { ...state, isFetching: false }
    
    // case t.FETCH_LOGIN_REQUEST: return updaters.waitForResponse(state)

    default:
      return state
  }
}


export const selectors = {
  isFetching  : (state) => state.isFetching,
  fetchFailed : (state) => state.fetchFailed,
  getError    : (state) => state.error
}