var gulp = require('gulp');
var args = require('yargs').argv
var config = require('./gulp.config')()
var $ = require('gulp-load-plugins')({ lazy: true })
var eslint  = require('gulp-eslint')
var fs = require('fs')
var browserSync = require('browser-sync')
//var sass = require('gulp-sass');
//var cleanCss = require('gulp-clean-css');
//var rename = require('gulp-rename');
//
//var paths = {
//sass: ['./scss/**/*.scss']
//};

/**
 * vet the code and create coverage report
 * @return {Stream}
 */
gulp.task('vet', function() {
    // ESLint ignores files with "node_modules" paths. 
    // So, it's best to have gulp ignore the directory as well. 
    // Also, Be sure to return the stream from the task; 
    // Otherwise, the task may end before the stream has finished. 
    return gulp.src(config.alljs)
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

  var dest = config.client + 'app/pages/' + moduleName
  var destofjs = 'www/js/' + moduleName
  var destofhtml = 'www/html/' + moduleName 
  var dest1 = 'www/controllers/' + moduleName
  if (fs.existsSync(dest)) {
    console.log('dir ' + dest + ' exists!')
    return
  }

  var entryJs = config.client + 'app.module.js'
  tip(entryJs)
  gulp.src(entryJs)
    .pipe($.replace("'app.layout'", "'app." + moduleName + "',\n    'app.layout'"))
    .pipe(gulp.dest(config.client + ''))

    
  tip(entryJs + ' changed')
  tip(dest + ' added')

  return gulp.src('www/tpl/*')
    // .pipe(replace(/bower_components+.+(\/[a-z0-9][^/]*\.[a-z0-9]+(\'|\"))/ig, 'js/libs$1'))
    .pipe($.replace(/template/g, moduleName))
    .pipe($.replace(/template/g, ucfirst(moduleName)))
    .pipe($.rename(function(path) {
      path.basename = path.basename.replace('template', moduleName)
      tip(dest + '/' + path.basename + path.extname + ' added')
    }))
    .pipe(gulp.dest(dest1))
})

function tip(msg) {
  colorLog('yellow', msg)
}

function colorLog(color, msg) {
  $.util.log($.util.colors[color](msg))
}