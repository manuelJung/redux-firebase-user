import React from 'react'
import PropTypes from 'prop-types'
import { isFetchingSignup, signupFetchFailed, getSignupFetchError } from '../selectors'
import { signup as signupAction } from '../actions'
import config from '../config'


export default (BaseComponent) => class WithSignupForm extends React.Component {
  
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
    
    const signup        = () => dispatch(signupAction(this.state.username, this.state.password))
    const clearForm     = () => this.setState({ username: '', password: ''})
    const clearPassword = () => this.setState({ password: ''})
    
    return {
      
      signupForm: {
        isFetching  : isFetchingSignup(state),
        fetchFailed : signupFetchFailed(state),
        fetchError  : getSignupFetchError(state)
      },
      
      signupFormActions: { clearForm, clearPassword, signup },
      
      signupFormComponents: {
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
            signup()
          },
          type: 'submit',
          value: 'Submit'
        },
        submitButton: {
          onClick: signup,
        }
      }
    }
  }
  
  render () {
    var injection = this.getInjection()
    return <BaseComponent {...injection} {...this.props} />
  }
}