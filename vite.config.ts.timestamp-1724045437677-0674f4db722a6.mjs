// vite.config.ts
import process3 from "node:process";
import { URL, fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "file:///C:/data/www/soybean-admin-main/node_modules/.pnpm/vite@5.4.0_@types+node@22.2.0_sass@1.77.8/node_modules/vite/dist/node/index.js";

// build/plugins/index.ts
import vue from "file:///C:/data/www/soybean-admin-main/node_modules/.pnpm/@vitejs+plugin-vue@5.1.2_vite@5.4.0_@types+node@22.2.0_sass@1.77.8__vue@3.4.37_typescript@5.5.4_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///C:/data/www/soybean-admin-main/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.0.0_vite@5.4.0_@types+node@22.2.0_sass@1.77.8__vue@3.4.37_typescript@5.5.4_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import VueDevtools from "file:///C:/data/www/soybean-admin-main/node_modules/.pnpm/vite-plugin-vue-devtools@7.3.8_rollup@4.20.0_vite@5.4.0_@types+node@22.2.0_sass@1.77.8__vue@3.4.37_typescript@5.5.4_/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import progress from "file:///C:/data/www/soybean-admin-main/node_modules/.pnpm/vite-plugin-progress@0.0.7_vite@5.4.0_@types+node@22.2.0_sass@1.77.8_/node_modules/vite-plugin-progress/dist/index.mjs";

// build/plugins/router.ts
import ElegantVueRouter from "file:///C:/data/www/soybean-admin-main/node_modules/.pnpm/@elegant-router+vue@0.3.8/node_modules/@elegant-router/vue/dist/vite.mjs";
function setupElegantRouter() {
  return ElegantVueRouter({
    layouts: {
      base: "src/layouts/base-layout/index.vue",
      blank: "src/layouts/blank-layout/index.vue"
    },
    routePathTransformer(routeName, routePath) {
      const key = routeName;
      if (key === "login") {
        const modules = ["pwd-login", "code-login", "register", "reset-pwd", "bind-wechat"];
        const moduleReg = modules.join("|");
        return `/login/:module(${moduleReg})?`;
      }
      return routePath;
    },
    onRouteMetaGen(routeName) {
      const key = routeName;
      const constantRoutes = ["login", "403", "404", "500"];
      const meta = {
        title: key,
        i18nKey: `route.${key}`
      };
      if (constantRoutes.includes(key)) {
        meta.constant = true;
      }
      return meta;
    }
  });
}

// build/plugins/unocss.ts
import process from "node:process";
import path from "node:path";
import unocss from "file:///C:/data/www/soybean-admin-main/node_modules/.pnpm/@unocss+vite@0.62.1_rollup@4.20.0_vite@5.4.0_@types+node@22.2.0_sass@1.77.8_/node_modules/@unocss/vite/dist/index.mjs";
import presetIcons from "file:///C:/data/www/soybean-admin-main/node_modules/.pnpm/@unocss+preset-icons@0.62.1/node_modules/@unocss/preset-icons/dist/index.mjs";
import { FileSystemIconLoader } from "file:///C:/data/www/soybean-admin-main/node_modules/.pnpm/@iconify+utils@2.1.30/node_modules/@iconify/utils/lib/loader/node-loaders.mjs";
function setupUnocss(viteEnv) {
  const { VITE_ICON_PREFIX, VITE_ICON_LOCAL_PREFIX } = viteEnv;
  const localIconPath = path.join(process.cwd(), "src/assets/svg-icon");
  const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${VITE_ICON_PREFIX}-`, "");
  return unocss({
    presets: [
      presetIcons({
        prefix: `${VITE_ICON_PREFIX}-`,
        scale: 1,
        extraProperties: {
          display: "inline-block"
        },
        collections: {
          [collectionName]: FileSystemIconLoader(
            localIconPath,
            (svg) => svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')
          )
        },
        warn: true
      })
    ]
  });
}

// build/plugins/unplugin.ts
import process2 from "node:process";
import path2 from "node:path";
import Icons from "file:///C:/data/www/soybean-admin-main/node_modules/.pnpm/unplugin-icons@0.19.2_@vue+compiler-sfc@3.4.37/node_modules/unplugin-icons/dist/vite.js";
import IconsResolver from "file:///C:/data/www/soybean-admin-main/node_modules/.pnpm/unplugin-icons@0.19.2_@vue+compiler-sfc@3.4.37/node_modules/unplugin-icons/dist/resolver.js";
import Components from "file:///C:/data/www/soybean-admin-main/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.25.3_rollup@4.20.0_vue@3.4.37_typescript@5.5.4_/node_modules/unplugin-vue-components/dist/vite.js";
import { AntDesignVueResolver, NaiveUiResolver } from "file:///C:/data/www/soybean-admin-main/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.25.3_rollup@4.20.0_vue@3.4.37_typescript@5.5.4_/node_modules/unplugin-vue-components/dist/resolvers.js";
import { FileSystemIconLoader as FileSystemIconLoader2 } from "file:///C:/data/www/soybean-admin-main/node_modules/.pnpm/unplugin-icons@0.19.2_@vue+compiler-sfc@3.4.37/node_modules/unplugin-icons/dist/loaders.js";
import { createSvgIconsPlugin } from "file:///C:/data/www/soybean-admin-main/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.4.0_@types+node@22.2.0_sass@1.77.8_/node_modules/vite-plugin-svg-icons/dist/index.mjs";
function setupUnplugin(viteEnv) {
  const { VITE_ICON_PREFIX, VITE_ICON_LOCAL_PREFIX } = viteEnv;
  const localIconPath = path2.join(process2.cwd(), "src/assets/svg-icon");
  const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${VITE_ICON_PREFIX}-`, "");
  const plugins = [
    Icons({
      compiler: "vue3",
      customCollections: {
        [collectionName]: FileSystemIconLoader2(
          localIconPath,
          (svg) => svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')
        )
      },
      scale: 1,
      defaultClass: "inline-block"
    }),
    Components({
      dts: "src/typings/components.d.ts",
      types: [{ from: "vue-router", names: ["RouterLink", "RouterView"] }],
      resolvers: [
        AntDesignVueResolver({
          importStyle: false
        }),
        NaiveUiResolver(),
        IconsResolver({ customCollections: [collectionName], componentPrefix: VITE_ICON_PREFIX })
      ]
    }),
    createSvgIconsPlugin({
      iconDirs: [localIconPath],
      symbolId: `${VITE_ICON_LOCAL_PREFIX}-[dir]-[name]`,
      inject: "body-last",
      customDomId: "__SVG_ICON_LOCAL__"
    })
  ];
  return plugins;
}

