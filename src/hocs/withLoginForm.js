import React from 'react'
import PropTypes from 'prop-types'
import { isFetchingLogin, loginFetchFailed, getLoginFetchError } from '../selectors'
import { login as loginAction } from '../actions'
import config from '../config'


export default (BaseComponent) => class WithLoginForm extends React.Component {
  
  static contextTypes = {
    store: PropTypes.object
  }
  
  state = {
    username: '',
    password: ''
  }
  
  unsubscribeStore = null
  hasMounted = false
  
  componentWillMount () {
    const store = this.context.store
    var state   = store.getState()
    this.hasMounted  = true
    
    this.unsubscribeStore = store.subscribe(() => {
      const nextState = store.getState()
      const shouldForceUpdate = state && this.shouldForceUpdate(state, nextState)
      state = nextState
      if(shouldForceUpdate && this.hasMounted){
        this.forceUpdate()
      }
    })
  }
  
  componentWillUnmount () {
    this.unsubscribeStore()
    this.hasMounted = false
  }
  
  shouldForceUpdate (prevState, nextState) {
    const reducerKey = config.getConfig().reducerKey
    return prevState[reducerKey] !== nextState[reducerKey]
  }
  
  getInjection () {
    const state = this.context.store.getState()
    const dispatch = this.context.store.dispatch
    
    const login         = () => dispatch(loginAction(this.state.username, this.state.password))
    const clearForm     = () => this.setState({ username: '', password: ''})
    const clearPassword = () => this.setState({ password: ''})
    
    return {
      
      loginForm: {
        isFetching  : isFetchingLogin(state),
        fetchFailed : loginFetchFailed(state),
        fetchError  : getLoginFetchError(state)
      },
      
      loginFormActions: { clearForm, clearPassword, login },
      
      loginFormComponents: {
        emailInput: {
          value: this.state.username,
          onChange: (e) => this.setState({ username: e.target.value}),
          placeholder: 'E-Mail',
          type: 'text'
        },
        passwordInput: {
          value: this.state.password,
          onChange: (e) => this.setState({ password: e.target.value}),
          placeholder: 'Passwort',
          type: 'password'
        },
        submitInput: {
          onClick: (e) => {
            e.preventDefault()
            login()
          },
          type: 'submit',
          value: 'Submit'
        },
        submitButton: {
          onClick: login,
        }
      }
    }
  }
  
  render () {
    var injection = this.getInjection()
    return <BaseComponent {...injection} {...this.props} />
  }
}