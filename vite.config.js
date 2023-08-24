import { resolve } from "path";
import { defineConfig } from "vite";
// Slightly modified from https://github.com/alexlafroscia/vite-plugin-handlebars
import handlebars from "@glitchdotcom/vite-plugin-handlebars";
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  return {
    plugins: [
      handlebars({
        partialDirectory: resolve(__dirname, "layout"),
        settingsFile: 'settings.json',
        helpers: {
          hostasclass: value => new URL(value).hostname.replace(/\./g, "_")
        },
        reloadOnPartialChange: true,
      }),
      basicSsl()
    ],
    build: {
      cssCodeSplit: false,
      outDir: "build"
    },
    optimizeDeps: {
      exclude: ['./settings.json']
    },
    server: {
      host:"0.0.0.0",
      port:3000,
      https: false,
      strictPort: true,
      hmr: {
        clientPort: 443
      }
    }
  };
});
