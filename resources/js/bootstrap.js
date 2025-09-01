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
