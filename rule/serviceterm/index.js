$(document).on('click', '#fortop', function(){
    // var top_pos = $('.SPheader').offset().top;
    var top_pos = 0;
    $("html, body").animate({ scrollTop: top_pos }, 'slow','swing');
})