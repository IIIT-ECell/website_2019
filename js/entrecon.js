$(function() {
    $("a.hvr").on("click", function(event) {
        const targetID = this.dataset.to;

        if (!targetID) return true;

        let targetPixel = $(targetID).offset().left;

        $(".outer-wrapper").animate({ scrollTop: targetPixel }, 1000);

        // these don't work
        // $(".outer-wrapper").scrollTop(targetPixel);
        // window.scroll({
        // 	top: targetPixel,
        // 	left: 0,
        // 	behavior: 'smooth'
        //   });
        event.preventDefault();
    });
});
