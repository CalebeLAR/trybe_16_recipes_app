import PropTypes from 'prop-types';
import styles from './CarouselRecommendations.module.css';

export default function CarouselRecommendations(props) {
  const { dataRecommendations, pathname } = props;
  const pageMeals = pathname.includes('meals');

  return (
    <>
      <p className={ styles.recipe__auxs }> Recommendations:</p>
      <div
        className={ styles.ContainerAll }
      >

        {
          dataRecommendations.map((item, index) => (
            <div
              key={ pageMeals ? item.strDrink : item.strMeal }
              data-testid={ `${index}-recommendation-card` }
              className={ styles.SizeImage }
            >
              <img
                src={ pageMeals ? item.strDrinkThumb : item.strMealThumb }
                alt={ pageMeals ? item.strDrink : item.strMeal }
                className={ styles.SizeImage }
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
    </>

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
