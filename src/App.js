import React from 'react';
import Router from './Router';
import Provider from './contexts/AppRecipeProvider';

function App() {
  return (
    <Provider>
      <Router />
    </Provider>
  );
}

export default App;
