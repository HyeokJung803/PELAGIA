# PELAGIA

프리미엄 심해 탐험 브랜드를 가정해 제작한 반응형 인터랙티브 웹사이트입니다. 모든 예약 데이터와 인터랙션은 브라우저 상태에서만 동작하며 실제 결제나 서버 통신은 발생하지 않습니다.

## 실행 방법

Node.js 20.19 이상이 필요합니다.

```bash
npm install
npm run dev
```

터미널에 표시되는 로컬 주소(기본값 `http://localhost:5173`)를 브라우저에서 엽니다.

## 배포용 빌드

```bash
npm run build
npm run preview
```

## 기술 구성

- React + TypeScript + Vite
- Tailwind CSS
- shadcn/ui 패턴(Radix Dialog 기반)
- Motion
- Lucide React
- Pretendard Variable 공식 로컬 웹폰트 패키지

`public/images`의 심해 이미지는 이 포트폴리오를 위해 AI로 생성한 오리지널 비주얼입니다.
