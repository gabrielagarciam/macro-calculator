import "./style.css";
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Button from "./components/Base/Button.vue";
const app = createApp(App)

app.use(createPinia())
app.use(router)

// define Custom Component
app.component('Button', Button);

app.mount('#app')
