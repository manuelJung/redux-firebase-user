import React from 'react'
import { isFetchingLogin, loginFetchFailed, getLoginFetchError } from '../selectors'
import { login as loginAction, loginWithGoogle as loginWithGoogleAction } from '../actions'
import config from '../config'


export default (BaseComponent) => class WithLoginRequest extends React.Component {
  
  static contextTypes = {
    store: React.PropTypes.object
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
    
    const login           = (username, password) => dispatch(loginAction(username, password))
    const loginWithGoogle = () => dispatch(loginWithGoogleAction())
    
    return {
      
      loginRequest: {
        isFetching  : isFetchingLogin(state),
        fetchFailed : loginFetchFailed(state),
        fetchError  : getLoginFetchError(state)
      },
      
      loginRequestActions: { login, loginWithGoogle },
      
    }
  }
  
  render () {
    var injection = this.getInjection()
    return <BaseComponent {...injection} {...this.props} />
  }
}