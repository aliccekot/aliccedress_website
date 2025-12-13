import React, { useState } from 'react'
import './App.css'

// Импорт изображений товаров
import photo1 from './assets/dress.jpg'
import photo6 from './assets/evening_dress.jpg'
import photo2 from './assets/jacket.jpg'
import photo7 from './assets/jeans.jpg'
import photo3 from './assets/shirt.jpg'
import photo9 from './assets/skirt.jpg'
import photo5 from './assets/sweater.jpg'
import photo4 from './assets/trousers.jpg'
import photo8 from './assets/trousers2.jpg'
import BascketPage from './pages/BascketPage'
import CatalogPage from './pages/CatalogPage'
import HomePage from './pages/HomePage'
import ProductCardPage from './pages/ProductCardPage'
import ProfilePage from './pages/ProfilePage'

import type { Product } from '@my-app/ui-library'
import '@my-app/ui-library/style.css'

// База данных товаров для магазина одежды
const clothingProducts: Product[] = [
  {
    id: 1,
    imageUrl: photo1,
    title: 'Летнее платье',
    description: 'Легкое хлопковое платье с цветочным принтом, идеально для жарких дней',
    price: 4599
  },
  {
    id: 2,
    imageUrl: photo2,
    title: 'Джинсовая куртка',
    description: 'Классическая джинсовая куртка с современным кроем и удобными карманами',
    price: 7999
  },
  {
    id: 3,
    imageUrl: photo3,
    title: 'Классическая рубашка',
    description: 'Хлопковая рубашка с длинными рукавами, подходит для офиса и повседневной носки',
    price: 3999
  },
  {
    id: 4,
    imageUrl: photo4,
    title: 'Спортивные брюки',
    description: 'Базовые брюки для тренировок с высокой талией и карманом для телефона',
    price: 3499
  },
  {
    id: 5,
    imageUrl: photo5,
    title: 'Вязаный свитер',
    description: 'Теплый свитер из мягкой шерсти с узором кос, идеален для холодной погоды',
    price: 6599
  },
  {
    id: 6,
    imageUrl: photo6,
    title: 'Вечернее платье',
    description: 'Элегантное вечернее платье с открытыми плечами и струящимся силуэтом',
    price: 12999
  },
  {
    id: 7,
    imageUrl: photo7,
    title: 'Джинсы',
    description: 'Джинсы Wide leg в светло-голубом цвете с удобной посадкой',
    price: 5999
  },
  {
    id: 8,
    imageUrl: photo8,
    title: 'Брюки',
    description: 'Широкие классические брюки в коричневом цвете',
    price: 5999
  },
  {
    id: 9,
    imageUrl: photo9,
    title: 'Юбка',
    description: 'Черная мини-юбка с рюшами',
    price: 2799
  }
]

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'bascket' | 'product' | 'catalog' | 'profile'>('home')
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)

  // Обработчик для возврата на главную
  const navigateToHome = () => {
    setCurrentPage('home')
    setSelectedProductId(null)
  }

  // Обработчик для перехода в каталог
  const navigateToCatalog = () => {
    setCurrentPage('catalog')
  }

  // Обработчик выбора товара на главной странице
  const handleProductSelect = (productId: number) => {
    setSelectedProductId(productId)
    setCurrentPage('product')
  }

  // Обработчик добавления в корзину
  const handleAddToCart = (productId: number) => {
    // Находим товар по ID и показываем уведомление
    const product = clothingProducts.find(p => p.id === productId)
    
    alert(`"${product?.title}" добавлен в корзину!`)
  }

  // Создаем единую шапку для всех страниц
  const renderHeader = () => (
    <header className="app__header-new">
      <div className="app__header-top">
        <div className="app__logo-container">
          <h1 className="app__logo">aliccedress</h1>
          <div className="app__logo-decoration"></div>
        </div>
        <div className="app__header-right">
          <div className="app__nav-buttons">
            <button 
              className={`app__nav-page-btn ${currentPage === 'home' ? 'app__nav-page-btn--active' : ''}`}
              onClick={navigateToHome}
            >
              Главная
            </button>
            <button 
              className={`app__nav-page-btn ${currentPage === 'catalog' ? 'app__nav-page-btn--active' : ''}`}
              onClick={navigateToCatalog}
            >
              Каталог
            </button>
            <button 
              className={`app__nav-page-btn ${currentPage === 'bascket' ? 'app__nav-page-btn--active' : ''}`}
              onClick={() => setCurrentPage('bascket')}
            >
              Корзина
            </button>
            <button 
              className={`app__nav-page-btn ${currentPage === 'profile' ? 'app__nav-page-btn--active' : ''}`}
              onClick={() => setCurrentPage('profile')}
            >
              Профиль
            </button>
          </div>
        </div>
      </div>
    </header>
  )

  return (
    <div className="app">
      {renderHeader()}

      {/* Отображаем выбранную страницу */}
      {currentPage === 'home' && (
        <HomePage 
          onProductSelect={handleProductSelect}
          onAddToCart={handleAddToCart}
          onNavigateToCatalog={navigateToCatalog}
          products={clothingProducts} 
        />
      )}
      {currentPage === 'catalog' && (
        <CatalogPage 
          onProductSelect={handleProductSelect}
          onAddToCart={handleAddToCart}
          onBack={navigateToHome}
        />
      )}
      {currentPage === 'bascket' && <BascketPage />}
      {currentPage === 'product' && (
        <ProductCardPage 
          productId={selectedProductId?.toString()} 
          onBack={navigateToHome}
        />
      )}
      {currentPage === 'profile' && (
        <ProfilePage 
          onBack={navigateToHome}
        />
      )}
    </div>
  )
}

export default App