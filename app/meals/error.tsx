// [IMPORTANT]
// must use it in the client component
'use client'

// [IMPORTANT]
// It covers entire `meals` page.

function Error(prop: any) {
  // prop:
  // Object {
  //  error: Error,  // contains the message from the backend or throw new Error
  //  reset: reset(),
  //  retry: retry()
  // }
  console.log('prop: ', prop);

  // [IMPORTANT]
  // The style is from `global.css` under the app folder
  return <main className="error">
    <div>
      <p>Unexpected Error Occurred.</p>
      <p></p>
    </div>
  </main>
}

export default Error;
