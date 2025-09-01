import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

// axios setup
window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// laravel echo + soketi setup
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: "pusher",
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    wsHost: import.meta.env.VITE_PUSHER_HOST ?? window.location.hostname,
    wsPort: import.meta.env.VITE_PUSHER_PORT ?? 6001,
    forceTLS: false,
    disableStats: true,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? "mt1",
});

// === Listen Event Report ===
window.Echo.channel("reports")
    .listen(".ReportCreated", (e) => {
        console.log("Event Report Created diterima:", e);

        // play sound ketika ada report baru
        const audio = new Audio("/dist/sound/dingdong.mp3"); // pastikan file ada di public/dist/sound/
        audio.play().catch(err => console.error("Gagal play sound:", err));

        // contoh: reload data otomatis tanpa refresh full page
        if (typeof window.loadReports === "function") {
            window.loadReports(); // bikin fungsi ini di react/inertia untuk fetch ulang data
        }
    });
