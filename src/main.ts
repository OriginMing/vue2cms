import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import router from './router/index'
import store from './store/index'
import { setupStore } from './store'
import { globalRegister } from './global'
const app = createApp(App)
app.use(store)
app.use(globalRegister)
setupStore()
app.use(router)

app.mount('#app')
