import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-css-only';
import terser from '@rollup/plugin-terser';
import serve from 'rollup-plugin-serve';

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
      compilerOptions: {
        dev: !production, // Use compilerOptions para configurar el modo de desarrollo
      },
      emitCss: true, // Asegura que el CSS sea emitido por el plugin svelte
    }),
    css({
      output: 'public/build/bundle.css' // Genera un archivo CSS separado
    }),
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    !production && serve({
      open: true,
      contentBase: 'public',
      port: 3000
    }),
    production && terser()
  ]
};
