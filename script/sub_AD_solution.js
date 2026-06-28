/* ============================================================
   AD solution - dingoglobal.com/page/31 크롤링 데이터
   피처 캐러셀 + 3열 케이스 그리드. 카드/버튼 클릭 시 유튜브 새 탭.
   ============================================================ */
(function () {
    "use strict";

    var cases = [
        {
            id: "Rzkr6ANg9OU", title: "BIGHIT MUSIC HIT IT BASE 2024", client: "하이브", date: "2024-11-11",
            desc: "🎤 JUST HIT IT! 음악을 사랑하는 10대를 위한 베이스캠프 [HIT IT BASE 2024]",
            detail: {
                category: "Branded Content",
                date: "2024년 11월 11일",
                intro: "🎤 JUST HIT IT!\n음악을 사랑하는 10대를 위한 베이스캠프\n[HIT IT BASE 2024]\n\n빅히트 뮤직만의 힙합 트레이닝을 경험할 수 있는 기회, 지금 바로 지원하세요!",
                advertiser: "하이브",
                effect: "하이브 빅히트 'HIT IT BASE 2024' 오디션 프로그램의 온/오프라인 캠페인 운영",
                related: [
                    { title: "BIGHIT MUSIC HIT IT BASE 2024 - Final Show", url: "https://www.youtube.com/watch?v=lHdIVhl4QxI" }
                ]
            }
        },
        {
            id: "Z6I3rEkJCps", title: "연간 채널 운영 <경기도교육청 GOE, GO3>", client: "경기도교육청", date: "2024-06-26",
            desc: "자율 균형 미래 경기도교육청✨ 공식 유튜브 채널입니다. 학생들의 삶, 교육, 문화, 생활, 환경. 그 모든 이야기에 재미와 유익함을 담습니다."
        },
        { id: "Qsb5t8TuEuM", title: "연간 채널 운영 <채널일>", client: "제일기획", date: "2024-10-09" },
        { id: "ifHjbzsULRk", title: "180 VR MOVE REC", client: "캐논코리아", date: "2024-09-03" },
        { id: "7SSdtp72NG4", title: "시티팝 카 라이브", client: "현대자동차 · 이노션", date: "2024-08-23" },
        { id: "WWSZGStmVFA", title: "멀티벌스 (Multi Verse)", client: "오비맥주 카스 · 대학내일", date: "2024-07-24" },
        { id: "CNueeyLnvuw", title: "dingo stage", client: "라코스테", date: "2024-05-30" },
        { id: "T3kMaRudFWM", title: "어택형 라이브 <세아노2>", client: "오비맥주 카스 · 마켓잇 & 돌체구스토 · 블렌드엑스", date: "2024-02-14" },
        { id: "ENXZicZTZI4", title: "Keep it Up Stage", client: "맥심", date: "2024-04-18" },
        { id: "cpOLW36Y31A", title: "교육부 학교폭력 예방 IMC 캠페인 <스쿨시그널>", client: "교육부", date: "2023-08-25" },
        { id: "na5BIHGnWcE", title: "카스쿨 라이브", client: "오비맥주 카스", date: "2023-06-14" },
        { id: "Ow0NaG2Nwqs", title: "ON AIR", client: "윌리엄그랜트앤선즈코리아", date: "2023-12-22" },
        { id: "BIEUlOnogW8", title: "리포먼스", client: "비욘드뮤직", date: "2023-07-07" },
        { id: "SSU5DIuxIkg", title: "딩고 무비 & OTT 패키지 - 디즈니+ <사운드트랙#2>", client: "월트 디즈니 스튜디오", date: "2023-12-05" },
        { id: "zVnMXXPr3Ac", title: "사회실험카메라 - 비를 맞고 있을 때 누군가 우산을 씌워준다면?", client: "삼성생명", date: "2023-07-31" },
        { id: "7uau4tTuJp4", title: "아이들의 탐스어택", client: "롯데칠성음료 탐스제로", date: "2023-05-04" },
        { id: "Xmk3nBjraTY", title: "Stage - X", client: "엑스레이티드", date: "2023-05-11" },
        { id: "xil70dCTCBk", title: "OST 제작 예능 <국힙겜탑>", client: "PUBG 배틀그라운드", date: "2022-08-17" },
        { id: "kpVse-xjm4I", title: "이슬라이브 시즌 2", client: "하이트진로 참이슬", date: "2022-08-22" },
        { id: "hGuMX4nR16s", title: "INSTA Concert", client: "인스타그램", date: "2021-12-23" },
        { id: "boFBVj8uZ-s", title: "폴서트", client: "폴로 랄프 로렌", date: "2020-09-17" },
        { id: "38OxYc9d520", title: "라코스테 DF Conceret", client: "라코스테", date: "2023-10-27" },
        { id: "7wuY2A_Z6hI", title: "MBTI LOVE", client: "찰스앤키스", date: "2022-09-02" },
        { id: "O5_GpZ0hJLs", title: "혁수의 모델구헤어", client: "P&G", date: "2022-08-26" },
        { id: "JrRLPIi50qA", title: "Moët & Chandon KOL Campaign", client: "Moët & Chandon", date: "2022-11-16" },
        { id: "7eMK0UIFtFk", title: "SKT '0' 비긴 어게인", client: "SKT", date: "2022-12-09" },
        { id: "q1d89c9nZkw", title: "키즈 홈 트레이닝", client: "NEWBALANCE", date: "2021-01-25" },
        { id: "lJfQmjsG7Vw", title: "충전포차", client: "현대자동차", date: "2021-02-10" },
        { id: "Op5nJGSxb1g", title: "로꼬 - Moonlight MV", client: "아모레퍼시픽", date: "2021-11-12" },
        { id: "VZ9PvjrT_aY", title: "DF LIVE X B the B 헤이즈", client: "서울산업진흥원", date: "2022-11-23" },
        { id: "GcUbFspR0PE", title: "B the B 연말 멜로망스 콘서트", client: "서울산업진흥원", date: "2022-12-27" },
        { id: "Z8A7D_xTNH0", title: "겸상 <오킹X퀸와사비>", client: "하이네켄", date: "2022-10-31" },
        { id: "TnRbiNl_omU", title: "CEO 유빈의 수상한 여행", client: "한국환경산업기술원", date: "2021-10-22" },
        { id: "6Vqf6P6s8n8", title: "노답진정회", client: "JM솔루션", date: "2022-05-19" },
        { id: "UyE7RGzG75I", title: "페레로로쉐 세로라이브", client: "페레로로쉐", date: "2021-12-15" },
        { id: "wQQGxt1THik", title: "@STAGE 화사", client: "타미진스", date: "2021-11-26" },
        { id: "cdchQNnIyr0", title: "TOMMYSHOW with KimSooHyun", client: "타미힐피거", date: "2021-10-13" }
    ];

    // 딩고 상세페이지(31_view)에서 수집한 캠페인별 상세 정보 (영상 ID 기준 매칭)
    var DETAILS = {
  "Z6I3rEkJCps": {
    "category": "Branded Content",
    "date": "2024년 11월 11일",
    "intro": "자율 균형 미래 경기도교육청✨ 공식 유튜브 채널입니다.\n\n학생들의 삶, 교육, 문화, 생활, 환경.\n그 모든 이야기에 재미와 유익함을 담습니다.",
    "advertiser": "경기도교육청",
    "effect": "2024년 경기도교육청의 메인 채널 와 서브 채널 의 연간 운영 – 경기도교육청의 교육사업과 가치를 쉽고 유쾌하게 전달하는 친화적인 채널로 전환하여 효과적으로 연간 운영을 수행하는 프로젝트",
    "related": [
      { "title": "학창 시절, 한 번쯤 궁금했던 행정실 공무원의 하루!🏫 | [스쿨히어로] EP.04", "url": "https://www.youtube.com/watch?v=Ib8uuGWchYk" },
      { "title": "요즘 학생들의 노래방 애창곡은? | [학교밖한바퀴] EP.01 🚌", "url": "https://www.youtube.com/watch?v=a_3Fw59hlkE" },
      { "title": "풋풋한 K-고딩의 '한 페이지가 될 수 있게' …여름이었다🍀 | [우리 학교 최고 아웃풋] EP.01", "url": "https://www.youtube.com/watch?v=6DSJC0ReN9A" }
    ]
  },
  "Qsb5t8TuEuM": {
    "category": "Branded Content",
    "date": "2024년 11월 08일",
    "intro": "현지인이 말아주는 풀코스, 연고지 📍\n이거로 국내 여행 종결.",
    "advertiser": "제일기획",
    "effect": "2023년부터 <제일엔터테인먼트> <조현아의 하트비트> <누구.zip> 현재 <연고지>까지 다양한 프로그램을 중심으로 효과적인 제일기획 공식 유튜브 채널 연간 운영",
    "related": [
      { "title": "축🎉데뷔 D-DAY🔥 가요계의 돌풍 김해준의 듀엣 파트너는 과연 누구?ㅣ제일엔터테인먼트 EP.01", "url": "https://www.youtube.com/watch?v=qPGb44Aggtw" },
      { "title": "🙄천방지축 얼렁뚱땅 빙글빙글 돌아가는 현아의 하루🤩 | 조현아의 하트비트 1화💘", "url": "https://www.youtube.com/watch?v=Mv3MRepBpVA" },
      { "title": "모델 그만두고 물고기 키우는 32살 남자 근황....🐟 l 누구.zip 1화🏠", "url": "https://www.youtube.com/watch?v=6id9_7iPH6M" }
    ]
  },
  "ifHjbzsULRk": {
    "category": "Branded Content",
    "date": "2024년 11월 08일",
    "intro": "이 정도로 가깝다고?🙀\n엔믹스 머리카락 휘날리는 것까지 생생하게 느껴지는\nVR 기술에 그저 황송…\n이게 퍼포먼스 영상의 미래다...",
    "advertiser": "캐논코리아",
    "effect": "퍼포먼스 콘텐츠와 VR의 만남! 캐논 VR 카메라로 ‘엔믹스’의 무대를 촬영하여 180도 화각으로 시청자와 아티스트가 상호작용 하는 듯한 최강의 몰입도를 제공한 콘텐츠",
    "related": []
  },
  "7SSdtp72NG4": {
    "category": "Branded Content",
    "date": "2024년 11월 08일",
    "intro": "시티팝과 드라이브, 그리고 라이브\n그저 환상…!\n\n시티팝 편곡으로 재탄생된\n첫 번째 아티스트의 곡은?",
    "advertiser": "현대자동차 · 이노션",
    "effect": "딩고 뮤직과 현대자동차가 만나 국내 최초로 선보이는 드라이브 시티팝 라이브 시리즈 브랜디드 콘텐츠",
    "related": [
      { "title": "QWER의 고민중독&내 이름 맑음을 시티팝 라이브로! [시티팝 카 라이브]ㅣCITYPOP CAR LIVE", "url": "https://www.youtube.com/watch?v=7pzb2quq5xE" },
      { "title": "CHANYEOL(찬열)의 Black Out을 시티팝 라이브로! [시티팝 카 라이브]ㅣCITYPOP CAR LIVE", "url": "https://www.youtube.com/watch?v=VQNZ6Hz0a-E" },
      { "title": "피프티피프티(FIFTY FIFTY)의 SOS & Push your love를 시티팝 라이브로! [시티팝 카 라이브]ㅣCITYPOP CAR LIVE", "url": "https://www.youtube.com/watch?v=6d9oqLjpJvU" }
    ]
  },
  "WWSZGStmVFA": {
    "category": "Branded Content",
    "date": "2024년 11월 08일",
    "intro": "닛몰캐쉬의 멀티벌스를 라이브로! l 집사 류헤이, 갤럭시 키즈, 야바위 라이토 with 일오팔",
    "advertiser": "오비맥주 카스 · 대학내일",
    "effect": "부캐 장인 닛몰캐쉬의 라이브와 챌린지로 즐기는 '치카치카 챌린지'! 카스엔 치킨이라는 메시지를 효과적으로 전달한 '치카치카 챌린지' 브랜디드 콘텐츠 – 시청자들이 참여하고 공감할 수 있는 라이브와 챌린지 형식을 통해 브랜드 메시지를 자연스럽게 소구하는 콘텐츠",
    "related": []
  },
  "CNueeyLnvuw": {
    "category": "Branded Content",
    "date": "2024년 11월 08일",
    "intro": "퇴근하고 해질녘, 라코스테와 함께하는 시티팝 갬성으로 초대합니다🌆",
    "advertiser": "라코스테",
    "effect": "1993년부터 이어오는 라코스테 컬렉션을 조명하기 위해 시티팝의 황제 김현철이 선보이는 그때 그 시절 감성 라이브 팝업 콘서트 – 브랜드 팝업 공간과 그 특징을 컨셉츄얼하게 노출하여, 레트로 감성과 브랜드의 헤리티지를 자연스럽게 연결한 콘텐츠",
    "related": []
  },
  "T3kMaRudFWM": {
    "category": "Branded Content",
    "date": "2024년 11월 08일",
    "intro": "(경) 내 힘으로 내가 벌었다! (축)\n🎉 진정한 사회인으로의 첫걸음!👣\n생애 첫 입금💶 을 축하하는 비비의 노래 선물 🎤",
    "advertiser": "오비맥주 (카스) · 마켓잇 & 돌체구스토 · 블렌드엑스",
    "effect": "비비 & 김민석 & 권진아 서프라이즈 축하 라이브 콘텐츠 - 브랜드 캠페인 메시지 및 제품 홍보 이슈화",
    "related": [
      { "title": "예비신랑의 프러포즈 날, 김민석의 축가 - 영원을 약속해줘요 (Kim Min Seok - Eternal Sunshine)", "url": "https://www.youtube.com/watch?v=N9YARTOkj_8" },
      { "title": "40일 아가를 키우는 사랑 가득한 부부를 위한 권진아의 축가 - 위로 (Kwon Jin Ah - consolation)", "url": "https://www.youtube.com/watch?v=FiD1FY1A07I" }
    ]
  },
  "ENXZicZTZI4": {
    "category": "Branded Content",
    "date": "2024년 11월 08일",
    "intro": "지금처럼 앞으로도 우리와 함께 할 Crush (크러쉬) 의 Keep it Up Stage ☕\nMaxim T.O.P X Crush (크러쉬) 그리고 딩고뮤직이 당신을 응원할게요👏",
    "advertiser": "맥심 / 제일기획",
    "effect": "맥심TOP 브랜드 슬로건을 담아 탄생한 콜라보 음원 라이브 콘텐츠",
    "related": []
  },
  "cpOLW36Y31A": {
    "category": "Branded Content",
    "date": "2024년 11월 08일",
    "intro": "[2023 학교폭력예방 캠페인] 우리들의 소원 릴레이ㅣSCHOOL SIGNAL\n우리들의 진짜 소원을 찾으셨나요?\n숨겨진 소원을 찾으셨다면, 가장 인상 깊었던 장면을 공유해주세요!",
    "advertiser": "교육부",
    "effect": "교육부와 한국청소년정책연구원의 학교폭력예방교육지원센터가 진행하는 학교폭력 예방 IMC 캠페인 시리즈 콘텐츠 – 메인 캠페인 광고부터 서브 콘텐츠 및 바이럴 콘텐츠까지 연계하여 주요 타겟층에게 '스쿨 시그널'을 알리고, 학교폭력 예방과 근절의 메시지를 전하며 올바른 인식 제고를 목표로 한 콘텐츠",
    "related": [
      { "title": "학교폭력의 신호, 여러분은 발견할 수 있나요?ㅣSCHOOL SIGNAL", "url": "https://www.youtube.com/watch?v=XUYCFGFKB38" },
      { "title": "엔믹스 우리 학교 오게 해달라했더니 진짜 왔다?!ㅣ[딩고어택] 스쿨시그널 편 With 엔믹스", "url": "https://www.youtube.com/watch?v=rlG81OnFWfs" }
    ]
  },
  "na5BIHGnWcE": {
    "category": "Branded Content",
    "date": "2024년 11월 08일",
    "intro": "올여름을 어느 때보다 신나게 만들어 줄 ‘christian’을 라이브로 또 듣고 싶다면?\n7/29일, 지올팍과 함께하는 카스쿨 클래스에 신청해 보세요! 아래 링크 확인👇👇\nhttps://bit.ly/CASSCOOLmusic",
    "advertiser": "오비맥주 카스",
    "effect": "카스의 카스쿨 캠페인 모델인 아티스트 지올팍 & 조현아가 선보인 라이브 토크 콘텐츠 – 카스쿨 캠페인의 주요 메시지와 오픈 예정인 브랜드 팝업 스토어를 자연스럽게 소구하는 콘텐츠",
    "related": [
      { "title": "시원한 카스와 함께 듣는 조현아의 '널 사랑하지 않아' 라이브 | [카스쿨 라이브] 조현아", "url": "https://www.youtube.com/watch?v=w5Xc7WQWrd4" }
    ]
  },
  "Ow0NaG2Nwqs": {
    "category": "Branded Content",
    "date": "2024년 11월 08일",
    "intro": "ON AIR X Monkey Shoulder : JUSTHIS - Turbulence + 잠궈 + Wayne | 저스디스",
    "advertiser": "윌리엄그랜트앤선즈코리아 / 더쏠트",
    "effect": "쇼케이스 공간을 통해 아티스트와 브랜드를 유기적으로 조명하며 지속적으로 브랜드를 노출하는 신개념 라이브 콘텐츠 시즌 2 – 몽키숄더의 키컬러와 제품으로 세팅된 배경에서 저스디스의 라이브 퍼포먼스를 담아 브랜드의 고급스러운 이미지를 효과적으로 노출한 콘텐츠",
    "related": []
  },
  "BIEUlOnogW8": {
    "category": "Branded Content",
    "date": "2024년 11월 08일",
    "intro": "댄스 명곡 다 모였다💃\n리메이크를 넘어선 라치카의 리포먼스!",
    "advertiser": "비욘드뮤직",
    "effect": "비욘드뮤직과 메이크어스의 협업 프로젝트로, '명곡은 시간이 지나도 명곡이다'라는 콘셉트 아래 추억의 명곡을 리메이크한 퍼포먼스 콘텐츠 – 라치카 & YGX 크루가 재해석한 퍼포먼스를 공개하여 자연스럽게 효과적인 음원 홍보를 달성한 콘텐츠",
    "related": [
      { "title": "[리포먼스] 퍼포먼스의 재해석 PART2. YGX(와이지엑스) - 여름 안에서", "url": "https://www.youtube.com/watch?v=Xjp6y7IbTAU" }
    ]
  },
  "SSU5DIuxIkg": {
    "category": "Branded Content",
    "date": "2024년 11월 08일",
    "intro": "드라마부터 배우 TMI까지\n다채로운 스토리를 언박싱하는 시간~🎁\n\n디즈니+ [사운드트랙#2]로 돌아온\n금새록, 노상현, 손정혁 배우의 박스 속 이야기는?!\n\n12월 6일 [사운드트랙#2] 많관부🎵💕",
    "advertiser": "월트 디즈니 스튜디오 / 웹스크리에이티브",
    "effect": "디즈니+ 오리지널 시리즈 <사운드트랙#2>의 작품 소개와 비하인드를 담은 시리즈 브랜디드 콘텐츠 – <스토리언박싱>, <수고했어, 오늘도 2023>, <무비직캠> 등 다양한 포맷의 콘텐츠를 통해 작품을 효과적으로 홍보한 콘텐츠",
    "related": [
      { "title": "[SUB] 드라마 속 배우들이 날 위한 공연을 해준다면?", "url": "https://www.youtube.com/watch?v=uCYKOk1nddE" },
      { "title": "피아노 치는 꿀성대 왕자님 손정혁… 오늘부터 나 혼자 1썸 시작 l 🎬무비직캠 사운드트랙#2", "url": "https://www.youtube.com/watch?v=zJz0lfmXGCo" }
    ]
  },
  "zVnMXXPr3Ac": {
    "category": "Branded Content",
    "date": "2024년 11월 08일",
    "intro": "비를 맞고 있을 때 누군가 우산을 씌워준다면?ㅣ딩고스토리ㅣ사회실험카메라\n\n예상치 못한 비에 우산이 없을 때🌧️\n누군가 우산을 씌워주는 것만큼 좋은 소식이 있을까요?☂️\n비 오는 날 마주친 감동적인 순간 모음.ZIP📁\n행인들 찐 리액션에 감동 심해...😭",
    "advertiser": "삼성생명 / 오오비컴퍼니",
    "effect": "삼성생명의 사회실험카메라 형식의 브랜디드 콘텐츠 – 비가 잦은 여름철과 보험사에 어울리는 시의적절한 소재를 활용하여, 영상 속 '파란 우산'이 '좋은 소식의 시작'이라는 매개체가 되어 브랜드 메시지를 확산 및 전달하는 콘텐츠",
    "related": []
  },
  "7uau4tTuJp4": {
    "category": "Branded Content",
    "date": "2024년 11월 08일",
    "intro": "🍯꿀잼 보장🍯 탐스 학교에 강제입학한 (여자)아이들, 1등 학교면 어디든 간다✈️ | [(여자)아이들의 탐스어택 도전기]\n\n성공적인 스쿨어택을 위한 (여자)아이들의 고군분투🫠\n기획회의부터🗒️ 학생들을 위한 게임까지🕹️\n과연⁉️ 이들은 무사히 학교에 갈 수 있을까…?🏫",
    "advertiser": "롯데칠성음료(탐스제로) / 슈퍼와이",
    "effect": "(여자)아이들의 '탐스어택' 콘텐츠 – 어택 기획 회의부터 성공적인 공연 주최까지의 과정을 온/오프라인 연계 캠페인을 통해 보여주며, 실질적인 타겟층인 학생들에게 효과적으로 캠페인 메시지를 전달하는 브랜디드 콘텐츠",
    "related": [
      { "title": "학생들과 약속 지키러 이화여대에 다녀왔습니다😎 - 퀸카 (Queencard), Allergy, TOMBOY | [(여자)아이들의 탐스어택]", "url": "https://www.youtube.com/watch?v=opZkoaZZXpw" }
    ]
  },
  "Xmk3nBjraTY": {
    "category": "Branded Content",
    "date": "2024년 11월 08일",
    "intro": "PINK YOUR MOMENT!\n카리스마, 에너지, 그리고 당당한 태도의 Pink!\nPink빛으로 모든 축하의 순간들을 물들이자💕\n\n프리미엄 리큐르 엑스레이티드 :)\n(여자)아이들 민니와 함께 당당하고 아이코닉한 엑스레이티드의 브랜드 정체성을 담은 'Pink Your Moment' 라이브를 공개합니다.\n민니의 솔직담백한 토크와 In The Novel, Change 솔로 라이브까지 덤으로 함께하세요!",
    "advertiser": "엑스레이티드 / 스튜디오빅배스",
    "effect": "엑스레이티드의 \"당신은 그 자체로 빛난다\" 캠페인 메시지를 전달하기 위해 브랜드 정체성을 담은 미니 토크 라이브 콘서트 - (여자)아이들 민니와 키드밀리, 두 명의 아티스트와 함께한 브랜디드 콘텐츠",
    "related": [
      { "title": "키드밀리 - PINK YOUR MOMENT(Kid Milli ver.), WHY DO FUCKBOIS HANG OUT ON THE NET, BORAㅣ[Stage-X]KidMilli", "url": "https://www.youtube.com/watch?v=87U9NrJK9NU" }
    ]
  },
  "xil70dCTCBk": {
    "category": "Branded Content",
    "date": "2023년 01월 30일",
    "intro": "과연 음원프로젝트의 운명은?\n\n🎮 PUBG: 배틀그라운드 🎮\n이겼닭! 오늘 저녁은 치킨이닭!\n\n배그 소식이 알고 싶다면 여기로 컴온! 👇",
    "advertiser": "PUBG 배틀그라운드",
    "effect": "브랜드 콜라보 음원 제작 및 이슈화를 위한 다양한 오리지널 포맷 활용",
    "related": [
      { "title": "[MV] 래원, 조광일, 안병웅 - 라이언 일병 | Layone, Jo Gwangil, Ahn Byeong Woong - Private Ryan", "url": "https://www.youtube.com/watch?v=5QipGgOY9Ck" },
      { "title": "안병웅, 래원, 조광일 - Rain Drop | [DF LIVE] Ahn Byeong Woong, Layone, Jo Gwangil", "url": "https://www.youtube.com/watch?v=zGEbw1nE9rM" },
      { "title": "어떻게 사람 이름이 노란색 ㅉㅉ.....? | [DF Interview] 래원, 안병웅, 조광일", "url": "https://www.youtube.com/watch?v=cXJFgS6KXiQ" }
    ]
  },
  "kpVse-xjm4I": {
    "category": "Branded Content",
    "date": "2023년 01월 30일",
    "intro": "더 새롭고 더 화끈하게 돌아온 이슬라이브 시즌 2!\n첫 번째 주인공은 바로 위너(WINNER)!\n4년 전 이슬라이브에서 불렀던 추억의 EVERYDAY 부터 신곡 I LOVE U 까지🎤",
    "advertiser": "하이트진로 참이슬",
    "effect": "국내 대표 소주 브랜드 하이트진로 참이슬의 브랜디드 콘텐츠",
    "related": [
      { "title": "[이슬라이브2] 세븐틴(SEVENTEEN) - CHEERS, _WORLD, 돌고 돌아, 우리의 새벽은 낮보다 뜨겁다, 떠내려가, 아주 NICE | 딩고뮤직 | Dingo Music", "url": "https://www.youtube.com/watch?v=WK46xeTxMmU" },
      { "title": "[이슬라이브2] EXID - 불이나, 위아래, IDK(I Don’t Know), 앵콜곡❤️‍🔥ㅣ딩고뮤직ㅣDingo Music", "url": "https://www.youtube.com/watch?v=C-N9G40hv_c" },
      { "title": "[이슬라이브2] (여자)아이들 (G)IDLE - Nxde, TOMBOYㅣ딩고뮤직ㅣDingo Music", "url": "https://www.youtube.com/watch?v=9tcWB-k72rQ" }
    ]
  },
  "hGuMX4nR16s": {
    "category": "Branded Content",
    "date": "2023년 01월 30일",
    "intro": "2021년 인스타그램이 주최하는 마지막 콘서트!\n에스파가 광야에서 크리스마스 파티하는 법.mov\n다들 왜 이렇게 큐트한 건데 ㅠㅠㅠㅠ💙🌙⭐️🦋\n모두 Merry Christmas~💝",
    "advertiser": "인스타그램",
    "effect": "인스타그램의 #그냥다좋아서그램 캠페인 홍보를 위한 콘서트 시리즈 콘텐츠 - 총 5팀의 아티스트와 함께 진행한 21년 연말 브랜디드 캠페인",
    "related": [
      { "title": "[인스타콘서트] 악뮤(AKMU)편ㅣ한 번 빠지면 출구가 없다는 악뮤(AKMU)의 소름돋는 라이브 대잔치🎵", "url": "https://www.youtube.com/watch?v=aYcv--F_NSQ" },
      { "title": "[인스타콘서트] 제시(Jessi)편 | 츄위와 함께하는 #제시 의 Instagram 콘서트🎤 | 눈누난나, 어떤 X, STAR, Cold Blooded", "url": "https://www.youtube.com/watch?v=O5KqLfjxtfE" },
      { "title": "[인스타콘서트] 사이먼 도미닉(Simon Dominic)의 Instagram콘서트🎤| NO BREAK, DAx4, Forever 84, GOTT, POSE!, 아마두 등", "url": "https://www.youtube.com/watch?v=PhT-vxHJxBI" }
    ]
  },
  "boFBVj8uZ-s": {
    "category": "Branded Content",
    "date": "2023년 01월 30일",
    "intro": "추운 겨울이 따뜻해지는 마법같은 음악 선물🎁\n연말의 설렘을 랜선으로 나눠줄게…🎶\n\n폴로 랄프 로렌 가로수길 스토어에서 펼쳐지는 가장 프라이빗한 콘서트-",
    "advertiser": "폴로 랄프 로렌",
    "effect": "브랜드 T&M를 활용하여 시즌별 맞춤 의류 홍보 및 이슈화",
    "related": [
      { "title": "국보급 아티스트 윤미래(Yoonmirae) 라이브 콘서트 I [폴서트] AFTER HOURS I 검은행복, Doo Wop, Pay Day, Memories, Angel", "url": "https://www.youtube.com/watch?v=M7DW94-ACrM" },
      { "title": "로꼬와 문의 따스한 연말 선물 도착🎄 | [폴서트] THE HOLIDAY GIFT 감아, 멀어져가, 남아있어, 밤거리, 시간이 들겠지, Santa Tell Me", "url": "https://www.youtube.com/watch?v=qGlKgbXsMHA" },
      { "title": "에픽하이(Epik High)의 흥망진창🤟 라이브 콘서트 I [폴서트] AFTER HOURS I Fly, 새벽에, 로사리오, 빈차", "url": "https://www.youtube.com/watch?v=QKlMJWT8wMA" }
    ]
  },
  "38OxYc9d520": {
    "category": "Branded Content",
    "date": "2023년 01월 30일",
    "intro": "올해의 마지막 DF 콘서트 다들 재밌게 봤지?",
    "advertiser": "라코스테",
    "effect": "다양한 아티스트들이 모여 라코스테의 이름으로 최고의 콘서트를 선물하는 콘서트 포맷 콘텐츠",
    "related": [
      { "title": "미란이의 첫 단독 콘서트! | [DF CONCERT] Mirani with LACOSTE", "url": "https://www.youtube.com/watch?v=1mOWnyYGlXU" },
      { "title": "[5K] 양동근 X 비와이의 특별한 콘서트! | [DF CONCERT] YDG X BewhY with LACOSTE", "url": "https://www.youtube.com/watch?v=ZNh66CF-jAc" },
      { "title": "다이나믹듀오 X 래원의 스페셜 콘서트! | [DF CONCERT] Dynamicduo X Layone with LACOSTE", "url": "https://www.youtube.com/watch?v=j1spp49uovU" }
    ]
  },
  "7wuY2A_Z6hI": {
    "category": "Branded Content",
    "date": "2023년 01월 30일",
    "intro": "ESFP♀ X INTJ♂ 나와는 너무 다른 세상의 너🌎✨\n내가 네 손을 잡아도 될까?🤝\n-\n📌'MBTI LOVE' 속 어떤 캐릭터가 나와 맞을까🧐⁉",
    "advertiser": "Charles & Keith",
    "effect": "글로벌 5개 국어로 번역하여 다양한 나라에 노출되는 K-DRAMA 브랜디드 콘텐츠",
    "related": [
      { "title": "버릇없는 후배에게 참교육을 시전했다 [MBTI LOVE] EP.2 (ENG/CHN/JPN)", "url": "https://www.youtube.com/watch?v=uHT1v-pWI7g" },
      { "title": "하나부터 열까지 안 맞는 선배와 끝장을 봤다 [MBTI LOVE] EP.3 (ENG/CHN/JPN)", "url": "https://www.youtube.com/watch?v=hx-GAH9ZAaA" }
    ]
  },
  "O5_GpZ0hJLs": {
    "category": "Branded Content",
    "date": "2023년 01월 30일",
    "intro": "광고주 찾으러 여의도 왔다가, 팬티(?)를 외치게 된 사연은?\nft. 덫에 완전히 걸려버혁수,,🐭",
    "advertiser": "P&G",
    "effect": "예능인 권혁수가 브랜드의 케(어)스팅 매니저가 되어 팬틴의 모델을 찾기 위한 프로젝트를 담은 로드 예능 쇼",
    "related": [
      { "title": "케(어)스팅은 내가 할게, 모델은 누가할래?🔥 [혁수의 모델구헤어] EP.02", "url": "https://www.youtube.com/watch?v=bzaOTWtxM68" },
      { "title": "SBN 혁수는 스튜디오를 찢어🔥 I [혁수의 모델구헤어] EP.03", "url": "https://www.youtube.com/watch?v=0vrRkVpwK3M" }
    ]
  },
  "JrRLPIi50qA": {
    "category": "Branded Content",
    "date": "2023년 01월 30일",
    "intro": "Moët & Chandon X Tiffany young 두 아이콘의 만남\n그녀의 언어로 펼치는 모엣 & 샹동의 금빛 이야기🥂",
    "advertiser": "Moët & Chandon",
    "effect": "Moët & Chandon 최초의 국내 온라인 캠페인으로 진행된 사례로 Moët & Chandon을 대표하는 인물 티파니 영과 함께 Moët을 함께하는 순간을 영상미 있게 담아낸 4편의 브랜디드 콘텐츠",
    "related": [
      { "title": "티파니 영과 식사 전 간단히 즐기는 모엣 & 샹동의 순간🥂 ㅣ EP.02", "url": "https://www.youtube.com/watch?v=CQbctPiqTjQ" },
      { "title": "티파니 영과 함께한 모엣 & 샹동 홈 파티🎁ㅣEP.03", "url": "https://www.youtube.com/watch?v=s7Pok9PaMjM" },
      { "title": "Toast with MOËT l EP.04", "url": "https://www.youtube.com/watch?v=iBhHqNXYs2s" }
    ]
  },
  "7eMK0UIFtFk": {
    "category": "Branded Content",
    "date": "2023년 01월 30일",
    "intro": "헤이즈와 크러쉬가 함께하는 따뜻한 크리스마스 미니 라이브 콘서트!🌈\nSKT 0, 비긴 어게인🎶\n\n연말에 방구석 콘서트 같이 즐길 사람~?🤚🏼\n여기가 내가 누울 자리인가...",
    "advertiser": "SKT",
    "effect": "SKT의 신규 컬처 브랜드 '0(YOUNG)을 브랜딩하기 위해 진행된 비긴 어게인 콘서트 콘텐츠 - 워커힐 에스톤하우스를 공연장으로 꾸며 크러쉬, 헤이즈와 함께 진행된 총 80분 간의 공연",
    "related": [
      { "title": "고막 남친 크러쉬(Crush)의 라이브 콘서트 | SKT 0, 비긴 어게인ㅣ가끔, 어떻게 지내, 그냥, OHIO, Oasis, Rush Hour | 딩고뮤직ㅣDingo Music", "url": "https://www.youtube.com/watch?v=OASZVY8-Qw0" },
      { "title": "🎄크리스마스🎄 크러쉬(Crush)&헤이즈(Heize)의 미니 라이브 콘서트 비하인드 풀버전 | SKT 0, 비긴 어게인ㅣ딩고뮤직ㅣDingo Music", "url": "https://www.youtube.com/watch?v=fdePN0Sx7sw" }
    ]
  },
  "q1d89c9nZkw": {
    "category": "Branded Content",
    "date": "2023년 01월 30일",
    "intro": "요즘 집에 있는 시간 너~무 많지?!\n🔥집에서 딱 10분만 투자하자🔥\n특별히 동물원 투어편으로 준비했으니까 이번 연도에는 더 재밌게 건강해지자구~! 😜",
    "advertiser": "NEWBALANCE",
    "effect": "신학기 맞이 키즈 홈트레이닝 동작을 동물원 컨셉으로 구성. 브랜드캠페인 메시지 ‘Ready to go’와 브랜드 신제품 백팩 라인을 자연스럽게 노출",
    "related": []
  },
  "lJfQmjsG7Vw": {
    "category": "Branded Content",
    "date": "2023년 01월 30일",
    "intro": "",
    "advertiser": "현대자동차",
    "effect": "실시간 소통 방송을 통해 기존 LEGACY MEDIA와 같은 형태의 효과 & 퀄리티를 소비자들에게 제공 하는 브랜디드 콘텐츠",
    "related": [
      { "title": "[ENG/JPN] 선우정아 - 도망가자, Invisible Treasure [충전포차] l 현대 모터스튜디오 X 딩고뮤직ㅣDingo Music", "url": "https://www.youtube.com/watch?v=PjXZY6v6FRw" },
      { "title": "[ENG/JPN] 적재 - 잘 지내, 적재&AB6IX 동현 - Lullaby [충전포차] l 현대 모터스튜디오 X 딩고뮤직ㅣDingo Music", "url": "https://www.youtube.com/watch?v=jj13T5xM2DU" },
      { "title": "[ENG/JPN] 폴킴 - 길(무반주 ver.), 나를 사랑하지 않는 나에게 [충전포차] l 현대 모터스튜디오 X 딩고뮤직ㅣDingo Music", "url": "https://www.youtube.com/watch?v=g_CIjIB8J_w" }
    ]
  },
  "Op5nJGSxb1g": {
    "category": "Branded Content",
    "date": "2023년 01월 30일",
    "intro": "오늘 밤 잠 못 드는 나에게 들려주고 싶은 로꼬의 달빛뮤직🌙\n“너무 잘하고 있어 난 혼자” 로꼬 가사 들으며 위로받는중ㅠㅠㅠ\n\n🍋 한율과 딩고뮤직이 함께 한 로꼬 - Moonlight 음원",
    "advertiser": "아모레퍼시픽",
    "effect": "한율 '달빛유자 수면팩'에서 영감을 얻은 로꼬의 달달한 수명송을 스토리텔링으로 풀어낸 뮤직비디오 콘텐츠",
    "related": [
      { "title": "뷰티시장 뒤집어 놓은 로꼬의 Moonlight 비하인드 모음zipㅣ딩고뮤직ㅣDingo Music", "url": "https://www.youtube.com/watch?v=HsWKhZzQuU8" },
      { "title": "[Lyric Video] 로꼬 (Loco) - Moonlightㅣ딩고뮤직ㅣDingo Music", "url": "https://www.youtube.com/watch?v=lB8c97aVztg" }
    ]
  },
  "VZ9PvjrT_aY": {
    "category": "Branded Content",
    "date": "2023년 01월 30일",
    "intro": "서울 한복판 뷰티 패션이 집합되어 있는 곳에 헤이즈가 떴다?!🌳\nB the B에서 펼쳐지는 헤이즈의 힐링 라이브",
    "advertiser": "서울산업진흥원",
    "effect": "패션과 뷰티를 한 곳에 담은 복합문화공간 라운지에서 펼친 헤이즈의 뮤직 라이브 콘텐츠",
    "related": [
      { "title": "헤이즈가 깜짝 방문한 환상적인 B THE B 라운지 ㅣDF BEHIND X B THE BㅣHeize", "url": "https://www.youtube.com/watch?v=W4Uxij1T5vA" }
    ]
  },
  "GcUbFspR0PE": {
    "category": "Branded Content",
    "date": "2023년 01월 30일",
    "intro": "멜로망스와 함께한 비더비 미니 콘서트!🎹🎶\n도심 속 오아시스 비더비에서🎄\n평범했던 일상도 특별해지는 이 순간🧡",
    "advertiser": "서울산업진흥원",
    "effect": "연말을 맞이하여 새롭게 단장한 에서 펼친 멜로망스의 연말 미니 콘서트 콘텐츠",
    "related": []
  },
  "Z8A7D_xTNH0": {
    "category": "Branded Content",
    "date": "2023년 01월 30일",
    "intro": "하이네켄 제로와 함께하는 매운맛 퀸 와사비와 유교남 오킹의 대결!\n퀸과 킹의 만남이라니... 아찔하다ㅠ\n\nCheers with Non Alcohol!",
    "advertiser": "하이네켄",
    "effect": "유교보이 유튜버 오킹과 오픈 마인드인 퀸와사비가 논 알콜 맥주 <하이네켄 제로>를 먹으며 진솔한 토크를 나눈 예능 토크쇼",
    "related": []
  },
  "TnRbiNl_omU": {
    "category": "Branded Content",
    "date": "2023년 01월 31일",
    "intro": "큰맘먹고 떠난 캠핑장에서 만난 물범?...👀\n\n알 수 없는 신비한 기운이 그녀곁을 맴돌게 되는데\n과연 홀로 떠난 그린 캠핑에서 만나게 된 운명의 상대는?☄☄\n\n친환경 지킴이들을 위한 대박 프로모션이 궁금하다면\n지금 바로 그린카드 누리집에서 확인해보세요! 🚄",
    "advertiser": "한국환경산업기술원",
    "effect": "그린카드의 전방위적인 홍보를 위해 기획된 신규 기획형 콘텐츠로 그린카드가 필요한 순간들을 드라마 형식으로 보여준 브랜디드 콘텐츠",
    "related": []
  },
  "6Vqf6P6s8n8": {
    "category": "Branded Content",
    "date": "2023년 01월 30일",
    "intro": "👨‍🦲: 토론이란 뭐라고 생각하세요?\n🧔: 상대방과의 호흡? 화합?\n👨‍🦲: 아니? 샵빱두비두밥두비두비두비-\n스님 됐다 유치원생 됐다 부캐가 도대체 몇 개인지 모르겠는 이은지🆚엄지윤 대격돌\n\n무논리 토론 현장을 진-정 시켜준 금, 은 보다 좋은 쑥🌿? 킹리적 갓심을 받은 그 제품!!\n진-정 좋은 강화 약쑥잎 추출물을 𝟵𝟭%까지 담아 예민해진 피부와 케미가 좋잖아요😘",
    "advertiser": "JM솔루션",
    "effect": "즉성 콩트와 애드리브에 강한 대세 개그우먼 이은지X엄지윤이 브랜드 키워드와 관련한 노답 토론을 하는 페이크 예능 토크쇼",
    "related": []
  },
  "UyE7RGzG75I": {
    "category": "Branded Content",
    "date": "2023년 01월 30일",
    "intro": "해피 로맨틱 데이💗 설레임을 전해봐~💝",
    "advertiser": "페레로로쉐",
    "effect": "발렌타인데이를 맞이하여 페레로로쉐로 가득찬 곳에서 파티를 준비하는 컨셉의 세로형 라이브 콘텐츠",
    "related": []
  },
  "wQQGxt1THik": {
    "category": "Branded Content",
    "date": "2023년 01월 30일",
    "intro": "커엽+퇴폐미+고급\n화사 모든 것을 ㄷㅏ 갈아넣어버렸다,,\n\n심지어 신곡 무대에 코카N버터 가가, 라치카 에이치원까지!? 혜자다 대혜자🌟",
    "advertiser": "타미진스",
    "effect": "브랜드 앰버서더 화사의 대표곡이 돋보이는 다채로운 스테이지로 구성된 뮤직 퍼포먼스 콘텐츠",
    "related": []
  },
  "cdchQNnIyr0": {
    "category": "Branded Content",
    "date": "2023년 01월 30일",
    "intro": "포브스 선정 “김수현 매력에 무조건 빠지는 영상” 1위💯\n가로수길에 슬쩍 놀러 왔다가 올타임 레전드 찍고 간 김타미씨\n🌻수현 바라기🌻 딘딘이랑 대환장케미 대폭발하고 가셨다고..🤭💣",
    "advertiser": "타미힐피거",
    "effect": "타미힐피거 Flagship Store에서 펼쳐지는 배우 김수현의 특별한 랜선 팬미팅",
    "related": []
  }
    };

    // 각 케이스에 상세 정보 병합(이미 inline detail이 있으면 유지)
    cases.forEach(function (c) {
        if (!c.detail && DETAILS[c.id]) c.detail = DETAILS[c.id];
    });

    // 화질 우선순위. mqdefault/hqdefault는 모든 영상에 항상 존재 → 절대 안 깨짐.
    var SIZES = ["maxresdefault", "sddefault", "hqdefault", "mqdefault"];
    function thumb(id) { return id ? ("https://img.youtube.com/vi/" + id + "/" + SIZES[0] + ".jpg") : ""; }
    // 404(onerror) + maxres 없을 때 내려오는 회색 placeholder(naturalWidth<=120) 모두 감지해
    // 한 단계씩 낮은 화질로 자동 교체. 끝(mqdefault)에서 멈춰 무한루프 없음.
    window.__dingoThumbFix = function (img) {
        var id = img.getAttribute("data-vid");
        if (!id) return;
        if (img.naturalWidth > 120) return; // 정상 로드된 실제 썸네일
        var step = (parseInt(img.getAttribute("data-step"), 10) || 0) + 1;
        if (step < SIZES.length) {
            img.setAttribute("data-step", step);
            img.src = "https://img.youtube.com/vi/" + id + "/" + SIZES[step] + ".jpg";
        }
    };
    function fallbackAttr(id) {
        if (!id) return "";
        return 'data-vid="' + id + '" data-step="0" ' +
            'onerror="window.__dingoThumbFix(this)" onload="window.__dingoThumbFix(this)"';
    }
    function watchUrl(c) {
        return c.id ? ("https://www.youtube.com/watch?v=" + c.id)
            : ("https://www.youtube.com/results?search_query=" + encodeURIComponent("딩고 " + c.title));
    }

    // 배너 설명용: 문장 끝(. ! ?)과 원본 줄바꿈마다 <br> 삽입
    function descHtml(text) {
        return esc(text).trim()
            .replace(/([.!?。])\s+/g, "$1<br>")
            .replace(/\n+/g, "<br>");
    }

    // 자동재생 제어용(모달 열릴 때 일시정지)
    var autoPause = function () {};
    var autoResume = function () {};

    /* ---------- 피처 캐러셀 (단일 카드 + 자동재생) ---------- */
    var featCard = document.getElementById("feat_card");
    var current = 0;

    function renderFeat(idx, dir) {
        if (!featCard) return;
        current = (idx + cases.length) % cases.length;
        var c = cases[current];
        var th = thumb(c.id);
        var descText = c.desc || (c.detail && c.detail.intro) || "";
        var enter = (dir < 0) ? -60 : 60; // 다음=오른쪽에서, 이전=왼쪽에서 슬라이드
        featCard.innerHTML =
            '<a class="feat_thumb" href="' + watchUrl(c) + '" data-idx="' + current + '">' +
            (th ? '<img src="' + th + '" alt="" ' + fallbackAttr(c.id) + '>' : '<span class="no_thumb"></span>') +
            '<span class="play_ico"><span class="material-symbols-outlined">play_arrow</span></span>' +
            '</a>' +
            '<div class="feat_info">' +
            '<div class="feat_top"><span class="feat_brand" title="' + c.client + '">' + c.client + '</span><span class="feat_date">' + (c.date || '') + '</span></div>' +
            '<h4 class="feat_title">' + c.title + '</h4>' +
            '<a class="feat_btn" href="' + watchUrl(c) + '" data-idx="' + current + '">캠페인 보기 <span class="material-symbols-outlined">arrow_forward</span></a>' +
            '</div>';
        // 슬라이드 인 (높이는 고정이라 아래 카드는 움직이지 않음)
        featCard.style.transition = "none";
        featCard.style.opacity = 0;
        featCard.style.transform = "translateX(" + enter + "px)";
        void featCard.offsetWidth; // 리플로우 강제
        featCard.style.transition = "transform 0.5s ease, opacity 0.5s ease";
        featCard.style.opacity = 1;
        featCard.style.transform = "translateX(0)";
    }

    if (featCard) {
        renderFeat(0, 1);

        var prev = document.querySelector(".feat_prev");
        var next = document.querySelector(".feat_next");
        if (prev) prev.addEventListener("click", function () { renderFeat(current - 1, -1); restart(); });
        if (next) next.addEventListener("click", function () { renderFeat(current + 1, 1); restart(); });

        // 자동재생: 5초마다 다음 캠페인. 마우스 올리면 멈춤.
        var timer = null;
        function play() { stop(); timer = setInterval(function () { renderFeat(current + 1, 1); }, 5000); }
        function stop() { if (timer) { clearInterval(timer); timer = null; } }
        function restart() { play(); }

        var featured = document.querySelector(".featured");
        if (featured) {
            featured.addEventListener("mouseenter", stop);
            featured.addEventListener("mouseleave", play);
        }
        autoPause = stop;
        autoResume = play;
        play();
    }

    /* ---------- 3열 그리드 ---------- */
    var grid = document.getElementById("case_grid");
    if (grid) {
        grid.innerHTML = cases.map(function (c, i) {
            var th = thumb(c.id);
            return '<li class="case reveal">' +
                '<a href="' + watchUrl(c) + '" data-idx="' + i + '">' +
                '<figure class="case_thumb">' +
                (th ? '<img src="' + th + '" alt="" loading="lazy" ' + fallbackAttr(c.id) + '>' : '<span class="no_thumb"></span>') +
                '<span class="play_ico"><span class="material-symbols-outlined">play_arrow</span></span>' +
                '</figure>' +
                '<div class="case_info">' +
                '<strong class="case_title">' + c.title + '</strong>' +
                '<div class="case_meta"><span class="case_client" title="' + c.client + '">' + c.client + '</span>' +
                (c.date ? '<span class="case_date">' + c.date + '</span>' : '') + '</div>' +
                '</div>' +
                '</a>' +
                '</li>';
        }).join("");
    }

    /* ---------- 캠페인 상세 팝업(모달) ---------- */
    var modal = document.createElement("div");
    modal.className = "camp_modal";
    modal.innerHTML =
        '<div class="camp_dim"></div>' +
        '<div class="camp_dialog" role="dialog" aria-modal="true" aria-label="캠페인 상세">' +
        '<button type="button" class="camp_close" aria-label="닫기"><span class="material-symbols-outlined">close</span></button>' +
        '<div class="camp_media"></div>' +
        '<div class="camp_body"></div>' +
        '</div>';
    document.body.appendChild(modal);

    var mMedia = modal.querySelector(".camp_media");
    var mBody = modal.querySelector(".camp_body");

    // 텍스트 안전 처리(< > & 이스케이프)
    function esc(s) {
        return String(s == null ? "" : s)
            .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    // 유튜브 URL에서 영상 ID 추출
    function ytId(url) {
        var m = String(url || "").match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
        return m ? m[1] : "";
    }

    function openModal(c) {
        if (!c) return;
        var d = c.detail || {};

        mMedia.innerHTML = c.id
            ? '<button type="button" class="camp_play" ' +
                'data-embed="https://www.youtube-nocookie.com/embed/' + c.id + '?autoplay=1&rel=0" ' +
                'data-watch="' + watchUrl(c) + '">' +
                '<img class="camp_poster" src="' + thumb(c.id) + '" alt="" ' + fallbackAttr(c.id) + '>' +
                '<span class="camp_play_ico"><span class="material-symbols-outlined">play_arrow</span></span>' +
                '</button>'
            : '<a class="camp_noembed" href="' + watchUrl(c) + '" target="_blank" rel="noopener">영상 보러가기</a>';

        var html = "";
        html += '<div class="camp_head">';
        if (d.category) html += '<p class="camp_cat">' + esc(d.category) + '</p>';
        html += '<h3 class="camp_title">' + esc(c.title) + '</h3>';
        html += '<div class="camp_meta">';
        if (c.client) html += '<span class="camp_brand">' + esc(c.client) + '</span>';
        if (d.date || c.date) html += '<span class="camp_date">' + esc(d.date || c.date) + '</span>';
        html += '</div>';
        html += '</div>';

        var intro = d.intro || c.desc;
        if (intro) html += '<p class="camp_desc">' + esc(intro) + '</p>';

        var rows = "";
        if (d.advertiser) rows += '<div class="camp_row"><dt>광고주 / 광고대행사</dt><dd>' + esc(d.advertiser) + '</dd></div>';
        if (d.effect) rows += '<div class="camp_row"><dt>광고 소개 및 효과</dt><dd>' + esc(d.effect) + '</dd></div>';
        if (rows) html += '<dl class="camp_info">' + rows + '</dl>';

        if (d.related && d.related.length) {
            html += '<div class="camp_sec"><h4 class="camp_sec_t">RELATED VIDEO</h4><ul class="camp_related">';
            d.related.forEach(function (r) {
                var rid = r.id || ytId(r.url);
                var rth = thumb(rid);
                html += '<li><a class="rel_item" href="' + r.url + '" target="_blank" rel="noopener">' +
                    '<span class="rel_thumb">' +
                    (rth ? '<img src="' + rth + '" alt="" ' + fallbackAttr(rid) + '>' : '') +
                    '<span class="rel_play"><span class="material-symbols-outlined">play_arrow</span></span>' +
                    '</span>' +
                    '<span class="rel_title">' + esc(r.title) + '</span>' +
                    '</a></li>';
            });
            html += '</ul></div>';
        }

        mBody.innerHTML = html;
        modal.classList.add("open");
        modal.querySelector(".camp_dialog").scrollTop = 0;
        document.body.style.overflow = "hidden";
        autoPause();
    }

    function closeModal() {
        modal.classList.remove("open");
        mMedia.innerHTML = ""; // 영상 정지(언로드)
        document.body.style.overflow = "";
        autoResume();
    }

    // 카드/버튼 클릭 → 외부 이동 대신 팝업
    document.addEventListener("click", function (e) {
        var el = e.target.closest ? e.target.closest("[data-idx]") : null;
        if (!el) return;
        e.preventDefault();
        openModal(cases[parseInt(el.getAttribute("data-idx"), 10)]);
    });

    // 재생 버튼: 로컬(file://)에서는 유튜브 새 탭, 서버(http/https)에서는 팝업 안에서 바로 재생
    mMedia.addEventListener("click", function (e) {
        var btn = e.target.closest ? e.target.closest(".camp_play") : null;
        if (!btn) return;
        if (location.protocol === "file:") {
            window.open(btn.getAttribute("data-watch"), "_blank", "noopener");
            return;
        }
        mMedia.innerHTML =
            '<iframe src="' + btn.getAttribute("data-embed") + '" title="campaign" ' +
            'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
            'allowfullscreen></iframe>';
    });

    modal.querySelector(".camp_close").addEventListener("click", closeModal);
    modal.querySelector(".camp_dim").addEventListener("click", closeModal);
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
    });

    /* ---------- 등장 애니메이션 ---------- */
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
            });
        }, { threshold: 0.12 });
        reveals.forEach(function (el) { io.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add("in"); });
    }

    /* ---------- 상단 탭(AD solution): 새로고침 대신 맨 위로 스크롤 ---------- */
    var adTab = document.querySelector(".ad_tab");
    if (adTab) {
        var onTab = adTab.querySelector("li.on a");
        if (onTab) {
            onTab.addEventListener("click", function (e) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }
    }

    /* ---------- PARTNERS 로고 마퀴 (3행 무한 흐름) ---------- */
    var pmar = document.getElementById("partners_marquee");
    if (pmar) {
        // dingoglobal.com/page/31 의 실제 파트너 로고 URL (partners_logos.js)
        var logos = (window.DINGO_PARTNER_LOGOS || []).slice();
        var fb = (window.DINGO_PARTNER_LOGO_FALLBACK || []);
        if (logos.length) {
            // 3행으로 분배
            var rows = [[], [], []];
            logos.forEach(function (src, i) { rows[i % 3].push({ src: src, fb: fb[i % fb.length] || "" }); });
            pmar.innerHTML = rows.map(function (row, ri) {
                var items = row.map(function (o) {
                    // 로고 로드 실패 시 텍스트 워드마크로 대체
                    var onerr = o.fb ? ' onerror="this.onerror=null;this.src=\'' + o.fb + '\';"' : '';
                    return '<span class="pt_logo"><img src="' + o.src + '" alt="" loading="lazy"' + onerr + '></span>';
                }).join("");
                // 끊김 없는 무한 루프를 위해 동일 세트를 2회 반복(translateX -50%)
                return '<div class="pt_row' + (ri === 1 ? ' rev' : '') + '">' +
                    '<div class="pt_track">' + items + items + '</div>' +
                    '</div>';
            }).join("");
        }
    }
})();

