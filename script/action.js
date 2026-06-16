$(document).ready(function(){
    $('.lang_wrap button').click(function(){
        $('.lang_list').stop().slideToggle('on');
    })
})

$(document).click(function(e){
    if (!$(e.target).closest('.lang_wrap').length){
        $('.lang_list').removeClass('on');
        $('.lang_list').fadeOut(300);
    }
})

$('.btn_share').click(function(){
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(function(){
        if ($('.copy_msg').length === 0){
            $('body').append('<div class="copy_msg">링크가 복사되었습니다!</div>');}
            $('.copy_msg').fadeIn(400).delay(1500).fadeOut(400);
    });
});

// $('.btn_share').click(function(){
//     const currentUrl = window.location.href;
//     navigator.clipboard.writeText(currentUrl).then(function(){
//         alert("링크가 클립보드에 복사되었습니다!");
//     }).catch(function(err){
//         console.error('복사 실패:', err);
//     })
// })

$('.filter_tab li').click(function(e){
    e.preventDefault();
    $('.filter_tab li').removeClass('on');
    $(this).addClass('on');
});

// ===== 섹션1 큐레이션 페이징 (화살표로 숫자 넘기기) =====
(function(){
    var $now  = $('.curation_nav .paging .now');
    var total = parseInt($('.curation_nav .paging .total').text(), 10) || 1;
    var cur   = parseInt($now.text(), 10) || 1;
    function pad(n){ return (n < 10 ? '0' : '') + n; }
    function update(){ $now.text(pad(cur)); }
    $('.curation_nav .btn_group .prev').on('click', function(){
        cur = cur > 1 ? cur - 1 : total;   // 처음에서 이전 → 마지막으로
        update();
    });
    $('.curation_nav .btn_group .next').on('click', function(){
        cur = cur < total ? cur + 1 : 1;   // 마지막에서 다음 → 처음으로
        update();
    });
})();

