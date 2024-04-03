import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVueStyled from 'primevue/styled';

import App from './App.vue'
import router from './router'
import { useLayouts } from './layouts'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(useLayouts)

// @ts-ignore
app.use(PrimeVueStyled);

app.mount('#app')
