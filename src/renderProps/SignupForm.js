import React from 'react'
import config from '../config'
import {subscribeStore} from '../utils'
import pt from 'prop-types'
import { isFetchingSignup, getSignupFetchError } from '../selectors'
import { signup as signupAction } from '../actions'

export default class SignupForm extends React.Component {

  static contextTypes = {
    store: pt.object
  }

  static propTypes = {
    render: pt.func.isRequired,
    initialPassword: pt.string,
    initialMail: pt.string
  }

  unsubscribeStore = null

  state = {
    mail: this.props.initialMail || '',
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
    const {mail, password} = this.state

    const signup = () => dispatch(signupAction(mail, password))

    return {
      signup        : signup,
      clearForm     : () => this.setState({ mail: '', password: ''}),
      clearPassword : () => this.setState({ password: ''}),

      isFetching : isFetchingSignup(state),
      fetchError : getSignupFetchError(state),

      emailInput: {
        value: mail,
        onChange: e => this.setState({ mail: e.target.value }),
        placeholder: 'E-Mail',
        type: 'text'
      },
      passwordInput: {
        value: password,
        onChange: e => this.setState({ password: e.target.value }),
        placeholder: 'password',
        type: 'password'
      },
      form: {
        onSubmit: e => e.preventDefault() || signup()
      }
    }
  }
  
  render = () => this.props.render(this.getRenderProps())

}

export const withSignupForm = configOrFunc => Component => props => {
  let config = typeof configOrFunc === 'function' ? configOrFunc(props) : configOrFunc
  return (
    <SignupForm {...config} render={data => <Component {...data} {...props}/>}/>
  )
}