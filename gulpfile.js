var less = require("gulp-less");
var gulp = require("gulp");
var mod = require("./index.js");

var lessc = require("gulp-less/node_modules/less");
mod.loadFunctions(lessc);


gulp.task("default", function() {
    gulp.src("test.less")
        .pipe(less({
        }))
        .pipe(gulp.dest(".tmp"));
});
