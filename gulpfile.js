/*eslint no-console: 0*/
'use strict'

var srcPath = require('./gulp_variables');

var gulp = require('gulp')
  , uglify = require('gulp-uglify')
  , concat = require('gulp-concat')
  , rename = require('gulp-rename')
  , cleanCSS = require('gulp-clean-css')
  , less = require('gulp-less')
  , inlinesource = require('gulp-inline-source')
  , args = require('yargs').argv
  , replace = require('gulp-replace-task')
  , watch = require('gulp-watch')
  , prefixer = require('gulp-autoprefixer')
  ;


var path = {
    build: {
        src: 'build/'
    },
    prod: {
        src: 'prod/'
    },
    dev: {
        src: 'dev/',
        html: 'dev/index.html',
        js: 'dev/main.js',
        less: 'dev/main.less',
        vendorCss: 'dev/*.css'
    }
}

gulp.task('styles', function () {
    return gulp.src([
        path.dev.vendorCss,
        path.dev.less
    ])
    .pipe(concat('__main.less'))
    .pipe(less())
    .pipe(prefixer())
    .on('error', console.log)
    .pipe(gulp.dest(path.build.src))
    .pipe(cleanCSS())
    .pipe(rename('_main.css'))
    .pipe(gulp.dest(path.build.src));
});

gulp.task('scripts', function () {
    return gulp.src([
        path.dev.js
    ])
    .pipe(concat('__main.js'))
    .pipe(gulp.dest(path.build.src))
    .pipe(uglify().on('error', function(e){
        console.log(e);
    }))
    .pipe(rename('_main.js'))
    .pipe(gulp.dest(path.build.src))
});

gulp.task('task', function () {
    var task = args.task;
    path = {
        build: {
            src: task + '/build/'
        },
        prod: {
            src: task + '/prod/'
        },
        dev: {
            src: task + '/dev/',
            html: task + '/dev/index.html',
            js: task + '/dev/main.js',
            less: task + '/dev/main.less',
            vendorCss: task + '/dev/*.css'
        },
        task: task
    }
    return path;
});

gulp.task('build', ['task', 'scripts', 'styles'], function () {
    var env = args.env || 'dev';
    var patterns = [
        {match: 'type', replacement: env === 'dev' ? '_' : ''},
        {match: 'src', replacement: env === 'dev' ? srcPath.srcPath : 'https://js.dooh.xyz/' + path.task + '/server/'}
    ];
    var options = {
        attribute: 'inline',
        compress: false
    }

    return gulp.src(path.dev.html)
        .pipe(replace({patterns: patterns}))
        .pipe(inlinesource(options))
        .pipe(gulp.dest(path.prod.src));

});

gulp.task('watch', ['task'], function(){
    watch([path.dev.src], function(event, cb) {
        gulp.start('build');
    });
});