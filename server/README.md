# Конфигурация через .env

Все настройки приложения вынесены в файл `.env`. Создайте этот файл на основе `.env.example`:

```bash
cp .env.example .env
```

## Переменные окружения

| Переменная | Описание | Пример |
|------------|----------|--------|
| `NODE_PORT` | Порт сервера | `3004` |
| `NODE_JWT_SECRET` | Секретный ключ для JWT (обязательно) | `your-secret-key` |
| `SALT_ROUNDS` | Количество раундов хеширования пароля | `10` |
| `NODE_MONGO_PASSWORD` | Пароль MongoDB | `mongopassword` |
| `NODE_MONGO_DB` | Имя базы данных MongoDB | `clinic_db` |
| `NODE_MONGO_PORT` | Порт MongoDB | `27017` |
| `NODE_ENV` | Окружение (`development`/`production`) | `development` |

---

# Централизованная обработка ошибок

## asyncHandler

Обёртка для асинхронных обработчиков маршрутов. Автоматически перехватывает ошибки и передаёт их в middleware обработки ошибок.

**Использование:**
```javascript
const { asyncHandler } = require('./middleware/errorHandler');

router.get('/', asyncHandler(async (req, res) => {
    const data = await fetchData();
    res.json(data);
}));
```

## errorHandler

Централизованный middleware для обработки всех типов ошибок:

- **Ошибки валидации Joi** → 400 Bad Request
- **Ошибки валидации Mongoose** → 400 Bad Request
- **Дублирование уникальных полей** → 409 Conflict
- **Некорректный ObjectId** → 400 Bad Request
- **Кастомные ошибки приложения** → соответствующий статус
- **Необработанные ошибки** → 500 Internal Server Error

**Подключение:**
```javascript
app.use(errorHandler); // Должен быть последним middleware
```

---

# Унифицированная валидация

## Схемы валидации (Joi)

Все схемы определены в `utils/validation.js`:

- `loginSchema` — валидация логина
- `userRegisterSchema` — валидация регистрации
- `ticketCreateSchema` — валидация создания тикета

## validateRequest Middleware

Middleware для автоматической валидации запросов:

```javascript
const { validateRequest } = require('./utils/errors');
const { loginSchema } = require('./utils/validation');

router.post('/login', 
    validateRequest(loginSchema),
    asyncHandler(async (req, res) => {
        // req.body уже валидирован
    })
);
```

---

# Кастомные классы ошибок

В `utils/errors.js` определены классы ошибок для различных ситуаций:

| Класс ошибки | Статус | Описание |
|--------------|--------|----------|
| `ValidationError` | 400 | Ошибка валидации данных |
| `UnauthorizedError` | 401 | Требуется авторизация |
| `ForbiddenError` | 403 | Доступ запрещён |
| `NotFoundError` | 404 | Ресурс не найден |
| `ConflictError` | 409 | Конфликт (например, дубликат) |

**Пример использования:**
```javascript
const { NotFoundError, UnauthorizedError } = require('./utils/errors');

// В контроллере
if (!user) {
    throw new NotFoundError('Пользователь не найден');
}

if (!isAuthorized) {
    throw new UnauthorizedError('Доступ запрещён');
}
```

---

# Структура файлов

```
server/
├── .env.example          # Шаблон переменных окружения
├── index.js              # Точка входа
├── constants/
│   └── index.js          # Константы из .env
├── controllers/          # Бизнес-логика
├── middleware/
│   ├── auth.js           # Middleware авторизации
│   └── errorHandler.js   # Обработка ошибок + asyncHandler
├── models/               # Mongoose модели
├── routes/               # Маршруты
├── utils/
│   ├── errors.js         # Классы ошибок + validateRequest
│   └── validation.js     # Схемы Joi
└── package.json
```
