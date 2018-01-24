import React from 'react'
import config from '../config'
import {subscribeStore} from '../utils'
import pt from 'prop-types'
import { isFetchingLogin, getLoginFetchError } from '../selectors'
import { login as loginAction } from '../actions'

export default class LoginForm extends React.Component {

  static contextTypes = {
    store: pt.object
  }

  static propTypes = {
    render: pt.func.isRequired,
    initialPassword: pt.string,
    initialUsername: pt.string
  }

  unsubscribeStore = null

  state = {
    username: this.props.initialUsername || '',
    password: this.props.initialPassword || ''
  }
  
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
    const {username, password} = this.state

    const login = () => dispatch(loginAction(username, password))

    return {
      login         : login,
      clearForm     : () => this.setState({ username: '', password: ''}),
      clearPassword : () => this.setState({ password: ''}),

      isFetching : isFetchingLogin(state),
      fetchError : getLoginFetchError(state),

      emailInput: {
        value: username,
        onChange: e => this.setState({ username: e.target.value }),
        placeholder: 'E-Mail',
        type: 'text'
      },
      passwordInput: {
        value: password,
        onChange: e => this.setState({ password: e.target.value }),
        placeholder: 'password',
        type: 'password'
      },
      submitInput: {
        // onClick: e => e.preventDefault() || login(),
        type: 'submit',
        value: 'Submit'
      },
      form: {
        onSubmit: e => e.preventDefault() || login()
      }
    }
  }
  
  render = () => this.props.render(this.getRenderProps())

}

export const withLoginForm = configOrFunc => Component => props => {
  let config = typeof configOrFunc === 'function' ? configOrFunc(props) : configOrFunc
  return (
    <LoginForm {...config} render={data => <Component {...data} {...props}/>}/>
  )
}