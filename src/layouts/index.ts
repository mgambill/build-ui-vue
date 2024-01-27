import type { App } from 'vue'
import { RouterView, type RouteLocationRaw } from 'vue-router'
import DefaultLayout from './Default.vue'

export type BreadcrumbItem = { name: string; to?: RouteLocationRaw; current?: boolean }

// just a helper function to make it easier to use with typescript
export const withBreadcrumbs = (items: BreadcrumbItem[]) => items

export const useLayouts = {
  install: (app: App): void => {
    app.component('DefaultLayout', DefaultLayout)
    // eslint-disable-next-line vue/multi-word-component-names
    app.component('Layout', DefaultLayout)
  },
}

export const DefaultIndexPage = {
  setup() {
    const route = useRoute()
    return () => h(RouterView, { key: route?.fullPath })
  },
}

export const EmptyView = DefaultIndexPage