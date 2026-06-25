@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ============================================
echo  딩고 페이지 로컬 서버
echo ============================================
echo.
echo  브라우저에서 아래 주소로 접속됩니다:
echo    http://localhost:8137/index.html
echo.
echo  * 작업하는 동안 이 검은 창은 닫지 마세요.
echo  * 끝나면 이 창을 닫으면 서버가 종료됩니다.
echo.
python -m http.server 8137
pause
