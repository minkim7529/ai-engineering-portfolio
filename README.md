# AI Engineering Portfolio

김민석의 AI 엔지니어링 포트폴리오 사이트. 빌드 도구 없이 순수 HTML/CSS/JS로 작성했습니다.

## 로컬에서 보기

파일 탐색기에서 `index.html`을 더블클릭해도 되지만, 상대 경로 문제 없이 보려면
VS Code의 **Live Server** 확장을 추천합니다.

1. VS Code에서 이 폴더(`portfolio-site`)를 엽니다.
2. 확장 마켓플레이스에서 `Live Server` (ritwickdey) 설치.
3. `index.html`을 우클릭 → **Open with Live Server**.

## 구조

```
portfolio-site/
├── index.html      # 전체 페이지 구조/내용
├── css/style.css    # 디자인 토큰 + 컴포넌트 스타일 (라이트/다크 테마 포함)
├── js/main.js       # 테마 토글, 스크롤 스파이 내비게이션, 스크롤 reveal 애니메이션
└── favicon.svg
```

## 수정 방법

- **내용 수정**: `index.html`에서 해당 섹션의 텍스트를 직접 편집합니다.
- **법률상담 AI 섹션의 "본인 담당 파트"**: 페이지에서 빨간 배경으로 표시된
  부분을 브라우저에서 직접 클릭해 입력할 수 있습니다(`contenteditable`).
  단, 새로고침하면 초기화되니 실제로 반영하려면 `index.html`의 해당 텍스트를
  직접 고쳐야 합니다.
- **색상/폰트**: `css/style.css` 상단 `:root` 안의 CSS 변수(`--accent`, `--paper` 등)만
  바꾸면 전체 배색이 바뀝니다.
- **테마 토글**: 우측 상단 해/달 아이콘 버튼. 선택한 테마는 `localStorage`에
  저장되어 다음 방문 때도 유지됩니다.

## 배포

빌드 과정이 없는 정적 사이트라 아무 정적 호스팅에나 바로 올릴 수 있습니다.

- **GitHub Pages**: 이 폴더를 GitHub 저장소에 올리고 Settings → Pages에서
  브랜치를 지정하면 끝.
- **Vercel/Netlify**: 저장소를 연결하면 빌드 명령 없이(Framework: `Other`)
  바로 배포됩니다.
