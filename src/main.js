import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ColorInput from 'vue-color-input'
import VueNumberInput from '@chenfengyuan/vue-number-input'
import './index.css'

import { createPinia } from 'pinia'
const pinia = createPinia()

const app = createApp(App).component(VueNumberInput.name, VueNumberInput).use(ColorInput).use(router)
app.use(pinia)
app.config.globalProperties.$websiteComponents = []
app.mount('#app')
