// [서버 컴포넌트 vs 클라이언트 컴포넌트]

// 1. 서버 컴포넌트 (Server Components)
// - 실행 위치: 100% 서버에서만 실행됩니다.
// - 특징: 
//   - 브라우저로 전달되는 자바스크립트 번들 용량이 없어
//     (No React Page JS code sent for server components)
//     페이지 로딩 속도가 향상됩니다.
//   - 데이터베이스 직접 연결(async/await), 데이터 쿼리, API 키 등 보안 자원에 안전하게
//     접근할 수 있습니다.
// - 동작 방식 (Rendering Flow):
//   - [최초 진입 시 (Initial Load)]: 서버에서 컴포넌트를 실행하여 HTML과 함께 
//     RSC Payload(React Server Component Stream)를 함께 생성해 클라이언트로 전송합니다.
//   - [페이지 이동 시 (Client-side Navigation)]: HTML 전체를 다시 만들지 않고,
//     변경된 서버 컴포넌트의 결과물인 **RSC Payload만 전송**합니다.
// - 제약: useState, useEffect 같은 React Hook이나 onClick 같은 브라우저 이벤트 
//   리스너를 사용할 수 없습니다.
// - 장점: 클라이언트 사이드 JS 번들 감소로 인한 성능 최적화 및 뛰어난 SEO 지원 
//   (크롤러가 완성된 HTML을 바로 수집).

// 2. 클라이언트 컴포넌트 (Client Components)
// - 실행 위치: 서버에서 먼저 사전 렌더링(Prerender)된 후, 브라우저에서 
//   하이드레이션(Hydration)되어 최종 인터랙션을 수행합니다.
// - 선언 방법: 파일 최상단에 'use client' 디렉티브를 추가합니다.
// - 특징: 기존 React 개발 방식과 동일하게 브라우저 API, 상태(State) 관리, 
//   이벤트 처리가 가능합니다.
// - 동작 방식 (Rendering Flow):
//   - [최초 진입 시]: 서버가 사전 렌더링한 HTML과 JS 번들을 클라이언트로 보냅니다.
//     브라우저가 HTML을 먼저 보여준 후, JS 번들과 RSC Payload를 읽어 하이드레이션을
//     진행합니다.
//   - [페이지 이동 시]: 이미 내려받은 JS 번들과 새로 수신한 RSC Payload를 통해 
//     브라우저의 React가 필요한 부분만 DOM을 업데이트합니다.
// - 장점: 사용자 이벤트 처리, React Hook 사용, 브라우저 전용 API 활용 가능.

// 3. 언제 무엇을 사용해야 하는가?
// - 서버 컴포넌트 사용: 데이터 패칭(Data Fetching), DB 직접 접근, API 키 사용,
//   대용량 라이브러리 사용(번들 크기 절감 목적).
// - 클라이언트 컴포넌트 사용: 버튼 클릭·폼 입력 등 이벤트 처리, useState / useEffect 사용,
//   브라우저 API(localStorage, window 등) 접근.
/**
 * [IMPORTANT]
 * The client component should be the most child component.
 * We need to chop the component as much as possible.
 * Then, the most of component should be the server component!
 * Then, we need to have minimum client component.
 */

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