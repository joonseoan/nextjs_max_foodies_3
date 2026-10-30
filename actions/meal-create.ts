'use server';

import { ShareMealState } from "@/app/meals/share/page";
import { MealProps } from "@/components/meals/meals-grid";
import { saveMeal } from "@/simple-backend/meals";
import { revalidatePath } from "next/cache";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { StaticImageData } from "next/image";
import { redirect } from "next/navigation";

function isValidText(text: string) {
  return !text || String(text).trim() === '';
}


// `prevState` must be here to work in `useActionState` in the component
export async function shareMeal(prevState: ShareMealState, formData: FormData): Promise<ShareMealState> {
// Without `useActionState` and working directly with `action` in the form.
// export async function shareMeal(formData: FormData): Promise<ShareMealState> {
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
    isValidText(meal.summary) ||
    isValidText(meal.instructions) ||
    isValidText(meal.creator) ||
    isValidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image || (meal.image as unknown as File).size === 0
  ) {
    // 2)
    // To use `useActionState` in the form page.
    // It must return something
    return {
      message: 'Invalid Input',
    }

    // 1) Working directly with `action` in the form
    // then it redirect to the error page
    // Call /meals/share/error.tsx (It transits the page)
    // throw new Error('Invalid Input');
    
  }


  await saveMeal(meal);
  // [IMPORTANT]
  // Before redirect, we need to break cache for `meals` page which is rendered
  // during the pnpm run build.
  // Then we can update the new meal.
  // Please find the `/meals/page.tsx` about cache.

  // revalidate cache that belongs to a certain route path.
  // Please note that it does not revalidate the nested path. Only `/meals` path.
  // Hence, to revalidate the nested paths, we need to do it separately for each path.

  // [IMPORTANT]
  // Alternatively, we can revalidate the path and set this to `layout`
  // The default is page, which means that simply this one page, `meals` and one path `layout`
  // will be revalidated. As we know, the layout page wraps the nested page
  // and therefore, with this, all nested page will be revalidated!

  // Once we select, 'page'?? means the selected page itself! (No nested pages.)
  // By default, we do not need to add 'page' for the second parameter.

  // Revalidated means that NextJS throws away cache for the defined pages.
  // revalidatePath('/meals', 'layout');

  // For the entire websites
  // revalidatePath('/', 'layout');

  revalidatePath('/meals');

  // redirect, pathname, etc from next/navigation.
  redirect('/meals');
}