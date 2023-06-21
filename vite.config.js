import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { log } from 'node:console'

// https://vitejs.dev/config/
export default defineConfig({
  // 依赖预构建优化
  optimizeDeps:{
    exclude: []
  },

  resolve: {
    // 路径别名
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  build: {
    // 仅供测试，便于定位生成环境问题,生产上线记得关闭
    sourcemap: true,
    minify: false,
    // rollupOptions 配置
    rollupOptions:{
      output:{

      }
    }
  },
  server: {
    port: 8080,
    host: "0.0.0.0",
    // proxy:{
    //   "/onos": {
    //     target: "https://9f28c63f09f448.lhr.life", // 需要代理的域名
    //     ws: false, // 是否启用websockets
    //     changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    //     configure: (proxy)=>{
    //       console.log(proxy)
    //     }
    //   },
   
    // },
  },
  // 代理服务器
  // devServer: {
  //   proxy:{
  //     "/api": {
  //       target: "http://4b218de96c29d8.lhr.life", // 需要代理的域名
  //       ws: false, // 是否启用websockets
  //       changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
  //       // pathRewrite: {  //重写匹配的字段，如果不需要在请求路径上，重写为""
  //       //   "^/api": ""
  //       // }
  //       logLevel: 'debug',
  //       onProxyReq: (proxyReq, req) => {
  //         // http请求
  //         console.log('[HPM] %s %s %s %s', req.method, req.originalUrl, '->', req.url);
  //       },
  //     },
      
  //   },
  // },
  

  plugins: [vue()],
})
