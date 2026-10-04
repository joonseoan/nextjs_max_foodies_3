// The information here should be reviewed with the first project
// about Nextjs's basic behavior.

// 서버 컴포넌트 vs 클라이언트 컴포넌트
// 서버 컴포넌트 (Server Components)
// 실행 위치: 100% 서버에서만 실행됩니다.
// 특징:자바스크립트 번들이 브라우저로 전송되지 않아 페이지 용량이 줄어들고 (No Javascript code)
// 로딩 속도가 빨라집니다.
// Briefly, the backend executes the server component functions
// and hence derives the to-be-rendered HTML-code
// Then the client side receives and then renders the to-be-rendered HTML code.
// DB 직렬 연결(async/await), 데이터베이스 쿼리, API 키/보안 자원 접근이 용이합니다.
// 제약: useState, useEffect 같은 React Hook이나 onClick 같은 
// 브라우저 이벤트 리스너를 사용할 수 없습니다.
// Advantage: Less Client Side JS code and great SEO
//
// 클라이언트 컴포넌트(Client Components)
// 실행 위치: *** 서버에서 사전 렌더링(Prerender)된 후 *** (Still rendering in the server),
// The server returns a HTML file and client side Javascript file together.
// 브라우저에서 하이드레이션(Hydration)되어 인터랙션을 수행합니다.
// This means the frontend browser renders the HTML file and
// client side Javascript
// and then carry out the user interaction.
// 특징:기존 React 개발 방식과 동일하게 브라우저 API, 상태 관리, 이벤트 처리가 가능합니다.
// 선언 방법: 파일 최상단에 'use client' 디렉티브를 추가합니다.

// 언제 무엇을 사용해야 하는가 ?
// 서버 컴포넌트 사용: 데이터 패칭, DB 직접 접근, API 키 사용,
// 대용량 라이브러리 사용(브라우저 번들 제외 목적)
// 클라이언트 컴포넌트 사용: 버튼 클릭·폼 입력 등 이벤트 처리,
// useState / useEffect 사용, 브라우저 API(localStorage, window 등) 접근

'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';

import burgerImg from '@/assets/burger.jpg';
import curryImg from '@/assets/curry.jpg';
import dumplingsImg from '@/assets/dumplings.jpg';
import macncheeseImg from '@/assets/macncheese.jpg';
import pizzaImg from '@/assets/pizza.jpg';
import schnitzelImg from '@/assets/schnitzel.jpg';
import tomatoSaladImg from '@/assets/tomato-salad.jpg';
import classes from './image-slideshow.module.css';

const images = [
  { image: burgerImg, alt: 'A delicious, juicy burger' },
  { image: curryImg, alt: 'A delicious, spicy curry' },
  { image: dumplingsImg, alt: 'Steamed dumplings' },
  { image: macncheeseImg, alt: 'Mac and cheese' },
  { image: pizzaImg, alt: 'A delicious pizza' },
  { image: schnitzelImg, alt: 'A delicious schnitzel' },
  { image: tomatoSaladImg, alt: 'A delicious tomato salad' },
];

export default function ImageSlideshow() {
  // Not in terminal. Browser only
  console.log('Image Component - Client Side Rendering, We can\'t see this in the terminal')
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.slideshow}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.image}
          className={index === currentImageIndex ? classes.active : ''}
          alt={image.alt}
        />
      ))}
    </div>
  );
}