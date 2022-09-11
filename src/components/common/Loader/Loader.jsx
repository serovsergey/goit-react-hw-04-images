import React from 'react'
import { ThreeDots } from 'react-loader-spinner';
// import PropTypes from 'prop-types'
import s from './Loader.module.scss'

function Loader(props) {
  return (
    <div className={s.loader}>
      <ThreeDots color="#3f51b5" />
    </div>
  )
}

// Loader.propTypes = {}

export default Loader
