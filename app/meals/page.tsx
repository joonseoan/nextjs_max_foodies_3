/**
 * NextJS Cache
 *
 * NextJS works with aggressive cache policy when it runs in the production mode.
 * [IMPORTANT]
 * When running `pnpm run build`, NextJS goes ahead and actually generates pre-renders all the pages.
 * Hence, all the pages can be pre-generated. So basically all non-dynamic-pages
 * For instance, `meals` page here is pre-generated in the server.
 * So data are fetched and rendered during `pnpm run build` process.
 * This pre-generated pages are available right from the start after being deployed.
 * Then, the use can see the finished page without having to wait (without fetching data from the server)
 * because the required data is already fetched in the server. Then NextJS caches this page.
 * 
 * The function function here never runs again after rendering during the build process.
 * Instead, it just uses the pre-generated page.
 * async function Meals() {
    const meals = await getMeals() as MealProps[];
    return <MealsGrid meals={meals}/>
  }
*
* Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /community
├ ○ /icon.png
├ ○ /meals
├ ƒ /meals/[slug]
└ ○ /meals/share

[FYI]
Just FYI. The production will not support public folder.
Therefore, The image should implement AWS S3 bucket.
*
*/

import Link from 'next/link';
import style from './page.module.css';
import MealsGrid, { MealProps } from '@/components/meals/meals-grid';
import { getMeals } from '@/simple-backend/meals';
// For loading and for fallback page.
import { Suspense } from 'react';

export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared by our vibrant community',
};

// Fetching data approach 2.
// The advantage of this is that 1) now we outsourced the data fetching part
// from the separate component
// 2) We can wrap this component from another component.
async function Meals() {
  const meals = await getMeals() as MealProps[];
  return <MealsGrid meals={meals}/>
}

// [IMPORTANT]
// We can use `async` only in the server component.
async function MealsPage() {
  // 1) Fetching data approach 1.
  // [IMPORTANT - note]
  // The `meals` data is cached in the production mode thanks to nextjs cache policy.
  // However, it is never and ever cached in the develop mode.

  // Please make sure the nextJS has a backend already.
  // For the server component, we do not use useEffect.
  // const meals = await getMeals() as MealProps[];
  // console.log(meals);

  // Set up initdb.ts after install better-sqllite3
  // In terminal, run `node initdb.ts`
  // Then we can get `meals.db` file.
  return(
    <>
      <header className={style.header}>
        <h1>
          Delicious meals, created{' '}
          <span className={style.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={style.cta}>
          <Link href="/meals/share">
            Share Your Favorite Recipe
          </Link>
        </p>
      </header>
      <main className={style.main}>
        {/* 
          It works like loading.tsx for the page that has fetched data, etc.
          1. loading.tsx (파일 기반 로딩)
          적용 범위: 해당 폴더(파일이 위치한 세그먼트)와 그 하위의 모든 페이지/컴포넌트를 전체적으로 감싸는 
          Suspense 경계(Boundary)를 Next.js가 자동으로 생성해 줍니다.
          사용 목적: 페이지 단위(Page-level)나 레이아웃 단위(Layout-level)의 거대한
          로딩 UI를 만들 때 주로 사용합니다.
          (예: 사용자가 /meals 페이지로 이동할 때 전체 화면 스켈레톤이나 로딩 스피너를 보여줄 때)

          특징: 파일 하나만 툭 만들어두면 Next.js 내부적으로 자동으로 <Suspense fallback="{<Loading"/>}>로 감싸주기 때문에 코드가 매우 간결해집니다.

          2. <Suspense> 컴포넌트 (수동 경계 설정)
          적용 범위: 개발자가 직접 지정한 특정 컴포넌트
          단위나 부분 영역에만 적용됩니다.

          사용 목적: 페이지 전체가 아니라, 데이터 로딩이
          느린 특정 컴포넌트(예: 리뷰 목록, 사용자 프로필, 추천 상품 등)만 
          따로 떼어내어 로딩 상태를 처리하고 싶을 때 사용합니다.

          특징: 페이지의 나머지 부분(예: 헤더나 타이틀 등)은 
          데이터가 없어도 먼저 즉시 렌더링되고, 
          느린 컴포넌트 자리만 쏙쏙 로딩 UI로 채워지는 스트리밍(Streaming)
          효과를 세밀하게 제어할 수 있습니다.
        */}
        <Suspense fallback={<p className={style.loading}>Meals loading...</p>}>
          <Meals />
        </Suspense>
        {/* <MealsGrid meals={meals} /> */}
      </main>
    </>
  );
}

export default MealsPage;