import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import './bootstrap';
createInertiaApp({
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        // Menggunakan createRoot untuk membuat root aplikasi
        const root = createRoot(el);
        // Merender komponen utama aplikasi ke dalam root
        root.render(<App {...props} />);
    },
});

InertiaProgress.init();
