import React from 'react'

import { Catalog } from '@my-app/ui-library'

// Импорт изображений товаров
import photo1 from '../assets/dress.jpg'
import photo6 from '../assets/evening_dress.jpg'
import photo2 from '../assets/jacket.jpg'
import photo7 from '../assets/jeans.jpg'
import photo3 from '../assets/shirt.jpg'
import photo9 from '../assets/skirt.jpg'
import photo5 from '../assets/sweater.jpg'
import photo4 from '../assets/trousers.jpg'
import photo8 from '../assets/trousers2.jpg'

import type { Product } from '@my-app/ui-library'

// База данных товаров
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

interface CatalogPageProps {
  onProductSelect?: (productId: number) => void;
  onAddToCart?: (productId: number) => void;
  onBack?: () => void;
}

const CatalogPage: React.FC<CatalogPageProps> = ({ 
  onProductSelect, 
  onAddToCart, 
  onBack 
}) => {
  // Обработчик добавления в корзину для каталога
  const handleAddToCart = (productId: string | number) => {
    const id = Number(productId)

    if (onAddToCart) 

    {
      onAddToCart(id)
    } 
    else {
      const product = clothingProducts.find(p => p.id === id)
      
      alert(`"${product?.title}" добавлен в корзину!`)
    }
  }

  // Обработчик клика по кнопке "Подробнее" - переходит на страницу товара
  const handleDetailsClick = (productId: string | number) => {
    if (onProductSelect) {
      onProductSelect(Number(productId))
    } else {
      alert(`Выбран товар с ID: ${productId}`)
    }
  }

  // Обработчик клика по кнопке "Назад"
  const handleBackClick = () => {
    if (onBack) {
      onBack()
    } else {
      window.history.back()
    }
  }

  return (
    <div className="app">

      <div className="page-header">
        <div className="page-header__content">
          {onBack && (
            <button className="page-header__back-btn" onClick={handleBackClick}>
              ← Назад
            </button>
          )}
          <h1 className="page-header__title">Каталог</h1>
        </div>
      </div>

      <main className="app__main">
       
        <section className="app__section">
          <div className="app__catalog">
            <Catalog
              products={clothingProducts.map(product => ({
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

      {/* Подвал страницы */}
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

export default CatalogPage