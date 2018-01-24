import React from 'react'
import config from '../config'
import {subscribeStore} from '../utils'
import pt from 'prop-types'
import { isFetchingLogin, getLoginFetchError } from '../selectors'
import { 
  login as loginAction,
  loginWithGoogle as loginWithGoogleAction,
  loginWithFacebook as loginWithFacebookAction,
  loginWithGithub as loginWithGithubAction,
  loginWithTwitter as loginWithTwitterAction
} from '../actions'

export default class LoginRequest extends React.Component {

  static contextTypes = {
    store: pt.object
  }

  static propTypes = {
    render: pt.func.isRequired
  }

  unsubscribeStore = null
  
  componentWillMount(){
    const store = this.context.store
    const update = this.forceUpdate.bind(this)
    this.unsubscribeStore = subscribeStore(store, this.shouldTriggerUpdate, update)
  }
  
  componentWillUnmount () {
    this.unsubscribeStore()
  }
  
  shouldTriggerUpdate(prevState, nextState){
    const reducerKey = config.getConfig().reducerKey
    return prevState[reducerKey] !== nextState[reducerKey]
  }

  getRenderProps(){
    const state = this.context.store.getState()
    const dispatch = this.context.store.dispatch

    return {
      isFetching : isFetchingLogin(state),
      fetchError : getLoginFetchError(state),

      login             : (u, p) => dispatch(loginAction(u, p)),
      loginWithGoogle   : () => dispatch(loginWithGoogleAction()),
      loginWithFacebook : () => dispatch(loginWithFacebookAction()),
      loginWithGithub   : () => dispatch(loginWithGithubAction()),
      loginWithTwitter  : () => dispatch(loginWithTwitterAction())
    }
  }
  
  render = () => this.props.render(this.getRenderProps())

}

export const withLoginRequest = configOrFunc => Component => props => {
  let config = typeof configOrFunc === 'function' ? configOrFunc(props) : configOrFunc
  return (
    <LoginRequest {...config} render={data => <Component {...data} {...props}/>}/>
  )
}