import React from 'react'
import PropTypes from 'prop-types'
import AbstractAuthOButton from './AbstractAuthOButton'
import withLoginRequest from '../hocs/withLoginRequest'

var googleVector = "M179.7 237.6L179.7 284.2 256.7 284.2C253.6 304.2 233.4 342.9 179.7 342.9 133.4 342.9 95.6 304.4 "
                 + "95.6 257 95.6 209.6 133.4 171.1 179.7 171.1 206.1 171.1 223.7 182.4 233.8 192.1L270.6 156.6C247 "
                 + "134.4 216.4 121 179.7 121 104.7 121 44 181.8 44 257 44 332.2 104.7 393 179.7 393 258 393 310 "
                 + "337.8 310 260.1 310 251.2 309 244.4 307.9 237.6L179.7 237.6 179.7 237.6ZM468 236.7L429.3 236.7 "
                 + "429.3 198 390.7 198 390.7 236.7 352 236.7 352 275.3 390.7 275.3 390.7 314 429.3 314 429.3 275.3 "
                 + "468 275.3"


export const GoogleAuthOButton = ({
  isFetching,
  loginWithGoogle,
  background,
  color,
  size,
  children,
  ...rest
}) => (
  <AbstractAuthOButton
    onClick={ () => !isFetching && loginWithGoogle() }
    vector={googleVector}
    size={size ? parseFloat(size) : 1}
    background='#db3236'
    color='whitesmoke'
    text='Login with Google'
    {...rest}
  >
    {children}
  </AbstractAuthOButton>
)

export default withLoginRequest()(GoogleAuthOButton)

GoogleAuthOButton.propTypes = {
  // injected by LoginRequest
  isFetching: PropTypes.bool.isRequired,
  loginWithGoogle: PropTypes.func.isRequired,
  
  // background of button => css color
  // default: #db3236 (google red)
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
  // default: Login with Google
  text: PropTypes.string,
  
  // displayed text (higher priority as text)
  children: PropTypes.string
}