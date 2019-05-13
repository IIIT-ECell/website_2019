var documentLoadInterval = function() {
    if (document.readyState == "complete") init();
    else setInterval(documentLoadInterval, 10);
};
documentLoadInterval();

function shouldManageDropdown() {
    return window.innerWidth >= 900;
}

function windowSizeAwareDropdownFn(fn) {
    return function() {
        if (!shouldManageDropdown()) return true;
        fn();
    };
}

function manageDropdowns() {
    var dropdowns = [...document.querySelectorAll("#navbarSupportedContent ul li.dropdown")],
        showClass = "show";

    dropdowns.forEach(function(dropdown) {
        var toggleBtn = dropdown.querySelector(".dropdown-toggle"),
            dropdownMenu = dropdown.querySelector(".dropdown-menu"),
            doNotFadeOutYet = false,
            dropdownRemainAwakeTimeout = 50;

        function fadeOutDropdown() {
            dropdown.classList.remove(showClass);
            toggleBtn.setAttribute("expanded", "false");
            dropdownMenu.classList.remove(showClass);
            doNotFadeOutYet = false;
        }

        dropdown.addEventListener(
            "mouseenter",
            windowSizeAwareDropdownFn(function() {
                dropdown.classList.add(showClass);
                toggleBtn.setAttribute("expanded", "true");
                dropdownMenu.classList.add(showClass);
                doNotFadeOutYet = true;
            })
        );

        dropdown.addEventListener(
            "mouseover",
            windowSizeAwareDropdownFn(function() {
                doNotFadeOutYet = true;
            })
        );

        dropdown.addEventListener(
            "mouseleave",
            windowSizeAwareDropdownFn(function() {
                setTimeout(function() {
                    if (!doNotFadeOutYet) fadeOutDropdown();
                }, dropdownRemainAwakeTimeout);
            })
        );

        dropdownMenu.addEventListener(
            "mouseenter",
            windowSizeAwareDropdownFn(function() {
                doNotFadeOutYet = true;
            })
        );

        dropdownMenu.addEventListener(
            "mouseleave",
            windowSizeAwareDropdownFn(function() {
                setTimeout(function() {
                    if (!doNotFadeOutYet) fadeOutDropdown();
                }, dropdownRemainAwakeTimeout);
            })
        );
    });
}

function init() {
    manageDropdowns();
}
