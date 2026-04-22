export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const counterId = config.public.ymCounterId

  if (!counterId) return

  // Yandex Metrika inline init
  const w = window as any
  w['ym'] = w['ym'] || function (...args: unknown[]) {
    ;(w['ym'].a = w['ym'].a || []).push(args)
  }
  w['ym'].l = Date.now()

  w['ym'](counterId, 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  })

  const script = document.createElement('script')
  script.src = 'https://mc.yandex.ru/metrika/tag.js'
  script.async = true
  document.head.appendChild(script)
})
