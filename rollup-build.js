import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-js';

rollup({
		entry: 'scripts/index.js',
		plugins: [
			babel({
				exclude: 'node_modules/**',
				presets: 'es2015-rollup'
			}),
			uglify( {}, minify ) // activate when you need to uglify
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
