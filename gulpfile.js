/*eslint no-console: 0*/
'use strict'
var gulp = require('gulp')
  , uglify = require('gulp-uglify')
  , concat = require('gulp-concat')
  , rename = require('gulp-rename')
  , cleanCSS = require('gulp-clean-css')
  , less = require('gulp-less')
  , inlinesource = require('gulp-inline-source')
  , args = require('yargs').argv
  , fs = require('fs')
  , paths = require('path')
  , htmlreplace = require('gulp-html-replace')
  , rimraf = require('gulp-rimraf')
  , replace = require('gulp-replace-task')
  ;


var path = {
    build: {
        src: 'test_widget/build/'
    },
    prod: {
        src: 'test_widget/prod/'
    },
    dev: {
        tmp: 'test_widget/dev/tmp/',
        src: 'test_widget/dev/',
        html: 'test_widget/dev/index.html',
        js: 'test_widget/dev/main.js',
        less: 'test_widget/dev/main.less',
        vendorCss: 'test_widget/dev/*.css'
    }
}

gulp.task('styles', function () {
    return gulp.src([
        path.dev.vendorCss,
        path.dev.less
    ])
    .pipe(concat('__main.less'))
    .pipe(less())
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

/*gulp.task('html-repalce', function () {
    return gulp.src(path.dev.html)
        .pipe(htmlreplace({
            'type':
        }))
});*/


gulp.task('build', ['scripts', 'styles'], function () {
    var env = args.env || 'dev';
    var patterns = [{match: 'type', replacement: env === 'dev' ? '_' : ''}];
    var options = {
        attribute: 'inline',
        compress: false
    }

    return gulp.src(path.dev.html)
        .pipe(replace({patterns: patterns}))
        .pipe(inlinesource(options))
        .pipe(gulp.dest(path.prod.src));

});



/*gulp.task('build', ['inline-source'], function () {

    var env = args.env || 'dev';

    return gulp.src(path.dev.html)
        .pipe(htmlreplace({
            'type': env === 'dev' ? '_' : ''
        }))
        .pipe(rename('tmp.html'))
        .pipe(gulp.dest(path.dev.src))
});

gulp.task('inline-source', ['scripts', 'styles'], function () {

    var options = {
        attribute: 'inline',
        compress: false
    }

    return gulp.src(path.dev.src + 'tmp.html')
        .pipe(inlinesource(options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(path.prod.src));
});*/

/*gulp.task('inline-source', ['scripts', 'styles'], function () {

    var env = args.env || 'dev';
    var htmlPath = env === 'dev' ? path.build.src + '__main.css' : path.build.src + '_main.css'

    var options = {
        attribute: 'inline',
        compress: false
    }

    return gulp.src(path.dev.html)
        .pipe(htmlreplace({
            'type': env === 'dev' ? '_' : ''
        }))
        .pipe(gulp.dest(path.dev.src))
        .pipe(inlinesource(options))
        .pipe(gulp.dest(path.prod.src));
});*/


gulp.task('build-prod', ['inline-source']);

/*

gulp.task('inline-css', ['styles'], function() {
    return gulp.src(path.dev.html)
        .pipe(inlineStyle('test_widget/main.css'))
        .pipe(gulp.dest(path.prod.src));
});

gulp.task('build-prod', ['inline-source']);

gulp.task('build-prod:scripts', ['inline-js']);*/