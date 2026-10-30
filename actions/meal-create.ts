'use server';

import { MealProps } from "@/components/meals/meals-grid";
import { saveMeal } from "@/simple-backend/meals";
import { redirect } from "next/navigation";

function isValidText(text: string) {
  return !text || String(text).trim() === '';
}

export async function shareMeal(formData: FormData) {
  const meal = {
    // get(name of the input)
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  } as MealProps;

  if (
    isValidText(meal.title) ||
    isValidText(meal.summary)
  ) {
    
  }


  await saveMeal(meal);
  // redirect, pathname, etc from next/navigation.
  redirect('/meals');
}