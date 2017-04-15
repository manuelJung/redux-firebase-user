import test from 'tape'
import login from '../login'
import sinon from 'sinon'
import config from '../../config'
import * as types from '../../actionTypes'


var loginMock = (email, password, resolveOrReject, response) => {
    var dispatchSpy = sinon.spy()
    var requestSpy = sinon.stub()

    if(resolveOrReject == 'resolve'){
        config.setConfig({
            firebase: { auth: () => ({
                signInWithEmailAndPassword: requestSpy.resolves(response)
            })}
        }) 
    }
    else {
        config.setConfig({
            firebase: { auth: () => ({
                signInWithEmailAndPassword: requestSpy.rejects(response)
            })}
        }) 
    }
    
    return {
        dispatchSpy: dispatchSpy,
        requestSpy: requestSpy,
        login: () => login(email, password)(dispatchSpy)
    }
}

test('thunk => login (success)', t => {

    var { dispatchSpy, requestSpy, login } = loginMock("email", "password", "resolve", "user")
    
    login().then(result => {

        t.assert(requestSpy.calledWith("email", "password"),
            "firebase login (emailAndPassword) should have been called"
        )

        t.assert(dispatchSpy.calledTwice,
            "two actions should have been dispatched"
        )

        t.is(dispatchSpy.firstCall.args[0].type, types.FETCH_LOGIN_REQUEST,
            "FETCH_LOGIN_REQUEST should have been dispatched first"
        )

        t.is(dispatchSpy.secondCall.args[0].type, types.FETCH_LOGIN_SUCCESS,
            "FETCH_LOGIN_SUCCESS should have been dispatched second"
        )

        t.is(dispatchSpy.firstCall.args[0].meta.method, 'EMAIL_AND_PASSWORD',
            "the method 'EMAIL_AND_PASSWORD' should have been injected to the first dispatched action as meta"
        )

        t.is(dispatchSpy.secondCall.args[0].meta.method, 'EMAIL_AND_PASSWORD',
            "the method 'EMAIL_AND_PASSWORD' should have been injected to the second dispatched action as meta"
        )

        t.end()

    })
})

test('thunk => login (failure)', t => {

    var { dispatchSpy, requestSpy, login } = loginMock("email", "password", "reject", "error")
    
    login().then(result => {

        t.assert(requestSpy.calledWith("email", "password"),
            "firebase login (emailAndPassword) should have been called"
        )

        t.assert(dispatchSpy.calledTwice,
            "two actions should have been dispatched"
        )

        t.is(dispatchSpy.firstCall.args[0].type, types.FETCH_LOGIN_REQUEST,
            "FETCH_LOGIN_REQUEST should have been dispatched first"
        )

        t.is(dispatchSpy.secondCall.args[0].type, types.FETCH_LOGIN_FAILURE,
            "FETCH_LOGIN_FAILURE should have been dispatched second"
        )

        t.is(dispatchSpy.firstCall.args[0].meta.method, 'EMAIL_AND_PASSWORD',
            "the method 'EMAIL_AND_PASSWORD' should have been injected to the first dispatched action as meta"
        )

        t.is(dispatchSpy.secondCall.args[0].meta.method, 'EMAIL_AND_PASSWORD',
            "the method 'EMAIL_AND_PASSWORD' should have been injected to the second dispatched action as meta"
        )

        t.end()

    })
})