var documentLoadInterval = function() {
    if (document.readyState == "complete") init();
    else setInterval(documentLoadInterval, 10);
};
documentLoadInterval();

function manageDropdowns() {
    var dropdowns = [...document.querySelectorAll("#navbarSupportedContent ul li.dropdown")],
        showClass = "show";

    dropdowns.forEach(function(dropdown) {
        var toggleBtn = dropdown.querySelector(".dropdown-toggle"),
            dropdownMenu = dropdown.querySelector(".dropdown-menu"),
            doNotFadeOutYet = false;

        function fadeOutDropdown() {
            dropdown.classList.remove(showClass);
            toggleBtn.setAttribute("expanded", "false");
            dropdownMenu.classList.remove(showClass);
            doNotFadeOutYet = false;
        }

        dropdown.addEventListener("mouseenter", function() {
            dropdown.classList.add(showClass);
            toggleBtn.setAttribute("expanded", "true");
            dropdownMenu.classList.add(showClass);
        });
        dropdown.addEventListener("mouseleave", function() {
            setTimeout(function() {
                if (!doNotFadeOutYet) fadeOutDropdown();
            }, 100);
        });
        dropdownMenu.addEventListener("mouseenter", function() {
            doNotFadeOutYet = true;
        });
        dropdownMenu.addEventListener("mouseleave", fadeOutDropdown);
    });
}

function init() {
    manageDropdowns();
}
