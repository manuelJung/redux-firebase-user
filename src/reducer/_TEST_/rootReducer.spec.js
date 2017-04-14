import test from 'tape'
import reducer, { selectors } from '../index.js'
import { fetchLoginSuccess } from '../../actions/login'
import { fetchLogoutSuccess } from '../../actions/logout'


test('reducer => root => FETCH_LOGIN_SUCCESS', t => {
    var state = { user: null }
    var action = fetchLoginSuccess("new User", "method")
    var newState = reducer(state, action)

    t.is(newState.user, "new User",
        "the user should be set to the action payload"
    )

    t.end()
})

test('reducer => root => FETCH_LOGOUT_SUCCESS', t => {
    var state = { user: "user" }
    var action = fetchLogoutSuccess()
    var newState = reducer(state, action)

    t.is(newState.user, null,
        "the user should be set to null"
    )

    t.end()
})
