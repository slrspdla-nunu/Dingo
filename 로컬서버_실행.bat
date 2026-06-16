@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ============================================
echo  딩고 페이지 로컬 서버
echo  (유튜브 영상 팝업 재생을 위해 http 로 띄웁니다)
echo ============================================
echo.
echo  브라우저에서 아래 주소가 자동으로 열립니다.
echo  http://localhost:8000/sub_AD_solution.html
echo.
echo  종료하려면 이 창에서 Ctrl + C 를 누르거나 창을 닫으세요.
echo.
start "" http://localhost:8000/sub_AD_solution.html
python -m http.server 8000
pause
