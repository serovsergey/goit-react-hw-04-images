import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as API from '../services/pixabayAPI';
import Button from './common/Button';
import Loader from './common/Loader';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import s from './App.module.scss';
import NotFound from './NotFound';
import { useEffect, useReducer, useRef, useState } from 'react';

const STATUS = Object.freeze({
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  NOT_FOUND: 'notfound',
  REJECTED: 'rejected',
});

const initialSearchState = {
  images: [],
  query: '',
  page: 0,
  pages: 0,
}

const searchReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'search':
      return { ...state, query: payload, page: 0, images: [] }
    case 'load-more':
      return { ...state, page: state.page + 1 }
    case 'clear-data':
      return initialSearchState;
    case 'set-data':
      if (!state.images.length) {
        toast.info(`Found ${payload.totalHits} images`);
      }
      return { ...state, images: [...state.images, ...payload.hits], pages: Math.ceil(payload.totalHits / API.PER_PAGE), page: state.images.length ? state.page : 1 };
    default:
      throw Error('Undefined action!')
  }
}


export const App = () => {
  const [searchData, dispatch] = useReducer(searchReducer, initialSearchState);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState('');
  const listRef = useRef(0);
  const prevHeightRef = useRef(0);

  useEffect(() => {
    if (!searchData.query || searchData.page === 1) {
      return;
    }
    (async () => {
      setStatus(STATUS.PENDING);
      try {
        const response = await API.fetchImages(searchData.query, searchData.page || 1);
        if (response.hits.length) {
          setStatus(STATUS.RESOLVED);
          dispatch({ type: 'set-data', payload: response });
          if (listRef.current) {
            prevHeightRef.current = listRef.current.clientHeight;
          }
        }
        else {
          setStatus(STATUS.NOT_FOUND);
          dispatch({ type: 'clear-data' });
        }
      } catch (e) {
        setStatus(STATUS.REJECTED);
        setErrorMessage(e.message);
      }
    })();
  }, [searchData.page, searchData.query]);

  useEffect(() => {
    window.scrollTo({ top: prevHeightRef.current, behavior: 'smooth' });
  }, [searchData.images.length])

  const handleSearch = query => {
    dispatch({ type: 'search', payload: query });
    prevHeightRef.current = 0;
  }

  const handleLoadMore = () => {
    dispatch({ type: 'load-more' });
  }

  const { images, page, pages } = searchData;
  return (
    <div className={s.App}>
      <Searchbar onSearch={handleSearch} />
      {!!images.length && <ImageGallery items={images} listRef={listRef} />}

      {status === STATUS.PENDING && <Loader />}

      {!!images.length && page < pages && (
        <div className={s.loadmore}>
          <Button type="button" onClick={handleLoadMore}>Load More</Button>
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
