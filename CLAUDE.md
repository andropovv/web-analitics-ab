# NewsFlow — A/B Testing News Site

## Гипотеза
Замена кнопки «Загрузить ещё» на бесконечный скролл в персональной ленте увеличит среднее количество просмотренных карточек за сессию.

- **Вариант A** — кнопка «Загрузить ещё» (`components/feed/LoadMoreFeed.vue`)
- **Вариант B** — бесконечный скролл (`components/feed/InfiniteScrollFeed.vue`)

## Стек
- **Nuxt 3** (full-stack, Nitro server routes)
- **Vitest** + `@nuxt/test-utils` для тестов
- **Деплой**: Vercel (`vercel.json` настроен, нужен nuxtjs preset)

## Структура проекта
```
server/api/
  ab-variant.get.ts   # Назначает вариант A/B, cookie ab_variant
  news/index.get.ts   # Список новостей ?page=&category=&pageSize=
  news/[id].get.ts    # Одна новость
  track.post.ts       # Трекинг просмотренных карточек

server/utils/
  ab.ts               # assignVariant(), isValidVariant()
  news.ts             # filterNews(), paginateNews(), getNewsById()

data/news.ts          # 60 mock-новостей, экспортирует NEWS[] и CATEGORIES[]

composables/
  useABVariant.ts     # Читает вариант с сервера, useState()
  useNewsFeed.ts      # Загружает новости с пагинацией
  useNewsTracking.ts  # IntersectionObserver + Яндекс Метрика + POST /api/track

plugins/
  yandex-metrika.client.ts  # Подключает счётчик ЯМ через env var

components/
  AppHeader.vue
  CategoryFilter.vue
  NewsCard.vue                # Каждая карточка сама наблюдает за собой через IntersectionObserver
  feed/LoadMoreFeed.vue       # Вариант A
  feed/InfiniteScrollFeed.vue # Вариант B

pages/
  index.vue           # Лента (выбирает компонент по variant)
  news/[id].vue       # Страница новости
```

## Команды
```bash
pnpm install          # Установить зависимости
pnpm dev              # Локальный запуск на :3000
pnpm test             # Запустить тесты (Vitest)
pnpm test:watch       # Тесты в watch-режиме
pnpm build            # Сборка для продакшна
pnpm preview          # Превью сборки локально
```

## A/B тестирование
- Cookie `ab_variant=A|B` устанавливается при первом визите через `/api/ab-variant`
- Cookie `ab_session` — UUID сессии для трекинга
- Оба cookie живут 24 часа
- Вариант определяется случайно 50/50

## Трекинг просмотров
Новость считается **просмотренной** когда её нижний край оказался в пределах экрана:
```
entry.boundingClientRect.bottom <= window.innerHeight
```
При каждом просмотре:
1. `ym(counterId, 'reachGoal', 'news_viewed', { id, variant })`
2. `POST /api/track { newsId, variant, sessionId }`

В Яндекс Метрике смотреть: **Отчёты → Конверсии → `news_viewed`** в разбивке по параметрам визита (variant).

## Переменные окружения
```
NUXT_PUBLIC_YM_COUNTER_ID=  # Номер счётчика Яндекс Метрики
```

## Тесты (TDD)
Тесты написаны до реализации:
- `tests/unit/ab-variant.test.ts` — логика assignVariant / isValidVariant
- `tests/unit/news-api.test.ts` — filterNews, paginateNews, getNewsById
- `tests/unit/useNewsTracking.test.ts` — createTracker, isNewsInViewport

## Деплой на Vercel
1. Зарегистрируйся на vercel.com
2. Импортируй репозиторий
3. Добавь env var `NUXT_PUBLIC_YM_COUNTER_ID`
4. Vercel автоматически определит Nuxt и запустит `pnpm build`
