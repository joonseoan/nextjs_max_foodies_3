'use server';

export async function shareMeal(formData: FormData) {
  console.log('formData: ', formData);
  
  const meal = {
    // get(name of the input)
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  }

  console.log('meal: ', meal)
}