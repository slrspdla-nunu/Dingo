/* ============================================================
   For Fans (sub page) script
   - reveal 등장 애니메이션
   - 탭 (For Fans / For Business) 상호작용
   ============================================================ */
(function () {
    "use strict";

    /* ---------- reveal 애니메이션 ---------- */
    document.body.classList.add("scroll-fx");

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

    /* ---------- 탭: 활성 탭 클릭 시 맨 위로 ---------- */
    var tabLinks = document.querySelectorAll(".fans_tab a");
    tabLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            if (link.parentNode && link.parentNode.classList.contains("on")) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        });
    });
})();
