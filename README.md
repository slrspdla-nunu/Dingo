# Dingo Website

딩고(Dingo) 브랜드 웹사이트입니다. 메인 페이지와 4개의 서브 페이지로 구성된 정적 웹사이트입니다.

## 페이지 구성

- **index.html** — 메인 페이지
- **sub_About.html** — About (회사 소개)
- **sub_Dingo.html** — Dingo (콘텐츠 소개)
- **sub_AD_solution.html** — AD Solution (광고 솔루션)
- **sub_For_Fans.html** — For Fans (팬 공간)

## 폴더 구조

```
.
├── index.html
├── sub_About.html
├── sub_Dingo.html
├── sub_AD_solution.html
├── sub_For_Fans.html
├── css/        # 페이지별 스타일시트 (style.css, sub_*.css, reset.css, font.css)
├── script/     # jQuery 및 페이지별 스크립트 (action.js, header.js, sub_*.js)
└── image/      # 페이지별 이미지 리소스
```

## 주요 기능

- 상단 글로벌 내비게이션(GNB) 메뉴
- 서브 페이지 탭 메뉴 (스크롤 시 상단 고정)
- 헤더 공통 기능: 언어 설정 토글, 현재 링크 복사 (`script/header.js`)
- 스크롤 등장 애니메이션 및 인터랙션

## 실행 방법

별도의 빌드 과정 없이 `index.html` 파일을 브라우저에서 열면 됩니다.

## 기술 스택

HTML, CSS, JavaScript (jQuery)
