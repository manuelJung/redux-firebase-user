import React from 'react'
import PropTypes from 'prop-types'
import { isFetchingLogin, loginFetchFailed, getLoginFetchError } from '../selectors'
import { 
  login as loginAction, 
  loginWithGoogle as loginWithGoogleAction,
  loginWithFacebook as loginWithFacebookAction,
  loginWithGithub as loginWithGithubAction,
  loginWithTwitter as loginWithTwitterAction
} from '../actions'
import config from '../config'


export default (BaseComponent) => class WithLoginRequest extends React.Component {
  
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
    
    const login             = (username, password) => dispatch(loginAction(username, password))
    const loginWithGoogle   = () => dispatch(loginWithGoogleAction())
    const loginWithFacebook = () => dispatch(loginWithFacebookAction())
    const loginWithGithub   = () => dispatch(loginWithGithubAction())
    const loginWithTwitter  = () => dispatch(loginWithTwitterAction())
    
    return {
      
      loginRequest: {
        isFetching  : isFetchingLogin(state),
        fetchFailed : loginFetchFailed(state),
        fetchError  : getLoginFetchError(state)
      },
      
      loginRequestActions: { login, loginWithGoogle, loginWithFacebook, loginWithGithub, loginWithTwitter },
      
    }
  }
  
  render () {
    var injection = this.getInjection()
    return <BaseComponent {...injection} {...this.props} />
  }
}