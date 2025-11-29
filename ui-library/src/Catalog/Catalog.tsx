import React from 'react'

import styles from './Catalog.module.css'

export interface Product {
  id: string | number
  imageUrl: string
  title: string
  description?: string
  price: string | number
}

export interface CatalogProps {
  products: Product[]
  onProductClick?: (productId: string | number) => void
  onAddToCart?: (productId: string | number) => void
  columns?: number
  className?: string
  textPosition?: 'left' | 'right' | 'center'
  showAddToCart?: boolean
}

export const Catalog: React.FC<CatalogProps> = ({
  products,
  onProductClick,
  onAddToCart,
  className = '',
  textPosition = 'left',
  showAddToCart = true
}) => {
  const gridStyle = {
    gridTemplateColumns: `repeat(auto-fill, minmax(280px, 1fr))`
  }

  const handleProductClick = (productId: string | number) => {
    if (onProductClick) {
      onProductClick(productId)
    }
  }

  const handleAddToCart = (productId: string | number, e: React.MouseEvent) => {
    e.stopPropagation()
    
    if (onAddToCart) {
      onAddToCart(productId)
    }
  }

  return (
    <div className={`${styles.catalog} ${className}`}>
      <div 
        className={styles.grid}
        style={gridStyle}
        data-testid="catalog"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className={styles.gridItem}
            onClick={() => handleProductClick(product.id)}
          >
            <div className={styles.productCard}>
              <img
                src={product.imageUrl}
                alt={product.title}
                className={styles.productImage}
              />
              
              <div className={styles.overlay}></div>

              <div className={`${styles.content} ${styles[`text-${textPosition}`]}`}>
                <h3 className={styles.title}>{product.title}</h3>
                
                {product.description && (
                  <p className={styles.description}>{product.description}</p>
                )}
                
                <div className={styles.price}>{product.price}</div>
                
                <div className={styles.buttons}>
                  <button 
                    className={styles.detailsButton}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleProductClick(product.id)
                    }}
                  >
                    Подробнее
                  </button>

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