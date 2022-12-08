import PropTypes from 'prop-types';
import React from 'react';

export default function FavoriteButtons({ dataTestid, src, alt }) {
  return (
    <button
      data-testid={ dataTestid }
      type="button"
      src={ src }
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
};
