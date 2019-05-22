function resize() {
    if (
        $(window).width() > 970 ||
        ($(window).width() < 740 && $(window).width() > 540)
    ) {
        $(".member").addClass("d-flex");
    } else {
        $(".member").removeClass("d-flex");
    }

    if ($(window).width() < 768) {
        $(".team-members").addClass("text-center");
    } else {
        $(".team-members").removeClass("text-center");
    }
}

$(document).ready(function() {
    $(window).resize(resize);
    resize();
});