// build/plugins/html.ts
function setupHtmlPlugin(buildTime) {
  const plugin = {
    name: "html-plugin",
    apply: "build",
    transformIndexHtml(html) {
      return html.replace("<head>", `<head>
    <meta name="buildTime" content="${buildTime}">`);
    }
  };
  return plugin;
}

// build/plugins/index.ts
function setupVitePlugins(viteEnv, buildTime) {
  const plugins = [
    vue({
      script: {
        defineModel: true
      }
    }),
    vueJsx(),
    VueDevtools(),
    setupElegantRouter(),
    setupUnocss(viteEnv),
    ...setupUnplugin(viteEnv),
    progress(),
    setupHtmlPlugin(buildTime)
  ];
  return plugins;
}

// src/utils/service.ts
import json5 from "file:///C:/data/www/soybean-admin-main/node_modules/.pnpm/json5@2.2.3/node_modules/json5/lib/index.js";
function createServiceConfig(env) {
  const { VITE_SERVICE_BASE_URL, VITE_OTHER_SERVICE_BASE_URL } = env;
  let other = {};
  try {
    other = json5.parse(VITE_OTHER_SERVICE_BASE_URL);
  } catch (error) {
    console.error("VITE_OTHER_SERVICE_BASE_URL is not a valid json5 string");
  }
  const httpConfig = {
    baseURL: VITE_SERVICE_BASE_URL,
    other
  };
  const otherHttpKeys = Object.keys(httpConfig.other);
  const otherConfig = otherHttpKeys.map((key) => {
    return {
      key,
      baseURL: httpConfig.other[key],
      proxyPattern: createProxyPattern(key)
    };
  });
  const config = {
    baseURL: httpConfig.baseURL,
    proxyPattern: createProxyPattern(),
    other: otherConfig
  };
  return config;
}
function createProxyPattern(key) {
  if (!key) {
    return "/proxy-default";
  }
  return `/proxy-${key}`;
}

// build/config/proxy.ts
function createViteProxy(env, enable) {
  const isEnableHttpProxy = enable && env.VITE_HTTP_PROXY === "Y";
  if (!isEnableHttpProxy) return void 0;
  const { baseURL, proxyPattern, other } = createServiceConfig(env);
  const proxy = createProxyItem({ baseURL, proxyPattern });
  other.forEach((item) => {
    Object.assign(proxy, createProxyItem(item));
  });
  return proxy;
}
function createProxyItem(item) {
  const proxy = {};
  proxy[item.proxyPattern] = {
    target: item.baseURL,
    changeOrigin: true,
    rewrite: (path3) => path3.replace(new RegExp(`^${item.proxyPattern}`), "")
  };
  return proxy;
}

// build/config/time.ts
import dayjs from "file:///C:/data/www/soybean-admin-main/node_modules/.pnpm/dayjs@1.11.12/node_modules/dayjs/dayjs.min.js";
import utc from "file:///C:/data/www/soybean-admin-main/node_modules/.pnpm/dayjs@1.11.12/node_modules/dayjs/plugin/utc.js";
import timezone from "file:///C:/data/www/soybean-admin-main/node_modules/.pnpm/dayjs@1.11.12/node_modules/dayjs/plugin/timezone.js";
function getBuildTime() {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const buildTime = dayjs.tz(Date.now(), "Asia/Shanghai").format("YYYY-MM-DD HH:mm:ss");
  return buildTime;
}

