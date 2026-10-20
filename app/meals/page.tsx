
import Link from 'next/link';
import style from './page.module.css';
import MealsGrid, { MealProps } from '@/components/meals/meals-grid';
import { getMeals } from '@/simple-backend/meals';
// For loading and for fallback page.
import { Suspense } from 'react';

// Fetching data approach 2.
// The advantage of this is that 1) now we outsourced the data fetching part
// from the separate component
// 2) We can wrap this component from another component.
async function Meals() {
  const meals = await getMeals() as MealProps[];
  return <MealsGrid meals={meals}/>
} 

// [IMPORTANT]
// We can use `async` only in the server component.
async function MealsPage() {
  // 1) Fetching data approach 1.
  // [IMPORTANT - note]
  // The `meals` data is cached in the production mode thanks to nextjs cache policy.
  // However, it is never and ever cached in the develop mode.

  // Please make sure the nextJS has a backend already.
  // For the server component, we do not use useEffect.
  // const meals = await getMeals() as MealProps[];
  // console.log(meals);

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
        {/* It works like loading.tsx for the page that has fetched data, etc */}
        <Suspense fallback={<p className={style.loading}>Meals loading...</p>}>
          <Meals />
        </Suspense>
        {/* <MealsGrid meals={meals} /> */}
      </main>
    </>
  );
}

export default MealsPage;