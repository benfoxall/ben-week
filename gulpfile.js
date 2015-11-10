require('dotenv').load();
var gulp = require('gulp');
var awspublish = require('gulp-awspublish');
var smoosher = require('gulp-smoosher');
var minifyInline = require('gulp-minify-inline');
var minifyHTML = require('gulp-minify-html');
var htmlAutoprefixer = require( "gulp-html-autoprefixer" );

gulp.task('build', function(){
  return gulp.src('src/index.html')
          .pipe(smoosher())
          .pipe(htmlAutoprefixer())
          .pipe(minifyInline())
          .pipe(minifyHTML())
          .pipe(gulp.dest('dist'));
})

gulp.task('publish', ['build'], function() {

  var publisher = awspublish.create({
    params: {
      Bucket: "benweek.whiteoctober.co.uk"
    },
    region: 'eu-west-1',
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET
  });

  return gulp.src('./dist/*')
    .pipe(publisher.publish())
    .pipe(awspublish.reporter());
});
