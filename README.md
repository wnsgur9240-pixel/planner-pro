# Planner Pro 🎯

목표를 달성하고 포인트를 모으는 게이미피케이션 플래너 앱입니다.

## 기능

✅ **플래너** - 요일별 일정 관리
✅ **증거 검증** - 사진/동영상으로 활동 증명
✅ **포인트 시스템** - 1시간당 100포인트
✅ **리그보더** - 월간 순위 경쟁
✅ **통계** - 개인 성과 확인

## 로컬에서 실행하기

### 1. Node.js 설치
https://nodejs.org/ 에서 최신 LTS 버전 다운로드

### 2. 프로젝트 다운로드
```bash
git clone <your-repo-url>
cd planner-pro
```

### 3. 의존성 설치
```bash
npm install
```

### 4. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

## Vercel에 배포하기

### 1단계: GitHub에 업로드
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/planner-pro.git
git push -u origin main
```

### 2단계: Vercel에서 배포
1. https://vercel.com 접속
2. GitHub 계정으로 로그인
3. "New Project" 클릭
4. GitHub 리포지토리 선택 (planner-pro)
5. Framework: `Vite` 선택
6. "Deploy" 클릭

**배포 완료!** 🎉
- Vercel이 자동으로 HTTPS URL을 생성합니다
- 예: `https://planner-pro-xyz.vercel.app`
- 매번 GitHub에 push하면 자동으로 배포됨

## 프로젝트 구조

```
planner-pro/
├── src/
│   ├── App.jsx          # 메인 앱 컴포넌트
│   ├── main.jsx         # React 엔트리 포인트
├── index.html           # HTML 파일
├── package.json         # 의존성 설정
├── vite.config.js       # Vite 설정
└── .gitignore
```

## 기술 스택

- React 18
- Vite
- Tabler Icons
- Vercel 호스팅

## 라이선스

MIT
