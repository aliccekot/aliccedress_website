import React, { useState } from 'react'
import './App.css'
import '@my-app/ui-library/style.css'
import { ProductCard, Catalog } from '@my-app/ui-library'
import type { Product } from '@my-app/ui-library'

// Импорт изображений товаров
import photo1 from './assets/dress.jpg'
import photo2 from './assets/jacket.jpg'
import photo3 from './assets/skirt.jpg'
import photo4 from './assets/trousers.jpg'
import photo5 from './assets/sweater.jpg'
import photo6 from './assets/evening_dress.jpg'

// База данных товаров для магазина одежды с ценами в рублях
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
]

// Функция для форматирования цены в русский формат
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU').format(price)
}

const App: React.FC = () => {
  // Состояние корзины - массив ID товаров
  const [cart, setCart] = useState<number[]>([])
  // Состояние выбранного товара для детального просмотра
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // Обработчик добавления в корзину для каталога
  const handleAddToCart = (productId: string | number) => {
    const id = Number(productId)
    setCart(prev => {
      // Добавляем товар в корзину, если его там еще нет
      if (!prev.includes(id)) {
        return [...prev, id]
      }
      return prev
    })
    // Находим товар по ID и показываем уведомление
    const product = clothingProducts.find(p => p.id === id)
    alert(`"${product?.title}" добавлен в корзину!`)
  }

  // Обработчик добавления в корзину для одиночной карточки
  const handleSingleAddToCart = () => {
    if (selectedProduct) {
      handleAddToCart(selectedProduct.id)
    }
  }

  // Обработчик клика по товару - устанавливает выбранный товар
  const handleProductClick = (productId: string | number) => {
    const product = clothingProducts.find(p => p.id === productId)
    if (product) {
      setSelectedProduct(product)
    }
  }

  // Обработчик клика по кнопке "Подробнее" в одиночной карточке
  const handleDetailsClick = () => {
    if (selectedProduct) {
      alert(`Подробная информация о товаре: ${selectedProduct.title}\n\n${selectedProduct.description}\n\nЦена: ${formatPrice(selectedProduct.price as number)} ₽`)
    }
  }

  // Получить количество товара в корзине
  const getCartItemsCount = () => {
    return cart.length
  }

  // Получить общую стоимость корзины
  const getCartTotal = () => {
    return cart.reduce((total, productId) => {
      const product = clothingProducts.find(p => p.id === productId)
      return total + (product ? Number(product.price) : 0)
    }, 0)
  }

  // Очистка корзины
  const clearCart = () => {
    setCart([])
    alert('Корзина очищена!')
  }

  return (
    <div className="app">
      {/* Шапка приложения */}
      <header className="app__header">
        <div className="app__header-content">
          <div className="app__brand">
            <h1 className="app__title">aliccedress</h1>
            <p className="app__subtitle">Стильная одежда для каждого сезона</p>
          </div>
          <div className="app__cart-info">
            {/* Информация о корзине */}
            <span className="app__cart-count">Товаров в корзине: {getCartItemsCount()}</span>
            <span className="app__cart-total">Общая сумма: {formatPrice(getCartTotal())} ₽</span>
            {/* Кнопка очистки корзины показывается только если в корзине есть товары */}
            {cart.length > 0 && (
              <button className="app__clear-cart" onClick={clearCart}>
                Очистить корзину
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Основное содержимое приложения */}
      <main className="app__main">
        {/* Секция с одиночной карточкой товара */}
        <section className="app__section">
          <h2 className="app__section-title">Выбранный товар</h2>
          <div className="app__featured-product">
            {selectedProduct ? (
              // Показываем увеличенную карточку выбранного товара
              <ProductCard
                id={selectedProduct.id}
                imageUrl={selectedProduct.imageUrl}
                title={selectedProduct.title}
                price={`${formatPrice(selectedProduct.price as number)} ₽`}
                textPosition="center"
                buttonText="Подробнее о товаре"
                onButtonClick={handleDetailsClick}
                onAddToCart={handleSingleAddToCart}
                showAddToCart={true}
                className="app__featured-card"
              />
            ) : (
              // Сообщение если товар не выбран
              <div className="app__no-product">
                <p>Выберите товар из каталога для просмотра</p>
                <small>Нажмите на любой товар ниже</small>
              </div>
            )}
          </div>
        </section>

        {/* Секция с каталогом товаров */}
        <section className="app__section">
          <h2 className="app__section-title">Каталог одежды</h2>
          <div className="app__catalog">
            <Catalog
              // Преобразуем цены товаров в отформатированный вид с символом рубля
              products={clothingProducts.map(product => ({
                ...product,
                price: `${formatPrice(product.price as number)} ₽`
              }))}
              onProductClick={handleProductClick}
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

export default App