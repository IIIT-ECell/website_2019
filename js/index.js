$(document).ready(function() {
    $(".testimonial-container").slick({
        prevArrow: '<button type="button" class="slick-prev">&#8592;</button>',
        nextArrow: '<button type="button" class="slick-next">&#8594;</button>',
        dots: true,
        autoplay: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1
    });
});
