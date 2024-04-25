import { defineConfig, loadEnv } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig((configEnv) => {
  const env = loadEnv(configEnv.mode, process.cwd(), '');

  /** @type {import('vite').UserConfig} */
  return ({
    base: env.BASE_URL, // default '/',
    plugins: [
      basicSsl(),
    ],
  });
});
