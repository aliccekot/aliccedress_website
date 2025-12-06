import React from 'react'

import styles from './Catalog.module.css'

// Интерфейс для данных товара
export interface Product {
  id: string | number
  imageUrl: string
  title: string
  description?: string
  price: string | number
}

// Интерфейс для пропсов компонента Catalog
export interface CatalogProps {
  products: Product[]                    // Массив товаров для отображения
  onProductClick?: (productId: string | number) => void  // Обработчик клика по товару
  onAddToCart?: (productId: string | number) => void     // Обработчик добавления в корзину
  columns?: number                       // Количество колонок (не используется в текущей реализации)
  className?: string                     // Дополнительные CSS классы
  textPosition?: 'left' | 'right' | 'center'  // Позиция текста в карточке
  showAddToCart?: boolean                // Флаг показа кнопки "Добавить в корзину"
}

/**
 * Компонент Catalog - отображает сетку товаров
 * Принимает массив товаров и отображает их в адаптивной сетке
 * Поддерживает клики по товарам и добавление в корзину
 */
export const Catalog: React.FC<CatalogProps> = ({
  products,
  onProductClick,
  onAddToCart,
  className = '',
  textPosition = 'left',
  showAddToCart = true
}) => {
  // Стиль для CSS Grid - создает адаптивную сетку с минимальной шириной 280px
  const gridStyle = {
    gridTemplateColumns: `repeat(auto-fill, minmax(280px, 1fr))`
  }

  /**
   * Обработчик клика по товару
   * Вызывает переданный колбэк onProductClick с ID товара
   */
  const handleProductClick = (productId: string | number) => {
    if (onProductClick) {
      onProductClick(productId)
    }
  }

  /**
   * Обработчик добавления товара в корзину
   * Останавливает всплытие события чтобы не сработал handleProductClick
   * Вызывает переданный колбэк onAddToCart с ID товара
   */
  const handleAddToCart = (productId: string | number, e: React.MouseEvent) => {
    e.stopPropagation() // Предотвращаем всплытие события
    
    if (onAddToCart) {
      onAddToCart(productId)
    }
  }

  return (
    // Основной контейнер каталога
    <div className={`${styles.catalog} ${className}`}>
      {/* Сетка товаров с адаптивным layout */}
      <div 
        className={styles.grid}
        style={gridStyle}
        data-testid="catalog" // ID для тестирования
      >
        {/* Маппим массив товаров в JSX элементы */}
        {products.map((product) => (
          // Контейнер для каждого товара в сетке
          <div
            key={product.id} // Уникальный ключ для React
            className={styles.gridItem}
            onClick={() => handleProductClick(product.id)} // Обработчик клика по всему товару
          >
            {/* Карточка товара */}
            <div className={styles.productCard}>
              {/* Изображение товара */}
              <img
                src={product.imageUrl}
                alt={product.title} // Alt текст для доступности
                className={styles.productImage}
              />
              
              {/* Наложение для улучшения читаемости текста */}
              <div className={styles.overlay}></div>

              {/* Контент карточки с динамическим позиционированием текста */}
              <div className={`${styles.content} ${styles[`text-${textPosition}`]}`}>
                {/* Заголовок товара */}
                <h3 className={styles.title}>{product.title}</h3>
                
                {/* Описание товара (показывается если есть) */}
                {product.description && (
                  <p className={styles.description}>{product.description}</p>
                )}
                
                {/* Цена товара */}
                <div className={styles.price}>{product.price}</div>
                
                {/* Контейнер для кнопок */}
                <div className={styles.buttons}>
                  {/* Кнопка "Подробнее" */}
                  <button 
                    className={styles.detailsButton}
                    onClick={(e) => {
                      e.stopPropagation() // Предотвращаем всплытие
                      handleProductClick(product.id)
                    }}
                  >
                    Подробнее
                  </button>

                  {/* Кнопка "Добавить в корзину" (показывается если showAddToCart = true) */}
                  {showAddToCart && (
                    <button 
                      className={styles.cartButton}
                      onClick={(e) => handleAddToCart(product.id, e)}
                    >
                      Добавить в корзину
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Catalog