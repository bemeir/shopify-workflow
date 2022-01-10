'use strict';
const autoprefixer = require("autoprefixer");
const gulp = require('gulp');
const { sass } = require("@mr-hope/gulp-sass");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const replace = require('gulp-replace');
const tailwindcss = require("tailwindcss");
const csso = require('gulp-csso');
const uglify = require('gulp-uglify-es').default;

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
        .src('./assets/theme.scss.liquid')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass({outputStyle: "compressed"}))
        .pipe(rename({basename: 'theme.min'}))
        .pipe(replace('"{{', '{{'))
        .pipe(replace('}}"', '}}'))
        .pipe(csso())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./assets/'))
}

function minifyThemeJs() {
    return gulp
        .src('./assets/theme.shopify-compat.js.liquid')
        .pipe(sourcemaps.init())
        .pipe(rename({basename: 'theme.shopify-compat-min.js'}))
        .pipe(replace('{%', '"{%'))
        .pipe(replace('%}', '%}"'))
        .pipe(uglify())
        .pipe(replace('"{%', '{%'))
        .pipe(replace('%}"', '%}'))
        .pipe(replace('"dc', '{{'))
        .pipe(replace('dc"', '}}'))
        .pipe(replace('"sif', '{% if'))
        .pipe(replace('esif"', '{% endif %}'))
        .pipe(replace('seif', '{%'))
        .pipe(replace('eeif', '%}'))
        .pipe(replace('\'dsc ', '{{"'))
        .pipe(replace('dsc\'', '}}'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./assets/'))
}

function minifyVendorJs() {
    return gulp
        .src('./assets/vendor.js')
        .pipe(sourcemaps.init())
        .pipe(rename({basename: 'vendor.min'}))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./assets/'))
}

function watchFiles() {
    gulp.watch(['./custom/**/*', './tailwind.config.js'], css);
}

const watch = gulp.series(watchFiles);
const minifyTheme = gulp.series(minifyThemeJs);
const minifyVendor = gulp.series(minifyVendorJs);
const minifyCss = gulp.series(minifyThemeCss);
const compileCss = gulp.series(css);

exports.watch = watch;
exports.minifyTheme = minifyTheme;
exports.minifyVendor = minifyVendor;
exports.minifyCss = minifyCss;
exports.compileCss = compileCss;
