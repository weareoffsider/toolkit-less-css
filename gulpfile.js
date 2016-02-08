var less = require("gulp-less");
var gulp = require("gulp");
var mod = require("./index.js");

gulp.task("default", function() {
    gulp.src(["test.less", "test-legacy.less"])
        .pipe(less({
          plugins: [mod]
        }))
        .pipe(gulp.dest(".tmp"));
});
