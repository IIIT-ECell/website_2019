function resize() {
    if (
        $(window).width() > 970 ||
        ($(window).width() < 740 && $(window).width() > 540)
    ) {
        $(".member").addClass("d-flex");
    } else {
        $(".member").removeClass("d-flex");
    }
}

$(document).ready(function() {
    $(window).resize(resize);
    resize();
});
