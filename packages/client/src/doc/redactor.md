# Техническое задание для создания функционала редактирования статей в вики на React

## 1. Цель проекта

Целью проекта является создание функционала для удобного добавления и редактирования статей внутри внутренней
вики-компании. Этот функционал должен позволять пользователям работать с текстом, изображениями, видео и кодом в статьях
без необходимости использования кода, а также обеспечивать удобство работы с блоками контента (перетаскивание, удаление,
редактирование).

## 2. Требования к функционалу

### 2.1. Редактирование текста

- Возможность редактировать текст с форматированием.
  - Поддержка стандартных инструментов форматирования:
    - Заголовки (H1, H2, H3)
    - Жирный и курсивный текст
    - Подчеркнутый, зачеркнутый текст
    - Маркированные и нумерованные списки
    - Вставка ссылок
    - Вставка цитат

### 2.2. Работа с изображениями

- Поддержка загрузки изображений:
  - Перетаскивание (drag-and-drop) изображений.
  - Вставка изображений с указанием URL.
- Возможность редактировать изображения:
  - Изменение размера.
  - Выравнивание по левому/правому краю.
  - Обтекание текста вокруг изображения.
  - Интерактивный предпросмотр изменений.

### 2.3. Работа с видео

- Поддержка вставки видео:
  - Вставка видео с YouTube, Vimeo и других видеохостингов через URL.
  - Прямое вставление видеофайлов с компьютера.
- Возможность редактировать видео:
  - Поддержка авто- и ручного выравнивания.
  - Редактирование размеров встраиваемого видео.

### 2.4. Работа с кодом

- Возможность вставки фрагментов кода:
  - Поддержка различных языков программирования.
  - Подсветка синтаксиса.
  - Возможность редактировать фрагменты кода.
- Автосохранение изменений.

### 2.5. Блоки контента

- Возможность работы с различными блоками контента:
  - Текстовый блок
  - Блок с изображением
  - Блок с видео
  - Блок с кодом
  - Блок с цитатами
- Перетаскивание блоков:
  - Возможность перемещать блоки по странице с помощью drag-and-drop.
  - Изменение порядка блоков на странице.
- Удаление блоков:
  - Возможность удаления блока с контентом.
  - Подтверждение удаления (с предупреждением о потере данных).

### 2.6. Режим предпросмотра

- Возможность просматривать статью в режиме предпросмотра перед сохранением.
- Просмотр всех изменений, сделанных в статье, в реальном времени.
- Поддержка разных режимов просмотра (например, для мобильных и десктопных версий).

### 2.7. История изменений

- Ведение истории изменений статьи.
- Возможность отката к предыдущим версиям статьи.
- Просмотр даты и времени каждого изменения, а также автора изменений.

### 2.8. Автосохранение

- Автосохранение работы над статьёй, чтобы избежать потери данных.
- Интервал автосохранения — 30 секунд (настраиваемый).
- Показ состояния автосохранения пользователю (например, "Сохранено" или "Сохранение...").

### 2.9. Публикация и сохранение черновиков

- Возможность публиковать статью, чтобы она стала доступной для других пользователей.
- Возможность сохранять статью как черновик, чтобы она оставалась доступной только для редактирующего пользователя.

## 3. Интерфейс пользователя (UI/UX)

### 3.1. Редактор

- Простота интерфейса:
  - Интуитивно понятный и минималистичный.
  - Панель инструментов с кнопками для форматирования текста (жирный, курсив, подчеркивание и т.д.).
  - Кнопки для вставки изображений, видео, ссылок и кода.
  - Разделение редактора на области для текста, медиа-контента и кода.

### 3.2. Интерактивность

- Уведомления об успешных действиях (сохранение, публикация, ошибка).
- Подсказки и инструменты для работы с изображениями, видео и кодом.
- Визуальные элементы для перетаскивания блоков (иконки и области захвата).
- Подсказки при работе с блоками и их перемещении.

### 3.3. Режим предпросмотра

- Кнопка для активации режима предпросмотра, которая будет показывать, как статья будет выглядеть в готовом виде.
- Поддержка переключения между редактированием и предпросмотром.

