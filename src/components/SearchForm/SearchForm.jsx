import PropTypes from 'prop-types'
import React, { Component } from 'react';
import s from './SearchForm.module.scss';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import { toast } from 'react-toastify';

export class SearchForm extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
  }

  state = {
    search: '',
  }

  handleChange = evt => {
    this.setState({ search: evt.currentTarget.value });
  }

  handleSearch = evt => {
    evt.preventDefault();
    const searchString = this.state.search.trim();
    if (searchString) {
      this.props.onSearch(searchString);
      this.setState({ search: '' });
    }
    else {
      toast.error('Please enter search string!');
    }
  }

  render() {
    const { search } = this.state;
    return (
      <form className={s.SearchForm} onSubmit={this.handleSearch}>
        <button className={s['SearchForm-button']} type='submit'><SearchIcon /></button>
        <label className={s['SearchForm-button-label']}>Search
        </label>
        <input
          className={s['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder='Search images and photos'
          onChange={this.handleChange}
          value={search} />
      </form>
    )
  }
}

export default SearchForm
