import React, { useState, useEffect } from 'react'

import { Bascket } from '@my-app/ui-library'

interface BascketItem {
  id: string | number;
  title: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface BascketPageProps {
  onBack?: () => void;
  basketItems?: BascketItem[];
  onUpdateQuantity?: (id: string | number, quantity: number) => void;
  onRemoveItem?: (id: string | number) => void;
  onClearCart?: () => void;
  onCheckout?: () => void;
}

const BascketPage: React.FC<BascketPageProps> = ({ 
  onBack, 
  basketItems = [], 
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout
}) => {
  const [items, setItems] = useState<BascketItem[]>(() => {
    if (basketItems.length > 0) {
      return basketItems
    }
    const saved = localStorage.getItem('bascket')

    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    if (basketItems.length > 0 || basketItems.length === 0) {
      setItems(basketItems)
    }
  }, [basketItems])

  const updateQuantity = (id: string | number, quantity: number) => {
    if (quantity < 1) {
      removeFromBascket(id)

      return
    }
    
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, quantity } : item
    )
    
    setItems(updatedItems)
    localStorage.setItem('bascket', JSON.stringify(updatedItems))
  }

  const removeFromBascket = (id: string | number) => {
    const updatedItems = items.filter(item => item.id !== id)

    setItems(updatedItems)
    localStorage.setItem('bascket', JSON.stringify(updatedItems))
  }

  const clearBascket = () => {
    setItems([])
    localStorage.removeItem('bascket')
    alert('Корзина очищена')
  }

  // Используем переданные функции или локальные
  const handleUpdateQuantity = onUpdateQuantity || updateQuantity
  const handleRemoveItem = onRemoveItem || removeFromBascket
  const handleClearCartWrapper = onClearCart || clearBascket

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout()
    } else {
      const total = calculateTotal()

      alert(`Заказ оформлен! Товаров: ${items.length}, Общая сумма: ${total} ₽`)
      handleClearCartWrapper()
      if (onBack) onBack()
    }
  }

  const calculateTotal = (): number => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const calculateItemsCount = (): number => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }

  const handleBackClick = () => {
    if (onBack) {
      onBack()
    }
  }

  const convertToUIItems = () => {
    return items.map(item => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      imageUrl: item.imageUrl
    }))
  }

  const handleQuantityChange = (itemId: string | number, newQuantity: number) => {
    handleUpdateQuantity(itemId, newQuantity)
  }

  const handleItemRemove = (itemId: string | number) => {
    handleRemoveItem(itemId)
  }

  return (
    <div className="app">
      <header className="page-header">
        <div className="page-header__content">
          <button className="page-header__back-btn" onClick={handleBackClick}>
            ← Назад
          </button>
          <h1 className="page-header__title">Корзина покупок</h1>
          <p className="page-header__subtitle">
            {calculateItemsCount() > 0 
              ? `У вас ${calculateItemsCount()} товаров на сумму ${calculateTotal()} ₽`
              : 'Ваши выбранные товары'
            }
          </p>
        </div>
      </header>

      <main className="app__main">
        <section className="app__section">
          <div className="app__catalog bascket-page__container">
            <h2 className="app__section-title bascket-page__title">
              Ваша корзина
            </h2>
            
            {items.length === 0 ? (
              <div className="bascket-page__empty">
                <div className="bascket-page__empty-icon">🛒</div>
                <h3 className="bascket-page__empty-heading">
                  Корзина пуста
                </h3>
                <p className="bascket-page__empty-text">
                  Добавьте товары из каталога, чтобы сделать покупки
                </p>
                <button 
                  className="app__view-all-btn"
                  onClick={handleBackClick}
                >
                  Перейти в каталог
                </button>
              </div>
            ) : (
              <>
                <Bascket
                  items={convertToUIItems()}
                  onQuantityChange={handleQuantityChange}
                  onRemoveItem={handleItemRemove}
                  onClearCart={handleClearCartWrapper} 
                  onCheckout={handleCheckout}
                />
              </>
            )}
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

export default BascketPage