## 4. Технологические требования

### 4.1. Технологии и библиотеки

- React (для построения пользовательского интерфейса).
- React-Redux или React Context для управления состоянием.
- React DnD (или аналогичная библиотека) для реализации перетаскивания блоков.
- Draft.js или Slate.js для реализации редактора текста.
- React-Quill (или аналог) для поддержки форматирования текста и работы с изображениями.
- Axios или Fetch для работы с API.
- CSS-in-JS (например, styled-components) для стилизации компонентов.
- React Helmet для управления мета-данными статьи (если необходимо).

### 4.2. Система хранения данных

- Использование REST API или GraphQL для взаимодействия с сервером.
- База данных для хранения статей (например, PostgreSQL или MongoDB).
- Механизм авторизации и аутентификации для проверки прав пользователя на создание/редактирование/удаление статей.

### 4.3. Безопасность

- Обработка и защита данных пользователя (например, защита от XSS атак).
- Проверка прав доступа пользователя для редактирования/удаления статей.

## 5. Требования к производительности

- Редактирование и загрузка страниц должно происходить быстро (оптимизация под скорость).
- Работа с большими изображениями и видео должна быть оптимизирована, чтобы не создавать задержек.

## 6. План разработки

- **Этап 1**: Разработка интерфейса редактора и панелей инструментов.
- **Этап 2**: Реализация перетаскивания блоков и взаимодействия с контентом.
- **Этап 3**: Реализация работы с текстом, изображениями, видео и кодом.
- **Этап 4**: Разработка режима предпросмотра и автосохранения.
- **Этап 5**: Ведение истории изменений и возможность отката.
- **Этап 6**: Тестирование, багфиксинг и улучшение производительности.

## 7. Заключение

Этот функционал должен обеспечить простоту и удобство в использовании для сотрудников компании, чтобы они могли без
проблем создавать, редактировать и публиковать статьи в вики-системе.

# Стек технологий для реализации функционала редактирования статей

## 1. **Frontend**

### 1.1. **React**

- **Основная библиотека для построения пользовательского интерфейса.**
- React позволит создавать компоненты для редактирования, управления состоянием и обновления UI без перезагрузки
  страницы.

### 1.2. **React-Redux или React Context**

- **Для управления состоянием приложения.**
- **React-Redux** для централизованного управления состоянием, если приложение будет сложным.
- **React Context** для более простого управления состоянием, если логика состояния не слишком сложная.

### 1.3. **Draft.js или Slate.js**

- **Библиотеки для реализации WYSIWYG-редактора текста.**
- **Draft.js** — гибкий и мощный редактор текста, поддерживающий форматирование, вставку изображений и видео.
- **Slate.js** — библиотека для создания текстовых редакторов с поддержкой расширяемости, подходит для более сложных и
  индивидуальных решений.

### 1.4. **React-Quill**

- **Библиотека для интеграции Quill — популярного WYSIWYG-редактора.**
- Идеальна для быстрого и удобного создания редактора с поддержкой различных типов контента (текст, изображения, видео,
  таблицы, цитаты).

### 1.5. **React DnD**

- **Библиотека для реализации функционала перетаскивания блоков контента.**
- React DnD обеспечит возможность перемещать блоки (тексты, изображения, видео, код) по странице с помощью
  drag-and-drop.

### 1.6. **CSS-in-JS (styled-components)**

- **Для стилизации компонентов с использованием JavaScript.**
- **styled-components** позволяет легко создавать стилизованные компоненты, поддерживая динамические стили, которые
  могут зависеть от состояния приложения.

## 2. **Дополнительные библиотеки и инструменты**

### 2.1. **Axios или Fetch**

- **Для отправки запросов на сервер.**
- **Axios** или встроенный **Fetch** будут использоваться для взаимодействия с сервером, например, для загрузки
  изображений и видео, а также для отправки данных о статьях.

### 2.2. **React Helmet**

- **Для управления мета-данными страницы.**
- **React Helmet** будет использоваться для обновления мета-данных страницы, таких как заголовки, описания и другие
  теги, в зависимости от контента статьи.

