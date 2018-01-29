# redux-firebase-user
This is a truely modular redux module, which handles authentication with firebase and react. The goal of this module is to make authentication with firebase trivial. You can set up a whole signup process within minutes without worrying about state.

This Module exports the following
  - **RenderProps**: RenderProps inject behaviour within a local scope
  - **HOCs**: Higher ordered components, which inject behaviour in the wrapped React-Components
  - **Components**: Normal React-Components which interact with the reducer state
  - **Selectors**: Selectors for requesting the reducer state
  - **ActionTypes**: All the action types, the reducer uses
  - **Actions**: Dispatchable actions are used to modify the reducer state
  - **Configuration** Singleton: A singleton in order to customize the module

## Install
```
$ npm i -S redux-firebase-user
```

## Table of Contents

<!-- TOC -->

- [redux-firebase-user](#redux-firebase-user)
  - [Install](#install)
  - [Table of Contents](#table-of-contents)
  - [Setup](#setup)
  - [HOCs and RenderProps](#hocs-and-renderprops)
    - [withLoginForm & LoginForm](#withloginform--loginform)
    - [withLoginRequest & LoginRequest](#withloginrequest--loginrequest)
    - [withSignupForm & SignupForm](#withsignupform--signupform)
    - [withSignupRequest & SignupRequest](#withsignuprequest--signuprequest)
    - [withLogoutForm & LogoutForm](#withlogoutform--logoutform)
    - [withLogoutRequest & LogoutRequest](#withlogoutrequest--logoutrequest)
    - [withUser & User](#withuser--user)
  - [Components](#components)
    - [AuthOButtons](#authobuttons)
  - [Selectors](#selectors)
  - [ActionTypes](#actiontypes)
  - [Actions](#actions)

<!-- /TOC -->


## Setup
```javascript
// index,js
import userModule from 'redux-firebase-user'
import firebase from 'firebase'
import * as firebaseRef from 'firebase/app'

firebase.initializeApp(/* YOUR CONFIG */)

userModule.initializeModule({
  firebase: firebaseRef // NOT firebase! only 'firebase/app' holds methods for AuthO login
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

## HOCs and RenderProps

This module provides two ways to interact with the state on component level. One way is the usage of [hocs](https://reactjs.org/docs/higher-order-components.html) the other way is the usage of [RenderProps](https://reactjs.org/docs/render-props.html). Both technics tackle very similar problems and it's up to you, which way you prefer.

Here HOCs and RenderProps provide the same api. Every attribute a RenderProp Component can also be set in the configuation object of the hoc.
Example:

```javascript
import {withSearchForm, SearchForm} from 'redux-firebase-user'

// HOC
const ComponentWithHoc = withSearchForm({
  initialMail: 'user@example.com',
  initialPassword: 'password'
})(Component)

// you have also access to props:
const ComponentWithHoc = withSearchForm(props => ({
  initialMail: props.mail,
  initialPassword: props.password
}))(Component)

// RenderProp
const RenderPropComponent = () => (
  <div>
    <h1>Render Prop Component</h1>
    <SearchForm 
      initialMail='user@example.com'
      initialPassword='password'
      render={form => (
        <div>{/* your code with local scope */}</div>
      )}
    />
  <div>
)
```

Generally I would suggest to use a HOC, when the wrapped component is only build for this specific usecase, and to use a RenderProp in all other situations, because RenderProps can prevent [prop collisions](https://hackernoon.com/solving-the-problems-of-higher-order-components-without-throwing-the-baby-out-with-the-bathwater-40ddc72df5aa)



### withLoginForm & LoginForm

this RenderProp (HOC) provide functions and component props for a login form component. It has an internal state to manage the login credentials. 

**props**

| name            | type   | description                                                                                                                            |
|-----------------|--------|----------------------------------------------------------------------------------------------------------------------------------------|
| render          | func   | required only for render props. cb to render the component. all atributes listed below in the api will be given as parameter to the cb |
| initialMail | string | the mail the login form will be initialized with | 
| initialPassword | string | the password the login form will be initialized with |

**api**

| name           | type   | description                                              |
|----------------|--------|----------------------------------------------------------|
| login          | func   | `login()` logs the user in with the mail and password within the form |
| clearForm      | func   | `clearForm()` clears mail and password from the inner state |
| clearPassword  | func   | `clearPassword()` clears only the password from the inner state |
| isFetching     | bool   | whether or not the login response is fetched |
| fetchError     | obj or null | holds the error object, if an error occoured during login |
| emailInput     | props  | `<input {...emailInput}/>` props to manage an email input |
| passwordInput  | props  | `<input {...passwordInput}/>` props to manage an password input |
| submitInput    | props  | `<input {...submitInput}/>` props to manage the form submit input |
| form           | props  | `<form {...form}/>` props to manage the wrapping from. performs login request when submitted |


**usage**

```javascript
import React from 'react'
import { withLoginForm, LoginForm } from 'redux-firebase-user'

// HOC

const Component = ({ form, emailInput, passwordInput, submitInput, fetchError }) => (
  <form {...form}>
    {/* every logic of how to interact with the state is handled by the injected component props 
        Nevertheless you can alway overwrite the default props by simply adding the jsx props*/}
    <input {...emailInput} placeholder='my placeholder'/><br/>
    <input {...passwordInput} /><br/>
    <input {...submitInput} />
    {
      // if the last request fails, an error will be displayed here
      fetchError && <div>{ fetchError.message }</div>
    }
  </form>
)

const ComponentWithLoginForm = withLoginForm({
  initialMail: 'user@example.com'
})(Component)

//alternatively you have access to the passed props:

const ComponentWithLoginForm = withLoginForm(props => ({
  initialMail: props.mail
}))(Component)

// RenderProp

const Component = () => (
  <div>
    <h1>Login Form</h1>
    <LoginForm initialMail='user@example.com' render={form => (
      <form {...form.form}>
        <input {...form.emailInput}/><br/>
        <input {...form.passwordInput} /><br/>
        <input {...form.submitInput} />
        {form.etchError && <div>{ form.fetchError.message }</div>}
      </form>
    )}/>
  </div>
)

```

### withLoginRequest & LoginRequest

An alternative component to LoginForm without the component props but with authO login methods. Handles the login process

**props**

| name            | type   | description                                                                                                                            |
|-----------------|--------|----------------------------------------------------------------------------------------------------------------------------------------|
| render          | func   | required only for render props. cb to render the component. all atributes listed below in the api will be given as parameter to the cb |

**api**

| name              | type   | description                                              |
|-------------------|--------|----------------------------------------------------------|
| login             | func   | `login(mail, password)` logs the user in with the mail and password within the form |
| loginWithGoogle   | func   | `loginWithGoogle()` authO login for Google. will open a popup to login |
| loginWithFacebook | func   | `loginWithFacebook()` authO login for Facebook. will open a popup to login |
| loginWithGithub   | func   | `loginWithGithub()` authO login for Github. will open a popup to login |
| loginWithTwitter  | func   | `loginWithTwitter()` authO login for Twitter. will open a popup to login |
| loginWithGoogle   | func   | `loginWithGoogle()` authO login for Google. will open a popup to login |
| fetchError        | obj or null | holds the error object, if an error occoured during login |
| isFetching        | bool   | whether or not the login response is fetched |

**usage**

```javascript
import React from 'react'
import { withLoginRequest, LoginRequest } from 'redux-firebase-user'

// HOC

class Component extends React.Component {
  state = { mail: '', pwd: '' }

  updateMail = e => this.setState({mail: e.target.value})
  updatePwd  = e => this.setState({pwd: e.target.value})

  render(){
    let {mail, pwd} = this.state
    let {login, fetchError} = this.props

    return (
      <form onSubmit={() => login(mail, pwd)}>
        <input type='text' value={mail} onChange={this.updateMail}/>
        <input type='password' value={pwd} onChange={this.updatePwd}/>
        <button>submit</button>
        {
          // if the last request fails, an error will be displayed here
          fetchError && <div>{ fetchError.message }</div>
        }
      </form>
    )
  }
}

const ComponentWithLoginRequest = withLoginRequest()(Component)

// RenderProp

class Component extends React.Component {
  state = { mail: '', pwd: '' }

  updateMail = e => this.setState({mail: e.target.value})
  updatePwd  = e => this.setState({pwd: e.target.value})

  render(){
    let {mail, pwd} = this.state

    return (
      <div>
        <h1>Login Form</h1>
        <LoginRequest render={req => (
          <form onSubmit={() => req.login(mail, pwd)}>
            <input type='text' value={mail} onChange={this.updateMail}/>
            <input type='password' value={pwd} onChange={this.updatePwd}/>
            <button>submit</button>
            {
              // if the last request fails, an error will be displayed here
              req.fetchError && <div>{ req.fetchError.message }</div>
            }
          </form>
        )}/>
      </div>
    )
  }
}

```


### withSignupForm & SignupForm

this RenderProp (HOC) provide functions and component props for a signup form component. It has an internal state to manage the signup credentials. 

**props**

| name            | type   | description                                                                                                                            |
|-----------------|--------|----------------------------------------------------------------------------------------------------------------------------------------|
| render          | func   | required only for render props. cb to render the component. all atributes listed below in the api will be given as parameter to the cb |
| initialMail | string | the mail the signup form will be initialized with | 
| initialPassword | string | the password the signup form will be initialized with |

**api**

| name           | type   | description                                              |
|----------------|--------|----------------------------------------------------------|
| signup          | func   | `signup()` signs the user up with the mail and password within the form |
| clearForm      | func   | `clearForm()` clears mail and password from the inner state |
| clearPassword  | func   | `clearPassword()` clears only the password from the inner state |
| isFetching     | bool   | whether or not the signup response is fetched |
| fetchError     | obj or null | holds the error object, if an error occoured during signup |
| emailInput     | props  | `<input {...emailInput}/>` props to manage an email input |
| passwordInput  | props  | `<input {...passwordInput}/>` props to manage an password input |
| submitInput    | props  | `<input {...submitInput}/>` props to manage the form submit input |
| form           | props  | `<form {...form}/>` props to manage the wrapping from. performs signup request when submitted |


**usage**

```javascript
import React from 'react'
import { withSignupForm, SignupForm } from 'redux-firebase-user'

// HOC

const Component = ({ form, emailInput, passwordInput, submitInput, fetchError }) => (
  <form {...form}>
    {/* every logic of how to interact with the state is handled by the injected component props 
        Nevertheless you can alway overwrite the default props by simply adding the jsx props*/}
    <input {...emailInput} placeholder='my placeholder'/><br/>
    <input {...passwordInput} /><br/>
    <input {...submitInput} />
    {
      // if the last request fails, an error will be displayed here
      fetchError && <div>{ fetchError.message }</div>
    }
  </form>
)

const ComponentWithSignupForm = withSignupForm({
  initialMail: 'user@example.com'
})(Component)

//alternative you have access to the passed props:

const ComponentWithSignupForm = withSignupForm(props => ({
  initialMail: props.mail
}))(Component)

// RenderProp

const Component = () => (
  <div>
    <h1>Signup Form</h1>
    <SignupForm initialMail='user@example.com' render={form => (
      <form {...form.form}>
        <input {...form.emailInput}/><br/>
        <input {...form.passwordInput} /><br/>
        <input {...form.submitInput} />
        {form.etchError && <div>{ form.fetchError.message }</div>}
      </form>
    )}/>
  </div>
)

```


### withSignupRequest & SignupRequest

An alternative component to SignupForm without the component props. Handles the signup process

**props**

| name            | type   | description                                                                                                                            |
|-----------------|--------|----------------------------------------------------------------------------------------------------------------------------------------|
| render          | func   | required only for render props. cb to render the component. all atributes listed below in the api will be given as parameter to the cb |

**api**

| name              | type   | description                                              |
|-------------------|--------|----------------------------------------------------------|
| signup            | func   | `signup(mail, password)` signs the user up with the mail and password within the form |
| fetchError        | obj or null | holds the error object, if an error occoured during signup |
| isFetching        | bool   | whether or not the signup response is fetched |

**usage**

```javascript
import React from 'react'
import { withSignupRequest, SignupRequest } from 'redux-firebase-user'

// HOC

class Component extends React.Component {
  state = { mail: '', pwd: '' }

  updateMail = e => this.setState({mail: e.target.value})
  updatePwd  = e => this.setState({pwd: e.target.value})

  render(){
    let {mail, pwd} = this.state
    let {login, fetchError} = this.props

    return (
      <form onSubmit={() => login(mail, pwd)}>
        <input type='text' value={mail} onChange={this.updateMail}/>
        <input type='password' value={pwd} onChange={this.updatePwd}/>
        <button>submit</button>
        {
          // if the last request fails, an error will be displayed here
          fetchError && <div>{ fetchError.message }</div>
        }
      </form>
    )
  }
}

const ComponentWithSignupRequest = withSignupRequest()(Component)

// RenderProp

class Component extends React.Component {
  state = { mail: '', pwd: '' }

  updateMail = e => this.setState({mail: e.target.value})
  updatePwd  = e => this.setState({pwd: e.target.value})

  render(){
    let {mail, pwd} = this.state

    return (
      <div>
        <h1>Signup Form</h1>
        <SignupRequest render={req => (
          <form onSubmit={() => req.login(mail, pwd)}>
            <input type='text' value={mail} onChange={this.updateMail}/>
            <input type='password' value={pwd} onChange={this.updatePwd}/>
            <button>submit</button>
            {
              // if the last request fails, an error will be displayed here
              req.fetchError && <div>{ req.fetchError.message }</div>
            }
          </form>
        )}/>
      </div>
    )
  }
}

```


### withLogoutForm & LogoutForm

this RenderProp (HOC) provide functions and component props for a login form component. It has an internal state to manage the login credentials. 

**props**

| name            | type   | description                                                                                                                            |
|-----------------|--------|----------------------------------------------------------------------------------------------------------------------------------------|
| render          | func   | required only for render props. cb to render the component. all atributes listed below in the api will be given as parameter to the cb |

**api**

| name           | type   | description                                              |
|----------------|--------|----------------------------------------------------------|
| logout         | func   | `logout()` logs the user out |
| isFetching     | bool   | whether or not the logout response is fetched |
| fetchError     | obj or null | holds the error object, if an error occoured during logout |
| logoutButton   | props  | `<button {...logoutButton}/>` props to manage an logout button |


**usage**

```javascript
import React from 'react'
import { withLogoutForm, LogoutForm } from 'redux-firebase-user'

// HOC

const Component = ({ logoutButton, fetchError }) => (
  <div>
    <button {...logoutButton}>logout</button>
    {
      // if the last request fails, an error will be displayed here
      fetchError && <div>{ fetchError.message }</div>
    }
  </div>
)

const ComponentWithLogoutForm = withLogoutForm()(Component)

// RenderProp

const Component = () => (
  <div>
    <h1>Logout Form</h1>
    <LogoutForm render={form => (
      <div>
        <button {...logoutButton}>logout</button>
        {form.etchError && <div>{ form.fetchError.message }</div>}
      </div>
    )}/>
  </div>
)

```


### withLogoutRequest & LogoutRequest

An alternative component to LogoutForm without the component props. Handles the logout process

**props**

| name            | type   | description                                                                                                                            |
|-----------------|--------|----------------------------------------------------------------------------------------------------------------------------------------|
| render          | func   | required only for render props. cb to render the component. all atributes listed below in the api will be given as parameter to the cb |

**api**

| name              | type   | description                                              |
|-------------------|--------|----------------------------------------------------------|
| logout            | func   | `signup(mail, password)` loggs the user out |
| fetchError        | obj or null | holds the error object, if an error occoured during logout |
| isFetching        | bool   | whether or not the logout response is fetched |

**usage**

```javascript
import React from 'react'
import { withLogoutRequest, LogoutRequest } from 'redux-firebase-user'

// 

const Component = ({logout}) => (
  <button onClick={logout}>logout</button>
)


const ComponentWithLogoutRequest = withLogoutRequest()(Component)

// RenderProp

const Component = () => (
  <LogoutRequest render={req => (
    <button onClick={req.logout}>logout</button>
  )}/>
)

```


### withUser & User

This RenderProp (hoc) injects user data and can tell whether or not the user is logged in

**props**

| name            | type   | description                                                                                                                            |
|-----------------|--------|----------------------------------------------------------------------------------------------------------------------------------------|
| render          | func   | required only for render props. cb to render the component. all atributes listed below in the api will be given as parameter to the cb |

**api**

| name              | type   | description                                              |
|-------------------|--------|----------------------------------------------------------|
| profile           | object or null | holds the user object from firebase |
| isLoggedIn        | bool   | whether or not the user is logged in |

**usage**

```javascript
import React from 'react'
import { withUser, User } from 'redux-firebase-user'

// 

const Component = ({isLoggedIn, profile}) => (
  <div>
    <div>logged in: {isLoggedIn ? 'yes' : 'no'}</div>
    <div>user id: {profile && profile.uid}</div>
  </div>
)


const ComponentWithLogoutRequest = withUser()(Component)

// RenderProp

const Component = () => (
  <div>
    <h1>User Stats</h1>
    <User render={user => (
      <div>
        <div>logged in: {user.isLoggedIn ? 'yes' : 'no'}</div>
        <div>user id: {user.profile && user.profile.uid}</div>
      </div>
    )}/>
  </div>
)

```





## Components

### AuthOButtons

The following AuthO button components are provided:

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


## ActionTypes

These are the actionTypes this module uses to handle reducer state change:

| name                      | description |
|---------------------------|-------------|
| user/FETCH_LOGIN_REQUEST  | User trys to login with emailAndPassword or via a autO provider |
| user/FETCH_LOGIN_SUCCESS  | User successfully logged in with emailAndPassword or via a autO provider |
| user/FETCH_LOGIN_FAILURE  | User failed to login with emailAndPassword or via a autO provider |
| user/FETCH_SIGNUP_REQUEST | User trys to signup with emailAndPassword |
| user/FETCH_SIGNUP_SUCCESS | User successfully signed up with emailAndPassword |
| user/FETCH_SIGNUP_FAILURE | User failed to signup with emailAndPassword |
| user/FETCH_LOGOUT_REQUEST | User trys to logout |
| user/FETCH_LOGOUT_SUCCESS | User successfully logged out |
| user/FETCH_LOGOUT_FAILURE | User failed to logout |

```javascript
// your reducer
import { actionTypes as t } from 'redux-firebase-user'

export default function countReducer = (state = 0, action) {
  switch (action.type) {
    
    case t.FETCH_LOGOUT_SUCCESS: return 0

    default: return state
  }
}
```

## Actions

```javascript
import { login, logout, signup } from 'redux-firebase-user'
import { 
  loginWithGoogle, 
  loginWithFacebook, 
  loginWithGithub, 
  loginWithTwitter 
} from 'redux-firebase-user'

// login user
dispatch(login('user@example.com', 'password'))

// logout user
dispatch(logout())

// signup user
dispatch(signup('user@example.com', 'password'))

// authO login
dispatch(loginWithGoogle())
dispatch(loginWithFacebook())
dispatch(loginWithGithub())
dispatch(loginWithTwitter())

```

