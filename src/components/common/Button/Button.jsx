import React from 'react'
import PropTypes from 'prop-types'
import s from './Button.module.scss'

function Button({ children, onClick, ...AllProps }) {
  return (
    <button className={s.Button} onClick={onClick} {...AllProps} >{children}</button>
  )
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Button
