@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ============================================
echo  딩고 페이지 SVG 이미지 분리 스크립트
echo ============================================
echo.
python "svg_이미지_분리.py"
if errorlevel 1 (
  echo.
  echo [안내] python 실행에 실패했습니다.
  echo  python 이 설치되어 있는지 확인하세요. https://www.python.org/downloads/
  echo  설치 시 "Add Python to PATH" 체크를 꼭 하세요.
)
echo.
pause
