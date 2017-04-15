# redux-firebase-user
This is a truely modular redux module, which handles authentication with firebase and react. It is not production ready!
Api will change heavily until v1.0.0

## Install
```
$ npm install --save redux-firebase-user
```

## Table of Contents

<!-- TOC -->

- [redux-firebase-user](#redux-firebase-user)
    - [Install](#install)
    - [Table of Contents](#table-of-contents)
    - [Setup](#setup)
    - [HOCs](#hocs)
        - [withLoginForm](#withloginform)
            - [api](#api)
            - [usage](#usage)
        - [withLogoutButton](#withlogoutbutton)
            - [api](#api-1)
            - [usage](#usage-1)
        - [withLoginRequest](#withloginrequest)
            - [api](#api-2)
            - [request](#request)

<!-- /TOC -->


## Setup
```javascript
// index,js
import userModule from 'redux-firebase-user'
import firebase from 'firebase'
import * as firebaseRef from 'firebase/app'

firebase.initializeApp(/* YOUR CONFIG */)

userModule.initializeModule({
  firebase: firebaseRef // NOT firebase!
})

// reducer.js
import { createStore, combineReducers } from 'redux'
import { reducer as userReducer } from 'redux-firebase-user'

const reducers = {
  // ... your other reducers here ...
  user: userReducer
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)
```

## HOCs

### withLoginForm

this hoc provides functions and component props for a login form component

#### api

| name           | type   | injection                | explanation                                              |
|----------------|--------|--------------------------|----------------------------------------------------------|
| emailInput     | props  | props.loginFormComponent | input props for the email-input (value, onChange, placeholder, type) |
| passwordInput  | props  | props.loginFormComponent | input props for the password-input (value, onChange, placeholder, type) |
| submitInput    | props  | props.loginFormComponent | input props for the submit-input (onClick, type, value) |
| submitButton   | props  | props.loginFormComponent | button props for the submit-button (onClick) |
| clearForm      | action | props.loginFormActions   | () => clears password and email input |
| clearPasssword | action | props.loginFormActions   | () => clears password input |
| login          | action | props.loginFormActions   | () => fetch login by current value of email and password input |
| isFetching     | prop   | props.loginForm          | bool; true if login request is currently performing |
| fetchFailed    | prop   | props.loginForm          | bool; true if last login request failed |
| fetchError     | prop   | props.loginForm          | { code: string, message: string }; holds an error if the last request failed |

#### usage

```javascript
import React from 'react'
import { hocs } from 'redux-firebase-user'

const { withLoginForm } = hocs


export const LoginForm = ({
  loginFormComponents: { emailInput, passwordInput, submitInput },
  loginForm: { isFetching, fetchFailed, fetchError }
}) => (
  <div>
    <input {...emailInput} /><br/>
    <input {...passwordInput} /><br/>
    <input {...submitInput} />
    {
      fetchFailed && <div>{ fetchError.message }</div>
    }
  </div>
)

export default withLoginForm(LoginForm)
```

### withLogoutButton

this hoc provides functions and component props for a logout button

#### api

| name           | type   | injection                | explanation                                              |
|----------------|--------|--------------------------|----------------------------------------------------------|
| logoutButton   | props  | props.logoutButtonComponents | input props for a logout button (onClick) |
| logout         | action | props.logoutButtonActions    | () =>  logs user out |
| isFetching     | prop   | props.logoutButton           | bool; true if logout request is currently performing |
| fetchFailed    | prop   | props.logoutButton           | bool; true if last logout request failed |
| fetchError     | prop   | props.logoutButton           | { code: string, message: string }; holds an error if the last request failed |


#### usage

```javascript
import React from 'react'
import { hocs } from 'redux-firebase-user'

const { withLogoutButton } = hocs


export const LogoutForm = ({
  logoutButtonComponents: { logoutButton },
  logoutButton: { isFetching, fetchFailed, fetchError }
}) => (
  <div>
    <button {...logoutButton}>Logout</button><br/>
    {
      fetchFailed && <div>{ fetchError.message }</div>
    }
  </div>
)

export default withLogoutButton(LogoutForm)
```


### withLoginRequest

this hoc provides functions and props for logging in a user

#### api

| name            | type   | injection                | explanation                                              |
|-----------------|--------|--------------------------|----------------------------------------------------------|
| login           | action | props.loginRequestActions | (email, password) =>  logs user in |
| loginWithGoogle | action | props.loginRequestActions | () =>  logs user with google authO in (popup) |
| isFetching      | prop   | props.loginRequest        | bool; true if login request is currently performing |
| fetchFailed     | prop   | props.loginRequest        | bool; true if last login request failed |
| fetchError      | prop   | props.loginRequest        | { code: string, message: string }; holds an error if the last request failed |

#### request

```javascript
import React from 'react'
import { hocs } from 'redux-firebase-user'

const { withLoginRequest } = hocs


export const LoginForm = ({
  loginRequest: { isFetching, fetchFailed, fetchError },
  loginRequestActions: { loginWithGoogle }
}) => (
  <div>
    <button onClick={loginWithGoogle}>Login with Google</button>
    {
      fetchFailed && <div>{ fetchError.message }</div>
    }
  </div>
)

export default withLoginRequest(LoginForm)
```