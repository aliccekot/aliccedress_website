main-app/
├── public/
│ ├── index.html
│ └── assets/
│ ├── images/
│ └── icons/
├── src/
│ ├── components/ # Специфичные компоненты приложения
│ │ ├── layout/
│ │ │ ├── Header/
│ │ │ ├── Footer/
│ │ │ └── Layout.jsx
│ │ ├── product/
│ │ │ ├── ProductCard/
│ │ │ ├── ProductList/
│ │ │ └── ProductDetails/
│ │ ├── cart/
│ │ │ ├── CartItem/
│ │ │ └── CartSummary/
│ │ └── auth/
│ │ ├── LoginForm/
│ │ └── RegisterForm/
│ ├── pages/ # Страницы приложения
│ │ ├── Home/
│ │ ├── Catalog/
│ │ ├── Product/
│ │ ├── Profile/
│ │ ├── Cart/
│ │ ├── Checkout/
│ │ └── Auth/
│ ├── hooks/ # Кастомные хуки
│ │ ├── useAuth.js
│ │ ├── useCart.js
│ │ └── useProducts.js
│ ├── services/ # API вызовы
│ │ ├── api.js
│ │ ├── authService.js
│ │ └── productService.js
│ ├── utils/ # Вспомогательные функции
│ ├── contexts/ # React Contexts
│ │ ├── AuthContext.js
│ │ └── CartContext.js
│ ├── App.jsx
│ └── index.js
├── package.json
└── README.md

