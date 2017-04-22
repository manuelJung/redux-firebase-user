import React from 'react'
import PropTypes from 'prop-types'
import AbstractAuthOButton from './AbstractAuthOButton'
import withLoginRequest from '../hocs/withLoginRequest'

var facebookVector = "M211.9 197.4h-36.7v59.9h36.7V433.1h70.5V256.5h49.2l5.2-59.1h-54.4c0 0 0-22.1 0-33.7 0-13.9 2.8-19"
                   + ".5 16.3-19.5 10.9 0 38.2 0 38.2 0V82.9c0 0-40.2 0-48.8 0 -52.5 0-76.1 23.1-76.1 67.3C211.9 188.8 "
                   + "211.9 197.4 211.9 197.4z"


export const FacebookAuthOButton = ({
  loginRequest: { isFetching },
  loginRequestActions: { loginWithFacebook },
  background,
  color,
  size,
  children,
  ...rest
}) => (
  <AbstractAuthOButton
    onClick={ () => !isFetching && loginWithFacebook() }
    vector={facebookVector}
    size={size ? parseFloat(size) : 1}
    background='#29487D'
    color='whitesmoke'
    text='Login with Facebook'
    {...rest}
  >
    {children}
  </AbstractAuthOButton>
)

export default withLoginRequest(FacebookAuthOButton)

FacebookAuthOButton.propTypes = {
  // injected by LoginRequest
  loginRequest: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired
  }).isRequired,
  
  // injected by LoginRequest
  loginRequestActions: PropTypes.shape({
    loginWithFacebook: PropTypes.func.isRequired
  }).isRequired,
  
  // background of button => css color
  // default: #29487D (facebook blue)
  background: PropTypes.string,
  
  // font and icon color => css color
  // default: whitesmoke
  color: PropTypes.string,
  
  // size of everything in percent (float or floatable string)
  // 0 => 0%
  // 1 => 100% (default)
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  
  // width of the button
  // default: auto
  width: PropTypes.oneOfType([
    PropTypes.number, 
    PropTypes.string // z.b 50%
  ]),
  
  // if true, no text will be displayed width will be shrinked to icon width
  hideText: PropTypes.bool,
  
  // displayed text
  // default: Login with Facebook
  text: PropTypes.string,
  
  // displayed text (higher priority as text)
  children: PropTypes.string
}