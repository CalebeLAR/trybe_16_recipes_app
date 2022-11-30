import { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function RecipeDetails(props) {
  const { match: { params: { idDaReceita } } } = props;
  const fetchMealDetails = () => {
    console.log('fetchMealDetails');
  };
  const fetchDrinkDetails = () => {
    console.log('fetchDrinkDetails');
  };
  useEffect(() => {
    fetchMealDetails();
    fetchDrinkDetails();
  });
  return (
    <main>
      <h1>RecipeDetails</h1>
      <p>{idDaReceita}</p>
    </main>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      idDaReceita: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
