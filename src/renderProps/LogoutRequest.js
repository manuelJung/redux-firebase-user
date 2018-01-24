import React from 'react'
import config from '../config'
import {subscribeStore} from '../utils'
import pt from 'prop-types'
import { isFetchingLogout, getLogoutFetchError } from '../selectors'
import { logout as logoutAction } from '../actions'

export default class LogoutRequest extends React.Component {

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
      isFetching : isFetchingLogout(state),
      fetchError : getLogoutFetchError(state),

      logout : () => dispatch(logoutAction()),
    }
  }
  
  render = () => this.props.render(this.getRenderProps())

}

export const withLogoutRequest = configOrFunc => Component => props => {
  let config = typeof configOrFunc === 'function' ? configOrFunc(props) : configOrFunc
  return (
    <LogoutRequest {...config} render={data => <Component {...data} {...props}/>}/>
  )
}