### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Запустите `docker`
3. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
4. Соберите проект `yarn docker:build`
5. Для запуска в режиме development `yarn docker:dev`
6. Для запуска в режиме production `yarn docker:up`

### Как добавить зависимости?

В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента
```yarn lerna add {your_dep} --scope client```

Для сервера
```yarn lerna add {your_dep} --scope server```

И для клиента и для сервера
```yarn lerna add {your_dep}```

Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
```yarn lerna add {your_dep} --dev --scope server```

### Docker

#### Используемые образы:

1. server - `./packages/server` обернутый в docker
2. postgres - БД
3. pgAdmin - клиент для БД

#### Команды:

+ Выполните команду `yarn docker` чтобы собрать образы (`Server` и `pgAdmin`) и запустить их
+ Выполните команду `yarn docker:build` чтобы собрать образы (все)
+ Выполните команду `yarn docker:up` чтобы запустить образы (`Server` и `postgres`)
+ Выполните команду `yarn docker:dev` чтобы запустить образы (`postgres` и `pgAdmin`), а также запустить `server` (не
  образ)
+ Выполните команду `yarn docker:stop` чтобы остановить образы

Для корректной работы необходимо наличие файла `.env` со значениями переменных окружения. Пример наполнения представлен
в файле `.env.sample`.

### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

### Линтинг

```yarn lint```

### Форматирование prettier

```yarn format```

### Production build

```yarn build```

И чтобы посмотреть что получилось

`yarn preview --scope client`
`yarn preview --scope server`

## Production окружение в докере

Перед первым запуском выполните `node init.js`

`docker compose up` - запустит три сервиса

1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`
