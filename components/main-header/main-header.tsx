import Link from "next/link";
import Image from "next/image";
// In NextJS, `logoImage` is an object.
// It does not indicate a path `string`.
/**
 * logoImage = {
    src: '/_next/static/media/logo.123.png', // 이미지 경로 (문자열)
    width: 200,                               // 가로 크기 (숫자)
    height: 100,                              // 세로 크기 (숫자)
    blurDataURL: 'data:image/png;base64,...'  // 블러 이미지 데이터 (문자열)
  }
 *
 */
import logoImage from '@/assets/logo.png';

// The way of creating css file in NextJS.
// Also, we can implement tailwind in the component.
import style from './main-header.module.css';
import MainHeaderBackground from "./main-header-background";

function MainHeader() {
  return <>
    <MainHeaderBackground />
    <header className={style.header}>
      {/*
        Must add `src` in Next.js when we import image files
        because href only allows the string, not the object.
        The property of `src` has the path information that is string.

        참고: <Image> 컴포넌트를 쓸 때와의 차이점

        만약 Next.js에서 제공하는 next/image의 <Image> 컴포넌트를 사용할 때는 .src를 붙이지 않고 객체 전체를 전달합니다.
        JavaScript

        import Image from 'next/image';
        import logoImage from '@/assets/logo.png';

        [IMPORTANT]
        // Next.js의 Image 컴포넌트는 객체를 받아 width, height를 자동으로 추출하여 최적화해 줍니다.
        // For instance, it uses lazy loading concept.
        // So it is not displayed if this image is not necessary in the browser
        // For instance, when the image is hidden at the bottom of the browser.
        <Image src={logoImage} alt="Logo" />
      */}
      <Link className={style.logo} href="/">
        {/* <img src={logoImage.src} alt="main-header-logo" />  */}
        {/* 
          src here in Image from NextJs supports the object.
          [IMPORTANT]
          In our scenario, we do not need to implement lazy loading
          mechanism becaus this image should be rendered at the top
          of the browser.
        */}
        <Image src={logoImage} alt="main-header-logo"  priority />
        Next Level Food
      </Link>
      <nav className={style.nav}>
        <ul>
          <li>
            <Link href="/meals">Browse Meals</Link>
          </li>
          <li>
            <Link href="/community">Foodies Community</Link>
          </li>
        </ul>
      </nav>
    </header>
  </>
}

export default MainHeader;