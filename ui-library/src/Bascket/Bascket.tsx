import React, { useState, useEffect } from 'react'
import './Bascket.css'

export interface BasketItem {
  id: string | number
  title: string
  price: number
  quantity: number
  imageUrl?: string
}

export interface BascketProps {
  isOpen?: boolean
  onToggle?: () => void
  items?: BasketItem[]
  onQuantityChange?: (id: string | number, quantity: number) => void
  onRemoveItem?: (id: string | number) => void
  onClearCart?: () => void
  onCheckout?: () => void
}

const Bascket: React.FC<BascketProps> = ({
  items = [],
  onQuantityChange,
  onRemoveItem,
  onClearCart,
  onCheckout
}) => {
  const [localItems, setLocalItems] = useState<BasketItem[]>(items)

  // Улучшенная синхронизация - сбрасываем localItems при каждом изменении items
  useEffect(() => {
    setLocalItems(items)
  }, [items])

  // Сброс localItems при очистке корзины
  const handleClearCart = () => {
    if (onClearCart) {
      onClearCart()
    }
    setLocalItems([])
  }

  const handleQuantityChange = (id: string | number, newQuantity: number) => {
    if (newQuantity < 1) return
    
    if (onQuantityChange) {
      onQuantityChange(id, newQuantity)
    } else {
      setLocalItems(prev => prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ))
    }
  }

  const handleRemoveItem = (id: string | number) => {
    if (onRemoveItem) {
      onRemoveItem(id)
    } else {
      setLocalItems(prev => prev.filter(item => item.id !== id))
    }
  }

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout()
    } else {
      alert(`Заказ оформлен! Товаров: ${localItems.length}, Общая сумма: ${calculateTotal()} ₽`)
      handleClearCart()
    }
  }

  const calculateTotal = (): number => {
    return localItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const calculateItemsCount = (): number => {
    return localItems.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <div className="bascket">
      <div className="bascket__title">
        <span>Корзина покупок</span>
        {calculateItemsCount() > 0 && (
          <span className="bascket__counter">
            {calculateItemsCount()} шт.
          </span>
        )}
      </div>

      {localItems.length === 0 ? (
        <div className="bascket__empty">
          <div className="bascket__empty-icon">🛒</div>
          <h4 className="bascket__empty-title">Корзина пуста</h4>
          <p className="bascket__empty-text">Добавьте товары из каталога</p>
        </div>
      ) : (
        <>
          <div className="bascket__items-container">
            {localItems.map(item => (
              <div key={item.id} className="bascket__item">
                <div className="bascket__image-container">
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="bascket__image"
                    />
                  ) : (
                    <span style={{ fontSize: "20px" }}></span>
                  )}
                </div>
                
                <div className="bascket__item-info">
                  <div className="bascket__item-title">{item.title}</div>
                  <div className="bascket__item-price">
                    {item.price} ₽ × {item.quantity} = {item.price * item.quantity} ₽
                  </div>
                </div>
                
                <div className="bascket__item-controls">
                  <div className="bascket__quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="bascket__quantity-button"
                    >
                      −
                    </button>
                    <span className="bascket__quantity-value">{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="bascket__quantity-button"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="bascket__remove-button"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bascket__summary">
            <div className="bascket__summary-row">
              <span className="bascket__summary-label">Товаров:</span>
              <span className="bascket__summary-value">{calculateItemsCount()} шт.</span>
            </div>
            <div className="bascket__total">
              <span className="bascket__total-label">
                Итого:
              </span>
              <span className="bascket__total-value">
                {calculateTotal()} ₽
              </span>
            </div>
          </div>

          <div className="bascket__actions">
            <button 
              onClick={handleClearCart}
              className="bascket__action-button"
            >
              Очистить корзину
            </button>
            
            <button 
              onClick={handleCheckout}
              className="bascket__action-button bascket__checkout-button"
            >
              Оформить заказ
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Bascket