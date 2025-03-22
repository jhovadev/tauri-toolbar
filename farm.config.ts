import { defineConfig } from "@farmfe/core"
import farmPluginPostcss from "@farmfe/js-plugin-postcss"
import path from "node:path"

// @ts-ignore process is a nodejs global
const host = process.env.TAURI_DEV_HOST

// https://www.farmfe.org/docs/config/configuring-farm
export default defineConfig({
    plugins: ["@farmfe/plugin-react", farmPluginPostcss({})],
    compilation: {
        resolve: {
            alias: {
                "@/": path.join(process.cwd(), "src"),
            },
        },
        external: ["node:fs"],
    },
    clearScreen: false,
    server: {
        port: 1420,
        strictPort: true,
        host: host || false,
        hmr: host
            ? {
                  protocol: "ws",
                  host,
                  port: 1421,
                  watchOptions: {
                      ignored: ["**/node_modules/**"],
                  },
              }
            : undefined,
    },
})
