import path from "path" // 'npm i -D @types/node' helps import path without error
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const serverURL = new URL(
  process.env.VITE_BACKEND_URL ?? 'http://localhost:5000'
);
const serverAPIPath = process.env.VITE_SERVER_API_PATH ?? "/api";

// https://vitejs.dev/config/
export default defineConfig({
      envDir: './',
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
        port: Number(process.env.PORT) ?? 3001,

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
)
