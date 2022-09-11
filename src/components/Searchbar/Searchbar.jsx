import React from 'react'
import PropTypes from 'prop-types'
import SearchForm from 'components/SearchForm';
import s from './Searchbar.module.scss';

function Searchbar({ onSearch }) {
  return (
    <header className={s.Searchbar}>
      <SearchForm onSearch={onSearch} />
    </header>
  )
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
}

export default Searchbar

