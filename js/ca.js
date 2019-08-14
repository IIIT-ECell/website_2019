(function() {
    let leaderboardData = null,
        allTextLines;

    const entriesPerPage = 20;

    $(document).ready(function() {
        $.ajax({
            type: "GET",
            url: "/leader.csv",
            dataType: "text",
            success: function(data) {
                leaderboardData = data;
                allTextLines = leaderboardData.split(/\r\n|\n/);

                processData();
            }
        });
    });

    function makePaginationNav(currentPage, totalPages) {
        let disablePrev = currentPage === 1,
            disableNext = currentPage === totalPages,
            $pageNav = $("#pagination"),
            $prev = $("<li>", {
                class: `page-item ${disablePrev ? "disabled" : ""}`
            }),
            $next = $("<li>", {
                class: `page-item ${disableNext ? "disabled" : ""}`
            });

        if (!disablePrev) {
            $prev.click(() => {
                processData((currentPage - 2) * entriesPerPage);
            });
        }
        $prev.append(`<span class="page-link">&laquo</span>`);

        if (!disableNext) {
            $next.click(() => {
                processData(currentPage * entriesPerPage);
            });
        }
        $next.append(`<span class="page-link">&raquo</span>`);

        $pageNav.empty();
        $pageNav.append($prev);

        for (let i = 1; i <= totalPages; i++) {
            let $navItem = $("<li>", {
                class: `page-item ${i === currentPage ? "active" : ""}`
            });

            $navItem.append(`<span class="page-link">${i}</span>`);
            $navItem.click(() => {
                processData((i - 1) * entriesPerPage);
            });

            $pageNav.append($navItem);
        }

        $pageNav.append($next);
    }

    function processData(startIndex = -1) {
        if (startIndex < 0) startIndex = 0;

        let endIndex = startIndex + entriesPerPage;

        if (endIndex < 0 || endIndex >= allTextLines.length)
            endIndex = allTextLines.length - 1;

        let currentPage = Math.floor(startIndex / entriesPerPage) + 1,
            totalPages = Math.floor(allTextLines.length / entriesPerPage) + 1,
            $tableBody = $("#table_body");

        makePaginationNav(currentPage, totalPages);

        $tableBody.empty();

        for (let i = startIndex; i <= endIndex; i++) {
            let data = allTextLines[i].split(",");

            let $row = $("<tr>"),
                $rank = $("<td>"),
                $name = $("<td>"),
                $score = $("<td>");

            $rank.html(i + 1);
            $name.html(data[0].toLowerCase());
            // Converting to lower case so that capitalise using CSS works
            $score.html(data[1]);

            $row.append($rank);
            $row.append($name);
            $row.append($score);

            $tableBody.append($row);
        }
    }
})();
