import Link from 'next/link';
import Image from 'next/image';

import classes from './meal-item.module.css';
import { MealProps } from './meals-grid';

export default function MealItem({ title, slug, image, summary, creator }: MealProps) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          {/* 
            fill: dynamically fill the image here.
            the image value is from db
            and their image is from `public` folder in this NextJs project.

            In the DB, we will have a path pointing to some image,
            and NextJS will not be able to resolve the **** width and height ***** of such an image,
            of such a dynamically loaded and resolved image simply because the information
            is not available at build time as it is the case for all imported images in **`runtime`**

            BTW, we can also manually implement width and height.
          */}
          <Image
            src={image}
            alt={title}
            fill
            // sizes='22'
            // We can use width and height manually.
            // width={}
            // height={} 
          />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}