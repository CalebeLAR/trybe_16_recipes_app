import PropTypes from 'prop-types';
import React from 'react';

export default function FavoriteButtons({ dataTestid, src, alt, onClick }) {
  return (
    <button
      data-testid={ dataTestid }
      type="button"
      src={ src }
      onClick={ onClick }
    >
      <img
        width={ 60 }
        height={ 30 }
        src={ src }
        alt={ alt }
      />
    </button>
  );
}

FavoriteButtons.propTypes = {
  alt: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
