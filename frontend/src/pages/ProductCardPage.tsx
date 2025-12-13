import React, { useState, useEffect } from 'react'

import { ProductCard } from '@my-app/ui-library'

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

// Тип для деталей продукта
interface ProductDetails {
  material: string
  color: string
  size: string
  care: string
}

// Тип для продукта
interface ClothingProduct {
  id: number
  imageUrl: string
  title: string
  description: string
  price: number
  details: ProductDetails
}

// База данных товаров 
const clothingProducts: ClothingProduct[] = [
  {
    id: 1, 
    imageUrl: photo1,
    title: 'Летнее платье',
    description: 'Легкое хлопковое платье с цветочным принтом, идеально для жарких дней. Идеально подходит для прогулок, пляжного отдыха и летних вечеринок.',
    price: 4599,
    details: {
      material: '100% хлопок',
      color: 'Цветочный принт',
      size: 'XS, S, M, L, XL',
      care: 'Стирка при 30°C, гладить при средней температуре'
    }
  },
  {
    id: 2,
    imageUrl: photo2,
    title: 'Джинсовая куртка',
    description: 'Классическая джинсовая куртка с современным кроем и удобными карманами. Изготовлена из плотного денима, который сохраняет форму и защищает от ветра.',
    price: 7999,
    details: {
      material: 'Деним (100% хлопок)',
      color: 'Синий деним',
      size: 'S, M, L, XL',
      care: 'Стирка при 40°C, не отбеливать'
    }
  },
  {
    id: 3,
    imageUrl: photo3,
    title: 'Классическая рубашка',
    description: 'Хлопковая рубашка с длинными рукавами, подходит для офиса и повседневной носки.',
    price: 3999,
    details: {
      material: '100% хлопок',
      color: 'Белый, голубой, розовый',
      size: 'XS, S, M, L, XL, XXL',
      care: 'Стирка при 30°C, гладить с паром'
    }
  },
  {
    id: 4,
    imageUrl: photo4,
    title: 'Спортивные брюки',
    description: 'Брюки для тренировок с высокой талией. Эластичная ткань обеспечивает полную свободу движений во время занятий спортом.',
    price: 3499,
    details: {
      material: 'Полиэстер 85%, Эластан 15%',
      color: 'Черный, серый, синий',
      size: 'XS, S, M, L, XL',
      care: 'Стирка при 40°C, сушить вдали от прямых солнечных лучей'
    }
  },
  {
    id: 5,
    imageUrl: photo5,
    title: 'Вязаный свитер',
    description: 'Теплый свитер из мягкой шерсти. Нежный материал не вызывает раздражения и сохраняет тепло даже в морозную погоду.',
    price: 6599,
    details: {
      material: 'Шерсть 70%, Акрил 30%',
      color: 'Бежевый, серый, бордовый',
      size: 'S, M, L, XL',
      care: 'Ручная стирка при 30°C, сушить горизонтально'
    }
  },
  {
    id: 6,
    imageUrl: photo6,
    title: 'Вечернее платье',
    description: 'Элегантное вечернее платье с открытыми плечами и струящимся силуэтом. Идеально для торжественных мероприятий, свадеб и романтических ужинов.',
    price: 12999,
    details: {
      material: 'Шелк 100%',
      color: 'Черный, красный, золотой',
      size: 'XS, S, M, L',
      care: 'Химчистка только'
    }
  },
  {
    id: 7,
    imageUrl: photo7,
    title: 'Джинсы',
    description: 'Джинсы Wide leg в светло-голубом цвете с удобной посадкой',
    price: 5999,
    details: {
      material: 'Хлопок 100%',
      color: 'Голубой',
      size: 'XS, S, M, L',
      care: 'Ручная стирка при 30°C'
    }
  },
  {
    id: 8,
    imageUrl: photo8,
    title: 'Брюки',
    description: 'Широкие классические брюки в коричневом цвете',
    price: 5999,
    details: {
      material: 'Хлопок, полиэстер',
      color: 'Коричневый',
      size: 'XS, S, M, L',
      care: 'Ручная стирка при 30°C'
    }
  },
  {
    id: 9,
    imageUrl: photo9,
    title: 'Юбка',
    description: 'Черная мини-юбка с рюшами',
    price: 2799,
    details: {
      material: 'Хлопок',
      color: 'Черный',
      size: 'XS, S, M, L',
      care: 'Ручная стирка при 30°C'
    }
  },
]