// ===== 음악 플레이어 기능 =====
(function(){
    var $bar     = $('.progress_bar .bar');
    var $cur     = $('.progress_bar .time span').first();
    var $total   = $('.progress_bar .time span').last();
    var $playBtn = $('.player_controls .play_control');
    var $playImg = $playBtn.find('img');
    var $ctrl    = $('.player_controls button');
    var $tracks  = $('.track_list li');

    function pt(t){ var p = (t || '0:0').split(':'); return (parseInt(p[0],10)||0)*60 + (parseInt(p[1],10)||0); }
    function fmt(s){ s = Math.max(0, Math.round(s)); var m = Math.floor(s/60), x = s%60; return (m<10?'0':'')+m+':'+(x<10?'0':'')+x; }

    var current = Math.max(0, $tracks.index($tracks.filter('.on')));
    var duration = pt($tracks.eq(current).find('em').text());
    var elapsed  = 0;   // CANDY는 0:00부터 시작
    var playing  = false;
    var timer    = null;
    var dragging = false;

    // ===== YouTube 연동 =====
    var ytPlayer = null, ytReady = false, ytPoll = null;
    function ytIdFor(i){ return $tracks.eq(i).attr('data-yt') || ''; }
    function useYt(){ return ytReady && !!ytIdFor(current); }
    function startYtPoll(){
        clearInterval(ytPoll);
        ytPoll = setInterval(function(){
            if (!ytPlayer || !ytPlayer.getCurrentTime) return;
            var d = ytPlayer.getDuration(); if (d) duration = d;
            elapsed = ytPlayer.getCurrentTime();
            render();
        }, 250);
    }
    function stopYtPoll(){ clearInterval(ytPoll); }
    window.onYouTubeIframeAPIReady = function(){
        ytPlayer = new YT.Player('yt-player', {
            height: '1', width: '1',
            playerVars: { controls: 0, disablekb: 1, playsinline: 1, rel: 0 },
            events: {
                onReady: function(){ ytReady = true; var v = ytIdFor(current); if (v) ytPlayer.cueVideoById(v); },
                onStateChange: function(e){
                    if (e.data === YT.PlayerState.ENDED){ load(current + 1, true); }
                    else if (e.data === YT.PlayerState.PLAYING){ var d = ytPlayer.getDuration(); if (d){ duration = d; render(); } }
                }
            }
        });
    };

    // 떠다니는 형광 녹색 하이라이트 (다음 곡으로 부드럽게 이동)
    var $highlight = $('<div class="track_highlight"></div>');
    $('.track_list').prepend($highlight);

    // 이퀄라이저(현재 곡 번호 자리) / 레코드 광택 요소 삽입
    $tracks.find('.track_num').append('<span class="eq track_eq"><i></i><i></i><i></i></span>');
    $('.record_area').append('<span class="record_glare"></span>');

    // 진행 바를 이퀄라이저(파형) 막대로 구성
    var WAVE_N = 56;
    var waveBars = [];
    (function(){
        var frag = document.createDocumentFragment();
        for (var wi = 0; wi < WAVE_N; wi++){
            var b = document.createElement('span');
            b.className = 'wave';
            b.style.height = (28 + Math.random() * 72) + '%';                 // 파형 모양
            b.style.animationDelay = (Math.random() * 0.8).toFixed(2) + 's';   // 막대마다 다른 박자
            b.style.animationDuration = (0.7 + Math.random() * 0.5).toFixed(2) + 's';
            frag.appendChild(b);
            waveBars.push(b);
        }
        $bar.empty().append(frag);
        $bar.append('<span class="bar_line"></span><span class="bar_handle"></span>');
    })();
    var $line   = $bar.find('.bar_line');
    var $handle = $bar.find('.bar_handle');
    function moveHighlight(animate){
        var li = $tracks.eq(current)[0];
        if (!li) return;
        if (animate === false) $highlight.css('transition', 'none');
        $highlight.css({ top: li.offsetTop + 'px', left: li.offsetLeft + 'px', width: li.offsetWidth + 'px', height: li.offsetHeight + 'px' });
        if (animate === false) { void $highlight[0].offsetHeight; $highlight.css('transition', ''); }
    }

    function render(){
        var pct = duration ? Math.min(100, elapsed / duration * 100) : 0;
        // 파형은 동그라미보다 0.8칸 뒤에서 시작 (핸들이 앞서고 파형이 따라옴)
        var played = Math.max(0, Math.round(pct / 100 * WAVE_N - 0.8));
        for (var i = 0; i < WAVE_N; i++){
            waveBars[i].classList.toggle('on', i < played);
        }
        $line.css('left', pct + '%');      // 회색 선은 재생 위치부터 오른쪽까지
        $handle.css('left', pct + '%');    // 동그라미 핸들 = 재생 위치
        $cur.text(fmt(elapsed));
        $total.text(fmt(duration));
    }
    function setIcon(){
        // 재생 중이면 정지(❚❚), 아니면 재생(▶) 아이콘 - CSS로 표시
        $playBtn.toggleClass('is-playing', playing);
        // 재생 중에는 레코드 판이 회전
        $('.record_img').toggleClass('spinning', playing);
        // 이퀄라이저(음파 바) 재생 상태 연동
        $('#section03').toggleClass('is-playing', playing);
    }
    function play(){
        if (playing) return;
        playing = true; setIcon();
        clearInterval(timer);
        if (useYt()){
            ytPlayer.playVideo();
            startYtPoll();
        } else {
            timer = setInterval(function(){
                elapsed += 1;
                if (elapsed >= duration){ load(current + 1, true); return; }
                render();
            }, 1000);
        }
        render();
    }
    function pause(){
        playing = false; setIcon();
        clearInterval(timer);
        stopYtPoll();
        if (ytReady && ytIdFor(current) && ytPlayer.pauseVideo) ytPlayer.pauseVideo();
    }
    function load(i, autoplay){
        current = ((i % $tracks.length) + $tracks.length) % $tracks.length;
        var $li = $tracks.eq(current);
        $tracks.removeClass('on'); $li.addClass('on');
        moveHighlight();
        // 커버 이미지 크로스페이드 전환 (태그 img는 유지)
        (function(){
            var $cov = $('.album_cover > img');
            var newSrc = $li.find('figure img').attr('src');
            $cov.addClass('cover-swap');                                  // 뿌옇게 흐려짐
            setTimeout(function(){ $cov.attr('src', newSrc); }, 200);     // 흐려진 동안 교체
            setTimeout(function(){ $cov.removeClass('cover-swap'); }, 400); // 다시 선명하게
        })();
        $('.now_playing strong').text($li.find('strong').text());
        duration = pt($li.find('em').text());
        elapsed = 0;
        stopYtPoll();
        var vid = ytIdFor(current);
        if (ytReady){
            if (vid){
                if (autoplay){ ytPlayer.loadVideoById(vid); }   // 곡 변경 시 즉시 재생
                else { ytPlayer.cueVideoById(vid); }            // 정지 상태면 로드만
            }
            else if (ytPlayer.stopVideo){ ytPlayer.stopVideo(); }
        }
        render();
        if (autoplay){
            if (useYt()){
                // loadVideoById가 자동 재생 → 상태 동기화 + 진행 폴링 시작
                clearInterval(timer);
                playing = true; setIcon(); startYtPoll(); armTo(PLAY_POS);
            } else {
                playing = false; play();   // YT 미사용 시 타이머 경로
            }
        } else {
            setIcon();
        }
    }

    // 재생 / 일시정지 (버튼 조작 시 톤암도 부드럽게 이동)
    $playBtn.on('click', function(e){
        e.preventDefault();
        if (playing) { pause(); armTo(PARKED); }   // 멈추면 톤암이 레코드에서 떨어짐
        else { play(); armTo(PLAY_POS); }           // 재생하면 톤암이 레코드 바깥 가장자리로
    });
    // 이전 / 다음 곡
    $ctrl.eq(1).on('click', function(){ load(current - 1, playing); });
    $ctrl.eq(3).on('click', function(){ load(current + 1, playing); });
    // 셔플 (랜덤 곡 재생)
    $ctrl.eq(0).on('click', function(){
        var r = current;
        if ($tracks.length > 1){ while (r === current){ r = Math.floor(Math.random() * $tracks.length); } }
        load(r, true);
    });

    // 진행 바 클릭 / 드래그로 탐색 → 시간 갱신
    function seek(e){
        var rect = $bar[0].getBoundingClientRect();
        var cx = (e.originalEvent && e.originalEvent.touches) ? e.originalEvent.touches[0].clientX : e.clientX;
        var frac = Math.min(1, Math.max(0, (cx - rect.left) / rect.width));
        elapsed = frac * duration;
        if (useYt()) ytPlayer.seekTo(elapsed, true);
        render();
    }
    $('.progress_bar').on('mousedown', function(e){ dragging = true; seek(e); e.preventDefault(); });
    $(document).on('mousemove', function(e){ if (dragging) seek(e); });
    $(document).on('mouseup', function(){ dragging = false; });

    // 리스트의 곡 클릭 → 해당 곡 로드 (재생 중이면 이어서 재생)
    $tracks.on('click', function(){ load($tracks.index(this), playing); });

    // 앨범 커버 클릭 → 처음부터
    $('.album_cover').on('click', function(){ elapsed = 0; if (useYt()) ytPlayer.seekTo(0, true); render(); });

    // 좋아요 하트 클릭 → 면 채우기 토글
    $('.now_playing .like_btn').on('click', function(){ $(this).toggleClass('liked'); });

    // ===== 톤암 드래그 (턴테이블) =====
    var $arm  = $('.record_arm');
    var $area = $('.record_area');
    var PIVOT  = { x: 121, y: 42 };          // 이미지(159x210) 내 축(동그란 부분)
    var NEEDLE = { x: 30,  y: 178 };         // 바늘 끝
    var ARM_LEFT = 585, ARM_TOP = 42;        // record_area 기준 톤암 위치(css)
    var pivot = { x: ARM_LEFT + PIVOT.x, y: ARM_TOP + PIVOT.y };  // (706, 84)
    var nRel  = { x: NEEDLE.x - PIVOT.x, y: NEEDLE.y - PIVOT.y };
    var baseAngle = Math.atan2(nRel.y, nRel.x);
    var recC = { x: 531, y: 236 }, recR = 186;   // record_img 중심 / 반지름
    var MIN_ROT = -0.95, MAX_ROT = 0.30;
    var rotation = 0, armDrag = false;

    $arm.css({ 'transform-origin': PIVOT.x + 'px ' + PIVOT.y + 'px', 'cursor': 'grab' });

    function applyArm(){ $arm.css('transform', 'rotate(' + rotation + 'rad)'); }
    var PARKED = -0.85;   // 레코드에서 떨어진(파킹) 각도
    var PLAY_POS = -0.45;  // 재생 시 바늘이 닿는 위치(레코드 바깥쪽)
    function armTo(rot){  // 버튼 조작 시 부드럽게 이동
        $arm.css('transition', 'transform 0.6s ease');
        rotation = rot;
        applyArm();
    }
    function onRecord(){
        var c = Math.cos(rotation), s = Math.sin(rotation);
        var nx = pivot.x + (nRel.x * c - nRel.y * s);
        var ny = pivot.y + (nRel.x * s + nRel.y * c);
        return Math.hypot(nx - recC.x, ny - recC.y) <= recR;
    }
    function dragArm(e){
        $arm.css('transition', 'none');   // 드래그 중에는 즉각 반응
        var rect = $area[0].getBoundingClientRect();
        var rot = Math.atan2((e.clientY - rect.top) - pivot.y, (e.clientX - rect.left) - pivot.x) - baseAngle;
        while (rot >  Math.PI) rot -= 2 * Math.PI;
        while (rot < -Math.PI) rot += 2 * Math.PI;
        rotation = Math.min(MAX_ROT, Math.max(MIN_ROT, rot));
        applyArm();
        // 바늘이 레코드에 닿으면 재생+회전, 떼면 정지
        if (onRecord()) play(); else pause();
    }
    $arm.on('mousedown', function(e){ armDrag = true; $arm.css('cursor', 'grabbing'); e.preventDefault(); });
    $(document).on('mousemove', function(e){ if (armDrag) dragArm(e); });
    $(document).on('mouseup', function(){ if (armDrag){ armDrag = false; $arm.css('cursor', 'grab'); } });

    render();      // CANDY 0:00부터 시작
    applyArm();
    moveHighlight(false);   // 초기 하이라이트 위치 (애니메이션 없이)
    setIcon();
})();

