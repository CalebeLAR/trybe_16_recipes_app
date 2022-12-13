import PropTypes from 'prop-types';
import './CarouselRecommendations.css';

export default function CarouselRecommendations(props) {
  const { dataRecommendations, pathname } = props;
  const pageMeals = pathname.includes('meals');

  return (

    <div
      className="ContainerAll"
    >
      {
        dataRecommendations.map((item, index) => (
          <div
            key={ pageMeals ? item.strDrink : item.strMeal }
            data-testid={ `${index}-recommendation-card` }
            className="SizeImage"
          >
            <img
              src={ pageMeals ? item.strDrinkThumb : item.strMealThumb }
              alt={ pageMeals ? item.strDrink : item.strMeal }
              className="SizeImage"
              data-testid="corrousel-image"
            />
            <p
              data-testid={ `${index}-recommendation-title` }
            >
              {pageMeals ? item.strDrink : item.strMeal}
            </p>
          </div>
        ))
      }

    </div>

  );
}

CarouselRecommendations.propTypes = {
  dataRecommendations: PropTypes.arrayOf(
    PropTypes.shape({
      strDrink: PropTypes.string,
      strDrinkThumb: PropTypes.string,
      strMeal: PropTypes.string,
      strMealThumb: PropTypes.string,
    }).isRequired,
  ).isRequired,
  pathname: PropTypes.string.isRequired,
};
