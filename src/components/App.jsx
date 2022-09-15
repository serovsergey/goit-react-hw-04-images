import React, { Component } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as API from '../services/pixabayAPI';
import Button from './common/Button';
import Loader from './common/Loader';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import s from './App.module.scss';
import NotFound from './NotFound';

const STATUS = Object.freeze({
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  NOT_FOUND: 'notfound',
  REJECTED: 'rejected',
});

const scrollResults = toTop => {
  const obj = {
    top: toTop ? 0 : window.innerHeight,
    behavior: 'smooth',
  }
  toTop ? window.scrollTo(obj) : window.scrollBy(obj);
}
export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    pages: 0,
    status: STATUS.IDLE,
    errorMessage: '',
  }

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (query && (prevState.query !== query || prevState.page !== page)) {
      this.setState({ status: STATUS.PENDING })
      try {
        const response = await API.fetchImages(query, page);
        if (!response.hits.length) {
          this.setState({ images: [], status: STATUS.NOT_FOUND });
          return;
        }
        const isNewQuery = page === 1;
        this.setState(prevState => {
          const images = isNewQuery ? [] : prevState.images;
          return { images: [...images, ...response.hits], pages: Math.ceil(response.totalHits / API.PER_PAGE), status: STATUS.RESOLVED }
        }, () => (
          scrollResults(isNewQuery)
        ));
        if (isNewQuery) {
          toast.info(`Found ${response.totalHits} images`);
        }
        // this.setState({ status: STATUS.RESOLVED });
      }
      catch (e) {
        console.log(e)
        return this.setState({ errorMessage: e.message, status: STATUS.REJECTED });
      }
    }
  }

  handleSearch = query => {
    this.setState({ pages: 0, query: '' }, () => (this.setState({ query, page: 1 })));
    // this.setState({ query, page: 1 })
  }

  handleLoadMore = () => {
    this.setState(prevState => (
      { page: prevState.page + 1 }
    ))
  }

  render() {
    const { status, images, page, pages, errorMessage } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSearch={this.handleSearch} />
        {!!images.length && <ImageGallery items={images} />}

        {status === STATUS.PENDING && <Loader />}

        {!!images.length && page < pages && (
          <div className={s.loadmore}>
            <Button type="button" onClick={this.handleLoadMore}>Load More</Button>
          </div>
        )}

        {status === STATUS.NOT_FOUND && <NotFound />}

        {status === STATUS.REJECTED && errorMessage}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    )
  }
}
