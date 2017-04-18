import React from 'react'
import PropTypes from 'prop-types'
import { isFetchingSignup, signupFetchFailed, getSignupFetchError } from '../selectors'
import { signup as signupAction } from '../actions'
import config from '../config'



export default (BaseComponent) => class WithSignupRequest extends React.Component {
  
  static contextTypes = {
    store: PropTypes.object
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
    
    const signup = (email, password) => dispatch(signupAction(email, password))
    
    return {
      
      signupRequest: {
        isFetching  : isFetchingSignup(state),
        fetchFailed : signupFetchFailed(state),
        fetchError  : getSignupFetchError(state)
      },
      
      signupRequestActions: { signup },
      
    }
  }
  
  render () {
    var injection = this.getInjection()
    return <BaseComponent {...injection} {...this.props} />
  }
}