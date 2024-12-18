# Стек технологий

Проект использует множество современных технологий, обеспечивающих высокую производительность, масштабируемость и удобство разработки. Стек охватывает как инфраструктурные компоненты, так и приложения для бэкенда и фронтенда.

## 1. **Монорепозиторий (Lerna)**
- **Описание**: Lerna — это инструмент для управления многопакетными репозиториями. Он позволяет удобно управлять несколькими проектами (пакетами) внутри одного репозитория, упрощая их разработку и тестирование.
- **Роль**: Обеспечивает поддержку масштабируемой структуры проекта, где фронтенд, бэкенд и другие сервисы могут быть развернуты в рамках одного репозитория.

## 2. **Proxy (HTTP Proxy Middleware)**
- **Описание**: HTTP Proxy Middleware — это инструмент для создания прокси-серверов, который помогает перенаправлять запросы между сервером и клиентом или между разными сервисами.
- **Роль**: Используется для проксирования запросов на разные серверы (например, для обработки API запросов или балансировки нагрузки), улучшая безопасность и упрощая взаимодействие между микросервисами.

## 3. **Kubernetes / Docker Swarm**
- **Описание**: Kubernetes и Docker Swarm — это системы оркестрации контейнеров, предназначенные для автоматизации развертывания, масштабирования и управления контейнеризованными приложениями.
- **Роль**: Управляют развертыванием всех контейнеров в проекте, обеспечивают автоматическое масштабирование, балансировку нагрузки и оркестрацию сервисов.

---

## Бэкенд

### 4. **Node.js**
- **Описание**: Node.js — это среда выполнения JavaScript на сервере, которая позволяет запускать приложения на основе событий и асинхронных операций.
- **Роль**: Основная серверная платформа, обеспечивающая обработку запросов, взаимодействие с базами данных и управление бизнес-логикой приложения.

### 5. **Express.js**
- **Описание**: Express — это фреймворк для Node.js, который используется для создания RESTful API.
- **Роль**: Обработка HTTP-запросов, управление маршрутами и подключение middleware для расширения функциональности.

### 6. **Proxy (HTTP Proxy Middleware)**
- **Описание**: Прокси-сервер для перенаправления API запросов на другие серверы.
- **Роль**: Применяется для проксирования запросов между фронтендом и бэкендом, а также для отправки запросов к сторонним API, скрывая детали реализации и обеспечивая безопасность.

### 7. **PostgreSQL**
- **Описание**: Реляционная база данных с поддержкой ACID-транзакций, совместимая с SQL.
- **Роль**: Хранение структурированных данных проекта, включая данные пользователей, транзакции и прочее.

### 8. **Redis**
- **Описание**: Redis — это система хранения данных в памяти, часто используемая для кэширования.
- **Роль**: Кэширование запросов и данных, а также использование в качестве очереди для фоновых задач, таких как обработка событий или отправка уведомлений.

### 9. **Elasticsearch**
- **Описание**: Elasticsearch — это распределенная поисковая и аналитическая система, используемая для индексирования и быстрого поиска по большим объемам данных.
- **Роль**: Обеспечивает полнотекстовый поиск и аналитику данных в реальном времени, например, для поиска по базе данных или по журналам событий.

### 10. **Logstash**
- **Описание**: Logstash — это инструмент для сбора, обработки и отправки данных, таких как логи или события.
- **Роль**: Перехватывает логи с различных источников, обрабатывает их и отправляет в Elasticsearch для дальнейшего анализа и мониторинга.

### 11. **Kibana**
- **Описание**: Kibana — это инструмент для визуализации данных из Elasticsearch, предоставляющий дашборды, отчеты и инструменты для анализа.
- **Роль**: Визуализация и аналитика данных из Elasticsearch для упрощенного мониторинга и диагностики.

---

## Фронтенд

### 12. **React.js**
- **Описание**: React — это библиотека JavaScript для создания пользовательских интерфейсов.
- **Роль**: Обеспечивает динамическую загрузку и рендеринг пользовательских интерфейсов с помощью компонентной архитектуры.

### 13. **Redux**
- **Описание**: Redux — это библиотека для управления состоянием приложения.
- **Роль**: Управляет состоянием приложения на клиентской стороне, позволяя централизованно хранить данные и обеспечивать их доступность по всему приложению.

### 14. **Redux Thunk**
- **Описание**: Redux Thunk — это middleware для Redux, которое позволяет выполнять асинхронные операции (например, запросы к API) в процессе работы с состоянием.
- **Роль**: Обработка асинхронных действий, таких как вызовы API, и управление состоянием приложения в ответ на их завершение.

### 15. **WebSocket (Socket.IO)**
- **Описание**: WebSocket — это протокол, предоставляющий двустороннюю связь между сервером и клиентом.
- **Роль**: Используется для обмена данными в реальном времени, например, для чатов, уведомлений или обновлений данных без необходимости обновления страницы.

### 16. **Service Worker и Caching**
- **Описание**: Service Worker — это скрипт, который работает в фоновом режиме, позволяя кэшировать ресурсы для работы в офлайн-режиме.
- **Роль**: Обеспечивает кэширование статических ресурсов и поддержку офлайн-работы приложения, улучшая скорость и доступность.

### 17. **React Server-Side Rendering (SSR)**
- **Описание**: SSR — это технология рендеринга React-приложений на сервере для улучшения SEO и скорости загрузки.
- **Роль**: Генерация HTML на сервере перед отправкой на клиент, что улучшает производительность и делает приложение более доступным для поисковых систем.

### 18. **Vite**
- **Описание**: Vite — это сборщик и дев-сервер для фронтенд-приложений, ориентированный на высокую скорость разработки.
- **Роль**: Быстрая разработка с использованием Hot Module Replacement (HMR), что ускоряет процесс сборки и тестирования.

### 19. **Emotion (CSS-in-JS)**
- **Описание**: Emotion — это библиотека для работы с CSS, которая позволяет писать стили прямо в JavaScript.
- **Роль**: Управление стилями компонентов с возможностью динамической генерации стилей на сервере и клиенте.

### 20. **BrowserRouter и StaticRouter**
- **Описание**: React Router — это библиотека для роутинга в React-приложениях.
- **Роль**: Используется для навигации в приложении, обеспечивая как клиентский (BrowserRouter), так и серверный (StaticRouter) роутинг для поддержки SSR.

---

## Инфраструктура

### 21. **Docker**
- **Описание**: Docker — это платформа для контейнеризации приложений.
- **Роль**: Контейнеризация всех сервисов, обеспечивая консистентность и простоту развертывания приложений на разных средах.

### 22. **Nginx**
- **Описание**: Nginx — это веб-сервер и балансировщик нагрузки.
- **Роль**: Обеспечивает проксирование запросов, распределение нагрузки между контейнерами, а также обработку статического контента и SSL-шифрование.

### 23. **pgAdmin**
- **Описание**: pgAdmin — это веб-интерфейс для управления базой данных PostgreSQL.
- **Роль**: Обеспечивает удобный интерфейс для администрирования базы данных и мониторинга.

---

Этот стек объединяет мощные инструменты для создания масштабируемых и высокопроизводительных веб-приложений с использованием современных технологий, таких как контейнеризация, сервисы реального времени, серверный рендеринг и оптимизация производительности.
