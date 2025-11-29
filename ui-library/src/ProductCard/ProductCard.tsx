import React from 'react'

import styles from './ProductCard.module.css'

export interface ProductCardProps {
  // Основные данные
  id: string | number
  imageUrl: string
  title: string
  description?: string
  price: string | number

  // Настройки отображения
  textPosition?: 'left' | 'right' | 'center'
  buttonText?: string
  onButtonClick?: () => void

  // Дополнительные параметры
  alt?: string
  className?: string
  showAddToCart?: boolean
  onAddToCart?: () => void
}

export const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  description,
  price,
  textPosition = 'left',
  buttonText = 'Узнать подробнее',
  onButtonClick,
  alt,
  className = '',
  showAddToCart = true,
  onAddToCart
}) => {
  // Обработчик ошибок загрузки изображения
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhGOUZBIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlByb2R1Y3QgSW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg=='
  }

  // Определяем классы в зависимости от позиции текста
  const cardClass = `${styles.productCard} ${styles[`text-${textPosition}`]} ${className}`.trim()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    
    if (onAddToCart) {
      onAddToCart()
    }
  }

  const handleCardClick = () => {
    if (onButtonClick) {
      onButtonClick()
    }
  }

  return (
    <div className={cardClass} onClick={handleCardClick}>
      {/* Фоновая картинка */}
      <img
        src={imageUrl}
        alt={alt || title}
        className={styles.productImage}
        onError={handleImageError}
      />

      {/* Затемнение для лучшей читаемости текста */}
      <div className={styles.overlay}></div>

      {/* Контент карточки */}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        {description && (
          <p className={styles.description}>{description}</p>
        )}

        <div className={styles.price}>{price}</div>

        <div className={styles.buttons}>
          <button 
            className={styles.detailsButton}
            onClick={(e) => {
              e.stopPropagation()
              if (onButtonClick) onButtonClick()
            }}
          >
            {buttonText}
          </button>

          {showAddToCart && (
            <button 
              className={styles.cartButton}
              onClick={handleAddToCart}
            >
              Добавить в корзину
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard