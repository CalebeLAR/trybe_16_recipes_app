import PropTypes from 'prop-types';
import './CarouselRecommendations.css';

export default function CarouselRecommendations(props) {
  const { dataRecommendations, pathname } = props;

  return (

    <div
      className="ContainerAll"
    >
      {
        pathname.includes('meals')
          ? (dataRecommendations.map((item, index) => (
            <div
              key={ item.strDrink }
              data-testid={ `${index}-recommendation-card` }
              className="SizeImage"
            >
              <img
                src={ item.strDrinkThumb }
                alt={ item.strDrink }
                className="SizeImage"
              />
              <p
                data-testid={ `${index}-recommendation-title` }
              >
                {item.strDrink}
              </p>
            </div>
          ))) : (dataRecommendations.map((item, index) => (
            <div
              key={ item.strMeal }
              data-testid={ `${index}-recommendation-card` }
              className="SizeImage"
            >
              <img
                src={ item.strMealThumb }
                alt={ item.strMeal }
                className="SizeImage"
              />
              <p
                data-testid={ `${index}-recommendation-title` }
              >
                {item.strMeal}
              </p>
            </div>
          )))
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
