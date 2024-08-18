import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-css-only';
import terser from '@rollup/plugin-terser';
import serve from 'rollup-plugin-serve'; // Importa el plugin serve

const production = !process.env.ROLLUP_WATCH;
export default {
  input: 'src/main.js',
  output: {
    file: 'public/build/bundle.js',
    format: 'iife',
    name: 'app'
  },
  plugins: [
    svelte({
      dev: !production,
      css: css => {
        css.write('public/build/bundle.css');
      }
    }),
    resolve(),
    commonjs(),
    css({ 
      output: 'public/build/styles.css'
    }),
    !production && serve({
      open: true, // Abre el navegador automáticamente
      contentBase: 'public',
      port: 3000 // Configura el puerto 
    }),
    production && terser()
  ]
};
