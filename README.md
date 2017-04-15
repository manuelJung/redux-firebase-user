# redux-firebase-user
This is a truely modular redux module, which handles authentication with firebase and react. It is not production ready!
Api will change heavily until v1.0.0

## Install
```
$ npm install --save redux-firebase-user
```


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

## HOCS

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