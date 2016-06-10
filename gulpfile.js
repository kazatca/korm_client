var gulp = require("gulp");
var browserify = require('gulp-browserify');
// var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var moduleImporter = require('sass-module-importer');
// var file = require('gulp-file');

var files = [
  // 'test-inputs',
  // 'test-notify',
  // 'test-wizard',
  // 'test-fetch',
  // 'login',
  'documents'
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
    .pipe(gulp.dest("./dist/js"));
});


gulp.task('jade', function() {
  gulp.src(files.map(function(file){
    return './jade/'+file+'.jade';
  }))
    .pipe(plumber())
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('./dist/'));
});


gulp.task('sass', function () {
  gulp.src(files.map(function(file){
    return './scss/'+file+'.scss';
  }))
    .pipe(plumber())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sass({ importer: moduleImporter() }))
    .pipe(gulp.dest('./dist/css'));
});


gulp.task("vendor:js", function () {
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
    .pipe(gulp.dest("./dist/js"));
});

gulp.task('vendor:scss', function(){
  gulp.src('./scss/vendor.scss')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(plumber())
    .pipe(sass({ importer: moduleImporter() }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('vendor', ['vendor:js', 'vendor:scss']);

gulp.task('default', ['js', 'sass', 'jade']);


gulp.task('watch', function(){
  gulp.start('default');
  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('./jade/**/*.jade', ['jade']);
  gulp.watch([
      './js/**/*.js', 
      '!**/*tests/**/*'
    ],  
    ['js']);
});


