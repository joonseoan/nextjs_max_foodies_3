import style from './page.module.css';

// [IMPORTANT]
// It works automatically in nextjs.
// It is not required to be imported to `page.tsx`

// Also, this loading page works for all pages
// if it is located directly under `app` folder

// Actually, it is not the ideal way.
// The better way is located in `meals/page.tsx`
function MealsLoading() {
  return <p className={style.loading}>Meals loading...</p>;
}

export default MealsLoading;