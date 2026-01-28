# Foundation Landing (RU + KZ)

Лендинг на **Next.js (React)** с анимациями (**framer-motion**), формой заявки и простой админкой.

## Что внутри
- RU/KZ переключатель (в шапке)
- Форма заявки (сохранение в SQLite: `./data/foundation.db`)
- Админ-панель `/admin` (пароль из `.env.local`)
- Экспорт заявок в CSV из админки
- Темная стилистика + анимации

## Запуск локально
1) Установите зависимости:
```bash
npm i
```

2) Создайте `.env.local` на основе `.env.example` и задайте пароль админа:
```bash
cp .env.example .env.local
```

3) Запуск:
```bash
npm run dev
```

Откройте:
- сайт: http://localhost:3000
- админка: http://localhost:3000/admin

## Где лежат заявки
- SQLite файл: `./data/foundation.db`
- Таблица: `leads`

## Деплой (важно)
SQLite **не подходит** для serverless-хостингов с эфемерным диском (например, Vercel).  
Для продакшена лучше заменить хранилище заявок на Postgres/Neon/Supabase.

## Настройка контента
- тексты/пакеты/программы: `lib/content.ts`
- переводы: `lib/i18n.ts`
- секции: `components/sections/*`
