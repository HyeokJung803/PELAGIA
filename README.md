# PELAGIA

## 심해 탐험

사용자 인터랙션과 시각적 연출을 중심으로 제작한 프리미엄 심해 탐험 반응형 웹 프로젝트

빛이 닿지 않는 세계를 배경으로, 잠수정 탐험 코스와 수심별 생태계, NEREID X1 잠수정, 예약 시뮬레이션을 하나의 스크롤 서사로 구성했습니다.

배포주소: https://pelagia-lilac.vercel.app/
**Tech**\
`React` `TypeScript` `Vite` `Tailwind CSS` `shadcn/ui` `Motion` `Lucide React`

**Repository**\
[https://github.com/HyeokJung803/PELAGIA](https://github.com/HyeokJung803/PELAGIA)

### 주요 기능

- 스크롤에 따라 수심이 깊어지는 몰입형 히어로 경험
- 3개의 심해 탐험 코스와 상세 정보 펼침 인터랙션
- 0m부터 6,000m까지 조절하는 수심 탐험 슬라이더
- 수압, 수온, 햇빛 도달률 및 수심별 심해 생물 변화
- NEREID X1 기술 도면과 장치별 핫스폿 설명
- 코스, 날짜, 인원, 추가 옵션 기반 예약 금액 계산
- 예약 요청 검증 및 완료 모달
- 비대칭 탐험 기록 갤러리와 키보드 지원 라이트박스
- 모바일·태블릿·데스크톱 반응형 레이아웃

### 실행 방법

Node.js 20.19 이상이 필요합니다.

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173`을 엽니다.

### 배포용 빌드

```bash
npm run build
npm run preview
```
