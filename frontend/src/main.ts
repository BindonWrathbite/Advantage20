import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import PrimeVue from 'primevue/config'
import DefaultTheme from '@/themes/default'
import router from '@/router'
import '@/style.css'
import App from '@/App.vue'

createApp(App)
  .use(router)
  .use(autoAnimatePlugin)
  .use(PrimeVue, {
    theme: {
      preset: DefaultTheme,
      options: {
        prefix: 'p',
        darkModeSelector: '.dark',
        cssLayer: {
          name: 'primevue',
          order: 'tailwind-base, primevue, tailwind-utilities',
        },
      },
    },
  })
  .mount('#app')
