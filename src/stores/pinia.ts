import { createPinia } from 'pinia'
import router from '../router'

const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = router
})

export default pinia

declare module 'pinia' {
  interface PiniaCustomProperties {
    router: typeof router
  }
}
