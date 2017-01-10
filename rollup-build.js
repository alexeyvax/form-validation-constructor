import { rollup } from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-js';

rollup({
		entry: 'scripts/index.js',
		plugins: [
			nodeResolve({
				module: true,
				jsnext: true,
				main: true,
				skip: [ 'some-big-dependency' ],
				browser: true,
				extensions: [ '.js', '.json' ],
				preferBuiltins: false
			}),
			babel({
				exclude: 'node_modules/**',
				presets: 'es2015-rollup'
			}),
			/*uglify( {}, minify )*/ // activate when you need to uglify
		]
	}).then( ( bundle ) =>
	{
		return bundle.write({
			format: 'iife',
			dest: 'public/index.js',
			moduleName: 'formValidationConstructor'
		});
	}).then( () =>
	{
		console.log( 'Сборка окончена' );
	}
);