// Функция для форматирования цены
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU').format(price)
}

interface ProductCardPageProps {
  productId?: string
  onBack?: () => void
}

const ProductCardPage: React.FC<ProductCardPageProps> = ({ productId, onBack }) => {
  const [selectedProduct, setSelectedProduct] = useState<ClothingProduct | null>(null)

  useEffect(() => {
    if (productId) {
      const product = clothingProducts.find(p => p.id === Number(productId))
      
      setSelectedProduct(product || null)
    }
  }, [productId])

  // Обработчик добавления в корзину
  const handleAddToCart = () => {
    if (selectedProduct) {
      alert(`"${selectedProduct.title}" добавлен в корзину!`)
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

  if (!selectedProduct) {
    return (
      <div className="product-card-page">
        <div className="product-card-page__header">
          <div className="product-card-page__header-content">
            <button className="product-card-page__back-btn" onClick={handleBackClick}>
              ← Назад
            </button>
            <h1 className="product-card-page__title">Товар не найден</h1>
          </div>
        </div>
        <div className="product-card-page__not-found">
          <p>Извините, товар с указанным ID не найден.</p>
          <button className="product-card-page__back-home" onClick={handleBackClick}>
            Вернуться назад
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="product-card-page">
      {/* Шапка страницы */}
      <div className="product-card-page__header">
        <div className="product-card-page__header-content">
          <button className="product-card-page__back-btn" onClick={handleBackClick}>
            ← Назад
          </button>
          <h1 className="product-card-page__title">{selectedProduct.title}</h1>
        </div>
      </div>

      {/* Основной контент */}
      <main className="product-card-page__main">
        <div className="product-card-page__grid">
          {/* Карточка товара */}
          <div className="product-card-page__card-section">
            <ProductCard
              id={selectedProduct.id}
              imageUrl={selectedProduct.imageUrl}
              title={selectedProduct.title}
              description={selectedProduct.description}
              price={`${formatPrice(selectedProduct.price)} ₽`}
              textPosition="center"
              buttonText="Добавить в корзину"
              onButtonClick={handleAddToCart}
              onAddToCart={handleAddToCart}
              showAddToCart={true}
              className="product-card-page__featured-card"
            />
          </div>

          {/* Детальная информация */}
          <div className="product-card-page__details">
            <h2 className="product-card-page__details-title">Детальная информация</h2>
            
            <div className="product-card-page__details-grid">
              <div className="product-card-page__detail-item">
                <span className="product-card-page__detail-label">Материал:</span>
                <span className="product-card-page__detail-value">{selectedProduct.details.material}</span>
              </div>
              <div className="product-card-page__detail-item">
                <span className="product-card-page__detail-label">Цвет:</span>
                <span className="product-card-page__detail-value">{selectedProduct.details.color}</span>
              </div>
              <div className="product-card-page__detail-item">
                <span className="product-card-page__detail-label">Размеры:</span>
                <span className="product-card-page__detail-value">{selectedProduct.details.size}</span>
              </div>
              <div className="product-card-page__detail-item">
                <span className="product-card-page__detail-label">Уход:</span>
                <span className="product-card-page__detail-value">{selectedProduct.details.care}</span>
              </div>
            </div>
            <div className="product-card-page__actions">

            </div>
          </div>
        </div>
      </main>

      {/* Подвал страницы (используем тот же подвал что и везде) */}
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

export default ProductCardPage