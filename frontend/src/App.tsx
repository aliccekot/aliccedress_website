import React, { useState, useEffect, useCallback } from 'react'
import './App.css'
import '@my-app/ui-library/style.css'

// Импорт изображений товаров
import photo1 from './assets/dress.jpg'
import photo6 from './assets/evening_dress.jpg'
import photo2 from './assets/jacket.jpg'
import photo7 from './assets/jeans.jpg'
import photo3 from './assets/shirt.jpg'
import photo9 from './assets/skirt.jpg'
import photo5 from './assets/sweater.jpg'
import photo4 from './assets/trousers.jpg'
import photo8 from './assets/trousers2.jpg'
import BascketPage from './pages/BascketPage'
import CatalogPage from './pages/CatalogPage'
import HomePage from './pages/HomePage'
import ProductCardPage from './pages/ProductCardPage'
import ProfilePage from './pages/ProfilePage'

// Интерфейс для товара
interface Product {
  id: number
  imageUrl: string
  title: string
  description?: string
  price: number
}

// Интерфейс для товара в корзине
interface BasketItem {
  id: string | number
  title: string
  price: number
  quantity: number
  imageUrl?: string
}

// Интерфейс для данных пользователя
interface UserData {
  name: string
  email: string
  phone: string
  avatar?: string
}

// Интерфейс для зарегистрированного пользователя
interface RegisteredUser {
  email: string
  password: string
  userData: UserData
}

