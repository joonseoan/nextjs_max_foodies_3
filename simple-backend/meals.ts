import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getMeals() {
  // [IMPORTANT]
  // 'resolve' is a function!
  // `await` because it does not exist without return.
  // Basically, it needs to use `await`
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return db.prepare('SELECT * FROM meals').all();
}