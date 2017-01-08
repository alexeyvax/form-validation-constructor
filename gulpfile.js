const gulp = require( 'gulp' ),
	sourcemaps = require( 'gulp-sourcemaps' ),
	rollup = require( 'gulp-rollup' ),
	rename = require( 'gulp-rename' ),
	uglify = require( 'gulp-uglify' ),
	babel = require( 'rollup-plugin-babel' ),
	nodeResolve = require( 'rollup-plugin-node-resolve' );

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
			nodeResolve({
				// use "module" field for ES6 module if possible
				module: true, // Default: true

				// use "jsnext:main" if possible
				// – see https://github.com/rollup/rollup/wiki/jsnext:main
				jsnext: true,  // Default: false

				// use "main" field or index.js, even if it's not an ES6 module
				// (needs to be converted from CommonJS to ES6
				// – see https://github.com/rollup/rollup-plugin-commonjs
				main: true,  // Default: true

				// if there's something your bundle requires that you DON'T
				// want to include, add it to 'skip'. Local and relative imports
				// can be skipped by giving the full filepath. E.g., 
				// `path.resolve('src/relative-dependency.js')`
				skip: [ 'some-big-dependency' ],  // Default: []

				// some package.json files have a `browser` field which
				// specifies alternative files to load for people bundling
				// for the browser. If that's you, use this option, otherwise
				// pkg.browser will be ignored
				browser: true,  // Default: false

				// not all files you want to resolve are .js files
				extensions: [ '.js', '.json' ],  // Default: ['.js']

				// whether to prefer built-in modules (e.g. `fs`, `path`) or
				// local ones with the same names
				preferBuiltins: false  // Default: true

			})
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
