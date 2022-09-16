import PropTypes from 'prop-types'
import s from './SearchForm.module.scss';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import { toast } from 'react-toastify';
import { useState } from 'react';

export const SearchForm = ({ onSearch }) => {

  const [search, setSearch] = useState('');

  const handleChange = evt => {
    setSearch(evt.currentTarget.value);
  }

  const handleSearch = evt => {
    evt.preventDefault();
    const searchString = search.trim();
    if (searchString) {
      onSearch(searchString);
      setSearch('');
    }
    else {
      toast.error('Please enter search string!');
    }
  }

  return (
    <form className={s.SearchForm} onSubmit={handleSearch}>
      <button className={s['SearchForm-button']} type='submit'><SearchIcon /></button>
      <label className={s['SearchForm-button-label']}>Search
      </label>
      <input
        className={s['SearchForm-input']}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder='Search images and photos'
        onChange={handleChange}
        value={search} />
    </form>
  )
}

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
}

export default SearchForm
