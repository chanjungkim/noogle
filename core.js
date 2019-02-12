$(function () {
    // $('.container').remove();
    $('.aside').remove();
    $('.notice').remove();
    $('.column_left').remove();
    $('.aside').remove();
    $('.notice').remove();
    $('.area_links').remove();
    $('.column_bottom').remove();
    $('.column_banner').remove();
    // $('.naver_logo').remove();

    $(".u_skip").before($('.section_minime, #account'));
    $(".u_skip").before("<div id='noogle-container' style='width:100%; height:30%;display: inline-grid;'></div>");
    $("#noogle-container").append($('.area_logo'));
    $("#noogle-container").append("<div></div>");
    $('.area_logo').css('height', 'auto');
    $('.area_logo').after($('#search'));
    $('.area_logo, #search').css('width', '50%');
    $('.area_logo, #search').css('margin', 'auto');
    // $('.container').remove();
    // $('.footer').css('bottom', '0');
    // $('.footer').css('left', '0');
    // $('.footer').css('position', 'absolute');
    // $('.footer').css('right', '0');
});
