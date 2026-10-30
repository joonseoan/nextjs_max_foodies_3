'use client'

import { useFormStatus } from "react-dom";

function MealFormSubmit() {
  const { pending } = useFormStatus();

  return <button disabled={pending}>
    {pending ? 'Submitting...' : 'Submit'}
  </button>
}

export default MealFormSubmit;