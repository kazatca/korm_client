var gulp = require("gulp");
var browserify = require('gulp-browserify');
// var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var moduleImporter = require('sass-module-importer');
// var file = require('gulp-file');

var files = [
  'test-inputs'
];

gulp.task("js", function () {
  return gulp.src(files.map(function(file){
    return './js/'+file+'.js';
  }))
    .pipe(plumber())
    .pipe(browserify({
      external: [
        'react',
        'react-dom'
      ],
      transform: ["babelify"]
    }))
    
    .pipe(gulp.dest("../js"));
});


gulp.task("vendor", function () {
  // return file(`${process.cwd()}/vendor.js`, '', {src: true})  //break require links
  return gulp.src('./js/vendor.js')
    .pipe(plumber())
    .pipe(browserify({
      require: [
        'react',
        'react-dom'
      ]
    }))
    // .pipe(uglify())
    .pipe(gulp.dest("../js"));
});



gulp.task('sass', function () {
  gulp.src(files.map(function(file){
    return './scss/'+file+'.scss';
  }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(plumber())
    .pipe(sass({ importer: moduleImporter() }))
    .pipe(gulp.dest('../css'));
});

gulp.task('default', function(){
  gulp.start('js', 'sass');
});


gulp.task('watch', function(){
  gulp.start('default');
  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch([
      './js/**/*.js', 
      '!**/*tests/**/*'
    ],  
    ['js']);
});