// База данных товаров для магазина одежды
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

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'bascket' | 'product' | 'catalog' | 'profile'>('home')
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
  const [basketItems, setBasketItems] = useState<BasketItem[]>(() => {
    const saved = localStorage.getItem('bascket')
    
    return saved ? JSON.parse(saved) : []
  })

  // Состояния для системы регистрации и входа
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('isLoggedIn')

    return saved ? JSON.parse(saved) : false
  })
  
  const [userData, setUserData] = useState<UserData | undefined>(() => {
    const saved = localStorage.getItem('userData')

    return saved ? JSON.parse(saved) : undefined
  })

  // Состояние для хранения всех зарегистрированных пользователей
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>(() => {
    const saved = localStorage.getItem('registeredUsers')

    return saved ? JSON.parse(saved) : [
      // Тестовый пользователь по умолчанию
      {
        email: 'test@example.com',
        password: 'password123',
        userData: {
          name: 'Иван Иванов',
          email: 'test@example.com',
          phone: '+7 (999) 123-45-67'
        }
      }
    ]
  })

  // Состояние для модального окна регистрации
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [registerFormData, setRegisterFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  // Функция для обновления счетчика корзины
  const updateBasketCounter = useCallback((items?: BasketItem[]) => {
    const itemsToCount = items || basketItems
    const totalItems = itemsToCount.reduce((sum, item) => sum + item.quantity, 0)
    
    const counterElement = document.querySelector('.basket-counter')

    if (counterElement) {
      counterElement.textContent = totalItems.toString()
      
      if (totalItems > 0) {
        counterElement.classList.add('visible')
      } else {
        counterElement.classList.remove('visible')
      }
    }
  }, [basketItems]) // Зависимость от basketItems

  // Загружаем корзину из localStorage при загрузке
  useEffect(() => {
    const saved = localStorage.getItem('bascket')

    if (saved) {
      try {
        setBasketItems(JSON.parse(saved))
      } catch (error) {
        console.error('Ошибка загрузки корзины:', error)
      }
    }
  }, [])

  // Сохраняем состояние авторизации в localStorage
  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn))
  }, [isLoggedIn])

  // Сохраняем данные пользователя в localStorage
  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData))
    } else {
      localStorage.removeItem('userData')
    }
  }, [userData])

  // Сохраняем зарегистрированных пользователей в localStorage
  useEffect(() => {
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers))
  }, [registeredUsers])

  // Инициализируем счетчик корзины при загрузке и при изменении updateBasketCounter
  useEffect(() => {
    updateBasketCounter()
  }, [updateBasketCounter])

  // Функция для добавления товара в корзину
  const addToBasket = (product: {
    id: string | number;
    title: string;
    price: number;
    imageUrl?: string;
  }) => {
    setBasketItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id)
      
      let updatedItems: BasketItem[]
      
      if (existingItem) {
        // Если товар уже есть, увеличиваем количество
        updatedItems = currentItems.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        // Если товара нет, добавляем новый
        const newItem: BasketItem = {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
          imageUrl: product.imageUrl
        }

        updatedItems = [...currentItems, newItem]
      }
      
      localStorage.setItem('bascket', JSON.stringify(updatedItems))
      updateBasketCounter(updatedItems)
      
      return updatedItems
    })
  }

  // Функция для обновления количества товара
  const updateBasketQuantity = (id: string | number, quantity: number) => {
    setBasketItems(currentItems => {
      if (quantity < 1) {
        const updatedItems = currentItems.filter(item => item.id !== id)

        localStorage.setItem('bascket', JSON.stringify(updatedItems))
        updateBasketCounter(updatedItems)

        return updatedItems
      }
      
      const updatedItems = currentItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )

      localStorage.setItem('bascket', JSON.stringify(updatedItems))
      updateBasketCounter(updatedItems)

      return updatedItems
    })
  }

  // Функция для удаления товара из корзины
  const removeFromBasket = (id: string | number) => {
    setBasketItems(currentItems => {
      const updatedItems = currentItems.filter(item => item.id !== id)

      localStorage.setItem('bascket', JSON.stringify(updatedItems))
      updateBasketCounter(updatedItems)

      return updatedItems
    })
  }

  // Функция для очистки корзины
  const clearBasket = () => {
    setBasketItems([])
    localStorage.removeItem('bascket')
    updateBasketCounter([])
    alert('Корзина очищена')
  }

  // Обработчик для возврата на главную
  const navigateToHome = () => {
    setCurrentPage('home')
    setSelectedProductId(null)
  }

  // Обработчик для перехода в каталог
  const navigateToCatalog = () => {
    setCurrentPage('catalog')
  }

  // Обработчик выбора товара на главной странице
  const handleProductSelect = (productId: number) => {
    setSelectedProductId(productId)
    setCurrentPage('product')
  }

  // Обработчик добавления в корзину
  const handleAddToCart = (productId: number) => {
    const product = clothingProducts.find(p => p.id === productId)
    
    if (product) {
      addToBasket({
        id: product.id,
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl
      })
      
      alert(`"${product.title}" добавлен в корзину!`)
    }
  }

  // Обработчик входа
  const handleLogin = (email: string, password: string) => {
    // Ищем пользователя по email и паролю
    const user = registeredUsers.find(u => 
      u.email === email && u.password === password
    )
    
    if (user) {
      setUserData(user.userData)
      setIsLoggedIn(true)
      alert(`Добро пожаловать, ${user.userData.name}!`)
    } else {
      alert('Неверный email или пароль')
    }
  }

  // Обработчик регистрации
  const handleRegister = (registerData: { 
    name: string; 
    email: string; 
    phone: string; 
    password: string 
  }) => {
    // Проверяем, не зарегистрирован ли уже пользователь с таким email
    const existingUser = registeredUsers.find(u => u.email === registerData.email)
    
    if (existingUser) {
      alert('Пользователь с таким email уже зарегистрирован')

      return
    }
    
    // Создаем нового пользователя
    const newUser: RegisteredUser = {
      email: registerData.email,
      password: registerData.password,
      userData: {
        name: registerData.name,
        email: registerData.email,
        phone: registerData.phone
      }
    }
    
    // Добавляем в список зарегистрированных пользователей
    setRegisteredUsers(prev => [...prev, newUser])
    
    // Автоматически входим под новым пользователем
    setUserData(newUser.userData)
    setIsLoggedIn(true)
    
    alert(`Регистрация успешна! Добро пожаловать, ${registerData.name}!`)
  }

  // Обработчик выхода
  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserData(undefined)
    
    alert('Вы вышли из системы')
  }

  // Обработчик сохранения данных профиля
  const handleSaveProfile = (data: { name: string; email: string; phone: string }) => {
    if (userData) {
      // Обновляем данные текущего пользователя
      const updatedUserData = { ...userData, ...data }

      setUserData(updatedUserData)
      // Обновляем данные в списке зарегистрированных пользователей
      setRegisteredUsers(prev => 
        prev.map(u => 
          u.email === userData.email 
            ? { ...u, userData: updatedUserData } 
            : u
        )
      )
      
      alert('Данные успешно сохранены!')
    }
  }

  // Обработчик закрытия модального окна входа
  const closeLoginModal = () => {
    setShowLoginModal(false)
    setLoginData({ email: '', password: '' })
  }

  // Обработчик входа через модальное окно
  const handleLoginModalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleLogin(loginData.email, loginData.password)
    closeLoginModal()
  }

  // Функция для перехода на страницу профиля
  const goToProfile = () => {
    setCurrentPage('profile')
  }

  const renderHeader = () => {
    return (
      <header className="app__header-new">
        <div className="app__header-top">
          <div className="app__logo-container">
            <h1 className="app__logo">aliccedress</h1>
            <div className="app__logo-decoration"></div>
          </div>
          <div className="app__header-right">
            <div className="app__nav-buttons">
              <button 
                className={`app__nav-page-btn ${currentPage === 'home' ? 'app__nav-page-btn--active' : ''}`}
                onClick={navigateToHome}
              >
                Главная
              </button>
              <button 
                className={`app__nav-page-btn ${currentPage === 'catalog' ? 'app__nav-page-btn--active' : ''}`}
                onClick={navigateToCatalog}
              >
                Каталог
              </button>
              <button 
                className={`app__nav-page-btn ${currentPage === 'bascket' ? 'app__nav-page-btn--active' : ''}`}
                onClick={() => setCurrentPage('bascket')}
              >
                Корзина 
              </button>
              <button 
                className={`app__nav-page-btn ${currentPage === 'profile' ? 'app__nav-page-btn--active' : ''}`}
                onClick={goToProfile}
              >
                Профиль

              </button>
            </div>
            {!isLoggedIn && (
              <div className="app__auth-buttons">
                
              </div>
            )}
          </div>
        </div>
      </header>
    )
  }

  return (
    <div className="app">
      {renderHeader()}

      {/* Модальное окно входа */}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Вход в систему</h2>
              <button className="modal-close" onClick={closeLoginModal}>×</button>
            </div>
            <form onSubmit={handleLoginModalSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="login-email">Email *</label>
                <input
                  id="login-email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  placeholder="test@example.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="login-password">Пароль *</label>
                <input
                  id="login-password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  placeholder="password123"
                  required
                />
              </div>
              <div className="form-group demo-credentials">
                <p>Для тестирования используйте:</p>
                <p>Email: test@example.com</p>
                <p>Пароль: password123</p>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={closeLoginModal}>
                  Отмена
                </button>
                <button type="submit" className="btn-primary">
                  Войти
                </button>
              </div>
              <div className="form-footer">
                <p>
                  Нет аккаунта?{' '}
                  <button 
                    type="button" 
                    className="link-btn"
                    onClick={() => {
                      closeLoginModal()
                      setShowRegisterModal(true)
                    }}
                  >
                    Зарегистрироваться
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Модальное окно регистрации */}
      {showRegisterModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Регистрация</h2>
              <button className="modal-close" onClick={() => setShowRegisterModal(false)}>×</button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault()
              handleRegister({
                name: registerFormData.name,
                email: registerFormData.email,
                phone: registerFormData.phone,
                password: registerFormData.password
              })
              setShowRegisterModal(false)
            }} className="register-form">
              <div className="form-group">
                <label htmlFor="register-name">Имя и фамилия *</label>
                <input
                  id="register-name"
                  type="text"
                  value={registerFormData.name}
                  onChange={(e) => setRegisterFormData({...registerFormData, name: e.target.value})}
                  placeholder="Введите имя и фамилию"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="register-email">Email *</label>
                <input
                  id="register-email"
                  type="email"
                  value={registerFormData.email}
                  onChange={(e) => setRegisterFormData({...registerFormData, email: e.target.value})}
                  placeholder="Введите email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="register-phone">Телефон *</label>
                <input
                  id="register-phone"
                  type="tel"
                  value={registerFormData.phone}
                  onChange={(e) => setRegisterFormData({...registerFormData, phone: e.target.value})}
                  placeholder="+7 (999) 123-45-67"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="register-password">Пароль *</label>
                <input
                  id="register-password"
                  type="password"
                  value={registerFormData.password}
                  onChange={(e) => setRegisterFormData({...registerFormData, password: e.target.value})}
                  placeholder="Минимум 6 символов"
                  required
                  minLength={6}
                />
              </div>
              <div className="form-group">
                <label htmlFor="register-confirm-password">Подтвердите пароль *</label>
                <input
                  id="register-confirm-password"
                  type="password"
                  value={registerFormData.confirmPassword}
                  onChange={(e) => setRegisterFormData({...registerFormData, confirmPassword: e.target.value})}
                  placeholder="Повторите пароль"
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowRegisterModal(false)}>
                  Отмена
                </button>
                <button type="submit" className="btn-primary">
                  Зарегистрироваться
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Отображаем выбранную страницу */}
      {currentPage === 'home' && (
        <HomePage 
          onProductSelect={handleProductSelect}
          onAddToCart={handleAddToCart}
          onNavigateToCatalog={navigateToCatalog}
          products={clothingProducts} 
        />
      )}
      {currentPage === 'catalog' && (
        <CatalogPage 
          onProductSelect={handleProductSelect}
          onAddToCart={handleAddToCart}
          onBack={navigateToHome}
        />
      )}
      {currentPage === 'bascket' && (
        <BascketPage 
          onBack={navigateToCatalog}
          basketItems={basketItems}
          onUpdateQuantity={updateBasketQuantity}
          onRemoveItem={removeFromBasket}
          onClearCart={clearBasket}
        />
      )}
      {currentPage === 'product' && (
        <ProductCardPage 
          productId={selectedProductId?.toString()} 
          onBack={navigateToHome}
          onAddToCart={handleAddToCart}
        />
      )}
      {currentPage === 'profile' && (
        <ProfilePage 
          onBack={navigateToHome}
          userData={userData}
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
          onRegister={handleRegister}
          onLogout={handleLogout}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  )
}

export default App