import "./style.css";
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import RangeInput from "./components/Base/RangeInput.vue";
import Modal from "./components/Base/Modal.vue";
import RadioButtonGroup from "./components/Base/RadioButtonGroup.vue";
import Button from "./components/Base/Button.vue";
import Toggle from "./components/Base/Toggle.vue";

const app = createApp(App)

app.use(createPinia())
app.use(router)

// define Custom Component
app.component('RangeInput', RangeInput);
app.component('Modal', Modal);
app.component('RadioButtonGroup', RadioButtonGroup);
app.component('Button', Button);
app.component('Toggle', Toggle);

app.mount('#app')
