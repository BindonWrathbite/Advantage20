import { createApp } from 'vue'
import router from '@/router'
import '@/assets/index.css'
import App from '@/App.vue'
import ripple from '@/directives/ripple.ts'

createApp(App).use(router).directive('ripple', ripple).mount('#app')
