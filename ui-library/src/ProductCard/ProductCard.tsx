import React from 'react'

import styles from './ProductCard.module.css'

/**
 * Интерфейс пропсов для компонента ProductCard
 * Определяет все возможные параметры для настройки карточки товара
 */
export interface ProductCardProps {
  // Основные данные товара
  id: string | number                    // Уникальный идентификатор товара
  imageUrl: string                       // URL изображения товара
  title: string                          // Название товара
  description?: string                   // Описание товара (опционально)
  price: string | number                 // Цена (может быть строкой или числом)

  // Настройки отображения и взаимодействия
  textPosition?: 'left' | 'right' | 'center'  // Позиция текста в карточке
  buttonText?: string                    // Текст кнопки "Подробнее"
  onButtonClick?: () => void             // Обработчик клика по кнопке/карточке

  // Дополнительные параметры
  alt?: string                           // Alt текст для изображения
  className?: string                     // Дополнительные CSS классы
  showAddToCart?: boolean                // Флаг отображения кнопки корзины
  onAddToCart?: () => void               // Обработчик добавления в корзину
}

/**
 * Компонент ProductCard - карточка товара для интернет-магазина
 * Отображает товар с изображением, названием, описанием, ценой и кнопками действий
 * Поддерживает различные варианты отображения и взаимодействия
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  description,
  price,
  textPosition = 'left',           // Значение по умолчанию - текст слева
  buttonText = 'Узнать подробнее', // Значение по умолчанию для кнопки
  onButtonClick,
  alt,
  className = '',                  // Пустая строка по умолчанию
  showAddToCart = true,            // По умолчанию показываем кнопку корзины
  onAddToCart
}) => {
  /**
   * Обработчик ошибок загрузки изображения
   * Заменяет битое изображение на SVG-заглушку с сообщением
   */
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Base64 encoded SVG с сообщением об ошибке загрузки изображения
    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhGOUZBIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlByb2R1Y3QgSW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg=='
  }

  /**
   * Формируем строку классов для карточки
   * Объединяет базовый класс, класс позиции текста и пользовательские классы
   */
  const cardClass = `${styles.productCard} ${styles[`text-${textPosition}`]} ${className}`.trim()

  /**
   * Обработчик клика по кнопке добавления в корзину
   * Останавливает всплытие события и вызывает колбэк onAddToCart
   */
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation() // Предотвращаем срабатывание handleCardClick
    
    if (onAddToCart) {
      onAddToCart()
    }
  }

  /**
   * Обработчик клика по всей карточке товара
   * Вызывает колбэк onButtonClick для открытия деталей товара
   */
  const handleCardClick = () => {
    if (onButtonClick) {
      onButtonClick()
    }
  }

  return (
    // Основной контейнер карточки с обработчиком клика
    <div className={cardClass} onClick={handleCardClick}>
      {/* Изображение товара с обработкой ошибок загрузки */}
      <img
        src={imageUrl}
        alt={alt || title} // Используем переданный alt или название товара
        className={styles.productImage}
        onError={handleImageError} // Обработчик ошибок загрузки изображения
      />

      {/* Наложение-градиент для улучшения читаемости текста поверх изображения */}
      <div className={styles.overlay}></div>

      {/* Контейнер с контентом карточки */}
      <div className={styles.content}>
        {/* Заголовок товара */}
        <h3 className={styles.title}>{title}</h3>

        {/* Описание товара (рендерится условно, если передано) */}
        {description && (
          <p className={styles.description}>{description}</p>
        )}

        {/* Цена товара */}
        <div className={styles.price}>{price}</div>

        {/* Контейнер для кнопок действий */}
        <div className={styles.buttons}>
          {/* Кнопка "Подробнее" с остановкой всплытия события */}
          <button 
            className={styles.detailsButton}
            onClick={(e) => {
              e.stopPropagation() // Предотвращаем срабатывание handleCardClick
              if (onButtonClick) onButtonClick()
            }}
          >
            {buttonText}
          </button>
  
          {/* Кнопка "Добавить в корзину" (условный рендеринг) */}
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