/* 모바일 비즈니스 탭: 가로 스크롤 위치에 따라 좌/우 페이드 토글 + 활성 탭 노출 */
(function () {
    var nav = document.querySelector(".ad_tab");
    if (!nav) return;
    var ul = nav.querySelector("ul");
    if (!ul) return;
    function update() {
        var max = ul.scrollWidth - ul.clientWidth;
        nav.classList.toggle("scrolled", ul.scrollLeft > 8);
        nav.classList.toggle("at-end", max <= 0 || ul.scrollLeft >= max - 8);
    }
    ul.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    // 모바일에서 현재(활성) 탭이 보이도록 스크롤 위치 보정
    if (window.matchMedia("(max-width: 480px)").matches) {
        var active = ul.querySelector("li.on");
        if (active && active.scrollIntoView) {
            active.scrollIntoView({ inline: "center", block: "nearest" });
        }
    }
    update();
})();

/* 모바일 케이스 그리드: 처음 8개만 + "더보기"로 8개씩 펼침 (데스크톱은 전체 노출) */
(function () {
    var grid = document.getElementById("case_grid");
    if (!grid) return;
    var cards = [].slice.call(grid.children);
    if (!cards.length) return;
    var STEP = 8, shown = STEP;
    var wrap = document.createElement("div");
    wrap.className = "cases_more_wrap";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cases_more";
    wrap.appendChild(btn);
    grid.parentNode.insertBefore(wrap, grid.nextSibling);
    var mq = window.matchMedia("(max-width: 768px)");
    function apply() {
        if (mq.matches) {
            cards.forEach(function (c, i) {
                if (i < shown) { c.style.display = ""; c.classList.add("in"); }
                else { c.style.display = "none"; }
            });
            if (shown < cards.length) {
                wrap.classList.add("show");
                btn.textContent = "더보기 " + (shown / STEP) + "/" + Math.ceil((cards.length - STEP) / STEP);
            } else {
                wrap.classList.remove("show");
            }
        } else {
            cards.forEach(function (c) { c.style.display = ""; });
            wrap.classList.remove("show");
        }
    }
    btn.addEventListener("click", function () { shown += STEP; apply(); });
    function onChange() { shown = STEP; apply(); }
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);
    apply();
})();
