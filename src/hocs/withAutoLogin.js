import React from 'react'
import PropTypes from 'prop-types'
import { fetchLoginSuccess } from '../actions/login'
import config from '../config'


export default (BaseComponent) => class WithAutoLogin extends React.Component {
  
  static contextTypes = {
    store: PropTypes.object
  }

  // will be set to false after the request resolves
  static awaitingResponse = true

  // will be set to false, after the first instance fires the request
  // so only one request will ever be performed altought multiply instances exist
  static shouldRequest = true

  // true if the instance is currently mounted
  hasMounted = false

  state = {
    awaitingResponse: WithAutoLogin.awaitingResponse
  }

  componentWillMount () {
    const dispatch = this.context.store.dispatch
    this.hasMounted  = true

    // start request if this is the first instance
    if(WithAutoLogin.shouldRequest){
      WithAutoLogin.shouldRequest = false
      var unsubscribe = config.getConfig().firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          unsubscribe()
          this.finnishAutoLogin()
        } else {
          dispatch(fetchLoginSuccess("AUTO_LOGIN"))
          unsubscribe()
          this.finnishAutoLogin()
        }
      })
    }
  }

  componentWillUnmount () {
    this.hasMounted = false
  }

  finnishAutoLogin () {
    WithAutoLogin.awaitingResponse = false

    // only call setState on a mounted component
    if(this.hasMounted){
      this.setState({ awaitingResponse: false })
    }
  }
  
  getInjection () {
    return {
      
      autoLogin: {
        awaitingResponse: this.state.awaitingResponse
      }
    }
  }
  
  render () {
    var injection = this.getInjection()
    return <BaseComponent {...injection} {...this.props} />
  }
}