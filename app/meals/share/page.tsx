// No error with the separate server side action
// 'use client';

import classes from './page.module.css';
import ImagePicker from '@/components/meals/image-picker';
import { shareMeal } from '@/actions/meal-create';

export default function ShareMealPage() {
  // 2) However, what if we need to convert this component to the client component?
  // what if we need to use special client tools here?
  // For this reason, we can separate the action in another file.
  // Then, we can create `actions/meal-create` in another folder.
  // Hence, we can add 'use client' in this file.

  // 1) It works only for the server client.
  // [IMPORTANT]
  // Create action or event in the server, not client!
  // It is so called `server action`
  // 1. add `async` in the function.
  // 2. add 'use server' inside the server scope.
  // Why the server event function?
  // It is provided by React, not by NextJS.
  // async function shareMeal(formData: FormData) {
  //   'use server'
  //   console.log('formData: ', formData);
    
  //   const meal = {
  //     // get(name of the input)
  //     title: formData.get('title'),
  //     summary: formData.get('summary'),
  //     instructions: formData.get('instructions'),
  //     image: formData.get('image'),
  //     creator: formData.get('name'),
  //     creator_email: formData.get('email'),
  //   }

  //   console.log('meal: ', meal)
  // }

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form
          className={classes.form}
          // In the previous standard way, action attribute indicates "/some-path"
          // action="/some-path"
          // However, in NextJS, its value is a function.
          action={shareMeal}
        >
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows={10}
              required
            ></textarea>
          </p>
          {/* name is a key to get formData.get('image') */}
          <ImagePicker label="Your image" name='image' />
          <p className={classes.actions}>
            <button type="submit">Share Meal</button>
          </p>
        </form>
      </main>
    </>
  );
}
