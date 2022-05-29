import { createApp } from "vue";
import { createPinia } from "pinia";
import "./index.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

function disableScroll(event: Event) {
  event.preventDefault();
}

// イベントと関数を紐付け
document.addEventListener("touchmove", disableScroll, { passive: false });
