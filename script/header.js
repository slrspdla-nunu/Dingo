// 헤더 공통 기능 : 언어 설정 토글 + 링크 복사 (메인 action.js 와 동일 동작)
$(document).ready(function(){
    $('.lang_wrap button').click(function(){
        $('.lang_list').stop().slideToggle('on');
    });
});

$(document).click(function(e){
    if (!$(e.target).closest('.lang_wrap').length){
        $('.lang_list').removeClass('on');
        $('.lang_list').fadeOut(300);
    }
});

$('.btn_share').click(function(){
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(function(){
        if ($('.copy_msg').length === 0){
            $('body').append('<div class="copy_msg">링크가 복사되었습니다!</div>');
        }
        $('.copy_msg').fadeIn(400).delay(1500).fadeOut(400);
    });
});

/* 현재 보고 있는 서브페이지에 해당하는 메뉴 항목 표시(.current) */
$(function(){
    var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    $('header nav .gnb a').each(function(){
        var href = ($(this).attr('href') || '').split('/').pop().toLowerCase();
        if (href && href !== '#' && href === path){
            $(this).addClass('current');
        }
    });
});

/* 모바일: 사이드 메뉴가 열린 상태에서 메뉴 밖을 누르면 닫기 */
$(document).on('click', function(e){
    var toggle = document.getElementById('nav_toggle');
    if (!toggle || !toggle.checked) return;
    if (e.target === toggle) return;
    if ($(e.target).closest('.menu_box, .nav_hamburger').length) return;
    toggle.checked = false;
});
