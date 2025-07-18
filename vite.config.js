import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import compression from 'vite-plugin-compression';
import { viteVConsole } from 'vite-plugin-vconsole';
import * as path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import ViteRestart from 'vite-plugin-restart';
import legacyPlugin from '@vitejs/plugin-legacy';
import { terser } from 'rollup-plugin-terser';

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames(assetsInfo) {
          if (assetsInfo.name?.endsWith('.css')) {
            return `css/[name]-[hash][extname]`;
          }
          const imgExts = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.ico', '.avif'];
          if (imgExts.some(ext => assetsInfo.name?.endsWith(ext))) {
            return `assets/[ext]/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
      plugins: [
        terser()
      ]
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 删除 console
        drop_debugger: true, // 删除 debugger
      },
      format: {
        comments: false, // 删除注释
      },
    },
  },
  plugins: [
    vue(),
    // Gzip 压缩插件
    compression({
      verbose: true,
      disable: false,
      threshold: 10240,// 压缩阈值，小于这个值的文件将不会被压缩（单位为字节）这里就是大于 10kb 才压缩
      algorithm: 'gzip', // 压缩算法
      ext: '.gz' // 压缩后缀名
    }),
    // VConsole 插件
    viteVConsole({
      entry: path.resolve('src/App.vue'), // 或者可以使用这个配置: [path.resolve('src/main.ts')]
      enabled: true, // 可自行结合 mode 和 command 进行判断
      config: {
        maxLogNumber: 1000,
        theme: 'dark'
      }
    }),
    // 可视化分析插件
    visualizer({
      filename: './dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    }),
    // 自动重启插件
    ViteRestart({
      restart: [
        'vite.config.js',
      ]
    }),
    legacyPlugin({
      targets: ['chrome 52', 'Android > 39', 'iOS >= 10.3'], // 需要兼容的目标列表,可以设置多个
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // 面向IE11的时候需要用到此插件
    }),
    // HTTPS 证书插件
    // basicSsl(),
  ],
  css: {
    modules: {
      generateScopedName: '[name]__[local]__[hash:base64:6]', // CSS模块化
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 设置 @ 指向 src 目录
    }
  },
  // base: '/dataCommunicationCenter/'
})