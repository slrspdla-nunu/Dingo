/*
 * highlighter.js
 * 오른쪽 하단 플로팅 버튼.
 * 클릭하면 "진짜로 작동하는 요소"만 테두리 + 발광으로 표시한다.
 *   · 페이지 이동 링크 : 실제로 이동/스크롤되는 <a> (파랑)
 *   · 동작 요소        : 클릭 핸들러가 붙어 실제로 작동하는 버튼/요소 (초록)
 * 단순히 버튼처럼 생겼지만 아무 동작도 없는 요소(빈 href="#", 핸들러 없는 button 등)는 제외한다.
 * 다시 클릭하면 해제. 모든 화면 크기 대응(반응형). 기존 플로팅 UI와 겹치지 않게 자동 회피.
 *
 * ※ 핸들러 감지를 위해 이 스크립트는 다른 스크립트보다 "먼저" 로드되어야 한다
 *   (addEventListener 호출을 가로채 기록하기 때문).
 */
(function () {
  "use strict";

  if (window.__interactiveHighlighterLoaded) return;
  window.__interactiveHighlighterLoaded = true;

  // ===== 1) 핸들러 기록용 후킹 (즉시 실행 — 앱 스크립트보다 먼저) =====
  // 클릭/탭뿐 아니라 누름·드래그(톤암, 진행바 등) 성격의 이벤트가 붙은 "요소"도 기록한다.
  var CLICK_TYPES = {
    click: 1, pointerdown: 1, pointerup: 1,
    mousedown: 1, mouseup: 1, touchstart: 1, touchend: 1
  };
  var clickable = new Set();

  try {
    var proto = EventTarget.prototype;
    var nativeAdd = proto.addEventListener;
    proto.addEventListener = function (type, listener, opts) {
      try {
        if (CLICK_TYPES[type] && this && this.nodeType === 1) {
          clickable.add(this); // 실제 DOM 요소에 클릭류 핸들러가 붙음
        }
      } catch (e) {}
      return nativeAdd.call(this, type, listener, opts);
    };
  } catch (e) {}

  // ===== 2) 상수/상태 =====
  var STYLE_ID = "ih-style";
  var BTN_ID = "ih-fab";
  var LEGEND_ID = "ih-legend";
  var NAV_CLASS = "ih-hl-nav";
  var ACTION_CLASS = "ih-hl-action";
  var active = false;
  // 표시에서 제외할 요소(자기 자신/하위 포함). 예: 앨범 커버 아트는 클릭돼도 표시하지 않음.
  var EXCLUDE_SELECTOR = ".album_cover";
  // 표시 ON/OFF 상태 저장 키 (페이지 이동 후에도 유지)
  var STORE_KEY = "ih-active";

  function saveActive(on) {
    try { window.localStorage.setItem(STORE_KEY, on ? "1" : "0"); } catch (e) {}
  }
  function loadActive() {
    try { return window.localStorage.getItem(STORE_KEY) === "1"; } catch (e) { return false; }
  }

  // ===== 3) 스타일 =====
  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var css = [
      "#" + BTN_ID + "{",
      "  position:fixed;",
      "  right:clamp(14px,4vw,28px);",
      "  bottom:clamp(14px,4vw,28px);",
      "  width:clamp(48px,12vw,60px);",
      "  height:clamp(48px,12vw,60px);",
      "  border-radius:50%;border:none;cursor:pointer;",
      "  z-index:2147483646;",
      "  display:flex;align-items:center;justify-content:center;",
      "  background:linear-gradient(135deg,#5b6cff,#9b3bff);color:#fff;",
      "  box-shadow:0 6px 18px rgba(0,0,0,.28);",
      "  transition:transform .18s ease, box-shadow .18s ease, background .25s ease;",
      "  -webkit-tap-highlight-color:transparent;",
      "}",
      "#" + BTN_ID + ":hover{transform:translateY(-2px) scale(1.05);}",
      "#" + BTN_ID + ":active{transform:scale(.94);}",
      "#" + BTN_ID + " svg{width:46%;height:46%;display:block;pointer-events:none;}",
      "#" + BTN_ID + ".ih-on{background:linear-gradient(135deg,#ff7a3d,#ff3d77);box-shadow:0 0 0 4px rgba(255,122,61,.35),0 6px 18px rgba(0,0,0,.3);}",

      "." + NAV_CLASS + ",." + ACTION_CLASS + "{position:relative;transition:box-shadow .2s ease;border-radius:6px;}",
      "." + NAV_CLASS + "{",
      "  outline:2px dashed #3da5ff !important;outline-offset:2px;",
      "  box-shadow:0 0 0 3px rgba(61,165,255,.35),0 0 14px 2px rgba(61,165,255,.65) !important;",
      "  animation:ih-pulse-nav 1.4s ease-in-out infinite;}",
      "." + ACTION_CLASS + "{",
      "  outline:2px solid #2fd47a !important;outline-offset:2px;",
      "  box-shadow:0 0 0 3px rgba(47,212,122,.35),0 0 14px 2px rgba(47,212,122,.7) !important;",
      "  animation:ih-pulse-act 1.4s ease-in-out infinite;}",
      "@keyframes ih-pulse-nav{0%,100%{box-shadow:0 0 0 3px rgba(61,165,255,.30),0 0 10px 1px rgba(61,165,255,.45);}50%{box-shadow:0 0 0 4px rgba(61,165,255,.45),0 0 20px 4px rgba(61,165,255,.85);}}",
      "@keyframes ih-pulse-act{0%,100%{box-shadow:0 0 0 3px rgba(47,212,122,.30),0 0 10px 1px rgba(47,212,122,.5);}50%{box-shadow:0 0 0 4px rgba(47,212,122,.45),0 0 20px 4px rgba(47,212,122,.9);}}",
      "@media (prefers-reduced-motion:reduce){." + NAV_CLASS + ",." + ACTION_CLASS + "{animation:none;}}",

      "#" + LEGEND_ID + "{",
      "  position:fixed;right:clamp(14px,4vw,28px);",
      "  bottom:calc(clamp(14px,4vw,28px) + clamp(48px,12vw,60px) + 12px);",
      "  z-index:2147483646;background:rgba(20,22,34,.92);color:#fff;",
      "  font:600 12px/1.4 -apple-system,BlinkMacSystemFont,'Malgun Gothic','맑은 고딕',sans-serif;",
      "  padding:10px 12px;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.35);",
      "  max-width:78vw;pointer-events:none;opacity:0;transform:translateY(6px);",
      "  transition:opacity .2s ease,transform .2s ease;}",
      "#" + LEGEND_ID + ".ih-show{opacity:1;transform:translateY(0);}",
      "#" + LEGEND_ID + " .ih-row{display:flex;align-items:center;gap:8px;white-space:nowrap;}",
      "#" + LEGEND_ID + " .ih-row+.ih-row{margin-top:6px;}",
      "#" + LEGEND_ID + " .ih-dot{width:12px;height:12px;border-radius:3px;flex:0 0 auto;}",
      "#" + LEGEND_ID + " .ih-count{opacity:.7;font-weight:500;margin-left:2px;}"
    ].join("\n");
    var s = document.createElement("style");
    s.id = STYLE_ID;
    s.textContent = css;
    document.head.appendChild(s);
  }

  // ===== 4) 분류 로직 =====
  var DEAD_JS = /^javascript:\s*(void\s*\(\s*0\s*\)|;)?\s*$/i; // javascript:void(0) / javascript:; / javascript:

  // 실제로 페이지 이동/스크롤 되는 링크인가
  function navTarget(el) {
    if (el.tagName !== "A") return false;
    var href = el.getAttribute("href");
    if (href == null) return false;
    href = href.trim();
    if (href === "" || href === "#") return false;
    if (DEAD_JS.test(href)) return false;        // 아무 동작 없는 javascript:
    if (/^javascript:/i.test(href)) return false; // 코드 실행형은 '동작'으로 따로 분류
    if (href.charAt(0) === "#") {
      // 같은 페이지 앵커 — 목적지가 실제로 존재할 때만 이동으로 인정
      var id = href.slice(1);
      if (!id) return false;
      try {
        if (document.getElementById(id)) return true;
        if (document.getElementsByName(id).length) return true;
      } catch (e) {}
      return false;
    }
    return true; // 다른 .html / http(s) / mailto / tel 등 → 이동
  }

  // 헤더/내비 안에서 하위 메뉴(아코디언·드롭다운)를 여는 메뉴 항목인가.
  // 예: <li><a href="#">COMPANY</a><ul class="lnb">…</ul></li>  → CSS 호버로 열려 JS 핸들러가 없어도 작동 항목으로 본다.
  function opensSubmenu(el) {
    if (!el.closest) return false;
    if (!el.closest("nav, header, .gnb, .menu_box")) return false;
    var li = el.closest("li");
    if (!li) return false;
    try { return !!li.querySelector(":scope > ul"); }
    catch (e) {
      // :scope 미지원 시 폴백 — 직계 자식 중 ul 탐색
      for (var i = 0; i < li.children.length; i++) {
        if (li.children[i].tagName === "UL") return true;
      }
      return false;
    }
  }

  // 실제로 작동(클릭 동작)하는 요소인가
  function hasAction(el) {
    // 인라인 onclick
    if (el.hasAttribute && el.hasAttribute("onclick")) return true;
    // 하위 메뉴를 여는 헤더 메뉴 항목
    if (opensSubmenu(el)) return true;
    // 코드 실행형 javascript: 링크
    if (el.tagName === "A") {
      var href = (el.getAttribute("href") || "").trim();
      if (/^javascript:/i.test(href) && !DEAD_JS.test(href)) return true;
    }
    // 등록된 클릭류 핸들러 (addEventListener / jQuery .on·.click 모두 포함)
    if (clickable.has(el)) return true;
    // 폼을 실제로 제출/리셋하는 버튼·인풋
    var tag = el.tagName;
    if (tag === "BUTTON" || tag === "INPUT") {
      var type = (el.getAttribute("type") || "").toLowerCase();
      var isSubmitish = type === "submit" || type === "reset" || (tag === "BUTTON" && type === "");
      if (isSubmitish && el.form) return true;
    }
    return false;
  }

  // 요소 "자신"이 숨김인지만 본다. (접힌 아코디언/드롭다운 안의 링크도 대상에 포함하기 위해
  //  조상이 display:none 이어도 제외하지 않는다 — 메뉴를 펼치면 자연스럽게 글로우가 보인다.)
  function isEligible(el) {
    if (!el.isConnected) return false;
    var st = window.getComputedStyle(el);
    if (!st) return true;
    if (st.display === "none" || st.visibility === "hidden") return false;
    return true;
  }

  function clearHighlights() {
    var els = document.querySelectorAll("." + NAV_CLASS + ",." + ACTION_CLASS);
    for (var i = 0; i < els.length; i++) els[i].classList.remove(NAV_CLASS, ACTION_CLASS);
  }

  function applyHighlights() {
    var nav = 0, act = 0;
    // 후보: 링크/폼요소/onclick + 핸들러가 기록된 모든 요소
    var set = new Set();
    var q = document.querySelectorAll("a[href], button, input, [onclick]");
    for (var i = 0; i < q.length; i++) set.add(q[i]);
    clickable.forEach(function (el) { set.add(el); });

    set.forEach(function (el) {
      if (el.id === BTN_ID) return;
      if (el.closest && el.closest("#" + LEGEND_ID)) return;
      if (EXCLUDE_SELECTOR && el.closest && el.closest(EXCLUDE_SELECTOR)) return;
      if (!isEligible(el)) return;
      if (navTarget(el)) { el.classList.add(NAV_CLASS); nav++; }
      else if (hasAction(el)) { el.classList.add(ACTION_CLASS); act++; }
    });
    return { nav: nav, act: act };
  }

  // ===== 5) 범례 =====
  function ensureLegend() {
    var l = document.getElementById(LEGEND_ID);
    if (!l) { l = document.createElement("div"); l.id = LEGEND_ID; document.body.appendChild(l); }
    return l;
  }
  function showLegend(counts) {
    var l = ensureLegend();
    l.innerHTML =
      "<div class='ih-row'><span class='ih-dot' style='background:#3da5ff;'></span>" +
      "페이지 이동<span class='ih-count'>" + counts.nav + "개</span></div>" +
      "<div class='ih-row'><span class='ih-dot' style='background:#2fd47a;'></span>" +
      "작동 요소<span class='ih-count'>" + counts.act + "개</span></div>";
    positionLegend();
    requestAnimationFrame(function () { l.classList.add("ih-show"); });
  }
  function hideLegend() {
    var l = document.getElementById(LEGEND_ID);
    if (l) l.classList.remove("ih-show");
  }

  // ===== 6) 위치 계산 (다른 플로팅 UI와 겹침 방지) =====
  function positionButton() {
    var btn = document.getElementById(BTN_ID);
    if (!btn) return;
    btn.style.right = "";
    btn.style.bottom = "";
    var others = document.querySelectorAll(".m_quick_nav, [data-floating]");
    var btnRect = btn.getBoundingClientRect();
    var maxRightEdge = 0;
    for (var i = 0; i < others.length; i++) {
      var o = others[i];
      if (o === btn) continue;
      var cs = window.getComputedStyle(o);
      if (cs.position !== "fixed" || cs.display === "none" || cs.visibility === "hidden") continue;
      var r = o.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      var inBottomRight = r.bottom > window.innerHeight * 0.45 && r.right > window.innerWidth * 0.5;
      var overlapsY = r.bottom > btnRect.top - 8 && r.top < btnRect.bottom + 8;
      if (inBottomRight && overlapsY) {
        var fromRight = window.innerWidth - r.left;
        if (fromRight > maxRightEdge) maxRightEdge = fromRight;
      }
    }
    if (maxRightEdge > 0) btn.style.right = (maxRightEdge + 12) + "px";
  }
  function positionLegend() {
    var btn = document.getElementById(BTN_ID);
    var l = document.getElementById(LEGEND_ID);
    if (!btn || !l) return;
    var r = btn.getBoundingClientRect();
    l.style.right = (window.innerWidth - r.right) + "px";
    l.style.bottom = (window.innerHeight - r.top + 12) + "px";
  }
  function relayout() { positionButton(); if (active) positionLegend(); }

  // ===== 7) 토글 =====
  function setActive(on, skipSave) {
    active = on;
    if (!skipSave) saveActive(on);
    var btn = document.getElementById(BTN_ID);
    if (on) {
      var counts = applyHighlights();
      showLegend(counts);
      if (btn) { btn.classList.add("ih-on"); btn.setAttribute("aria-pressed", "true"); btn.title = "하이라이트 끄기"; }
    } else {
      clearHighlights();
      hideLegend();
      if (btn) { btn.classList.remove("ih-on"); btn.setAttribute("aria-pressed", "false"); btn.title = "작동하는 버튼·링크 표시"; }
    }
  }

  // ===== 8) 버튼 생성 =====
  function createButton() {
    if (document.getElementById(BTN_ID)) return;
    var btn = document.createElement("button");
    btn.id = BTN_ID;
    btn.type = "button";
    btn.setAttribute("aria-pressed", "false");
    btn.setAttribute("aria-label", "작동하는 버튼과 링크 하이라이트 토글");
    btn.title = "작동하는 버튼·링크 표시";
    btn.innerHTML =
      "<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>" +
      "<circle cx='12' cy='12' r='9' stroke='currentColor' stroke-width='2'/>" +
      "<circle cx='12' cy='12' r='3.2' fill='currentColor'/>" +
      "<path d='M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3' stroke='currentColor' stroke-width='2' stroke-linecap='round'/>" +
      "</svg>";
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      setActive(!active);
    });
    document.body.appendChild(btn);
  }

  // 모든 스크립트/핸들러가 준비된 뒤 실행 (지연 바인딩까지 포함하기 위해)
  function whenLoaded(fn) {
    if (document.readyState === "complete") fn();
    else window.addEventListener("load", fn, { once: true });
  }

  function init() {
    injectStyle();
    createButton();
    positionButton();
    var t;
    window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(relayout, 100); });
    window.addEventListener("orientationchange", relayout);

    // 이전 페이지에서 켜둔 상태면 자동으로 다시 켠다.
    if (loadActive()) {
      whenLoaded(function () {
        setActive(true, true); // 저장값 그대로 복원 (재저장 생략)
        // 늦게 붙는 핸들러(YouTube API 등)까지 반영하도록 한 번 더 갱신
        setTimeout(function () {
          if (active) { var c = applyHighlights(); showLegend(c); }
        }, 600);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
