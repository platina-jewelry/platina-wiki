/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv'

dotenv.config()
import cors from 'cors'
import express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import helmet from 'helmet'
import {createServer as createViteServer} from 'vite'
import type {ViteDevServer} from 'vite'
import type { EmotionCache } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance'
import createCache from '@emotion/cache'
import cookieParser from 'cookie-parser'
import {getUser} from './services/user/user'
import {apiRoute} from './routes/api'
// import {createProxyMiddleware} from 'http-proxy-middleware'
import * as process from 'process'
// import {dbConnect} from './db'

// Проверяем, находимся ли мы в режиме разработки
const isDev = () => process.env.NODE_ENV === 'development'

async function startServer() {

  const app = express()

  // Настройка CORS, чтобы контролировать, с каких доменов разрешены запросы
  app.use('/', cors({
    // Разрешаем обмениваться cookies
    credentials: true,
    origin: [
      // Разрешаем доступ с указанных источников
      `http://127.0.0.1:${process.env.CLIENT_PORT}`,
      `http://localhost:${process.env.CLIENT_PORT}`,
      `http://127.0.0.1:${process.env.SERVER_PORT}`,
      `http://localhost:${process.env.SERVER_PORT}`,
    ],
    // Устанавливаем статус успешного ответа для OPTIONS-запросов
    optionsSuccessStatus: 200,
  }))

  // Настройка helmet для защиты приложения от различных атак, например, XSS, clickjacking и т. д.
  app.use(
    helmet({
      // Настроим политику безопасности контента
      contentSecurityPolicy: {
        useDefaults: false,
        directives: {
          // Разрешаем загружать контент только с текущего домена
          defaultSrc: ["'self'"],
          scriptSrc: [
            // Разрешаем только локальные скрипты
            "'self'",
            // Разрешаем встроенные скрипты
            "'unsafe-inline'"
          ],
          styleSrc: [
            // Разрешаем только локальные стили
            "'self'",
            // Разрешаем встроенные стили
            "'unsafe-inline'"
          ],
          conectSrc: [
            // Разрешаем только локальные соединения
            "'self'",
            'http://localhost:*',
            'http://51.250.109.136',
            'https://51.250.109.136',
          ],
          imgSrc: [
            // Разрешаем изображения только с текущего домена
            "'self'",
            // Разрешаем изображения с этого CDN
            'https://uplaud.platina-kostroma.com',
            // Разрешаем загрузку изображений через data URL
            'data:',
          ],
          // Отключаем автоматическое обновление небезопасных запросов
          upgradeInsecureRequests: null,
        },
      }
    })
  )

  // Роутинг для API: обрабатывает все запросы, начинающиеся с /api
  app.use('/api', apiRoute)

  // Прокси для запросов, которые начинаются с /api/v2, перенаправляет их на другой сервер
  // app.use(
  //   '/api/v2',
  //   createProxyMiddleware({
  //     // Прокси меняет источник запроса
  //     changeOrigin: true,
  //     // Очищаем домен cookie
  //     cookieDomainRewrite: {'*': ''},
  //     // Целевой сервер для проксирования
  //     target: 'https://test.platina-kostroma.com',
  //   })
  // )

  // Используем cookieParser для работы с cookies
  app.use(cookieParser())

  // Объявляем переменную для ViteDevServer
  let vite: ViteDevServer | undefined
  // Получаем порт для сервера или используем 3000 по умолчанию
  const port = Number(process.env.SERVER_PORT) || 3000
  // Путь к собранным файлам клиента
  const distPath = path.dirname(require.resolve('../client/dist/index.html'))
  // Путь к исходным файлам клиента
  const srcPath = path.dirname(require.resolve('../client'))
  // Путь к серверной сборке клиента
  const ssrClientPath = require.resolve('../client/dist-ssr/client.cjs')

  if (isDev()) {
    vite = await createViteServer({
      // Включаем режим middleware для Vite
      server: {middlewareMode: true},
      // Указываем корневую папку для Vite
      root: srcPath,
      // Используем кастомный тип приложения
      appType: 'custom'
    })

    // Используем middleware от Vite для обработки запросов в разработке
    app.use(vite.middlewares)
  }

  if (!isDev()) {
    // Раздаем статичные файлы
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  }

  // await dbConnect()

  // Обрабатываем все запросы по любому пути
  app.get('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      // Переменная для HTML шаблона
      let template: string

      if (!isDev()) {
        template = fs.readFileSync(
          // Читаем готовый HTML из папки dist
          path.resolve(distPath, 'index.html'),
          'utf-8',
        )
      } else {
        template = fs.readFileSync(
          // Читаем HTML из исходной папки
          path.resolve(srcPath, 'index.html'),
          'utf-8',
        )

        // Преобразуем HTML с помощью Vite
        template = await vite!.transformIndexHtml(url, template)
      }

      // Объявление типа для функции `render`, которая будет отвечать за рендеринг HTML.
      let render: (store: any, url: string, cache: EmotionCache) => Promise<string>

      // Объявление типа для функции `createStore`, которая будет создавать и возвращать хранилище состояния (store)
      let createStore: (initialStore: any) => Promise<any>


      if (!isDev()) {
        // Динамически импортируем SSR клиентский код
        const client = await import(ssrClientPath)
        // Извлекаем функцию для рендеринга, которая будет использоваться для генерации HTML
        render = client.render
        // Извлекаем функцию для создания хранилища (store) приложения
        createStore = client.createStore
      } else {
        // Загрузка SSR модуля для разработки
        const client = await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))
        // Извлекаем функцию для рендеринга из модуля
        render = client.render
        // Извлекаем функцию для создания хранилища из модуля
        createStore = client.createStore
      }


      let initialStore = {}

      // Проверяем, есть ли пользователь в cookies
      const user = await getUser(req.headers.cookie)

      if (user) {
        // Добавляем информацию о пользователе в начальный store
        initialStore = {...initialStore, app: {user}}
      }

      // Создаем экземпляр store с начальными данными
      const storeInstance = await createStore(initialStore)

      // Ключ для кэша Emotion
      const cacheKey = 'custom'
      // Создаем кэш
      const cache = createCache({key: cacheKey})
      // Извлекаем критичные стили
      const {extractCritical} = createEmotionServer(cache)

      // Рендерим HTML страницы
      const appHtml = await render(storeInstance, url, cache)
      // Извлекаем критичные стили из HTML
      const {html, css, ids} = extractCritical(appHtml)
      // Получаем состояние Redux
      const state = storeInstance?.getState()
      // Встраиваем состояние Redux в HTML
      const stateMarkup = `<script>window.___REDUX_STATE___=${JSON.stringify(state)}</script>`

      // Собираем финальный HTML
      const finalHtml = template
        // Вставляем HTML контент и состояние
        .replace('<!--ssr-outlet-->', stateMarkup + html)
        // Вставляем стили
        .replace('</head>', `<style data-emotion="${cacheKey} ${ids.join(' ')}">${css}</style></head>`)

      // Отправляем ответ с рендером HTML
      res.status(200).set({'Content-Type': 'text/html'}).end(finalHtml)
    } catch (e) {
      if (isDev()) {
        // В режиме разработки исправляем стек ошибок для SSR
        vite!.ssrFixStacktrace(e as Error)
      }
      // Если ошибка, передаем ее в следующий обработчик
      next(e)
    }
  })

  app.listen(port, () => {
    // Запускаем сервер на указанном порту
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer().then(r => console.log('r', r))
