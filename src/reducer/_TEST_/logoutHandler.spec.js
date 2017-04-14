import test from 'tape'
import reducer, { selectors, defaultState } from '../logoutHandler'
import { fetchLogoutRequest, fetchLogoutFailure, fetchLogoutSuccess } from '../../actions/logout'


test('reducer => logoutHandler => FETCH_LOGOUT_REQUEST', t => {
    var state = {
        error: "some error",
        isFetching: false,
        fetchFailed: true
    }
    var action = fetchLogoutRequest()
    var newState = reducer(state, action)

    t.is(newState.isFetching, true,
        "isFetching flag should be set to true"
    )

    t.is(newState.fetchFailed, false,
        "fetchFailed flag should be reset to false"
    )

    t.is(newState.error, null,
        "previous error should be cleared"
    )

    t.end()
})

test('reducer => logoutHandler => FETCH_LOGOUT_FAILURE', t => {
    var state = {
        isFetching: true,
        fetchFailed: false,
        error: null
    }
    var action = fetchLogoutFailure("error")
    var newState = reducer(state, action)

    t.is(newState.isFetching, false,
        "isFetching flag should be set to false"
    )

    t.is(newState.fetchFailed, true,
        "fetchFailed flag should be set to true"
    )

    t.is(newState.error, "error",
        "the request error should be set to the action payload"
    )

    t.end()
})

test('reducer => logoutHandler => FETCH_LOGOUT_SUCCESS', t => {
    var state = {
        isFetching: true,
        fetchFailed: false,
        error: null
    }
    var action = fetchLogoutSuccess()
    var newState = reducer(state, action)

    t.is(newState.isFetching, false,
        "isFetching flag should be set to false"
    )

    t.end()
})