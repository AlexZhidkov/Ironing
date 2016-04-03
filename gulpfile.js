const gulp = require('gulp');
//const gutil = require('gulp-util');
const del = require('del');
const karma = require('karma');
const tslint = require('gulp-tslint');
const pkg = require('./package.json');
var common = require('./common.js');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

/*
 * Auto load all gulp plugins
 */
var gulpLoadPlugins = require("gulp-load-plugins");
var plug = gulpLoadPlugins();

/*
 * Load common utilities for gulp
 */
var gutil = plug.loadUtils(['colors', 'env', 'log', 'date']);

/*
 * Create comments for minified files
 */
var commentHeader = common.createComments(gutil);

/*
 * Could use a product/development switch.
 * Run `gulp --production`
 */
var type = gutil.env.production ? 'production' : 'development';
gutil.log( 'Building for', gutil.colors.magenta(type) );

//=========================================================
//  PATHS
//---------------------------------------------------------
const paths = {
    src: {
        ts: 'src/**/*.ts'
    },

    target: 'target'
};

//=========================================================
//  CONFIG
//---------------------------------------------------------
const config = {
    browserSync: {
        files: [paths.target + '/**/*'],
        notify: false,
        open: false,
        port: 3000,
        reloadDelay: 500,
        server: {
            baseDir: paths.target
        }
    },

    karma: {
        configFile: __dirname + '/karma.conf.js'
    },

    tslint: {
        report: {
            options: { emitError: true },
            type: 'verbose'
        }
    },

};

//=========================================================
//  TASKS
//---------------------------------------------------------
gulp.task('clean.target', () => del(paths.target));


gulp.task('lint', () => {
    return gulp.src(paths.src.ts)
        .pipe(tslint())
        .pipe(tslint.report("verbose")
        )
});

gulp.task('app-scripts', done => {
    var tsProject = $.typescript.CreateProject('tsconfig.json');
    var stream = gulp
        .src('src/**/*.ts')
        .pipe($.typescript(tsProject))
        .pipe($.ngAnnotate({add: true, single_quotes: true}))
});

gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(gulp.dest(paths.target))
})

/*
 * Minify and bundle the JavaScript
 */
gulp.task('bundlejs', ['lint'], function () {
    var bundlefile = pkg.name + ".min.js";
    var opt = {newLine: ';'};

    return gulp.src('app/**/*.js')
        .pipe(plug.size({showFiles: true}))
        .pipe(plug.uglify())
        .pipe(plug.concat(bundlefile, opt))
        .pipe(plug.header(commentHeader))
        .pipe(gulp.dest(paths.target))
        .pipe(plug.size({showFiles: true}));
});

/*
 * Minify and bundle the CSS
 */
gulp.task('bundlecss', function () {
    return gulp.src('app/app.css')
        .pipe(plug.size({showFiles: true}))
        .pipe(plug.minifyCss({}))
        .pipe(plug.concat(pkg.name + ".min.css"))
        .pipe(plug.header(commentHeader))
        .pipe(gulp.dest(paths.target))
        .pipe(plug.size({showFiles: true}));
});

 
gulp.task('ts', function() {
	var tsResult = tsProject.src()  
		.pipe(ts(tsProject));
	
	return tsResult.js.pipe(gulp.dest('release'));
});

gulp.task('default', function () {
	return gulp.src('app/**/*.ts')
		.pipe(ts({
			noImplicitAny: true,
			out: 'output.js'
		}))
		.pipe(gulp.dest('target'));
});

//===========================
//  BUILD
//---------------------------
//gulp.task('build', gulp.series(
//    'clean.target',
//    'ts',
//    'images'
//));


//===========================
//  DEVELOP
//---------------------------
//gulp.task('default', gulp.task('serve.dev'));

