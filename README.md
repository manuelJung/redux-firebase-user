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
        - [withAutoLogin](#withautologin)
            - [api](#api-1)
            - [usage](#usage-1)
        - [withSignupForm](#withsignupform)
            - [api](#api-2)
            - [usage](#usage-2)
        - [withLogoutButton](#withlogoutbutton)
            - [api](#api-3)
            - [usage](#usage-3)
        - [withLoginRequest](#withloginrequest)
            - [api](#api-4)
            - [request](#request)
        - [withLogoutRequest](#withlogoutrequest)
            - [api](#api-5)
            - [request](#request-1)
        - [withSignupRequest](#withsignuprequest)
            - [api](#api-6)
            - [request](#request-2)
    - [Components](#components)
        - [AuthOButtons](#authobuttons)
    - [Selectors](#selectors)

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

### withAutoLogin

this hoc is responsible for auto login a user. When at least one component is wrapped with this hoc then the user will be auto logged in (if the user was logged in when he left the website on the previous session)

#### api

| name           | type   | injection                | explanation                                              |
|----------------|--------|--------------------------|----------------------------------------------------------|
| awaitingResponse   | props  | props.autoLogin | true, if auto login is currently performing |

#### usage

```javascript
import React from 'react'
import { hocs } from 'redux-firebase-user'

const { withAutoLogin } = hocs


export const AppWrapper = (
  autoLogin: { awaitingResponse }
}) => (
  <div>
    {
      awaitingResponse
        ? <div>waiting for login...</div>
        : <App/>
    }
  </div>
)

export default withAutoLogin(AppWrapper)
```



### withSignupForm

this hoc provides functions and component props for a signup form component

#### api

| name           | type   | injection                | explanation                                              |
|----------------|--------|--------------------------|----------------------------------------------------------|
| emailInput     | props  | props.signupFormComponent | input props for the email-input (value, onChange, placeholder, type) |
| passwordInput  | props  | props.signupFormComponent | input props for the password-input (value, onChange, placeholder, type) |
| submitInput    | props  | props.signupFormComponent | input props for the submit-input (onClick, type, value) |
| submitButton   | props  | props.signupFormComponent | button props for the submit-button (onClick) |
| clearForm      | action | props.signupFormActions   | () => clears password and email input |
| clearPasssword | action | props.signupFormActions   | () => clears password input |
| signup         | action | props.signupFormActions   | () => fetch signup by current value of email and password input |
| isFetching     | prop   | props.signupForm          | bool; true if signup request is currently performing |
| fetchFailed    | prop   | props.signupForm          | bool; true if last signup request failed |
| fetchError     | prop   | props.signupForm          | { code: string, message: string }; holds an error if the last request failed |

#### usage

```javascript
import React from 'react'
import { withSignupForm } from 'redux-firebase-user'

export const SignupForm = ({
  signupFormComponents: { emailInput, passwordInput, submitInput },
  signupForm: { isFetching, fetchFailed, fetchError }
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

export default withSignupForm(SignupForm)
```

### withLogoutButton

this hoc provides functions and component props for a logout button. Is nearly the same as the withLogoutRequest hoc. 

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
import { withLogoutButton } from 'redux-firebase-user'

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
import { withLoginRequest } from 'redux-firebase-user'

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


### withLogoutRequest

this hoc provides functions and props for logging in a user

#### api

| name            | type   | injection                | explanation                                              |
|-----------------|--------|--------------------------|----------------------------------------------------------|
| logout          | action | props.logoutRequestActions | (email, password) =>  logs user out |
| isFetching      | prop   | props.logoutRequest        | bool; true if logout request is currently performing |
| fetchFailed     | prop   | props.logoutRequest        | bool; true if last logout request failed |
| fetchError      | prop   | props.logoutRequest        | { code: string, message: string }; holds an error if the last request failed |

#### request

```javascript
import React from 'react'
import { withLogoutRequest } from 'redux-firebase-user'

export const LogoutForm = ({
  logoutRequest: { isFetching, fetchFailed, fetchError },
  logoutRequestActions: { logout }
}) => (
  <div>
    <button onClick={logout}>Logout</button>
    {
      fetchFailed && <div>{ fetchError.message }</div>
    }
  </div>
)

export default withLogoutRequest(LogoutForm)
```


### withSignupRequest

this hoc provides functions and props for signing up a user. Not working yet

#### api

| name            | type   | injection                | explanation                                              |
|-----------------|--------|--------------------------|----------------------------------------------------------|
| signup          | action | props.signupRequestActions | (email, password) =>  signs a user up |
| isFetching      | prop   | props.signupRequest        | bool; true if signup request is currently performing |
| fetchFailed     | prop   | props.signupRequest        | bool; true if last signup request failed |
| fetchError      | prop   | props.signupRequest        | { code: string, message: string }; holds an error if the last request failed |

#### request

```javascript

```


## Components

### AuthOButtons

Currently the only AuthO Login method implemented is the Google AuthO method. 
This will change soon. The following AuthO button components are provided:

  - GoogleAuthOButton
  - FacebookAuthOButton
  - GithubAuthOButton
  - TwitterAuthOButton

```javascript
import React from 'react'
import {
  GoogleAuthOButton, 
  GithubAuthOButton, 
  FacebookAuthOButton, 
  TwitterAuthOButton
} from 'redux-firebase-user'


export const LoginForm = () => (
  <div>
    <GoogleAuthOButton/>
    <GithubAuthOButton/>
    <FacebookAuthOButton/>
    <TwitterAuthOButton/>
  </div>
)

export default LoginForm
```

All of these buttons share the same propTypes

| name | type | default | description |
|------|------|---------|-------------|
| background | string | depends on button | the background color of the button |
| color | string | whitesmoke | the text and icon color |
| size | string / number | 1.0 | the size of the whole button (example: "1.5" or 0.5) |
| width | string / number | auto | the width of the button (number is in pixel) |
| hideText | bool | false | whether or not a text should be displayed. Set to true, if you only want to show the icon |
| text | string | "Login with METHOD" | the button label |
| children | string | | same as text (if both set, children will win) |



## Selectors

Although this library provides serveral selectors, the recommended way to get a shape of the state is via hocs. But if no hoc fulfill your needs, you are also able to access the user state by a set of serveral selectors. All of them accepts the global state (not the user state) as the first state argument and optional further arguments. These selectors can be accessed via 

```javascript
import { getUser, isLoggedIn } from 'redux-firebase-user'

let user = getUser(state)
let loggedIn = isLoggedIn(state)
```

Here is the full list of all available selectors:

| name                | arguments | return        | description |
|---------------------|-----------|---------------|-------------|
| getUser             | state     | null / object | returns the login details of the currently logged in user |
| isLoggedIn          | state     | bool          | returns whether or not the user is currently logged in |
| isFetchingLogin     | state     | bool          | returns whether or not the user currently trys to log in |
| loginFetchFailed    | state     | bool          | true if the last login failed |
| getLoginFetchError  | state     | null / string | holds the error, if the last login failed |
| isFetchingLogout    | state     | bool          | returns whether or not the user currently trys to log out |
| logoutFetchFailed   | state     | bool          | true if the last logout failed |
| getLogoutFetchError | state     | null / string | holds the error, if the last logout failed |
| isFetchingSignup    | state     | bool          | returns whether or not the user currently trys to sign up |
| signupFetchFailed   | state     | bool          | true if the last signup failed |
| getSignupFetchError | state     | null / string | holds the error, if the last signup failed |

