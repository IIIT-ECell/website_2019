"use strict";

let autoprefixer = require("gulp-autoprefixer"),
    csso = require("gulp-csso"),
    gulp = require("gulp"),
    htmlmin = require("gulp-htmlmin"),
    uglify = require("gulp-uglify");

const SUPPORTED_BROWSERS = [
    "ff >= 30",
    "chrome >= 34",
    "safari >= 7",
    "opera >= 23",
    "ios >= 7",
    "android >= 4.4",
    // felt cute, might delete later
    "ie >= 10"
];

gulp.task("styles", function() {
    return gulp
        .src("./_site/css/*.css", { base: "./" })
        .pipe(autoprefixer({ browsers: SUPPORTED_BROWSERS }))
        .pipe(csso())
        .pipe(gulp.dest("."));
});

gulp.task("scripts", function() {
    return gulp
        .src("./_site/js/*.js", { base: "./" })
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("pages", function() {
    return gulp
        .src("./_site/**/*.html", { base: "./" })
        .pipe(
            htmlmin({
                collapseWhiteSpace: true,
                removeComments: true
            })
        )
        .pipe(gulp.dest("."));
});

gulp.task("default", gulp.series("styles", "scripts", "pages"));
