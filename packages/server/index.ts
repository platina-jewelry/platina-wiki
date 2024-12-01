import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import {dbConnect} from './db'
import helmet from "helmet";

dotenv.config()

async function startServer() {
  const app = express()

  // Настройка CORS
  app.use(cors({
    credentials: true,
    origin: [
      `http://127.0.0.1:${process.env.CLIENT_PORT}`,
      `http://localhost:${process.env.CLIENT_PORT}`,
      `http://127.0.0.1:${process.env.SERVER_PORT}`,
      `http://localhost:${process.env.SERVER_PORT}`,
      // Добавьте ваши домены и порты для безопасного доступа
    ],
    optionsSuccessStatus: 200,
  }))

  // Настройка безопасности с помощью Helmet
  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: false,
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
        },
      }
    })
  )

  // Подключение к базе данных
  await dbConnect()

  // Мидлвар для парсинга cookies
  app.use(cookieParser())

  // Запуск сервера
  const port = process.env.SERVER_PORT || 3000
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

startServer().catch(err => {
  console.error('Failed to start server:', err)
})
