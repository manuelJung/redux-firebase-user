import React from 'react'
import pt from 'prop-types'
import { isLoggedIn, getUser } from '../selectors'
import config from '../config'
import {subscribeStore} from '../utils'

export default class User extends React.Component {

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
      isLoggedIn : isLoggedIn(state),
      profile    : getUser(state)
    }
  }
  
  render = () => this.props.render(this.getRenderProps())

}

export const withUser = configOrFunc => Component => props => {
  let config = typeof configOrFunc === 'function' ? configOrFunc(props) : configOrFunc
  return (
    <User {...config} render={data => <Component {...data} {...props}/>}/>
  )
}