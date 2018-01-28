import React from 'react'
import PropTypes from 'prop-types'
import AbstractAuthOButton from './AbstractAuthOButton'
import withLoginRequest from '../hocs/withLoginRequest'

var twitterVector = "M419.6 168.6c-11.7 5.2-24.2 8.7-37.4 10.2 13.4-8.1 23.8-20.8 28.6-36 -12.6 7.5-26.5 12.9-41.3 15"
                  + ".8 -11.9-12.6-28.8-20.6-47.5-20.6 -42 0-72.9 39.2-63.4 79.9 -54.1-2.7-102.1-28.6-134.2-68 -17 29"
                  + ".2-8.8 67.5 20.1 86.9 -10.7-0.3-20.7-3.3-29.5-8.1 -0.7 30.2 20.9 58.4 52.2 64.6 -9.2 2.5-19.2 3."
                  + "1-29.4 1.1 8.3 25.9 32.3 44.7 60.8 45.2 -27.4 21.4-61.8 31-96.4 27 28.8 18.5 63 29.2 99.8 29.2 1"
                  + "20.8 0 189.1-102.1 185-193.6C399.9 193.1 410.9 181.7 419.6 168.6z"


export const TwitterAuthOButton = ({
  isFetching,
  loginWithTwitter,
  background,
  color,
  size,
  children,
  ...rest
}) => (
  <AbstractAuthOButton
    onClick={ () => !isFetching && loginWithTwitter() }
    vector={twitterVector}
    size={size ? parseFloat(size) : 1}
    background='#00ACED'
    color='whitesmoke'
    text='Login with Twitter'
    {...rest}
  >
    {children}
  </AbstractAuthOButton>
)

export default withLoginRequest()(TwitterAuthOButton)

TwitterAuthOButton.propTypes = {
  // injected by LoginRequest
  isFetching: PropTypes.bool.isRequired,
  loginWithTwitter: PropTypes.func.isRequired,
  
  // background of button => css color
  // default: #00ACED (twitter blue)
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
  // default: Login with Twitter
  text: PropTypes.string,
  
  // displayed text (higher priority as text)
  children: PropTypes.string
}