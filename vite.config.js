import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/main.tsx'],
            refresh: true,
        }),
        tailwindcss(),
        solid(),
    ],
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
        cors: {
            origin: ['https://laravel.ddev.site', 'http://laravel.ddev.site'],
            credentials: true,
        },
        hmr: {
            host: 'laravel.ddev.site',
            protocol: 'wss',
            clientPort: 5173,
        },
    },
});
