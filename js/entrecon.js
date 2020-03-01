$(function() {
    $("ul.nav a").bind("click", function(event) {
        let targetPixel = $($(this).attr("href")).offset().left;

        // neither of the following scrolls smooth

        // $(".outer-wrapper").scrollTop(target);
        $(".outer-wrapper").animate(
            { scrollLeft: targetPixel },
            1500,
            "easeInOutExpo"
        );
        event.preventDefault();
    });
});
