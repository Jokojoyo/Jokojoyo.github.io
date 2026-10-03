import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
 plugins:[react()],
 base:'./',
 build:{assetsDir:'',chunkSizeWarningLimit:650},
 server:{host:'127.0.0.1',port:4300,strictPort:true}
});
