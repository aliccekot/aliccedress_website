# Архитектура проекта

## Структура проекта

### Проект 1: Основное приложение (main-app)

main-app/
├── public/
│ ├── index.html
│ └── assets/
│ ├── images/
│ └── icons/
├── src/
│ ├── components/ # Компоненты приложения
│ │ ├── layout/
│ │ │ ├── Header/ # Шапка сайта
│ │ │ ├── Footer/ # Подвал сайта
│ │ │ └── Layout.jsx # Основной layout
│ │ ├── product/
│ │ │ ├── ProductCard/ # Карточка товара в каталоге
│ │ │ ├── ProductList/ # Список товаров
│ │ │ └── ProductDetails/ # Детальная страница товара
│ │ ├── cart/
│ │ │ ├── CartItem/ # Элемент корзины
│ │ │ └── CartSummary/ # Итоги корзины
│ │ └── auth/
│ │ ├── LoginForm/ # Форма входа
│ │ └── RegisterForm/# Форма регистрации
│ ├── pages/ # Страницы
│ │ ├── Home/ # Главная страница
│ │ ├── Catalog/ # Каталог товаров
│ │ ├── Product/ # Страница товара
│ │ ├── Profile/ # Личный кабинет
│ │ ├── Cart/ # Корзина
│ │ ├── Checkout/ # Оформление заказа
│ │ └── Auth/ # Авторизация
│ ├── hooks/ # Кастомные хуки
│ │ ├── useAuth.js # Хук для авторизации
│ │ ├── useCart.js # Хук для работы с корзиной
│ │ └── useProducts.js # Хук для работы с товарами
│ ├── services/ # API сервисы
│ │ ├── api.js # Базовые настройки API
│ │ ├── authService.js # Сервис авторизации
│ │ └── productService.js # Сервис товаров
│ ├── utils/ # Вспомогательные функции
│ ├── contexts/ # React Contexts
│ │ ├── AuthContext.js # Контекст авторизации
│ │ └── CartContext.js # Контекст корзины
│ ├── App.jsx
│ └── index.js
├── package.json
└── README.md


### Проект 2: Библиотека общих компонентов (ui-library)

ui-library/
├── src/
│ ├── components/ # Переиспользуемые компоненты
│ │ ├── common/
│ │ │ ├── Button/ # Кнопка (основной UI элемент)
│ │ │ ├── Input/ # Поле ввода
│ │ │ ├── Modal/ # Модальное окно
│ │ │ ├── Card/ # Карточка для контента
│ │ │ └── Loader/ # Индикатор загрузки
│ │ ├── navigation/
│ │ │ ├── Navbar/ # Навигационная панель
│ │ │ └── Breadcrumbs/ # Хлебные крошки
│ │ └── layout/
│ │ ├── Container/ # Контейнер для контента
│ │ └── Grid/ # Сетка для layout
│ ├── styles/
│ │ ├── theme.js # Тема приложения
│ │ ├── global.css # Глобальные стили
│ │ └── variables.css # CSS переменные
│ └── index.js # Точка входа
├── package.json
└── README.md