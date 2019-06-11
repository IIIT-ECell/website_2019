"use strict";

let autoprefixer = require("gulp-autoprefixer"),
    cleanCSS = require("gulp-clean-css"),
    gulp = require("gulp"),
    htmlmin = require("gulp-htmlmin"),
    rmEmptyLines = require("gulp-remove-empty-lines"),
    uglify = require("gulp-uglify");

gulp.task("styles", function() {
    return gulp
        .src("./_site/css/*.css", { base: "./" })
        .pipe(autoprefixer({ browsers: ["last 99 versions"], cascase: false }))
        .pipe(cleanCSS())
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
                removeComments: true,
                collapseInlineTagWhitespace: true,
                preserveLineBreaks: true
            })
        )
        .pipe(rmEmptyLines())
        .pipe(gulp.dest("."));
});

gulp.task("default", gulp.series("styles", "scripts", "pages"));
