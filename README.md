# Стек технологий

Подробное описание всех технологий, используемых в проекте, можно найти в файле [_stack.md](./_stack.md).

# Документация по работе с проектом и Docker

## Как запускать

1. Убедитесь, что у вас установлены `node` и `docker`.
2. Запустите Docker.
3. Выполните команду для установки зависимостей:

 ```bash
npm uninstall -g yarn
npm install -g yarn
yarn add rimraf --dev -W
yarn install

yarn bootstrap
 ```

## Как добавить зависимости

Чтобы добавить зависимость для клиента:

```bash
yarn lerna add {your_dep} --scope client
yarn lerna add @editorjs/paragraph --scope client
```

Для сервера:

```bash
yarn lerna add {your_dep} --scope server
```

Для обоих (клиента и сервера):

```bash
yarn lerna add {your_dep}
```

Если нужно добавить dev-зависимость:

```bash
yarn lerna add {your_dep} --dev --scope server
```

## Тесты

Чтобы выполнить тесты, используйте команду:

```bash
yarn test
```

## Линтинг

Для проверки кода на ошибки используйте команду:

```bash
yarn lint
```

## Форматирование с Prettier

Для форматирования кода с использованием Prettier:

```bash
yarn format
```

## Продакшн сборка

Для создания сборки для продакшн:

```bash
yarn build
```

## Docker

### Используемые образы

1. **server** — сервер, расположенный в `./packages/server`, обернутый в Docker.
2. **postgres** — база данных PostgreSQL.
3. **pgAdmin** — клиент для работы с PostgreSQL.

### Команды Docker

- **Собрать образы и запустить их**: Это общая команда, которая обычно используется для запуска Docker-команд в проекте.

```bash
yarn docker
```

- **Собрать все образы**: Эта команда обычно отвечает только за сборку Docker образов.

```bash
yarn docker:build
```

- **Запустить образы**:

```bash
yarn docker:up
```

- **Запустить образы, а также сервер в разработческом режиме**:

```bash
yarn docker:dev
```

- **Остановить контейнеры**:

```bash
yarn docker:stop
```

Для корректной работы необходимо наличие файла `.env` со значениями переменных окружения. Пример наполнения представлен
в файле `.env.sample`.

### Очистка кэша и перезапуск Docker

Если возникают проблемы с кэшированием или зависшими контейнерами, выполните следующие шаги:

1. Остановите все контейнеры:

 ```bash
docker-compose down
 ```

2. Очистите неиспользуемые контейнеры, образы и тома:

 ```bash
docker system prune -a
 ```

## Просмотр результата

Чтобы просмотреть результат сборки:

```bash
yarn preview --scope client
yarn preview --scope server
```

## Продакшн окружение в Docker

Перед первым запуском выполните:

```bash
node init.js
```

Запустите сервисы:

```bash
docker compose up
```

Это запустит три сервиса:

1. **nginx** — раздающий клиентскую статику (client).
2. **node** — ваш сервер (server).
3. **postgres** — база данных (postgres).

Если вам нужно запустить только один сервис, уточните его в команде:

```bash
docker compose up {service_name}
```

Пример для сервера:

```bash
docker compose up server
```

## Как попасть в файловую систему Docker контейнера и просматривать файлы

### 1. Получение доступа к контейнеру

Чтобы получить доступ к файловой системе работающего контейнера, используйте команду `docker exec`.

1. **Найдите имя контейнера**

   Чтобы узнать имя контейнера, используйте команду:

 ```bash
   docker ps
 ```

Пример вывода:

 ```
   CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS        PORTS                    NAMES
   245cbd891eb1   platina-wiki   "docker-entrypoint.s…"   8 minutes ago   Up 1 second   0.0.0.0:3000->3000/tcp   platina-wiki
 ```

В данном примере имя контейнера — `platina-wiki`.

2. **Получите доступ к контейнеру**

   Используйте команду `docker exec` для доступа к файловой системе контейнера:

 ```bash
   docker exec -it platina-wiki bash
 ```

Команда `-it` позволяет работать в интерактивном режиме с терминалом контейнера.

После этого вы попадете в контейнер и сможете исследовать его файловую систему.

### 2. Исследование файловой системы

После того как вы окажетесь внутри контейнера, вы можете использовать стандартные команды Linux для навигации и
просмотра файлов:

- **Перейти в корневую директорию:**

```bash
  cd /
```

- **Просмотреть список файлов в текущей директории:**

```bash
  ls
```

- **Перейти в другую директорию:**

```bash
  cd /path/to/directory
```

### Создание сертификата
```bash
openssl req -new -newkey rsa:2048 -days 365 -nodes -x509 -keyout C:\xampp\htdocs\domains\platina-wiki\ssl\certs\localhost.key -out C:\xampp\htdocs\domains\platina-wiki\ssl\certs\localhost.crt
```
