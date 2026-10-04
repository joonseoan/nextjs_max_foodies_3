import Link from "next/link";
import style from './page.module.css';
import ImageSlideshow from '@/components/images/image-slideshow';

export default function Home() {
  console.log('Home Page - Server Side Rendering, We can see this one the terminal.')
  return (
    <>
      {/*
        [IMPORTANT]
        <header /> can be used here and there in the project.
        We used <header> in layout.tsx
        Then we can use <header> and <main /> here again.
      */}
      <header className={style.header}>
        <div className={style.slideshow}>
          <ImageSlideshow />
        </div>
        <div>
          <div className={style.hero}>
            <h1>Next Level Food for NextLevel Foodies</h1>
            <p>Taste & share food from all overthe world.</p>
          </div>
          <div className={style.cta}>
            <Link href="/community">Join the Community</Link>
            <Link href="/meals">Explore Meals</Link>
          </div>
        </div>
      </header>
      <main>
        <section className={style.section}>
          <h2>How it works</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes, and to
            connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>
        <section className={style.section}>
          <h2>Why NextLevel Food?</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes, and to
            connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>
      </main>
    </>
  );
  // return (
  //   <main>
  //     <h1 style={{ color: 'white', textAlign: 'center' }}>
  //       Time to get started!
  //     </h1>
  //     <p>
  //       <Link href="/meals">Meals</Link>
  //     </p>
  //     <p>
  //       <Link href="/meals/share">Meals Share</Link>
  //     </p>
  //     <p>
  //       <Link href="/community">Community</Link>
  //     </p>
  //     <p>
  //       <Link href="/meals/first-meals">Meals Dynamic</Link>
  //     </p>
  //   </main>
  // );
}
