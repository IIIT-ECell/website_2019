function resize() {
    if ($(window).width() > 514) {
     $('.member').addClass('d-flex');
    }
    else {$('.member').removeClass('d-flex');}
}

$(document).ready( function() {
    $(window).resize(resize);
    resize();
});

