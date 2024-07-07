import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
    svgr({
      svgrOptions: {
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
        expandProps: 'end',
        svgo: true,
        svgoConfig: {
          plugins: [
            { name: 'inlineStyles', params: { onlyMatchedOnce: false } },
            'removeStyleElement',
            'removeTitle',
            'removeDesc',
            'collapseGroups',
            'cleanupIds',
            'removeEmptyContainers',
            'removeEmptyAttrs',
            'cleanupAttrs',
          ],
        },
      },
      include: /^(?!.*@material-design-icons).*\.svg(\?v=\d+\.\d+\.\d+)?$/,
    }),
    svgr({
      svgrOptions: {
        icon: true,
        svgProps: {
          fill: 'currentColor',
        },
      },
      include: /@material-design-icons.*\.svg(\?v=\d+\.\d+\.\d+)?$/,
    }),
  ],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
