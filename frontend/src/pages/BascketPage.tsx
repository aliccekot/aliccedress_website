import React from 'react'

import { Bascket } from '@my-app/ui-library'

interface BasketPageProps {
  onBack?: () => void;
}

const BasketPage: React.FC<BasketPageProps> = ({ onBack }) => {
  const isCartOpen = true

  const handleToggleCart = () => {
    alert('Функционал открытия/закрытия корзины будет реализован позже')
  }

  // Обработчик клика по кнопке назад
  const handleBackClick = () => {
    if (onBack) {
      onBack()
    } else {
      window.location.href = '/'
    }
  }

  return (
    <div className="app">
      
      <header className="page-header">
        <div className="page-header__content">
          <button className="page-header__back-btn" onClick={handleBackClick}>
            ← Назад
          </button>
          <h1 className="page-header__title">Корзина покупок</h1>
          <p className="page-header__subtitle">Ваши выбранные товары</p>
        </div>
      </header>

      <main className="app__main">
        <section className="app__section">
          <div className="app__catalog">
            <div 
              className="basket-page__demo-container" 
              style={{ 
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '200px',
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '40px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
              }}
            >
              <Bascket 
                isOpen={isCartOpen}
                onToggle={handleToggleCart}
              />
            </div>
          </div>
        </section>
      </main>

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

export default BasketPage