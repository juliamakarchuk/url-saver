

var gulp =           require('gulp'),
    sass =           require('gulp-sass'),
    browserSync =    require('browser-sync'),
    cssnano =        require('gulp-cssnano'),
    autoprefixer =   require('gulp-autoprefixer'),
    rename =         require('gulp-rename'),
    babel =          require('gulp-babel'),
    uglify =         require('gulp-uglify'),
    html =           require('gulp-htmlmin'),
    del =            require('del')

gulp.task('script', function(){
    return gulp.src('app/js/script.js')
    .pipe(babel({
        presets: ['es2015', 'stage-2']
    }))
    .pipe(uglify())
    .pipe(rename('script-min.js'))
    .pipe(gulp.dest('app/js'))
});

gulp.task('sass', function(){
    return gulp.src('app/sass/main.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        browsers:['last 5 versions'],
    }))
    .pipe(cssnano())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
        stream:true
    }))
});

gulp.task('browser-sync', function(){
    browserSync({
        server:{
            baseDir:'app'
        },
        notify:false
    });
});
gulp.task('html',function(){
   return gulp.src('app/*.html')
   .pipe(gulp.dest('app'))
});

gulp.task('img',function(){
     return gulp.src('app/img/**/*.png')
     .pipe(gulp.dest('dist/img'))
});

gulp.task('clean', function(){
    return del.sync('dist');
})

gulp.task('watch',['browser-sync','sass','script','html'], function(){
    gulp.watch('app/sass/main.scss',[`sass`]);
    gulp.watch('app/*.html',browserSync.reload);
    gulp.watch('app/**/*.js',['script'])
});

gulp.task('build',['clean','sass','script','html','img'], function(){
    let buildCss=gulp.src('app/css/main.css')
    .pipe(gulp.dest('dist/css'));

    let buildHTML=gulp.src('app/index.html')
    .pipe(gulp.dest('dist'));

    let buildJS=gulp.src('app/js/script-min.js')
    .pipe(gulp.dest('dist/js'))
});

