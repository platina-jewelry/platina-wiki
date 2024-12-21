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
  host: host,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  models: [UserTheme, SiteTheme],
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
    // Получаем список всех файлов миграций
    const migrations = await readdir(migrationsDirectory);

    // Проходим по каждому файлу миграции и применяем необходимые
    for (const file of migrations) {
      // Загружаем миграцию
      const migration = require(join(migrationsDirectory, file));

      // Проверяем, нужно ли применять миграцию (если checkData вернет true)
      if (await migration.checkData()) {
        // Применяем миграцию
        await migration.up(sequelize.getQueryInterface());
      }
    }

    console.log('👍 Соединение с БД успешно установлено');
  } catch (error) {
    // Если возникла ошибка при подключении или применении миграций
    console.error('🚨 Ошибка при подключении в БД', error);
  }
}
