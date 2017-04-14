import React from 'react'
// import { connect } from 'react-redux'
import { isFetchingLogin, loginFetchFailed, getLoginFetchError } from '../selectors'
import { login as loginAction, loginWithGoogle as loginWithGoogleAction } from '../actions'
import config from '../config'

// const mapStateToProps = state => ({
//   loginHandler: {
//     isFetching  : isFetchingLogin(state),
//     fetchFailed : loginFetchFailed(state),
//     fetchError  : getLoginFetchError(state)
//   }
// })

// const mapDispatchToProps = dispatch => ({
//   loginHandlerActions: {
//     login: (username, password) => dispatch(login(username, password)),
//     loginWithGoogle: (options) => dispatch(loginWithGoogle(options))
//   }
// })

// export default (BaseComponent) => connect(mapStateToProps, mapDispatchToProps)(BaseComponent)

export default (BaseComponent) => class WithLoginHandler extends React.Component {
  
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
      
      loginHandler: {
        isFetching  : isFetchingLogin(state),
        fetchFailed : loginFetchFailed(state),
        fetchError  : getLoginFetchError(state)
      },
      
      loginHandlerActions: { login, loginWithGoogle },
      
    }
  }
  
  render () {
    var injection = this.getInjection()
    return <BaseComponent {...injection} {...this.props} />
  }
}