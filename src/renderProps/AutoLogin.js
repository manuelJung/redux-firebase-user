import React from 'react'
import pt from 'prop-types'
import { fetchLoginSuccess } from '../actions/login'
import config from '../config'


export default class AutoLogin extends React.Component {

  static contextTypes = {
    store: pt.object
  }

  static propTypes = {
    render: pt.func
  }

  // will be set to false after the request resolves
  static awaitingResponse = true

  // will be set to false, after the first instance fires the request
  // so only one request will ever be performed altought multiply instances exist
  static shouldRequest = true

  // true if the instance is currently mounted
  hasMounted = false

  state = {
    awaitingResponse: AutoLogin.awaitingResponse
  }

  componentWillMount () {
    const dispatch = this.context.store.dispatch
    this.hasMounted  = true

    // start request if this is the first instance
    if(AutoLogin.shouldRequest){
      AutoLogin.shouldRequest = false
      var unsubscribe = config.getConfig().firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          unsubscribe()
          this.finnishAutoLogin()
        } else {
          dispatch(fetchLoginSuccess(user, "AUTO_LOGIN"))
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
    AutoLogin.awaitingResponse = false

    // only call setState on a mounted component
    if(this.hasMounted){
      this.setState({ awaitingResponse: false })
    }
  }

  render = () => this.props.render ? this.props.render({...this.state}) : null
}

export const withAutoLogin = configOrFunc => Component => props => {
  let config = typeof configOrFunc === 'function' ? configOrFunc(props) : configOrFunc
  return (
    <AutoLogin {...config} render={data => <Component {...data} {...props}/>}/>
  )
}
