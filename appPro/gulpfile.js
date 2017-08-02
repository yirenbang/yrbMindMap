var gulp = require('gulp');
var args = require('yargs').argv
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var $ = require('gulp-load-plugins')({ lazy: true })
var eslint  = require('gulp-eslint')
var fs = require('fs')
var inject = require('gulp-inject')

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(cleanCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
});




function tip(msg) {
  colorLog('yellow', msg)
}

function colorLog(color, msg) {
  $.util.log($.util.colors[color](msg))
}

/**
 * vet the code and create coverage report
 * @return {Stream}
 */
gulp.task('vet', function() {
    // ESLint ignores files with "node_modules" paths. 
    // So, it's best to have gulp ignore the directory as well. 
    // Also, Be sure to return the stream from the task; 
    // Otherwise, the task may end before the stream has finished. 
    return gulp.src('')
        // eslint() attaches the lint output to the "eslint" property 
        // of the file object so it can be used by other modules. 
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console. 
        // Alternatively use eslint.formatEach() (see Docs). 
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on 
        // lint error, return the stream and pipe to failAfterError last. 
//      .pipe(eslint.failAfterError());
});

gulp.task('test', function() {
  
})

function resetIndex() {
  var routerJs = 'www/index.html'
  tip(routerJs)
  return gulp.src(routerJs)
    .pipe($.replace("/www/", ""))
    .pipe(gulp.dest('www/'))
}
function genEndBack() {
  var indexPath = 'www/index.html'
  var target = gulp.src(indexPath)
  var source = gulp.src(['www/pages/*/*.js'])
  target.pipe(inject(source))
  .pipe(gulp.dest('www'))
  .on('end', resetIndex)
  
  
}
gulp.task('gen', function() {
  var moduleName = args.m || args.module
  console.log('==============' + moduleName)
  if (!moduleName) {
    error('use gulp gen -m/--module modulename')
    return
  }
  var ucfirst = function(str) {
    return str[0].toUpperCase() + str.substr(1)
  }

  var dest = 'app/pages/' + moduleName
  var dest1 = 'www/pages/' + moduleName
  
  
  if (fs.existsSync(dest1)) {
    console.log('dir ' + dest + ' exists!')
    return
  }

  var entryJs = 'app.module.js'
  var routerJs = 'www/js/route.js'
  tip(entryJs)
  gulp.src(entryJs)
    .pipe($.replace("'app.layout'", "'app." + moduleName + "',\n    'app.layout'"))
    .pipe(gulp.dest(''))
  gulp.src(routerJs)
    .pipe($.replace("//add router"), "  new rotue \n  //add router")
    .pipe(gulp.dest(''))
  tip(entryJs + ' changed')
  tip(dest + ' added')
  
  return gulp.src('www/tpl/*')
    // .pipe(replace(/bower_components+.+(\/[a-z0-9][^/]*\.[a-z0-9]+(\'|\"))/ig, 'js/libs$1'))
    .pipe($.replace(/tpl/g, moduleName))
    .pipe($.replace(/tpl/g, ucfirst(moduleName)))
    .pipe($.rename(function(path) {
      path.basename = path.basename.replace('template', moduleName)
      tip(dest + '/' + path.basename + path.extname + ' added')
    }))
    .pipe(gulp.dest(dest1))
    .on('end', genEndBack)
})

