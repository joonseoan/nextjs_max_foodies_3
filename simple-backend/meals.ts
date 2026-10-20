import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getMeals() {
  // error demo for `error.tsx`
  // throw new Error('There is unresolved error.');

  // [IMPORTANT]
  // 'resolve' is a function!
  // `await` because it does not exist without return.
  // Basically, it needs to use `await`
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return db.prepare('SELECT * FROM meals').all();
}

export async function getMeal(mealId: string) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(mealId);
}