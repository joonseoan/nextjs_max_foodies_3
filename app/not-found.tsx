// Basically, nextjs provides the default not-found components.
// However, we can customize it.

// This not found file can be placed anywhere
// for instance, `meals` folder as well.

function NotFound() {
  return <main className="not-found">
    <h1>Page Not Found</h1>
    <p>We could not find the requested page or resource.</p>
  </main>
}

export default NotFound;