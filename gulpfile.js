const gulp = require( 'gulp' ),
	sourcemaps = require( 'gulp-sourcemaps' ),
	rollup = require( 'gulp-rollup' ),
	rename = require( 'gulp-rename' ),
	uglify = require( 'gulp-uglify' ),
	babel = require( 'rollup-plugin-babel' );

gulp.task( 'rollup', () =>
{
	gulp.src([
		'./scripts/index.js',
	])
	.pipe( sourcemaps.init() )
	.pipe( rollup({
		allowRealFiles: true,
		entry: './scripts/index.js',
		plugins: [
			babel({
				presets: ['es2015-rollup'],
				babelrc: false
			}),
		],
		format: 'iife',
		moduleName: 'formValidationConstructor'
	}))
	.pipe( gulp.dest( 'public/' ) )
	.pipe( rename( 'index.min.js' ) )
	.pipe( uglify().on( 'error', ( e ) =>
	{
		console.log( e );
	}))
	.pipe( sourcemaps.write('.') )
	.pipe( gulp.dest( 'public/' ) );
});

gulp.task( 'watch', () =>
	{
		gulp.watch( 'scripts/**/*.js', ['rollup'] )
	}
);

gulp.task( 'default', ['rollup'] );
