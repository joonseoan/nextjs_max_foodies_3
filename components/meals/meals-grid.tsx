import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import MealItem from './meal-item';
import style from './meals-grid.module.css';

export interface MealProps {
  id: string;
  title: string;
  slug: string;
  image: string | StaticImport ;
  summary: string;
  creator: string;
  creator_email: string;
  instructions: string;
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