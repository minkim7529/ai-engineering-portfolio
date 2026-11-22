# 김민석 · AI / LLM Engineering Portfolio

**[포트폴리오 사이트 열기](https://minkim7529.github.io/ai-engineering-portfolio/)** · [GitHub 프로필](https://github.com/minkim7529) · [이메일](mailto:kms7529@naver.com)

AI·LLM 엔지니어 지원을 위한 프로젝트 포트폴리오입니다. 각 대표작의 문제, 담당 역할, 기술적 결정, 공개된 검증 자료를 정리했습니다.

## 대표 프로젝트

1. **[법률상담 AI](https://github.com/minkim7529/legal-consultation-ai)** — Llama 3.1 8B LoRA 파인튜닝, 학습·서빙 노트북과 데이터 샘플 공개. 학생 4인 팀 졸업작품, 공학제 최우수상.
2. **[로컬 LLM 보이스 컴패니언](https://github.com/minkim7529/vtuber-ollama-gemini-experiments)** — Open-LLM-VTuber 기반 Ollama/Gemini 실험과 출력 보정. 직접 수정한 15개 파일의 패치 공개.
3. **[StockPilot](https://github.com/minkim7529/ai-stock-trading-program)** — 시세·뉴스·Gemini 판단을 연결한 데스크톱 앱. 장부 분리·주문 검증 등 [자동 테스트 107개 통과 기록](evidence/stockpilot-tests-2026-11-22.txt) (2026-11-22, c819b2c).
4. **[AI Daily](projects/ai-daily.html)** — FastAPI 수집·갱신과 SQLite 중복 처리.

## VTuber 가드 평가 재현

[패치 원본](https://github.com/minkim7529/vtuber-ollama-gemini-experiments/blob/e60a309113a58035bb9993677c103e9f2608773b/my-changes.patch)을 내려받고 저장소 루트에서 다음 명령을 실행합니다. 역할 역전 문장의 기대 판정과 실제 판정을 문장별로 출력합니다.

```sh
python evidence/check_guard.py /path/to/my-changes.patch
```

## 구조와 수정

- `index.html`: 대표작 요약, 핵심 역량, 연락처
- `projects/`: 프로젝트별 상세 설명과 근거 링크
- `js/main.js`: 공통 프로필, 프로젝트 메뉴, 테마 전환
- `css/style.css`: 반응형 레이아웃과 라이트·다크 테마
- `img/`: 프로젝트 화면과 설명 이미지

공통 연락처와 메뉴는 `js/main.js`에서 수정합니다. 상세 내용은 각 HTML 파일에서 수정하며, 브라우저에서 문서를 직접 편집하는 기능은 없습니다.

## 로컬 확인과 배포

빌드 도구가 없는 HTML/CSS/JavaScript 정적 사이트입니다. 저장소 루트에서 아래 명령으로 열 수 있습니다.

```sh
python -m http.server 8000 --bind 127.0.0.1
```

브라우저에서 `http://127.0.0.1:8000`에 접속합니다. GitHub Pages는 `master` 브랜치의 루트(`/`)를 배포합니다.
