$(document).ready(init);

function shouldManageDropdown() {
    return window.innerWidth >= 1000;
}

function windowSizeAwareDropdownFn(fn) {
    return function() {
        if (!shouldManageDropdown()) return true;
        fn();
    };
}

function manageDropdowns() {
    var dropdowns = document.querySelectorAll(
            "#navbarSupportedContent ul li.dropdown"
        ),
        fadeInOutOptions = {
            duration: 150
        };

    dropdowns.forEach(function(dropdown) {
        var toggleBtn = dropdown.querySelector(".dropdown-toggle"),
            dropdownMenu = dropdown.querySelector(".dropdown-menu");

        $(toggleBtn).on("mouseenter", function() {
            $(dropdownMenu).show(fadeInOutOptions);
        });
        $(toggleBtn).on("mouseleave", function() {
            $(dropdownMenu).hide(fadeInOutOptions);
        });
    });
}

function init() {
    manageDropdowns();

    /*
     * if header is defined, then manage navbar curves on scroll otherwise just display them
     *
     * !IMPORTANT: i'm assuming that <header> will only be used to define the whole header image part
     *              and nothing else in this whole website
     */
    if ($("header").length) {
        $(document).on("scroll", function() {
            if ($(document).scrollTop() > 25) {
                $("nav").addClass("navbar-curves");
            } else {
                $("nav").removeClass("navbar-curves");
            }
        });
    } else {
        $("nav").addClass("navbar-curves");
    }
}
