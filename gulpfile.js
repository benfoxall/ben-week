require('dotenv');
var gulp = require('gulp');
var awspublish = require('gulp-awspublish');

gulp.task('publish', function() {

  var publisher = awspublish.create({
    params: {
      Bucket: "benweek.whiteoctober.co.uk"
    },
    region: 'eu-west-1',
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET
  });

  // define custom headers
  var headers = {
    // 'Cache-Control': 'max-age=315360000, no-transform, public'
    // ...
  };

  return gulp.src('./src/*')
     // gzip, Set Content-Encoding headers and add .gz extension
    // .pipe(awspublish.gzip({ ext: '.gz' }))

    // publisher will add Content-Length, Content-Type and headers specified above
    // If not specified it will set x-amz-acl to public-read by default
    .pipe(publisher.publish(headers))

    // create a cache file to speed up consecutive uploads
    // .pipe(publisher.cache())

     // print upload updates to console
    .pipe(awspublish.reporter());
});
