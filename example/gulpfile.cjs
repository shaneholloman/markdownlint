// @ts-check

"use strict";

const gulp = require("gulp");
const through2 = require("through2");

// Simple task wrapper
gulp.task("markdownlint", function task() {
  return gulp.src("*.md", { "read": false })
    .pipe(through2.obj(function obj(file, enc, next) {
      import("markdownlint").then(({ "default": markdownlint }) => {
        markdownlint(
          { "files": [ file.relative ] },
          function callback(err, result) {
            const resultString = (result || "").toString();
            if (resultString) {
              console.log(resultString);
            }
            next(err, file);
          });
      }).catch(next);
    }));
});
