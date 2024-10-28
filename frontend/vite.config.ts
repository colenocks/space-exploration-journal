import path from "path"
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig((env) => {
  const envars = loadEnv(env.mode, './');

  const SERVER_BASE_URL = new URL(
    envars.VITE_SERVER_URL ?? 'http://localhost:5000'
  );
  const SERVER_API_PATH = envars.VITE_SERVER_API_PATH ?? '/api';

  return {
    envDir: './',
    base: './',
    plugins: [react()],
    build: {
      outDir: "dist",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: Number(envars.VITE_PORT) || 3000,

      /* 
     The proxy setting enables communication between the frontend and the backend. 
     Requests matching the API path are forwarded to the server URL. 
     When we send a request to http://localhost:5000/api it will be forwarded 
     to our server at http://localhost:3001/api.
      */
      proxy: {
        [SERVER_API_PATH]: {
          target: SERVER_BASE_URL,
          changeOrigin: true,
        },
      },
    },
  }
})
