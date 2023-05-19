import { createApp } from 'vue'
import pinia from './stores/pinia'
import router from './router'

import App from './App.vue'
import './scss/main.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
