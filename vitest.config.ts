import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults, coverageConfigDefaults } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**', 'src/main.ts'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        exclude: [...coverageConfigDefaults.exclude, 'src/main.ts']
      }
    }
  })
);
