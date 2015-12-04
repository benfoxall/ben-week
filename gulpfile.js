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

gulp.task('other-things', function(){
  return gulp.src(['src/logo.png', 'brand1.jpg', 'brand2.png', 'brand3.png', 'brand4.png'])
    .pipe(gulp.dest('dist'))
})

gulp.task('publish', ['build', 'other-things'], function() {

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

gulp.task('default', ['publish']);
