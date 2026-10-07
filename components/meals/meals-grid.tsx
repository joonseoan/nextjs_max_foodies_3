import MealItem from './meal-item';
import style from './meals-grid.module.css';

export interface MealProps {
  id: string;
  title: string;
  slug: string;
  image: string;
  summary: string;
  creator: string;
}

export interface MealsGridProps {
  meals: MealProps[];
}

function MealsGrid({ meals }: MealsGridProps) {
  return (
    <ul className={style.meals}>
      {
        meals.map((meal) => <li key={meal.id}>
          <MealItem {...meal} />
        </li>)
      }
    </ul>
  );
}

export default MealsGrid;