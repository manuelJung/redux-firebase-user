import React, { PropTypes } from 'react'


const createStyle = ({
  background,
  color,
  width,
  size,
  hideText,
}) => ({
  wrapper: {
    background: background,
    display: 'flex',
    borderRadius: 5 * size,
    cursor: 'pointer',
    // width: width || 'auto',
    width: hideText
      ? 40 * size
      : width || 'auto'
  },
  iconWrapper: {
    height: 34 * size,
    width: 34 * size,
    padding: 3 * size
  },
  text: {
    height: 40 * size,
    fontSize: 18 * size,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10 * size,
    color: color,
    borderLeft: '1px solid #777',
    fontFamily: 'Roboto-Medium'
  }
})

export const AbstractAuthOButton = ({
  onClick,
  vector,
  children,
  text,
  ...props
}) => {
  var style = createStyle(props)
  return (
    <div onClick={onClick} style={style.wrapper}>
      <div style={style.iconWrapper}>
        <svg viewBox="0 0 512 512">
          <path d={vector} fill={props.color}/>
        </svg>
      </div>
      { !props.hideText && <div style={style.text}>
        {children || text}
      </div> }
    </div>
  )
}

export default AbstractAuthOButton

AbstractAuthOButton.propTypes = {
  // cb for click event
  onClick: PropTypes.func.isRequired,
  
  // background of button => css color
  background: PropTypes.string.isRequired,
  
  // font and icon color => css color
  color: PropTypes.string.isRequired,
  
  // size of everything in percent
  // 0 => 0%
  // 1 => 100%
  size: PropTypes.number.isRequired,
  
  // width of the button
  // default: auto
  width: PropTypes.oneOfType([
    PropTypes.number, 
    PropTypes.string // z.b 50%
  ]),
  
  // if true, no text will be displayed width will be shrinked to icon width
  hideText: PropTypes.bool,
  
  // displayed text
  text: PropTypes.string,
  
  // displayed text (higher priority as text)
  children: PropTypes.string
}