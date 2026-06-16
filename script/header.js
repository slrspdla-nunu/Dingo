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
