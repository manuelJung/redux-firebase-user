import React from 'react'
// import { connect } from 'react-redux'
import { isFetchingLogout, logoutFetchFailed, getLogoutFetchError } from '../selectors'
import { logout as logoutAction } from '../actions'
import config from '../config'

// const mapStateToProps = state => ({
//   logoutRequest: {
//     isFetching  : isFetchingLogout(state),
//     fetchFailed : logoutFetchFailed(state),
//     fethError   : getLogoutFetchError(state),
//   }
// })

// const mapDispatchToProps = dispatch => ({
//   logoutRequestActions: {
//     logout : () => dispatch(logout())
//   }
// })

// export default (BaseComponent) => connect(mapStateToProps, mapDispatchToProps)(BaseComponent)

export default (BaseComponent) => class WithLogoutRequest extends React.Component {
  
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
    
    const logout = () => dispatch(logoutAction())
    
    return {
      
      logoutRequest: {
        isFetching  : isFetchingLogout(state),
        fetchFailed : logoutFetchFailed(state),
        fetchError  : getLogoutFetchError(state)
      },
      
      logoutRequestActions: { logout },
      
    }
  }
  
  render () {
    var injection = this.getInjection()
    return <BaseComponent {...injection} {...this.props} />
  }
}