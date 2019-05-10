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
            dropdownMenu = dropdown.querySelector(".dropdown-menu");

        dropdown.addEventListener("mouseenter", function() {
            this.classList.add(showClass);
            toggleBtn.setAttribute("expanded", "true");
            dropdownMenu.classList.add(showClass);
        });
        dropdown.addEventListener("mouseleave", function() {
            this.classList.remove(showClass);
            toggleBtn.setAttribute("expanded", "false");
            dropdownMenu.classList.remove(showClass);
        });
    });
}

function init() {
    manageDropdowns();
}
