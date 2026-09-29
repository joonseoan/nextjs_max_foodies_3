async function DynamicMeals({ params }: PageProps<"/meals/[slug]">) {
  const { slug } = await params;
  console.log('slug: ', slug);

  return <main>
    <p>DynamicMeals</p>
  </main>
}

export default DynamicMeals;