// ===== hero 사이드 페이징 (스크롤 추적 + 클릭 이동) =====
(function(){
    var $dots = $('.hero_paging li');
    if (!$dots.length) return;

    function docTop(el){ return el.getBoundingClientRect().top + window.pageYOffset; }

    // 클릭 → 해당 섹션으로 부드럽게 이동
    $dots.on('click', function(){
        var el = document.querySelector($(this).data('target'));
        if (el) window.scrollTo({ top: docTop(el), behavior: 'smooth' });
    });

    // 스크롤 → 현재 위치한 섹션의 점 활성화
    function syncActive(){
        var line = window.pageYOffset + window.innerHeight * 0.35;
        var idx = 0;
        $dots.each(function(i){
            var el = document.querySelector($(this).data('target'));
            if (el && docTop(el) <= line) idx = i;
        });
        $dots.removeClass('on').eq(idx).addClass('on');
    }
    $(window).on('scroll resize', syncActive);
    syncActive();
})();

// ===== 스크롤 등장 효과 (Intersection Observer) =====
(function(){
    var targets = [
        '#section01 .title',
        '#section01 .curation_nav',
        '#section01 .card_big',
        '#section01 .card_small ul li',
        '#section01 .bottom_banner .banner_box',
        '#section02 .text_box',
        '#section02 .card_box .card',
        '#section03 .section03_title',
        '#section03 .player_box',
        '#section03 .playlist_box'
    ];
    var els = [];
    targets.forEach(function(sel){
        document.querySelectorAll(sel).forEach(function(el){ els.push(el); });
    });
    if (!els.length) return;

    document.body.classList.add('scroll-fx');
    els.forEach(function(el){ el.classList.add('reveal'); });

    // 같은 그룹(형제) 내에서 순차 등장
    function staggerIndex(el){
        var i = 0, p = el.previousElementSibling;
        while (p){ if (p.classList && p.classList.contains('reveal')) i++; p = p.previousElementSibling; }
        return i;
    }
    els.forEach(function(el){
        el.style.transitionDelay = (Math.min(staggerIndex(el), 6) * 0.09) + 's';
    });

    function show(el){
        el.classList.add('in');
        // 등장 후엔 reveal 관련 속성 제거 → hover 트랜지션이 본래 속도로 동작
        setTimeout(function(){
            el.classList.remove('reveal', 'in');
            el.style.transitionDelay = '';
            el.style.willChange = '';
        }, 1300);
    }

    if (!('IntersectionObserver' in window)){
        els.forEach(show);
        return;
    }
    var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
            if (e.isIntersecting){ show(e.target); io.unobserve(e.target); }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
    els.forEach(function(el){ io.observe(el); });
})();

