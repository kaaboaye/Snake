var gulp = require("gulp");
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

gulp.task("make-JS", function () {
  return gulp.src([
    "node_modules/p5/lib/p5.js",
    "src/**/*.js"
  ])
  //.pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(concat('app.js'))
  //.pipe(sourcemaps.write())
  .pipe(gulp.dest("build_tmp"));
})

gulp.task("default", ["make-JS"], function () {
    gulp.src(["src/*.jade"])
    .pipe(jade({}))
    .pipe(gulp.dest("dist"));
})
