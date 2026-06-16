/* ============================================================
   About (sub page) script
   - 탭 스크롤 활성화 / 부드러운 이동
   - reveal 애니메이션
   - Global partners 캐러셀
   ============================================================ */
(function () {
    "use strict";

    /* ---------- 1. 탭 부드러운 스크롤 + 스크롤 활성화 ---------- */
    var tab = document.getElementById("about_tab");
    var tabLinks = tab ? Array.prototype.slice.call(tab.querySelectorAll("a")) : [];
    var sections = ["sec1", "sec2", "sec3", "sec4"].map(function (id) {
        return document.getElementById(id);
    });

    tabLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            // 활성(첫) 탭은 새로고침/점프 대신 맨 위로 스크롤
            if (link.parentNode && link.parentNode.classList.contains("on")) {
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }
            var target = document.querySelector(link.getAttribute("href"));
            if (!target) return;
            var top = target.getBoundingClientRect().top + window.pageYOffset - 90;
            window.scrollTo({ top: top, behavior: "smooth" });
        });
    });

    function setActiveTab() {
        var pos = window.pageYOffset + window.innerHeight * 0.35;
        var current = 0;
        sections.forEach(function (sec, i) {
            if (sec && sec.offsetTop <= pos) current = i;
        });
        tabLinks.forEach(function (link, i) {
            link.parentElement.classList.toggle("on", i === current);
        });
    }
    window.addEventListener("scroll", setActiveTab);
    setActiveTab();

    /* ---------- 2. reveal 애니메이션 ---------- */
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (en.isIntersecting) {
                    en.target.classList.add("in");
                    io.unobserve(en.target);
                }
            });
        }, { threshold: 0.15 });
        reveals.forEach(function (el) { io.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add("in"); });
    }

    /* ---------- History 연도별 연혁 ---------- */
    var historyData = {
        "2014": [
            { date: "2014.01", text: "메이크어스 법인 설립" }
        ],
        "2015": [
            { date: "2015.07", text: "딩고 뮤직 '세로라이브' 런칭" },
            { date: "2015.10", text: "디지털 미디어 브랜드 'dingo' 런칭" }
        ],
        "2017": [
            { date: "2017.05", text: "딩고 뮤직 '이슬라이브' 뉴욕 페스티벌 디지털 캠페인 부문 본상 수상" }
        ],
        "2018": [
            { date: "2018.03", text: "한국방송광고진흥공사 코바코(kobaco)와 미디어 상생 업무협약 체결" },
            { date: "2018.11", text: "2018 대한민국 브랜드 대상 디지털 부문 최우수상 수상<br>딩고 프리스타일 '킬링벌스' 런칭" },
            { date: "2018.12", text: "2018 대한민국 온라인 광고 대상 미디어 부문 수상" }
        ],
        "2019": [
            { date: "2019.07", text: "딩고 뮤직 '킬링보이스' 런칭" }
        ],
        "2020": [
            { date: "2020.07", text: "국내 디지털 미디어 최초 유튜브 파트너 세일즈 권한 획득" },
            { date: "2020.12", text: "제 8회 미래창조 경영 우수기업 대상 디지털 콘텐츠 부문 대상 수상" }
        ],
        "2021": [
            { date: "2021.12", text: "2021년 유튜브 국내 최고 인기 동영상 1위 기록 (킬링보이스 - 아이유 편)" }
        ],
        "2022": [
            { date: "2022.04", text: "비욘드뮤직 - 메이크어스 MOU 체결" },
            { date: "2022.05", text: "네이버 NOW - 메이크어스 MOU 체결" },
            { date: "2022.10", text: "뮤직앤뉴 - 메이크어스 MOU 체결" },
            { date: "2022.11", text: "워너뮤직코리아 - 메이크어스 MOU 체결" },
            { date: "2022.12", text: "2022년 유튜브 국내 최고 인기 동영상 2위 기록 (킬링보이스 - 태연 편)" }
        ],
        "2023": [
            { date: "2023.10", text: "뮤직 레이블 'DOT' 설립" },
            { date: "2023.12", text: "2023년 유튜브 국내 최고 인기 동영상 2위 기록 (킬링보이스 - AKMU 편)" }
        ],
        "2024": [
            { date: "2024.05", text: "'딩고 뮤직' 유튜브 채널 구독자 500만 돌파" },
            { date: "2024.09", text: "딩고 뮤직 콘서트 '킬링 보이스' 개최" }
        ]
    };

    var yearItems = Array.prototype.slice.call(document.querySelectorAll(".timeline .years li"));
    var yearsEl = document.querySelector(".timeline .years");
    var cardsEl = document.querySelector(".timeline .cards");

    function renderHistory(year) {
        if (!cardsEl) return;
        var events = historyData[year] || [];
        cardsEl.innerHTML = events.map(function (ev) {
            return '<div class="hcard"><span class="date">' + ev.date + '</span><p>' + ev.text + '</p></div>';
        }).join("");

        // 선택된 연도 위치에 맞춰 카드 묶음 정렬 (가운데 정렬 + 좌우 클램프)
        cardsEl.style.marginLeft = "0px";
        var li = yearItems.filter(function (l) { return l.textContent.trim() === year; })[0];
        if (li && events.length) {
            var timelineW = yearsEl.offsetWidth;
            var cardsW = cardsEl.offsetWidth;
            var yearCenter = li.offsetLeft + li.offsetWidth / 2;
            var left = yearCenter - cardsW / 2;
            left = Math.max(0, Math.min(left, timelineW - cardsW));
            cardsEl.style.marginLeft = left + "px";
        }
    }

    // ----- 드래그 스크럽 + 미끄러지는 핸들 -----
    var handle = null;

    function selectYear(li) {
        if (!li) return;
        yearItems.forEach(function (y) { y.classList.remove("on"); });
        li.classList.add("on");
        renderHistory(li.textContent.trim());
    }
    function yearX(li) { return li.offsetLeft + li.offsetWidth / 2; }
    function nearestLi(x) {
        var best = yearItems[0], bd = Infinity;
        yearItems.forEach(function (li) {
            var d = Math.abs(yearX(li) - x);
            if (d < bd) { bd = d; best = li; }
        });
        return best;
    }
    var fill = null;
    var dotRaf = null;
    var dotTimer = null;
    var currentX = null;
    function updateDots(x) {
        yearItems.forEach(function (li) {
            li.classList.toggle("filled", yearX(li) <= x + 1);
        });
    }
    // 스냅/클릭 시 시작→목표 x를 핸들과 같은 타이밍으로 보간하며 점을 물들임
    function animateDotsBetween(from, to) {
        if (dotRaf) cancelAnimationFrame(dotRaf);
        if (dotTimer) clearTimeout(dotTimer);
        var dur = 300, start = performance.now();
        (function loop(now) {
            var t = Math.min((now - start) / dur, 1);
            var e = 1 - Math.pow(1 - t, 3); // easeOutCubic ≈ 핸들 이징
            updateDots(from + (to - from) * e);
            if (t < 1) dotRaf = requestAnimationFrame(loop);
            else { dotRaf = null; updateDots(to); }
        })(performance.now());
        // RAF 스로틀 대비 최종 상태 보정
        dotTimer = setTimeout(function () { updateDots(to); }, dur + 40);
    }
    function moveHandle(x, animate) {
        if (!handle) return;
        var fromX = currentX;
        currentX = x;
        handle.style.transition = animate
            ? "left 0.3s cubic-bezier(.22,.61,.36,1), transform 0.2s ease, box-shadow 0.2s ease"
            : "transform 0.2s ease, box-shadow 0.2s ease";
        handle.style.left = x + "px";
        if (fill) {
            fill.style.transition = animate ? "width 0.3s cubic-bezier(.22,.61,.36,1)" : "none";
            fill.style.width = x + "px";
        }
        if (animate && fromX !== null) {
            animateDotsBetween(fromX, x);
        } else {
            if (dotRaf) { cancelAnimationFrame(dotRaf); dotRaf = null; }
            updateDots(x);
        }
    }
    function pulseHandle() {
        if (!handle) return;
        handle.classList.remove("pulse");
        void handle.offsetWidth; // 애니메이션 재시작용 reflow
        handle.classList.add("pulse");
    }
    function activeLi() {
        return document.querySelector(".timeline .years li.on") || yearItems[yearItems.length - 1];
    }

    if (yearsEl && yearItems.length) {
        fill = document.createElement("span");
        fill.className = "year_fill";
        yearsEl.appendChild(fill);

        handle = document.createElement("span");
        handle.className = "year_handle";
        yearsEl.appendChild(handle);

        var track = document.createElement("div");
        track.className = "year_track";
        yearsEl.appendChild(track);

        var dragging = false;
        function trackX(e) {
            var rect = yearsEl.getBoundingClientRect();
            var x = e.clientX - rect.left;
            return Math.max(yearX(yearItems[0]), Math.min(x, yearX(yearItems[yearItems.length - 1])));
        }
        track.addEventListener("pointerdown", function (e) {
            dragging = true;
            handle.classList.add("dragging");
            try { track.setPointerCapture(e.pointerId); } catch (err) {}
            var x = trackX(e);
            moveHandle(x, false);
            selectYear(nearestLi(x));
        });
        track.addEventListener("pointermove", function (e) {
            if (!dragging) return;
            var x = trackX(e);
            moveHandle(x, false);
            selectYear(nearestLi(x));
        });
        function endDrag() {
            if (!dragging) return;
            dragging = false;
            handle.classList.remove("dragging");
            moveHandle(yearX(activeLi()), true); // 가까운 연도로 스냅
            pulseHandle();
        }
        track.addEventListener("pointerup", endDrag);
        track.addEventListener("pointercancel", endDrag);

        // 연도 텍스트 클릭
        yearItems.forEach(function (li) {
            li.addEventListener("click", function () {
                selectYear(li);
                moveHandle(yearX(li), true);
                pulseHandle();
            });
        });
    }

    // 모든 연도 중 가장 큰 카드 높이로 영역 고정 (아래 섹션4 흔들림 방지)
    if (cardsEl) {
        var maxCardsH = 0;
        Object.keys(historyData).forEach(function (y) {
            renderHistory(y);
            if (cardsEl.offsetHeight > maxCardsH) maxCardsH = cardsEl.offsetHeight;
        });
        cardsEl.style.minHeight = maxCardsH + "px";
    }

    // 초기 표시 (기본 2024)
    renderHistory("2024");
    if (handle) moveHandle(yearX(activeLi()), false);
    window.addEventListener("resize", function () {
        var on = activeLi();
        if (on) {
            renderHistory(on.textContent.trim());
            moveHandle(yearX(on), false);
        }
    });

    /* ---------- 3. Global partners 캐러셀 ---------- */
    var partners = [
        { country: "JAPAN",       title: "Dingo Japan",       sub: "It's time to dingo<br>みんなのディンゴ。", card: "sec4_card1.png" },
        { country: "TAIWAN",      title: "Dingo Taiwan",      sub: "It's time to dingo",                       card: "sec4_card2.png" },
        { country: "PHILIPPINES", title: "Dingo Philippines", sub: "It's time to dingo",                       card: "sec4_card3.png" },
        { country: "THAILAND",    title: "Dingo Thailand",    sub: "It's time to dingo",                       card: "sec4_card4.png" },
        { country: "MEXICO",      title: "Dingo Mexico",      sub: "It's time to dingo",                       card: "sec4_card5.png" },
        { country: "INDONESIA",   title: "Dingo Indonesia",   sub: "It's time to dingo",                       card: "sec4_card6.png" }
    ];

    var IMG_PATH = "image/sub_About/";
    var current = 0;

    var featImg     = document.querySelector(".feature_card .feat_img");
    var fdCountry   = document.querySelector(".feature_detail .country em");
    var fdCount     = document.querySelector(".feature_detail .count");
    var fdTitle     = document.querySelector(".feature_detail .fd_title");
    var fdSub       = document.querySelector(".feature_detail .fd_sub");
    var countryItems = Array.prototype.slice.call(document.querySelectorAll(".country_bar li"));
    var snsItems    = Array.prototype.slice.call(document.querySelectorAll(".fd_sns li"));
    var prevBtn     = document.querySelector(".fd_nav .prev");
    var nextBtn     = document.querySelector(".fd_nav .next");

    function render(idx) {
        if (!featImg) return;
        current = (idx + partners.length) % partners.length;
        var p = partners[current];

        featImg.style.opacity = 0;
        setTimeout(function () {
            featImg.src = IMG_PATH + p.card;
            featImg.alt = p.title;
            featImg.style.opacity = 1;
        }, 150);

        if (fdCountry) fdCountry.textContent = p.country;
        fdCount.innerHTML = "<strong>" + ("0" + (current + 1)).slice(-2) + "</strong> / 06";
        fdTitle.textContent = p.title;
        fdSub.innerHTML = p.sub;

        countryItems.forEach(function (li, i) { li.classList.toggle("on", i === current); });

        // JAPAN(0)만 모든 SNS 표시, 그 외 국가는 첫 번째(유튜브)만 표시
        snsItems.forEach(function (li, i) {
            li.style.display = (current === 0 || i === 0) ? "" : "none";
        });
    }

    if (featImg) {
        featImg.style.transition = "opacity 0.3s ease";

        countryItems.forEach(function (li) {
            li.addEventListener("click", function () { render(+li.dataset.idx); });
        });
        if (prevBtn) prevBtn.addEventListener("click", function () { render(current - 1); });
        if (nextBtn) nextBtn.addEventListener("click", function () { render(current + 1); });
    }
})();
