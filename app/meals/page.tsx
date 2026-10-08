
import Link from 'next/link';
import style from './page.module.css';
import MealsGrid, { MealProps } from '@/components/meals/meals-grid';
import { getMeals } from '@/simple-backend/meals';

// [IMPORTANT]
// We can use `async` only in the server component.
async function MealsPage() {
  // Please make sure the nextJS has a backend already.
  // For the server component, we do not use useEffect.
  const meals = await getMeals() as MealProps[];
  console.log(meals);

  // Set up initdb.ts after install better-sqllite3
  // In terminal, run `node initdb.ts`
  // Then we can get `meals.db` file.
  return(
    <>
      <header className={style.header}>
        <h1>
          Delicious meals, created{' '}
          <span className={style.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={style.cta}>
          <Link href="/meals/share">
            Share Your Favorite Recipe
          </Link>
        </p>
      </header>
      <main className={style.main}>
        <MealsGrid meals={meals} />
      </main>
    </>
  );
}

export default MealsPage;