import React from 'react'
import PropTypes from 'prop-types'
import AbstractAuthOButton from './AbstractAuthOButton'
import {withLoginRequest} from '../renderProps/LoginRequest'

var githubVector = "M256 70.7c-102.6 0-185.9 83.2-185.9 185.9 0 82.1 53.3 151.8 127.1 176.4 9.3 1.7 12.3-4 12.3-8.9V389"
                 + ".4c-51.7 11.3-62.5-21.9-62.5-21.9 -8.4-21.5-20.6-27.2-20.6-27.2 -16.9-11.5 1.3-11.3 1.3-11.3 18.7 1"
                 + ".3 28.5 19.2 28.5 19.2 16.6 28.4 43.5 20.2 54.1 15.4 1.7-12 6.5-20.2 11.8-24.9 -41.3-4.7-84.7-20.6-"
                 + "84.7-91.9 0-20.3 7.3-36.9 19.2-49.9 -1.9-4.7-8.3-23.6 1.8-49.2 0 0 15.6-5 51.1 19.1 14.8-4.1 30.7-6"
                 + ".2 46.5-6.3 15.8 0.1 31.7 2.1 46.6 6.3 35.5-24 51.1-19.1 51.1-19.1 10.1 25.6 3.8 44.5 1.8 49.2 11.9"
                 + " 13 19.1 29.6 19.1 49.9 0 71.4-43.5 87.1-84.9 91.7 6.7 5.8 12.8 17.1 12.8 34.4 0 24.9 0 44.9 0 51 0"
                 + " 4.9 3 10.7 12.4 8.9 73.8-24.6 127-94.3 127-176.4C441.9 153.9 358.6 70.7 256 70.7z"


export const GoogleAuthOButton = ({
  isFetching,
  loginWithGithub,
  background,
  color,
  size,
  children,
  ...rest
}) => (
  <AbstractAuthOButton
    onClick={ () => !isFetching && loginWithGithub() }
    vector={githubVector}
    size={size ? parseFloat(size) : 1}
    background='#24292E'
    color='whitesmoke'
    text='Login with Github'
    {...rest}
  >
    {children}
  </AbstractAuthOButton>
)

export default withLoginRequest()(GoogleAuthOButton)

GoogleAuthOButton.propTypes = {
  // injected by LoginRequest
  isFetching: PropTypes.bool.isRequired,
  loginWithGithub: PropTypes.func.isRequired,
  
  // background of button => css color
  // default: #24292E (github black)
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
  // default: Login with Github
  text: PropTypes.string,
  
  // displayed text (higher priority as text)
  children: PropTypes.string
}