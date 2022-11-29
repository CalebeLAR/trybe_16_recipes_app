import PropTypes from 'prop-types';
import React from 'react';
import AppRecipeContext from './AppRecipeContext';

export default function Provider({ children }) {
  return (
    <AppRecipeContext.Provider value={ 10 }>
      {children}
    </AppRecipeContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape().isRequired,
};
