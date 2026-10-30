// [IMPORTANT]
// must use it in the client component
'use client'

function Error() {
  return <main className="error">
    <div>
      <h1>Unexpected Error Occurred.</h1>
      <p>Failed to create meal.</p>
    </div>
  </main>
}

export default Error;
