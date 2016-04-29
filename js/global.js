(function() {
    this.$sideBar = $("#sidebar");
    this.$viewContainer = $("#content .container");
    this.leftEdgeTimeout = 0;
    this.keyPressed = { key: false, alt: false };
    that = this;
    this.init = function() {
        className = 1;
        for (i = 1; i <= 150; i++) {
            $("#content .container").append('<div class="row' + className + '">Item ' + i + '</div>');
            console.log(i);
        }
    }
    $(document).on("keydown", function(e) {
        console.log(e, e.which, e.altKey);
        keyPressed.key = e.which;
        keyPressed.alt = e.altKey;
    });
    $(document).on("keyup", function(e) {
        if (!$sideBar.hasClass("mouse") && !$sideBar.hasClass("hidden")) {
            switch (keyPressed.key) {
                case 18: //Alt
                    console.log('Alt');
                    toggleSideBar(false);
                    break;
                case 76: //L
                    console.log('L');
                    displayFormatting("list");
                    break;
                case 71: //G
                    console.log('G');
                    displayFormatting("grid");
                    break;
                case 77: //M
                    console.log('M');
                    displayFormatting("metro");
                    break;
                default:
                    console.log(e, e.which, e.altKey);
            }
        } else if ($sideBar.hasClass("hidden")) {
            switch (keyPressed.key) {
                case 18: //Alt
                    console.log('Alt');
                    toggleSideBar(false);
                    break;
                case 76: //L
                    if (keyPressed.alt) {
                        console.log('Alt-L');
                        displayFormatting("list");
                    }
                    break;
                case 71: //G
                    if (keyPressed.alt) {
                        console.log('Alt-G');
                        displayFormatting("grid");
                    }
                    break;
                case 77: //M
                    if (keyPressed.alt) {
                        console.log('Alt-M');
                        displayFormatting("metro");
                    }
                    break;
                default:
                    console.log(e, e.which, e.altKey);
            }
        }
        keyPressed.key = false;
        keyPressed.alt = false;
    });
    $(document).on("mousemove", function(e) {
        clearTimeout(leftEdgeTimeout);
        if (e.pageX < 10 && $sideBar.hasClass("hidden")) {
            leftEdgeTimeout = setTimeout(function() { that.toggleSideBar(true) }, 1000);
            console.log("Show");
        }
        if ($sideBar.hasClass("mouse")) {
            if (e.pageX > 100) {
                that.toggleSideBar(true);
                console.log("Hide");
            }
        }
    });
    $("#sidebar ul").on("click", function(e) {
        switch ($(e.target).attr("id")) {
                case "format-list":
                    console.log('L');
                    displayFormatting("list");
                    break;
                case "format-grid":
                    console.log('G');
                    displayFormatting("grid");
                    break;
                case "format-metro":
                    console.log('M');
                    displayFormatting("metro");
                    break;
                default:
            }
    });
    this.toggleSideBar = function(target) {
        if (target) {
            $sideBar.toggleClass("mouse");
        }
        $sideBar.toggleClass("hidden");
        clearTimeout(leftEdgeTimeout);
    }
    this.displayFormatting = function(format) {
        format = format || "list";
        $viewContainer.removeClass("grid metro");
        switch (format) {
            case "grid":
                $viewContainer.addClass("grid");
                break;
            case "metro":
                $viewContainer.addClass("metro");
                break;
        }
    }
    return this.init();
})();