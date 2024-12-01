import {Sequelize, SequelizeOptions} from 'sequelize-typescript'
import {UserTheme, SiteTheme} from './models/themes'
import {readdir} from 'fs/promises'
import {join} from 'path'

// Извлекаем параметры подключения к базе данных из переменных окружения
const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env;

// Определяем хост, основываясь на текущем окружении (если 'development', то localhost, если нет — берем из переменной окружения POSTGRES_HOST)
const host = process.env.NODE_ENV === 'development' ? 'localhost' : POSTGRES_HOST;

// Настройки для подключения к базе данных с использованием Sequelize
const sequelizeOptions: SequelizeOptions = {
  host: host, // Хост базы данных
  port: Number(POSTGRES_PORT), // Порт для подключения
  username: POSTGRES_USER, // Имя пользователя для подключения
  password: POSTGRES_PASSWORD, // Пароль для подключения
  database: POSTGRES_DB, // Имя базы данных
  dialect: 'postgres', // Диалект базы данных (в нашем случае PostgreSQL)
  models: [UserTheme, SiteTheme], // Указываем модели, которые будут использоваться для работы с базой данных
};

// Создаем экземпляр Sequelize с указанными настройками
export const sequelize = new Sequelize(sequelizeOptions);

// Функция для подключения к базе данных и применения миграций
export async function dbConnect() {
  try {
    // Проверка подключения к базе данных
    await sequelize.authenticate();
    // Синхронизация моделей с базой данных (создание таблиц, если они не существуют)
    await sequelize.sync();

    // Чтение файлов миграций из папки 'migrations'
    const migrationsDirectory = join(__dirname, 'migrations');
    const migrations = await readdir(migrationsDirectory); // Получаем список всех файлов миграций

    // Проходим по каждому файлу миграции и применяем необходимые
    for (const file of migrations) {
      const migration = require(join(migrationsDirectory, file)); // Загружаем миграцию

      // Проверяем, нужно ли применять миграцию (если checkData вернет true)
      if (await migration.checkData()) {
        // Применяем миграцию
        await migration.up(sequelize.getQueryInterface());
      }
    }

    console.log('👍 Соединение с БД успешно установлено'); // Если все прошло успешно
  } catch (error) {
    // Если возникла ошибка при подключении или применении миграций
    console.error('🚨 Ошибка при подключении в БД', error);
  }
}
