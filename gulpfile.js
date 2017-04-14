var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    eslint = require('gulp-eslint'),
    todo = require('gulp-todo'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    del = require('del');

var paths = {
    js: 'src/app/**/**/*.js',
    css: 'src/assets/css/*.css',
    libCss: [
        'node_modules/angular-material/angular-material.css'
    ],
    mainJS: 'src/app/main.js',
    mainHtml: 'index.html',
    templates: 'src/app/**/**/*.html',
    lib: [
        'node_modules/angular/angular.min.js',
        'node_modules/angular-animate/angular-animate.min.js',
        'node_modules/angular-aria/angular-aria.min.js',
        'node_modules/angular-material/angular-material.min.js',
        'node_modules/angular-messages/angular-messages.min.js',
        'node_modules/angular-moment/angular-moment.min.js',
        'node_modules/angular-route/angular-route.min.js',
        'node_modules/moment/moment.js'
    ],
    dist: {
        root: 'build',
        css: 'build/assets/css',
        js: 'build/app/js',
        lib: 'build/app/js/lib',
        templates: 'build/app/html/templates'
    },
    doc: 'doc'
}

// cleaning
gulp.task('clean', function() {
    return del(paths.dist.root)
});

// styles
gulp.task('sass', function() {
    return gulp.src(paths.css)
        // .pipe(sass())
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest(paths.dist.css))
});

// js
gulp.task('js', function() {
    return gulp.src([paths.mainJS, paths.js])
        .pipe(concat('main.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist.js));
});

// copy node module libs to build
gulp.task('libs', function() {
    return gulp.src(paths.lib)
        .pipe(gulp.dest(paths.dist.lib));
});

// copy lib css files to build

gulp.task('libCss', function() {
    return gulp.src(paths.libCss)
        .pipe(gulp.dest(paths.dist.css));
});

// lint
gulp.task('lint', function() {
    return gulp.src([paths.mainJS, paths.js, paths.server])
        .pipe(eslint({config: 'eslint.config.json'}))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// todo
gulp.task('todo', function() {
    return gulp.src([paths.js, paths.mainJS, paths.server])
        .pipe(todo())
        .pipe(gulp.dest(paths.doc));
})

gulp.task('html', function() {
    return gulp.src(paths.mainHtml)
        .pipe(gulp.dest(paths.dist.root));
});

gulp.task('templates', function() {
    return gulp.src(paths.templates)
            .pipe(gulp.dest(paths.dist.templates));
});

gulp.task('watch', function() {
    gulp.watch(paths.scss, ['sass']);
    gulp.watch([paths.mainJS, paths.js], ['lint']);
});

gulp.task('build', ['html', 'templates', 'libs', 'libCss','js', 'sass']);

gulp.task('default', ['build', 'watch'], function () {
    console.log('gulp is done gulping.');
});
