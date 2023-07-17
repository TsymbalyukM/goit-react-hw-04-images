import { useState, useEffect } from 'react';
import { fetchPictures } from './API/Api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import Loader from './Loader/Loader';
import { Button } from './Button/Button';
import { Wrapper } from './Searchbar/Searchbar.styled';
import GlobalStyle from './styles';

const App = () => {
  const [pictures, setPictures] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // componentDidUpdate(_, prevState) {
  //   const { page, query } = this.state;
  //   if (prevState.page !== page || prevState.query !== query) {
  //     this.addPictures(query, page);
  //   }
  // }

  useEffect(() => {
    if (query === '') {
      return;
    }
    const addPictures = async (page, query) => {
      try {
        setIsLoading(true);

        const { hits } = await fetchPictures(query, page);

        setPictures(prevPictures => [...prevPictures, ...hits]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    addPictures(page, query);
  }, [page, query]);

  const searchResult = value => {
    setQuery(value);
    setPage(1);
    setPictures([]);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const getLargeImgUrl = imgUrl => {
    setLargeImageUrl(imgUrl);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <Markup
      searchResult={searchResult}
      error={error}
      isLoading={isLoading}
      pictures={pictures}
      handleLoadMore={handleLoadMore}
      getLargeImgUrl={getLargeImgUrl}
      showModal={showModal}
      largeImageUrl={largeImageUrl}
      toggleModal={toggleModal}
    />
  );
};

const Markup = ({
  pictures,
  error,
  isLoading,
  showModal,
  largeImageUrl,
  searchResult,
  toggleModal,
  handleLoadMore,
  getLargeImgUrl,
}) => {
  const loadMoreButton = pictures.length > 0 && !isLoading;
  return (
    <Wrapper>
      <GlobalStyle />
      <Searchbar onSubmit={searchResult} />
      {showModal && <Modal imgUrl={largeImageUrl} onClose={toggleModal} />}
      <ImageGallery
        error={error}
        isLoading={isLoading}
        pictures={pictures}
        onClick={getLargeImgUrl}
      />
      {loadMoreButton && <Button onClick={handleLoadMore} />}
      {isLoading && <Loader />}
    </Wrapper>
  );
};

export default App;
