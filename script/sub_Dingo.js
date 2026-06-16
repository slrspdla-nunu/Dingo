/* ============================================================
   Dingo (sub page) - 통계 차트 생성 + 등장 애니메이션
   ============================================================ */
(function () {
    "use strict";

    var cats = ["웹예능", "웹드라마", "뮤직", "정보", "카툰", "리얼리티", "기타"];

    // 왼쪽: 누적 막대 [만13-17, 만18-34, 만35-44, 만55+] (합 100)
    var stackedData = [
        [12, 68, 16, 4],
        [12, 58, 25, 5],
        [7, 73, 16, 4],
        [13, 50, 32, 5],
        [10, 31, 54, 5],
        [8, 70, 18, 4],
        [15, 58, 22, 5]
    ];

    // 오른쪽: 그룹 막대 [여성, 남성] (합 100)
    var groupedData = [
        [52, 48],
        [77, 23],
        [35, 65],
        [79, 21],
        [76, 24],
        [21, 79],
        [54, 46]
    ];

    function buildStacked(el) {
        if (!el) return;
        var legend = '<div class="legend">' +
            '<span><i class="dot black"></i>만 13 - 17세</span>' +
            '<span><i class="dot red"></i>만 18 - 34세</span>' +
            '<span><i class="dot grey"></i>만 35 - 44세</span>' +
            '<span><i class="dot light"></i>만 55세+</span></div>';
        var bars = '<div class="bars">';
        cats.forEach(function (cat, i) {
            var d = stackedData[i];
            bars += '<div class="col">' +
                '<div class="stack">' +
                '<div class="seg light" data-h="' + d[3] + '"></div>' +
                '<div class="seg grey" data-h="' + d[2] + '"></div>' +
                '<div class="seg red" data-h="' + d[1] + '"><span>' + d[1] + '%</span></div>' +
                '<div class="seg black" data-h="' + d[0] + '"></div>' +
                '</div>' +
                '<span class="cat">' + cat + '</span>' +
                '</div>';
        });
        bars += '</div>';
        el.classList.add("stacked");
        el.innerHTML = legend + bars;
    }

    function buildGrouped(el) {
        if (!el) return;
        var legend = '<div class="legend">' +
            '<span><i class="dot red"></i>여성</span>' +
            '<span><i class="dot grey"></i>남성</span></div>';
        var bars = '<div class="bars">';
        cats.forEach(function (cat, i) {
            var d = groupedData[i];
            bars += '<div class="col">' +
                '<div class="pair">' +
                '<div class="gbar red" data-h="' + d[0] + '"><span>' + d[0] + '%</span></div>' +
                '<div class="gbar grey" data-h="' + d[1] + '"><span>' + d[1] + '%</span></div>' +
                '</div>' +
                '<span class="cat">' + cat + '</span>' +
                '</div>';
        });
        bars += '</div>';
        el.classList.add("grouped");
        el.innerHTML = legend + bars;
    }

    function animateChart(card) {
        card.classList.add("in");
        card.querySelectorAll("[data-h]").forEach(function (el) {
            el.style.height = el.getAttribute("data-h") + "%";
        });
    }

    /* ---------- 상단 탭(Dingo): 새로고침 대신 맨 위로 스크롤 ---------- */
    var dingoTab = document.querySelector(".dingo_tab");
    if (dingoTab) {
        var onTab = dingoTab.querySelector("li.on a");
        if (onTab) {
            onTab.addEventListener("click", function (e) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }
    }

    buildStacked(document.getElementById("chart_stacked"));
    buildGrouped(document.getElementById("chart_grouped"));

    // 등장 애니메이션
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add("in");
                    var card = e.target.querySelector(".chart_card");
                    if (card) animateChart(card);
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.2 });
        reveals.forEach(function (el) { io.observe(el); });
    } else {
        reveals.forEach(function (el) {
            el.classList.add("in");
            var card = el.querySelector(".chart_card");
            if (card) animateChart(card);
        });
    }
})();
