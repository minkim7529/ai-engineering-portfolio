# 김민석 · AI 엔지니어 포트폴리오

[포트폴리오 열기](https://minkim7529.github.io/ai-engineering-portfolio/)

대표 프로젝트는 법률상담 AI, StockPilot, Open-LLM-VTuber 확장입니다. 첫 화면에서 담당 역할과 실험 결과를 읽고 학습 노트북, 코드 패치, 테스트 로그를 열 수 있습니다.

- `index.html` — 소개, 대표 프로젝트, 웹 서비스 경험, 연락처
- `css/portfolio.css` — 모바일 및 데스크톱 레이아웃
- `projects/` — 기존 프로젝트 주소로 방문한 사람을 위한 이동 페이지
- `evidence/` — 테스트 실행 로그, 역할 혼동 평가용 문장과 재현 스크립트

가드 평가를 재현하려면 [공개 코드 패치](https://github.com/minkim7529/vtuber-ollama-gemini-experiments/blob/e60a309113a58035bb9993677c103e9f2608773b/my-changes.patch)를 내려받고 `python evidence/check_guard.py /path/to/my-changes.patch`를 실행합니다.

GitHub Pages가 `master` 브랜치의 루트를 정적 사이트로 배포합니다.
