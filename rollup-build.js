import { rollup } from 'rollup';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-js';

rollup({
		entry: 'scripts/index.js',
		plugins: [
			commonjs({
				include: 'node_modules/**'
			}),
			babel({
				// exclude: 'node_modules/**',
				presets: 'es2015-rollup'
			}),
			uglify( {}, minify ) // activate when you need to uglify
			/*uglify( {}, minify )*/ // activate when you need to uglify
		]
	}).then( ( bundle ) =>
	{
		return bundle.write({
			format: 'cjs',
			dest: 'public/index.js',
			moduleName: 'formValidationConstructor'
		});
	}).then( () =>
	{
		console.log( 'Сборка окончена' );
	}
);
