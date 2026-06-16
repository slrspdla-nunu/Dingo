/* ============================================================
   Partners 로고 데이터 (window.DINGO_PARTNER_LOGOS)
   - sub_AD_solution.js 가 이 배열을 읽어 #partners_marquee 에
     3행 무한 마퀴를 렌더링합니다.
   - 아래 URL 들은 실제 딩고 공식 사이트(dingoglobal.com/page/31)의
     Partners 영역에서 사용 중인 "진짜 기업 로고" 이미지입니다.
   - 인터넷 연결이 없을 때를 대비해, 로고 로드 실패 시 보여줄
     텍스트 워드마크 대체 이미지도 window.DINGO_PARTNER_LOGO_FALLBACK 로 제공합니다.
   ============================================================ */
(function () {
    var BASE = "https://dingoglobal.com/data/file/31_partner/thumb-3696586831_";
    var SUF = "_380x214.png";

    // 실제 파트너 로고 파일 식별자 (ID_HASH) — 공식 사이트에서 추출
    var PARTS = [
        "ERTJFfwY_7a91bacd5b2f370ebd728891e651744c4ed2d571",
        "5oOdn1a8_6955e4dd43c8300bee4b45fb33a6aa259fe64f73",
        "vPksHcMi_00762250293260510f3411754565700cda091ccc",
        "HuUef9nS_2a4e7461231253d7600a78c2b577639ea669e4ce",
        "J5CVTKZt_194d13b0a45277a1ce3e97e6c3961f1a35874b1d",
        "VcLWEoHG_903a6281d99fdf9d1e8b82e02f842798086c3af0",
        "j5YnwNch_e4f06dfc2d3008d3f6e51f7e0b6d1ce85e9d6653",
        "6DlQUz15_60afa8588db6bde40d34731fe49ce2c7f88626ba",
        "PH8xRLn7_ee686a45fa1249fce700adf95e91c34a4e754f65",
        "MoO09bRc_0ec4da052b863e670b5de74bfaa7727cbf2ba969",
        "65EucLRm_a1a139fdfeda63efc346b305e064284c7e935e50",
        "epsZRPaC_d7c496210a3d0971875370e0dc00a3739654934c",
        "5uoReYhs_e33aca0b62c75789ab17bb5335306358ac51e5db",
        "KZixyLp2_caf65d0db1fcc40600fde581602b20f88b79b340",
        "ui04bsco_cd8cc2dce6001f35704b400ace5e5abcafe5500f",
        "bIjZrGuT_21a0aa22ee3f35fe4cf4f7b8b8ec7c071fe40e10",
        "YIyugHxR_59de64cec3be507c15ff5b859ae0d324666a8b3c",
        "4DpRXk2c_bfb9038c520d5da178c960387c0380c6428bad59",
        "I5n9YXVg_ecd7762b9ea42a07c8b5a92477aef722c42ff272",
        "dvDw4NXZ_6bf075e404776ddf46d819217fc277cb92be1f51",
        "gFwd6b3i_7800036b3dc8b93018c430b7f4f17a60a36c0aed",
        "5zu0bdEB_3dd2eae896e806fcfda4572fe528a89e67f17955",
        "SZ0xqXjs_81252eca99d235401a2f96ca5549e5d31609afca",
        "DmMc1KXH_d588bc8422cba7444bd12e2d690d5b2e072b9592",
        "GRrTj0Bm_c737bbbc6a790474c976002ebdef6723f87129a8",
        "JlawQZCU_5f9dfc4b803175c79d0506f2979c363f86ce211d",
        "jx0zuQq7_a69e79f69b67a69d8fc48819e1145d0053c11d86",
        "tCO1Rgeu_eb5b640c4b185d19e188909f9f617caa80c32596",
        "7CRcX4nk_41f0001f18d07d8a9cb9844cf385b641f856952f",
        "uswlJn5X_63b8b53589316e16823f1dc21b77189fe81ef2a6",
        "e7shx0Kf_d96311ca455f2ea6231734372bec59443b9ef2c0",
        "uZcDAnEt_8b08ce21ce517894fa830e615c2a5ed962271cd6",
        "qKIG1Pw0_395c468648770da714139267f3457cc4afec52ff",
        "73cQmBjM_811f51ab1cca98e4ee9fca93d6f7f411d357015f",
        "TvR4dIYE_3ad098d17d2c9861d29ce0c9ef1ff924cc53b7b4",
        "PXCsAyr0_1a6a427a209952e9d5ccff8d4e2903b3e12a40c6",
        "Lv5piHt3_d7d1a83e235a9713514c1b06f0c14718e56d06b3",
        "48cRUOLz_ecd02b317da8488d02cd19013d2a8af567455232",
        "ldGoknHV_8eaa803d22061a6248de5895f210cba938f65311",
        "2FBuDne6_8694f2ce7a082f2c44f77de76d49900895552913",
        "grGzs16N_6a9162f3db5e53a0147123d1ac7bf82d44fdd607",
        "wrXPcZLn_6cdadac162dab2eb284de8b3dc3ee5aae2daa061",
        "upFaSMhQ_2734dca999a230356c80aa05cfea3fb35b97adfe",
        "kLq2NXoS_1b3361798f882dd1065cfb399fe207573a2dc81d",
        "eBMtwj2h_ea294689bb14201c38257b19146584f496c02349",
        "wiWYPX0r_d1e41c933adf6012f6896270e7ebb63516bd29b8",
        "qTEZSDuw_1d2f93ada910ae6044bb7ac0f4fb261063da41f2"
    ];

    window.DINGO_PARTNER_LOGOS = PARTS.map(function (p) { return BASE + p + SUF; });

    /* ---------- 로드 실패 시 텍스트 워드마크 대체 ---------- */
    var NAMES = [
        "하이브", "경기도교육청", "제일기획", "캐논코리아", "현대자동차",
        "오비맥주 카스", "라코스테", "돌체구스토", "맥심", "교육부",
        "윌리엄그랜트앤선즈", "비욘드뮤직", "월트디즈니", "삼성생명", "롯데칠성음료",
        "PUBG", "하이트진로 참이슬", "인스타그램", "폴로 랄프 로렌", "Charles & Keith",
        "P&G", "Moet & Chandon", "SKT", "NEW BALANCE", "아모레퍼시픽",
        "서울산업진흥원", "하이네켄", "한국환경산업기술원", "JM솔루션", "페레로로쉐",
        "타미진스", "타미힐피거"
    ];
    function estWidth(name) {
        var w = 0;
        for (var i = 0; i < name.length; i++) {
            var c = name.charCodeAt(i);
            if (c >= 0xAC00 && c <= 0xD7A3) w += 36;
            else if (c === 0x20) w += 12;
            else if (c >= 0x41 && c <= 0x5A) w += 24;
            else w += 20;
        }
        return w;
    }
    function makeLogo(name) {
        var w = Math.max(120, estWidth(name) + 48), h = 86;
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">' +
            '<text x="50%" y="50%" dy="0.34em" text-anchor="middle" font-family="Pretendard, Arial, sans-serif" font-size="32" font-weight="800" letter-spacing="0.5" fill="#1a1a1a">' + name + '</text></svg>';
        return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
    }
    window.DINGO_PARTNER_LOGO_FALLBACK = NAMES.map(makeLogo);
})();
