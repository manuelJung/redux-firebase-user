import test from 'tape'
import * as selectors from '../selectors'
import config from '../config'

config.setConfig({ firebase: "firebase "})

// User

test('selector => getUser', t => {
    var state = { user: {
        user: "user"
    }}
    var selection = selectors.getUser(state)

    t.is(selection, "user",
        "it should return the user if exists"
    )

    t.end()
})

test('selector => isLoggedIn', t => {
    var state = { user: {
        user: "user"
    }}
    var selection = selectors.isLoggedIn(state)

    t.is(selection, true,
        "it should return true, if a user exists"
    )

    state = { user: {
        user: null
    }}
    var selection = selectors.isLoggedIn(state)

    t.is(selection, false,
        "it should return false, if no user exists"
    )

    t.end()
})

// Login

test('selector => isFetchingLogin', t => {
    var state = { user: {
        loginRequest: { isFetching: true }
    }}
    var selection = selectors.isFetchingLogin(state)

    t.is(selection, true,
        "it should return true, if user is fetching login request"
    )

    var state = { user: {
        loginRequest: { isFetching: false }
    }}
    selection = selectors.isFetchingLogin(state)

    t.is(selection, false,
        "it should return false, if user does not fetch login request"
    )

    t.end()
})

test("selector => loginFetchFailed", t => {
    var state = { user: {
        loginRequest: { fetchFailed: true }
    }}
    var selection = selectors.loginFetchFailed(state)

    t.is(selection, true,
        "it should return true, if the last login request failed"
    )

    state = { user: {
        loginRequest: { fetchFailed: false }
    }}
    selection = selectors.loginFetchFailed(state)

    t.is(selection, false,
        "it should return false, if the last login request does not fail"
    )

    t.end()
})

test("selector => getLoginFetchError", t => {
    var state = { user: {
        loginRequest: { error: "error" }
    }}
    var selection = selectors.getLoginFetchError(state)

    t.is(selection, "error",
        "it should return the error if the last login request failed"
    )

    t.end()
})

// Logout

test('selector => isFetchingLogout', t => {
    var state = { user: {
        logoutRequest: { isFetching: true }
    }}
    var selection = selectors.isFetchingLogout(state)

    t.is(selection, true,
        "it should return true, if user is fetching logout request"
    )

    var state = { user: {
        logoutRequest: { isFetching: false }
    }}
    selection = selectors.isFetchingLogout(state)

    t.is(selection, false,
        "it should return false, if user does not fetch logout request"
    )

    t.end()
})

test("selector => logoutFetchFailed", t => {
    var state = { user: {
        logoutRequest: { fetchFailed: true }
    }}
    var selection = selectors.logoutFetchFailed(state)

    t.is(selection, true,
        "it should return true, if the last logout request failed"
    )

    state = { user: {
        logoutRequest: { fetchFailed: false }
    }}
    selection = selectors.logoutFetchFailed(state)

    t.is(selection, false,
        "it should return false, if the last logout request does not fail"
    )

    t.end()
})

test("selector => getLogoutFetchError", t => {
    var state = { user: {
        logoutRequest: { error: "error" }
    }}
    var selection = selectors.getLogoutFetchError(state)

    t.is(selection, "error",
        "it should return the error if the last logout request failed"
    )

    t.end()
})

// Signup

test('selector => isFetchingSignup', t => {
    var state = { user: {
        signupRequest: { isFetching: true }
    }}
    var selection = selectors.isFetchingSignup(state)

    t.is(selection, true,
        "it should return true, if user is fetching signup request"
    )

    var state = { user: {
        signupRequest: { isFetching: false }
    }}
    selection = selectors.isFetchingSignup(state)

    t.is(selection, false,
        "it should return false, if user does not fetch signup request"
    )

    t.end()
})

test("selector => signupFetchFailed", t => {
    var state = { user: {
        signupRequest: { fetchFailed: true }
    }}
    var selection = selectors.signupFetchFailed(state)

    t.is(selection, true,
        "it should return true, if the last signup request failed"
    )

    state = { user: {
        signupRequest: { fetchFailed: false }
    }}
    selection = selectors.signupFetchFailed(state)

    t.is(selection, false,
        "it should return false, if the last signup request does not fail"
    )

    t.end()
})

test("selector => getSignupFetchError", t => {
    var state = { user: {
        signupRequest: { error: "error" }
    }}
    var selection = selectors.getSignupFetchError(state)

    t.is(selection, "error",
        "it should return the error if the last signup request failed"
    )

    t.end()
})
