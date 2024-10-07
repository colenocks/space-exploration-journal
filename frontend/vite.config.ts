import path from "path" // 'npm i -D @types/node' helps import path without error
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig((env)=>{
  const envars = loadEnv(env.mode, './');

  const serverURL = new URL(
    envars.VITE_BACKEND_URL ?? 'http://localhost:5000'
  );
  const serverAPIPath = process.env.VITE_SERVER_API_PATH ?? "/api";
  
  return {
      envDir: './',
      base: './',
      plugins: [react()],
      build: {
        outDir: '../backend/public',  // Ensures that the frontend build outputs to the backend's public folder
      },
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },

      server: {
        port: 3001,

        /* 
        The proxy setting enables communication between the frontend and the backend. 
        Requests matching the API path are forwarded to the server URL. 
        When we send a request to http://localhost:5000/api it will be forwarded 
        to our server at http://localhost:3001/api.
         */
        proxy: {
          [serverAPIPath]: serverURL.origin,
        }
      },
    }
})