// vite.config.ts
var __vite_injected_original_import_meta_url = "file:///C:/data/www/soybean-admin-main/vite.config.ts";
var vite_config_default = defineConfig((configEnv) => {
  const viteEnv = loadEnv(configEnv.mode, process3.cwd());
  const buildTime = getBuildTime();
  const enableProxy = configEnv.command === "serve" && !configEnv.isPreview;
  return {
    base: viteEnv.VITE_BASE_URL,
    resolve: {
      alias: {
        "~": fileURLToPath(new URL("./", __vite_injected_original_import_meta_url)),
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/styles/scss/global.scss" as *;`
        }
      }
    },
    plugins: setupVitePlugins(viteEnv, buildTime),
    define: {
      BUILD_TIME: JSON.stringify(buildTime)
    },
    server: {
      host: "0.0.0.0",
      port: 9527,
      open: true,
      proxy: createViteProxy(viteEnv, enableProxy),
      fs: {
        cachedChecks: false
      }
    },
    preview: {
      port: 9725
    },
    build: {
      reportCompressedSize: false,
      sourcemap: viteEnv.VITE_SOURCE_MAP === "Y",
      commonjsOptions: {
        ignoreTryCatch: false
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvcGx1Z2lucy9pbmRleC50cyIsICJidWlsZC9wbHVnaW5zL3JvdXRlci50cyIsICJidWlsZC9wbHVnaW5zL3Vub2Nzcy50cyIsICJidWlsZC9wbHVnaW5zL3VucGx1Z2luLnRzIiwgImJ1aWxkL3BsdWdpbnMvaHRtbC50cyIsICJzcmMvdXRpbHMvc2VydmljZS50cyIsICJidWlsZC9jb25maWcvcHJveHkudHMiLCAiYnVpbGQvY29uZmlnL3RpbWUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxkYXRhXFxcXHd3d1xcXFxzb3liZWFuLWFkbWluLW1haW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXGRhdGFcXFxcd3d3XFxcXHNveWJlYW4tYWRtaW4tbWFpblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovZGF0YS93d3cvc295YmVhbi1hZG1pbi1tYWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHByb2Nlc3MgZnJvbSAnbm9kZTpwcm9jZXNzJztcbmltcG9ydCB7IFVSTCwgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHsgc2V0dXBWaXRlUGx1Z2lucyB9IGZyb20gJy4vYnVpbGQvcGx1Z2lucyc7XG5pbXBvcnQgeyBjcmVhdGVWaXRlUHJveHksIGdldEJ1aWxkVGltZSB9IGZyb20gJy4vYnVpbGQvY29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKGNvbmZpZ0VudiA9PiB7XG4gIGNvbnN0IHZpdGVFbnYgPSBsb2FkRW52KGNvbmZpZ0Vudi5tb2RlLCBwcm9jZXNzLmN3ZCgpKSBhcyB1bmtub3duIGFzIEVudi5JbXBvcnRNZXRhO1xuXG4gIGNvbnN0IGJ1aWxkVGltZSA9IGdldEJ1aWxkVGltZSgpO1xuXG4gIGNvbnN0IGVuYWJsZVByb3h5ID0gY29uZmlnRW52LmNvbW1hbmQgPT09ICdzZXJ2ZScgJiYgIWNvbmZpZ0Vudi5pc1ByZXZpZXc7XG5cbiAgcmV0dXJuIHtcbiAgICBiYXNlOiB2aXRlRW52LlZJVEVfQkFTRV9VUkwsXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ34nOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgICB9XG4gICAgfSxcbiAgICBjc3M6IHtcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgICAgc2Nzczoge1xuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgQHVzZSBcIi4vc3JjL3N0eWxlcy9zY3NzL2dsb2JhbC5zY3NzXCIgYXMgKjtgXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHBsdWdpbnM6IHNldHVwVml0ZVBsdWdpbnModml0ZUVudiwgYnVpbGRUaW1lKSxcbiAgICBkZWZpbmU6IHtcbiAgICAgIEJVSUxEX1RJTUU6IEpTT04uc3RyaW5naWZ5KGJ1aWxkVGltZSlcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgaG9zdDogJzAuMC4wLjAnLFxuICAgICAgcG9ydDogOTUyNyxcbiAgICAgIG9wZW46IHRydWUsXG4gICAgICBwcm94eTogY3JlYXRlVml0ZVByb3h5KHZpdGVFbnYsIGVuYWJsZVByb3h5KSxcbiAgICAgIGZzOiB7XG4gICAgICAgIGNhY2hlZENoZWNrczogZmFsc2VcbiAgICAgIH1cbiAgICB9LFxuICAgIHByZXZpZXc6IHtcbiAgICAgIHBvcnQ6IDk3MjVcbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogZmFsc2UsXG4gICAgICBzb3VyY2VtYXA6IHZpdGVFbnYuVklURV9TT1VSQ0VfTUFQID09PSAnWScsXG4gICAgICBjb21tb25qc09wdGlvbnM6IHtcbiAgICAgICAgaWdub3JlVHJ5Q2F0Y2g6IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICB9O1xufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXGRhdGFcXFxcd3d3XFxcXHNveWJlYW4tYWRtaW4tbWFpblxcXFxidWlsZFxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxkYXRhXFxcXHd3d1xcXFxzb3liZWFuLWFkbWluLW1haW5cXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxpbmRleC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovZGF0YS93d3cvc295YmVhbi1hZG1pbi1tYWluL2J1aWxkL3BsdWdpbnMvaW5kZXgudHNcIjtpbXBvcnQgdHlwZSB7IFBsdWdpbk9wdGlvbiB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4JztcbmltcG9ydCBWdWVEZXZ0b29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnO1xuaW1wb3J0IHByb2dyZXNzIGZyb20gJ3ZpdGUtcGx1Z2luLXByb2dyZXNzJztcbmltcG9ydCB7IHNldHVwRWxlZ2FudFJvdXRlciB9IGZyb20gJy4vcm91dGVyJztcbmltcG9ydCB7IHNldHVwVW5vY3NzIH0gZnJvbSAnLi91bm9jc3MnO1xuaW1wb3J0IHsgc2V0dXBVbnBsdWdpbiB9IGZyb20gJy4vdW5wbHVnaW4nO1xuaW1wb3J0IHsgc2V0dXBIdG1sUGx1Z2luIH0gZnJvbSAnLi9odG1sJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwVml0ZVBsdWdpbnModml0ZUVudjogRW52LkltcG9ydE1ldGEsIGJ1aWxkVGltZTogc3RyaW5nKSB7XG4gIGNvbnN0IHBsdWdpbnM6IFBsdWdpbk9wdGlvbiA9IFtcbiAgICB2dWUoe1xuICAgICAgc2NyaXB0OiB7XG4gICAgICAgIGRlZmluZU1vZGVsOiB0cnVlXG4gICAgICB9XG4gICAgfSksXG4gICAgdnVlSnN4KCksXG4gICAgVnVlRGV2dG9vbHMoKSxcbiAgICBzZXR1cEVsZWdhbnRSb3V0ZXIoKSxcbiAgICBzZXR1cFVub2Nzcyh2aXRlRW52KSxcbiAgICAuLi5zZXR1cFVucGx1Z2luKHZpdGVFbnYpLFxuICAgIHByb2dyZXNzKCksXG4gICAgc2V0dXBIdG1sUGx1Z2luKGJ1aWxkVGltZSlcbiAgXTtcblxuICByZXR1cm4gcGx1Z2lucztcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcZGF0YVxcXFx3d3dcXFxcc295YmVhbi1hZG1pbi1tYWluXFxcXGJ1aWxkXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXGRhdGFcXFxcd3d3XFxcXHNveWJlYW4tYWRtaW4tbWFpblxcXFxidWlsZFxcXFxwbHVnaW5zXFxcXHJvdXRlci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovZGF0YS93d3cvc295YmVhbi1hZG1pbi1tYWluL2J1aWxkL3BsdWdpbnMvcm91dGVyLnRzXCI7aW1wb3J0IHR5cGUgeyBSb3V0ZU1ldGEgfSBmcm9tICd2dWUtcm91dGVyJztcbmltcG9ydCBFbGVnYW50VnVlUm91dGVyIGZyb20gJ0BlbGVnYW50LXJvdXRlci92dWUvdml0ZSc7XG5pbXBvcnQgdHlwZSB7IFJvdXRlS2V5IH0gZnJvbSAnQGVsZWdhbnQtcm91dGVyL3R5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwRWxlZ2FudFJvdXRlcigpIHtcbiAgcmV0dXJuIEVsZWdhbnRWdWVSb3V0ZXIoe1xuICAgIGxheW91dHM6IHtcbiAgICAgIGJhc2U6ICdzcmMvbGF5b3V0cy9iYXNlLWxheW91dC9pbmRleC52dWUnLFxuICAgICAgYmxhbms6ICdzcmMvbGF5b3V0cy9ibGFuay1sYXlvdXQvaW5kZXgudnVlJ1xuICAgIH0sXG4gICAgcm91dGVQYXRoVHJhbnNmb3JtZXIocm91dGVOYW1lLCByb3V0ZVBhdGgpIHtcbiAgICAgIGNvbnN0IGtleSA9IHJvdXRlTmFtZSBhcyBSb3V0ZUtleTtcblxuICAgICAgaWYgKGtleSA9PT0gJ2xvZ2luJykge1xuICAgICAgICBjb25zdCBtb2R1bGVzOiBVbmlvbktleS5Mb2dpbk1vZHVsZVtdID0gWydwd2QtbG9naW4nLCAnY29kZS1sb2dpbicsICdyZWdpc3RlcicsICdyZXNldC1wd2QnLCAnYmluZC13ZWNoYXQnXTtcblxuICAgICAgICBjb25zdCBtb2R1bGVSZWcgPSBtb2R1bGVzLmpvaW4oJ3wnKTtcblxuICAgICAgICByZXR1cm4gYC9sb2dpbi86bW9kdWxlKCR7bW9kdWxlUmVnfSk/YDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJvdXRlUGF0aDtcbiAgICB9LFxuICAgIG9uUm91dGVNZXRhR2VuKHJvdXRlTmFtZSkge1xuICAgICAgY29uc3Qga2V5ID0gcm91dGVOYW1lIGFzIFJvdXRlS2V5O1xuXG4gICAgICBjb25zdCBjb25zdGFudFJvdXRlczogUm91dGVLZXlbXSA9IFsnbG9naW4nLCAnNDAzJywgJzQwNCcsICc1MDAnXTtcblxuICAgICAgY29uc3QgbWV0YTogUGFydGlhbDxSb3V0ZU1ldGE+ID0ge1xuICAgICAgICB0aXRsZToga2V5LFxuICAgICAgICBpMThuS2V5OiBgcm91dGUuJHtrZXl9YCBhcyBBcHAuSTE4bi5JMThuS2V5XG4gICAgICB9O1xuXG4gICAgICBpZiAoY29uc3RhbnRSb3V0ZXMuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICBtZXRhLmNvbnN0YW50ID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1ldGE7XG4gICAgfVxuICB9KTtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcZGF0YVxcXFx3d3dcXFxcc295YmVhbi1hZG1pbi1tYWluXFxcXGJ1aWxkXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXGRhdGFcXFxcd3d3XFxcXHNveWJlYW4tYWRtaW4tbWFpblxcXFxidWlsZFxcXFxwbHVnaW5zXFxcXHVub2Nzcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovZGF0YS93d3cvc295YmVhbi1hZG1pbi1tYWluL2J1aWxkL3BsdWdpbnMvdW5vY3NzLnRzXCI7aW1wb3J0IHByb2Nlc3MgZnJvbSAnbm9kZTpwcm9jZXNzJztcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCc7XG5pbXBvcnQgdW5vY3NzIGZyb20gJ0B1bm9jc3Mvdml0ZSc7XG5pbXBvcnQgcHJlc2V0SWNvbnMgZnJvbSAnQHVub2Nzcy9wcmVzZXQtaWNvbnMnO1xuaW1wb3J0IHsgRmlsZVN5c3RlbUljb25Mb2FkZXIgfSBmcm9tICdAaWNvbmlmeS91dGlscy9saWIvbG9hZGVyL25vZGUtbG9hZGVycyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cFVub2Nzcyh2aXRlRW52OiBFbnYuSW1wb3J0TWV0YSkge1xuICBjb25zdCB7IFZJVEVfSUNPTl9QUkVGSVgsIFZJVEVfSUNPTl9MT0NBTF9QUkVGSVggfSA9IHZpdGVFbnY7XG5cbiAgY29uc3QgbG9jYWxJY29uUGF0aCA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnc3JjL2Fzc2V0cy9zdmctaWNvbicpO1xuXG4gIC8qKiBUaGUgbmFtZSBvZiB0aGUgbG9jYWwgaWNvbiBjb2xsZWN0aW9uICovXG4gIGNvbnN0IGNvbGxlY3Rpb25OYW1lID0gVklURV9JQ09OX0xPQ0FMX1BSRUZJWC5yZXBsYWNlKGAke1ZJVEVfSUNPTl9QUkVGSVh9LWAsICcnKTtcblxuICByZXR1cm4gdW5vY3NzKHtcbiAgICBwcmVzZXRzOiBbXG4gICAgICBwcmVzZXRJY29ucyh7XG4gICAgICAgIHByZWZpeDogYCR7VklURV9JQ09OX1BSRUZJWH0tYCxcbiAgICAgICAgc2NhbGU6IDEsXG4gICAgICAgIGV4dHJhUHJvcGVydGllczoge1xuICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXG4gICAgICAgIH0sXG4gICAgICAgIGNvbGxlY3Rpb25zOiB7XG4gICAgICAgICAgW2NvbGxlY3Rpb25OYW1lXTogRmlsZVN5c3RlbUljb25Mb2FkZXIobG9jYWxJY29uUGF0aCwgc3ZnID0+XG4gICAgICAgICAgICBzdmcucmVwbGFjZSgvXjxzdmdcXHMvLCAnPHN2ZyB3aWR0aD1cIjFlbVwiIGhlaWdodD1cIjFlbVwiICcpXG4gICAgICAgICAgKVxuICAgICAgICB9LFxuICAgICAgICB3YXJuOiB0cnVlXG4gICAgICB9KVxuICAgIF1cbiAgfSk7XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXGRhdGFcXFxcd3d3XFxcXHNveWJlYW4tYWRtaW4tbWFpblxcXFxidWlsZFxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxkYXRhXFxcXHd3d1xcXFxzb3liZWFuLWFkbWluLW1haW5cXFxcYnVpbGRcXFxccGx1Z2luc1xcXFx1bnBsdWdpbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovZGF0YS93d3cvc295YmVhbi1hZG1pbi1tYWluL2J1aWxkL3BsdWdpbnMvdW5wbHVnaW4udHNcIjtpbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnO1xuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB0eXBlIHsgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgSWNvbnMgZnJvbSAndW5wbHVnaW4taWNvbnMvdml0ZSc7XG5pbXBvcnQgSWNvbnNSZXNvbHZlciBmcm9tICd1bnBsdWdpbi1pY29ucy9yZXNvbHZlcic7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJztcbmltcG9ydCB7IEFudERlc2lnblZ1ZVJlc29sdmVyLCBOYWl2ZVVpUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnO1xuaW1wb3J0IHsgRmlsZVN5c3RlbUljb25Mb2FkZXIgfSBmcm9tICd1bnBsdWdpbi1pY29ucy9sb2FkZXJzJztcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwVW5wbHVnaW4odml0ZUVudjogRW52LkltcG9ydE1ldGEpIHtcbiAgY29uc3QgeyBWSVRFX0lDT05fUFJFRklYLCBWSVRFX0lDT05fTE9DQUxfUFJFRklYIH0gPSB2aXRlRW52O1xuXG4gIGNvbnN0IGxvY2FsSWNvblBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvc3ZnLWljb24nKTtcblxuICAvKiogVGhlIG5hbWUgb2YgdGhlIGxvY2FsIGljb24gY29sbGVjdGlvbiAqL1xuICBjb25zdCBjb2xsZWN0aW9uTmFtZSA9IFZJVEVfSUNPTl9MT0NBTF9QUkVGSVgucmVwbGFjZShgJHtWSVRFX0lDT05fUFJFRklYfS1gLCAnJyk7XG5cbiAgY29uc3QgcGx1Z2luczogUGx1Z2luT3B0aW9uW10gPSBbXG4gICAgSWNvbnMoe1xuICAgICAgY29tcGlsZXI6ICd2dWUzJyxcbiAgICAgIGN1c3RvbUNvbGxlY3Rpb25zOiB7XG4gICAgICAgIFtjb2xsZWN0aW9uTmFtZV06IEZpbGVTeXN0ZW1JY29uTG9hZGVyKGxvY2FsSWNvblBhdGgsIHN2ZyA9PlxuICAgICAgICAgIHN2Zy5yZXBsYWNlKC9ePHN2Z1xccy8sICc8c3ZnIHdpZHRoPVwiMWVtXCIgaGVpZ2h0PVwiMWVtXCIgJylcbiAgICAgICAgKVxuICAgICAgfSxcbiAgICAgIHNjYWxlOiAxLFxuICAgICAgZGVmYXVsdENsYXNzOiAnaW5saW5lLWJsb2NrJ1xuICAgIH0pLFxuICAgIENvbXBvbmVudHMoe1xuICAgICAgZHRzOiAnc3JjL3R5cGluZ3MvY29tcG9uZW50cy5kLnRzJyxcbiAgICAgIHR5cGVzOiBbeyBmcm9tOiAndnVlLXJvdXRlcicsIG5hbWVzOiBbJ1JvdXRlckxpbmsnLCAnUm91dGVyVmlldyddIH1dLFxuICAgICAgcmVzb2x2ZXJzOiBbXG4gICAgICAgIEFudERlc2lnblZ1ZVJlc29sdmVyKHtcbiAgICAgICAgICBpbXBvcnRTdHlsZTogZmFsc2VcbiAgICAgICAgfSksXG4gICAgICAgIE5haXZlVWlSZXNvbHZlcigpLFxuICAgICAgICBJY29uc1Jlc29sdmVyKHsgY3VzdG9tQ29sbGVjdGlvbnM6IFtjb2xsZWN0aW9uTmFtZV0sIGNvbXBvbmVudFByZWZpeDogVklURV9JQ09OX1BSRUZJWCB9KVxuICAgICAgXVxuICAgIH0pLFxuICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICAgIGljb25EaXJzOiBbbG9jYWxJY29uUGF0aF0sXG4gICAgICBzeW1ib2xJZDogYCR7VklURV9JQ09OX0xPQ0FMX1BSRUZJWH0tW2Rpcl0tW25hbWVdYCxcbiAgICAgIGluamVjdDogJ2JvZHktbGFzdCcsXG4gICAgICBjdXN0b21Eb21JZDogJ19fU1ZHX0lDT05fTE9DQUxfXydcbiAgICB9KVxuICBdO1xuXG4gIHJldHVybiBwbHVnaW5zO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxkYXRhXFxcXHd3d1xcXFxzb3liZWFuLWFkbWluLW1haW5cXFxcYnVpbGRcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcZGF0YVxcXFx3d3dcXFxcc295YmVhbi1hZG1pbi1tYWluXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcaHRtbC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovZGF0YS93d3cvc295YmVhbi1hZG1pbi1tYWluL2J1aWxkL3BsdWdpbnMvaHRtbC50c1wiO2ltcG9ydCB0eXBlIHsgUGx1Z2luIH0gZnJvbSAndml0ZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEh0bWxQbHVnaW4oYnVpbGRUaW1lOiBzdHJpbmcpIHtcbiAgY29uc3QgcGx1Z2luOiBQbHVnaW4gPSB7XG4gICAgbmFtZTogJ2h0bWwtcGx1Z2luJyxcbiAgICBhcHBseTogJ2J1aWxkJyxcbiAgICB0cmFuc2Zvcm1JbmRleEh0bWwoaHRtbCkge1xuICAgICAgcmV0dXJuIGh0bWwucmVwbGFjZSgnPGhlYWQ+JywgYDxoZWFkPlxcbiAgICA8bWV0YSBuYW1lPVwiYnVpbGRUaW1lXCIgY29udGVudD1cIiR7YnVpbGRUaW1lfVwiPmApO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gcGx1Z2luO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxkYXRhXFxcXHd3d1xcXFxzb3liZWFuLWFkbWluLW1haW5cXFxcc3JjXFxcXHV0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxkYXRhXFxcXHd3d1xcXFxzb3liZWFuLWFkbWluLW1haW5cXFxcc3JjXFxcXHV0aWxzXFxcXHNlcnZpY2UudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L2RhdGEvd3d3L3NveWJlYW4tYWRtaW4tbWFpbi9zcmMvdXRpbHMvc2VydmljZS50c1wiO2ltcG9ydCBqc29uNSBmcm9tICdqc29uNSc7XG5cbi8qKlxuICogQ3JlYXRlIHNlcnZpY2UgY29uZmlnIGJ5IGN1cnJlbnQgZW52XG4gKlxuICogQHBhcmFtIGVudiBUaGUgY3VycmVudCBlbnZcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlcnZpY2VDb25maWcoZW52OiBFbnYuSW1wb3J0TWV0YSkge1xuICBjb25zdCB7IFZJVEVfU0VSVklDRV9CQVNFX1VSTCwgVklURV9PVEhFUl9TRVJWSUNFX0JBU0VfVVJMIH0gPSBlbnY7XG5cbiAgbGV0IG90aGVyID0ge30gYXMgUmVjb3JkPEFwcC5TZXJ2aWNlLk90aGVyQmFzZVVSTEtleSwgc3RyaW5nPjtcbiAgdHJ5IHtcbiAgICBvdGhlciA9IGpzb241LnBhcnNlKFZJVEVfT1RIRVJfU0VSVklDRV9CQVNFX1VSTCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICBjb25zb2xlLmVycm9yKCdWSVRFX09USEVSX1NFUlZJQ0VfQkFTRV9VUkwgaXMgbm90IGEgdmFsaWQganNvbjUgc3RyaW5nJyk7XG4gIH1cblxuICBjb25zdCBodHRwQ29uZmlnOiBBcHAuU2VydmljZS5TaW1wbGVTZXJ2aWNlQ29uZmlnID0ge1xuICAgIGJhc2VVUkw6IFZJVEVfU0VSVklDRV9CQVNFX1VSTCxcbiAgICBvdGhlclxuICB9O1xuXG4gIGNvbnN0IG90aGVySHR0cEtleXMgPSBPYmplY3Qua2V5cyhodHRwQ29uZmlnLm90aGVyKSBhcyBBcHAuU2VydmljZS5PdGhlckJhc2VVUkxLZXlbXTtcblxuICBjb25zdCBvdGhlckNvbmZpZzogQXBwLlNlcnZpY2UuT3RoZXJTZXJ2aWNlQ29uZmlnSXRlbVtdID0gb3RoZXJIdHRwS2V5cy5tYXAoa2V5ID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAga2V5LFxuICAgICAgYmFzZVVSTDogaHR0cENvbmZpZy5vdGhlcltrZXldLFxuICAgICAgcHJveHlQYXR0ZXJuOiBjcmVhdGVQcm94eVBhdHRlcm4oa2V5KVxuICAgIH07XG4gIH0pO1xuXG4gIGNvbnN0IGNvbmZpZzogQXBwLlNlcnZpY2UuU2VydmljZUNvbmZpZyA9IHtcbiAgICBiYXNlVVJMOiBodHRwQ29uZmlnLmJhc2VVUkwsXG4gICAgcHJveHlQYXR0ZXJuOiBjcmVhdGVQcm94eVBhdHRlcm4oKSxcbiAgICBvdGhlcjogb3RoZXJDb25maWdcbiAgfTtcblxuICByZXR1cm4gY29uZmlnO1xufVxuXG4vKipcbiAqIGdldCBiYWNrZW5kIHNlcnZpY2UgYmFzZSB1cmxcbiAqXG4gKiBAcGFyYW0gZW52IC0gdGhlIGN1cnJlbnQgZW52XG4gKiBAcGFyYW0gaXNQcm94eSAtIGlmIHVzZSBwcm94eVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2VydmljZUJhc2VVUkwoZW52OiBFbnYuSW1wb3J0TWV0YSwgaXNQcm94eTogYm9vbGVhbikge1xuICBjb25zdCB7IGJhc2VVUkwsIG90aGVyIH0gPSBjcmVhdGVTZXJ2aWNlQ29uZmlnKGVudik7XG5cbiAgY29uc3Qgb3RoZXJCYXNlVVJMID0ge30gYXMgUmVjb3JkPEFwcC5TZXJ2aWNlLk90aGVyQmFzZVVSTEtleSwgc3RyaW5nPjtcblxuICBvdGhlci5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIG90aGVyQmFzZVVSTFtpdGVtLmtleV0gPSBpc1Byb3h5ID8gaXRlbS5wcm94eVBhdHRlcm4gOiBpdGVtLmJhc2VVUkw7XG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgYmFzZVVSTDogaXNQcm94eSA/IGNyZWF0ZVByb3h5UGF0dGVybigpIDogYmFzZVVSTCxcbiAgICBvdGhlckJhc2VVUkxcbiAgfTtcbn1cblxuLyoqXG4gKiBHZXQgcHJveHkgcGF0dGVybiBvZiBiYWNrZW5kIHNlcnZpY2UgYmFzZSB1cmxcbiAqXG4gKiBAcGFyYW0ga2V5IElmIG5vdCBzZXQsIHdpbGwgdXNlIHRoZSBkZWZhdWx0IGtleVxuICovXG5mdW5jdGlvbiBjcmVhdGVQcm94eVBhdHRlcm4oa2V5PzogQXBwLlNlcnZpY2UuT3RoZXJCYXNlVVJMS2V5KSB7XG4gIGlmICgha2V5KSB7XG4gICAgcmV0dXJuICcvcHJveHktZGVmYXVsdCc7XG4gIH1cblxuICByZXR1cm4gYC9wcm94eS0ke2tleX1gO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxkYXRhXFxcXHd3d1xcXFxzb3liZWFuLWFkbWluLW1haW5cXFxcYnVpbGRcXFxcY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxkYXRhXFxcXHd3d1xcXFxzb3liZWFuLWFkbWluLW1haW5cXFxcYnVpbGRcXFxcY29uZmlnXFxcXHByb3h5LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9kYXRhL3d3dy9zb3liZWFuLWFkbWluLW1haW4vYnVpbGQvY29uZmlnL3Byb3h5LnRzXCI7aW1wb3J0IHR5cGUgeyBQcm94eU9wdGlvbnMgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IGNyZWF0ZVNlcnZpY2VDb25maWcgfSBmcm9tICcuLi8uLi9zcmMvdXRpbHMvc2VydmljZSc7XG5cbi8qKlxuICogU2V0IGh0dHAgcHJveHlcbiAqXG4gKiBAcGFyYW0gZW52IC0gVGhlIGN1cnJlbnQgZW52XG4gKiBAcGFyYW0gZW5hYmxlIC0gSWYgZW5hYmxlIGh0dHAgcHJveHlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVZpdGVQcm94eShlbnY6IEVudi5JbXBvcnRNZXRhLCBlbmFibGU6IGJvb2xlYW4pIHtcbiAgY29uc3QgaXNFbmFibGVIdHRwUHJveHkgPSBlbmFibGUgJiYgZW52LlZJVEVfSFRUUF9QUk9YWSA9PT0gJ1knO1xuXG4gIGlmICghaXNFbmFibGVIdHRwUHJveHkpIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgY29uc3QgeyBiYXNlVVJMLCBwcm94eVBhdHRlcm4sIG90aGVyIH0gPSBjcmVhdGVTZXJ2aWNlQ29uZmlnKGVudik7XG5cbiAgY29uc3QgcHJveHk6IFJlY29yZDxzdHJpbmcsIFByb3h5T3B0aW9ucz4gPSBjcmVhdGVQcm94eUl0ZW0oeyBiYXNlVVJMLCBwcm94eVBhdHRlcm4gfSk7XG5cbiAgb3RoZXIuZm9yRWFjaChpdGVtID0+IHtcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCBjcmVhdGVQcm94eUl0ZW0oaXRlbSkpO1xuICB9KTtcblxuICByZXR1cm4gcHJveHk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb3h5SXRlbShpdGVtOiBBcHAuU2VydmljZS5TZXJ2aWNlQ29uZmlnSXRlbSkge1xuICBjb25zdCBwcm94eTogUmVjb3JkPHN0cmluZywgUHJveHlPcHRpb25zPiA9IHt9O1xuXG4gIHByb3h5W2l0ZW0ucHJveHlQYXR0ZXJuXSA9IHtcbiAgICB0YXJnZXQ6IGl0ZW0uYmFzZVVSTCxcbiAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UobmV3IFJlZ0V4cChgXiR7aXRlbS5wcm94eVBhdHRlcm59YCksICcnKVxuICB9O1xuXG4gIHJldHVybiBwcm94eTtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcZGF0YVxcXFx3d3dcXFxcc295YmVhbi1hZG1pbi1tYWluXFxcXGJ1aWxkXFxcXGNvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcZGF0YVxcXFx3d3dcXFxcc295YmVhbi1hZG1pbi1tYWluXFxcXGJ1aWxkXFxcXGNvbmZpZ1xcXFx0aW1lLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9kYXRhL3d3dy9zb3liZWFuLWFkbWluLW1haW4vYnVpbGQvY29uZmlnL3RpbWUudHNcIjtpbXBvcnQgZGF5anMgZnJvbSAnZGF5anMnO1xuaW1wb3J0IHV0YyBmcm9tICdkYXlqcy9wbHVnaW4vdXRjJztcbmltcG9ydCB0aW1lem9uZSBmcm9tICdkYXlqcy9wbHVnaW4vdGltZXpvbmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QnVpbGRUaW1lKCkge1xuICBkYXlqcy5leHRlbmQodXRjKTtcbiAgZGF5anMuZXh0ZW5kKHRpbWV6b25lKTtcblxuICBjb25zdCBidWlsZFRpbWUgPSBkYXlqcy50eihEYXRlLm5vdygpLCAnQXNpYS9TaGFuZ2hhaScpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xuXG4gIHJldHVybiBidWlsZFRpbWU7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9SLE9BQU9BLGNBQWE7QUFDeFMsU0FBUyxLQUFLLHFCQUFxQjtBQUNuQyxTQUFTLGNBQWMsZUFBZTs7O0FDRHRDLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxjQUFjOzs7QUNIckIsT0FBTyxzQkFBc0I7QUFHdEIsU0FBUyxxQkFBcUI7QUFDbkMsU0FBTyxpQkFBaUI7QUFBQSxJQUN0QixTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsSUFDVDtBQUFBLElBQ0EscUJBQXFCLFdBQVcsV0FBVztBQUN6QyxZQUFNLE1BQU07QUFFWixVQUFJLFFBQVEsU0FBUztBQUNuQixjQUFNLFVBQWtDLENBQUMsYUFBYSxjQUFjLFlBQVksYUFBYSxhQUFhO0FBRTFHLGNBQU0sWUFBWSxRQUFRLEtBQUssR0FBRztBQUVsQyxlQUFPLGtCQUFrQixTQUFTO0FBQUEsTUFDcEM7QUFFQSxhQUFPO0FBQUEsSUFDVDtBQUFBLElBQ0EsZUFBZSxXQUFXO0FBQ3hCLFlBQU0sTUFBTTtBQUVaLFlBQU0saUJBQTZCLENBQUMs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LFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssY0FBYyxJQUFJLElBQUksTUFBTSx3Q0FBZSxDQUFDO0FBQUEsUUFDakQsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxNQUN0RDtBQUFBLElBQ0Y7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQSxVQUNKLGdCQUFnQjtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVMsaUJBQWlCLFNBQVMsU0FBUztBQUFBLElBQzVDLFFBQVE7QUFBQSxNQUNOLFlBQVksS0FBSyxVQUFVLFNBQVM7QUFBQSxJQUN0QztBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTyxnQkFBZ0IsU0FBUyxXQUFXO0FBQUEsTUFDM0MsSUFBSTtBQUFBLFFBQ0YsY0FBYztBQUFBLE1BQ2hCO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLHNCQUFzQjtBQUFBLE1BQ3RCLFdBQVcsUUFBUSxvQkFBb0I7QUFBQSxNQUN2QyxpQkFBaUI7QUFBQSxRQUNmLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwcm9jZXNzIiwgInByb2Nlc3MiLCAicGF0aCIsICJGaWxlU3lzdGVtSWNvbkxvYWRlciIsICJwYXRoIiwgInByb2Nlc3MiLCAiRmlsZVN5c3RlbUljb25Mb2FkZXIiLCAicGF0aCIsICJwcm9jZXNzIl0KfQo=
