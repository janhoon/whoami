import posthog from 'posthog-js'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const posthogKey = runtimeConfig.public.posthogKey as string

  if (!posthogKey) return

  const posthogClient = posthog.init(posthogKey, {
    api_host: '/ingest',
    person_profiles: 'identified_only',
    capture_pageview: false,
    loaded: (posthog) => {
      // Debug in development
      if (import.meta.dev) {
        // posthog.debug()
      }
    },
  })

  // Track page views on route change
  const router = useRouter()
  router.afterEach((to) => {
    nextTick(() => {
      posthog.capture('$pageview', {
        $current_url: window.location.origin + to.fullPath,
      })
    })
  })

  return {
    provide: {
      posthog: () => posthogClient,
    },
  }
})
