import fs from 'node:fs';
import { MealProps } from '@/components/meals/meals-grid';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

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

export async function saveMeal(meal: MealProps) {
  // Make a path url based on `title`
  meal.slug = slugify(meal.title, { lower: true });
  // To protect security from textarea input.
  meal.instructions = xss(meal.instructions);

  // store image file to `public` folder
  const extension = meal.image.name.split('.').pop();
  console.log('extension: ', extension)
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferImage));
}