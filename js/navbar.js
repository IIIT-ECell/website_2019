var documentLoadInterval = function() {
    if (document.readyState == "complete") init();
    else setInterval(documentLoadInterval, 10);
};
documentLoadInterval();

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
    var dropdowns = [...document.querySelectorAll("#navbarSupportedContent ul li.dropdown")],
        showClass = "show";

    dropdowns.forEach(function(dropdown) {
        var toggleBtn = dropdown.querySelector(".dropdown-toggle"),
            dropdownMenu = dropdown.querySelector(".dropdown-menu"),
            doNotFadeOutYet = true;
            dropdownRemainAwakeTimeout = 50;

        function fadeOutDropdown() {
            if (doNotFadeOutYet) return;
            dropdown.classList.remove(showClass);
            toggleBtn.setAttribute("expanded", "false");
            dropdownMenu.classList.remove(showClass);
            doNotFadeOutYet = false;
        }

        dropdown.addEventListener(
            "mouseenter",
            windowSizeAwareDropdownFn(function() {
                doNotFadeOutYet = true;
                dropdown.classList.add(showClass);
                toggleBtn.setAttribute("expanded", "true");
                dropdownMenu.classList.add(showClass);
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
                doNotFadeOutYet = false;
                setTimeout(fadeOutDropdown, dropdownRemainAwakeTimeout);
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
                doNotFadeOutYet = false;
                setTimeout(fadeOutDropdown, dropdownRemainAwakeTimeout);
            })
        );
    });
}

function init() {
    manageDropdowns();
}
