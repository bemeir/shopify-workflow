'use strict';
const autoprefixer = require("autoprefixer");
const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const replace = require('gulp-replace');
const tailwindcss = require("tailwindcss");
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');

sass.compiler = require('node-sass');
const options = require("./config"); //paths and other options from config.js


function css() {
    return gulp
        .src("./custom/custom-theme.scss")
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass({outputStyle: "compressed"}))
        .pipe(postcss([tailwindcss(options.config.tailwindjs), autoprefixer(), cssnano()]))
        .pipe(concat('custom-theme.min.css.liquid'))
        .pipe(replace('"{{', '{{'))
        .pipe(replace('}}"', '}}'))
        .pipe(csso())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("./assets/"));
}

function minifyThemeCss() {
    return gulp
        .src('./assets/custom-theme.min.css.liquid')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(csso())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./assets/'))
}

function minifyThemeJs() {
    return gulp
        .src('./assets/theme.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(rename({basename: 'theme.min'}))
        .pipe(gulp.dest('./assets/'))
}

function watchFiles() {
    gulp.watch(['./custom/**/*', './tailwind.config.js'], css);
}

const watch = gulp.series(watchFiles);
const minifyjs = gulp.series(minifyThemeJs);
const minifycss = gulp.series(minifyThemeCss);
const compilecss = gulp.series(css);

exports.watch = watch;
exports.minifyjs = minifyjs;
exports.minifycss = minifycss;
exports.compilecss = css;
