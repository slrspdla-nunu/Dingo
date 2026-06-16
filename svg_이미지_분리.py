# -*- coding: utf-8 -*-
"""
딩고 페이지.svg 안에 base64로 박혀 있는 이미지들을 'images' 폴더로 빼내고,
SVG 안에서는 그 이미지들을 파일 경로로 연결해주는 스크립트.

결과물:
  - images/                         : 추출된 이미지 파일들 (딩고_image0... 등)
  - 딩고 페이지_경로버전.svg         : 이미지가 파일 경로로 연결된 새 SVG (원본과 똑같이 보임)

원본 '딩고 페이지.svg' 는 건드리지 않습니다.

옵션:
  - EXTRACT = True  : 원본 이미지를 실제 파일로 뽑아서 연결 (기본, 결과가 원본과 100% 동일)
  - EXTRACT = False : 이미지를 뽑지 않고 빈 경로만 만들어 둠 (나중에 직접 이미지를 넣을 때)
"""

import base64
import os
import re
import sys

# ===== 설정 =====
EXTRACT = True   # 기존 이미지를 실제 파일로 뽑으려면 True, 빈 경로만 만들려면 False
PREFIX = "딩고_"  # 추출되는 이미지 파일 이름 앞에 붙는 글자
# ===============

HERE = os.path.dirname(os.path.abspath(__file__))
INPUT_SVG = os.path.join(HERE, "딩고 페이지.svg")
OUTPUT_SVG = os.path.join(HERE, "딩고 페이지_경로버전.svg")
IMG_DIR = os.path.join(HERE, "images")

EXT_MAP = {"jpeg": "jpg", "jpg": "jpg", "png": "png",
           "gif": "gif", "webp": "webp", "svg+xml": "svg"}

# <image ...> 한 개를 통째로 잡는다 (self-closing). base64 안에는 '>' 가 없으므로 안전.
IMAGE_RE = re.compile(r"<image\b[^>]*?/>", re.DOTALL)
ID_RE = re.compile(r'id="([^"]+)"')
HREF_RE = re.compile(r'((?:xlink:)?href=")data:image/([^;]+);base64,([^"]+)(")', re.DOTALL)


def main():
    if not os.path.exists(INPUT_SVG):
        print("[오류] '딩고 페이지.svg' 를 찾을 수 없습니다. 스크립트를 SVG와 같은 폴더에 두세요.")
        sys.exit(1)

    with open(INPUT_SVG, "r", encoding="utf-8") as f:
        svg = f.read()

    if EXTRACT and not os.path.exists(IMG_DIR):
        os.makedirs(IMG_DIR)

    count = {"n": 0}

    def replace_image(m):
        block = m.group(0)
        href = HREF_RE.search(block)
        if not href:
            return block  # 이미 base64가 아니면 그대로 둠

        idm = ID_RE.search(block)
        img_id = idm.group(1) if idm else "image%d" % count["n"]
        mime = href.group(2).lower()
        ext = EXT_MAP.get(mime, "png")
        filename = "%s%s.%s" % (PREFIX, img_id, ext)
        rel_path = "images/%s" % filename
        count["n"] += 1

        if EXTRACT:
            data = base64.b64decode(href.group(3))
            with open(os.path.join(IMG_DIR, filename), "wb") as out:
                out.write(data)
            print("  추출: %s  (%d KB)" % (rel_path, len(data) // 1024))
        else:
            print("  경로: %s  (빈 경로 - 직접 이미지를 넣으세요)" % rel_path)

        # base64 데이터 부분만 파일 경로로 교체
        new_href = href.group(1) + rel_path + href.group(4)
        return block[:href.start()] + new_href + block[href.end():]

    new_svg = IMAGE_RE.sub(replace_image, svg)

    with open(OUTPUT_SVG, "w", encoding="utf-8") as f:
        f.write(new_svg)

    print("")
    print("완료! 이미지 %d개 처리." % count["n"])
    print("  새 SVG : %s" % OUTPUT_SVG)
    if EXTRACT:
        print("  이미지 : %s" % IMG_DIR)
    print("이제 'images' 폴더의 파일을 원하는 이미지로 바꾸면 SVG에 그대로 반영됩니다.")


if __name__ == "__main__":
    main()
