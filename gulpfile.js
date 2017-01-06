const gulp = require( 'gulp' ),
	sourcemaps = require( 'gulp-sourcemaps' ),
	babel = require( 'rollup-plugin-babel' ),
	uglify = require( 'gulp-uglify' ),
	rename = require( 'gulp-rename' ),
	rollup = require( 'gulp-rollup' );

gulp.task( 'rollup', () =>
{
gulp.src([
	'./scripts/form-validation-constructor.js',
])
.pipe( sourcemaps.init() )
.pipe( rollup({
	entry: './scripts/form-validation-constructor.js',
	plugins: [
		babel({
			presets: ['es2015-rollup'],
			babelrc: false
		}),
	],
	format: 'iife'
}))
.pipe( gulp.dest( 'public/' ) )
.pipe( rename( 'form-validation-constructor.min.js' ) )
.pipe( uglify().on( 'error', ( e ) =>
{
	console.log( e );
}))
.pipe( sourcemaps.write('.') )
.pipe( gulp.dest( 'public/' ) )
})

gulp.task( 'watch', () =>
	{
		gulp.watch( 'scripts/**/*.js', ['rollup'] )
	}
);

gulp.task( 'default', ['rollup'] );
