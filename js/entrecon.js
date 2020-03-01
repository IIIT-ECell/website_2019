$(function() {
    $("a.hvr").on("click", function(event) {
        const targetID = this.dataset.to;

        if (!targetID) return true;

        var obj = $(targetID);
        var childPos = obj.offset();
        var parentPos = obj.parent().offset();
        var childOffset = {
            top: childPos.top - parentPos.top,
            left: childPos.left - parentPos.left
        };
        let targetPixel = childOffset.left;

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
