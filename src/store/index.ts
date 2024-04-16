import type { App } from 'vue'
import { store } from './helper'

export function setupStore(app: App) {
  app.use(store)
}

export { store }
export * from './modules'
export * from "./homeStore"
