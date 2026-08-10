import { defineConfig } from 'astro/config';
import rehypeMark from './src/plugins/rehype-mark';

export default defineConfig({
  site: 'https://cynthia-213.github.io',
  base: '/blogs',
  output: 'static',
  markdown: {
    rehypePlugins: [rehypeMark]
  }
});
