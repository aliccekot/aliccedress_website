import React, { useState } from 'react'

import { Catalog } from '@my-app/ui-library'

import look1 from '../assets/look1.jpg' 
import look2 from '../assets/look2.jpg'
import look3 from '../assets/look3.jpg'

import type { Product } from '@my-app/ui-library'

interface HomePageProps {
  onProductSelect: (productId: number) => void;
  onAddToCart: (productId: number) => void;
  onNavigateToCatalog: () => void;
  products: Product[]; // Добавляем пропс
}

const HomePage: React.FC<HomePageProps> = ({ 
  onProductSelect, 
  onAddToCart,
  products // Получаем данные
}) => {
  const [cart, setCart] = useState<number[]>([])

  const handleAddToCart = (productId: string | number) => {
    const id = Number(productId)

    setCart(prev => {
      if (!prev.includes(id)) {
        return [...prev, id]
      }

      return prev
    })
    onAddToCart(id)
  }

  const handleDetailsClick = (productId: string | number) => {
    onProductSelect(Number(productId))
  }

  const clearCart = () => {
    setCart([])
    alert('Корзина очищена!')
  }

  return (
    <div className="app">
      {/* Информация о корзине */}
      <div className="app__cart-summary">
        <div className="app__cart-summary-content">

          {cart.length > 0 && (
            <button className="app__clear-cart" onClick={clearCart}>
              Очистить корзину
            </button>
          )}
        </div>
      </div>

      <main className="app__main">
        {/* Секция с приветствием */}
        <section className="app__section">
          <div className="app__welcome">
            <h2 className="app__welcome-title">aliccedress - стильная одежда для каждого сезона</h2>
          </div>
        </section>

        {/* Секция LookBook */}
        <section className="app__section">
          <h2 className="app__section-title">LookBook</h2>
          <div className="lookbook">
            <div className="lookbook__grid">
              <div className="lookbook__item">
                <img src={look1} alt="Look 1" className="lookbook__image" />
              </div>
              <div className="lookbook__item">
                <img src={look2} alt="Look 2" className="lookbook__image" />
              </div>
              <div className="lookbook__item">
                <img src={look3} alt="Look 3" className="lookbook__image" />
              </div>
            </div>
          </div>
        </section>

        {/* Секция с избранными товарами */}
        <section className="app__section">
          <h2 className="app__section-title">Bestsellers</h2>
          <div className="app__catalog">
            <Catalog
              products={products.slice(0, 3).map(product => ({
                ...product,
                price: `${(product.price as number)} ₽`
              }))}
              onProductClick={handleDetailsClick}
              onAddToCart={handleAddToCart}
              textPosition="left"
              showAddToCart={true}
              className="app__catalog-grid"
            />
          </div>
        </section>
      </main>

      {/* Подвал приложения */}
      <footer className="app__footer">
        <div className="app__footer-content">
          <p>&copy; 2025 aliccedress. Все права защищены.</p>
          <div className="app__footer-links">
            <a href="#about">О нас</a>
            <a href="#contact">Контакты</a>
            <a href="#delivery">Доставка</a>
            <a href="#returns">Возврат</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage