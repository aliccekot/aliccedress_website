import React, { useState, useEffect } from 'react'
import './Profile.css'

export interface ProfileProps {
  userData?: {
    name: string
    email: string
    phone: string
    avatar?: string
  }
  isLoggedIn?: boolean
  onLogin?: (email: string, password: string) => void
  onRegister?: (userData: { name: string; email: string; phone: string; password: string }) => void
  onLogout?: () => void
  onEdit?: (isEditing: boolean) => void
  onSave?: (data: { name: string; email: string; phone: string }) => void
}

export const Profile: React.FC<ProfileProps> = ({
  userData,
  isLoggedIn = false,
  onLogin,
  onRegister,
  onLogout,
  onEdit,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })
  const [isLogoutConfirm, setIsLogoutConfirm] = useState(false)
  
  // Состояния для формы входа
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showRegisterForm, setShowRegisterForm] = useState(false) 
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const [registerData, setRegisterData] = useState({ 
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [loginError, setLoginError] = useState('')
  const [registerError, setRegisterError] = useState('') 

  // Функция для обработки входа
  const handleLoginSubmit = () => {
    // Валидация формы входа
    if (!loginData.email.trim()) {
      setLoginError('Введите email')

      return
    }

    if (!loginData.email.includes('@')) {
      setLoginError('Введите корректный email')

      return
    }

    if (!loginData.password.trim()) {
      setLoginError('Введите пароль')

      return
    }
    
    setLoginError('')
    onLogin?.(loginData.email, loginData.password)
  }

  // Функция для обработки регистрации
  const handleRegisterSubmit = () => {
    // Валидация формы регистрации
    if (!registerData.name.trim()) {
      setRegisterError('Введите имя')

      return
    }

    if (!registerData.email.trim() || !registerData.email.includes('@')) {
      setRegisterError('Введите корректный email')

      return
    }

    if (!registerData.phone.trim()) {
      setRegisterError('Введите телефон')

      return
    }

    if (!registerData.password.trim()) {
      setRegisterError('Введите пароль')

      return
    }

    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError('Пароли не совпадают')

      return
    }
    
    setRegisterError('')
    
    // Отправляем данные регистрации
    onRegister?.({
      name: registerData.name,
      email: registerData.email,
      phone: registerData.phone,
      password: registerData.password
    })
    
    // Сбрасываем форму регистрации
    setRegisterData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    })
  }

  // Инициализируем formData при изменении userData
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
      })
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
      })
    }
  }, [userData])

  // Если пользователь не авторизован, показываем окно входа/регистрации
  if (!isLoggedIn) {
    return (
      <div className="profile profile--auth">
        <div className="profile__auth">
          <h2 className="profile__auth-title">Вход в систему</h2>
          
          {showRegisterForm ? (
            // Форма регистрации
            <div className="profile__register-form">
              <p className="profile__auth-subtitle">
                Заполните данные для регистрации
              </p>
              
              {registerError && (
                <div className="profile__error-message">
                  {registerError}
                </div>
              )}
              
              <div className="profile__form-group">
                <label htmlFor="register-name" className="profile__form-label">
                  Имя и фамилия *
                </label>
                <input
                  id="register-name"
                  type="text"
                  className="profile__form-input"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                  placeholder="Введите имя и фамилию"
                  required
                />
              </div>
              
              <div className="profile__form-group">
                <label htmlFor="register-email" className="profile__form-label">
                  Email *
                </label>
                <input
                  id="register-email"
                  type="email"
                  className="profile__form-input"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  placeholder="Введите ваш email"
                  required
                />
              </div>
              
              <div className="profile__form-group">
                <label htmlFor="register-phone" className="profile__form-label">
                  Телефон *
                </label>
                <input
                  id="register-phone"
                  type="tel"
                  className="profile__form-input"
                  value={registerData.phone}
                  onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                  placeholder="+7 (999) 123-45-67"
                  required
                />
              </div>
              
              <div className="profile__form-group">
                <label htmlFor="register-password" className="profile__form-label">
                  Пароль *
                </label>
                <input
                  id="register-password"
                  type="password"
                  className="profile__form-input"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  placeholder="Введите пароль"
                  required
                />
              </div>
              
              <div className="profile__form-group">
                <label htmlFor="register-confirm-password" className="profile__form-label">
                  Подтвердите пароль *
                </label>
                <input
                  id="register-confirm-password"
                  type="password"
                  className="profile__form-input"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                  placeholder="Повторите пароль"
                  required
                />
              </div>
              
              <div className="profile__auth-options profile__auth-options--form">
                <button 
                  className="profile__auth-button profile__auth-button--cancel"
                  onClick={() => {
                    setShowRegisterForm(false)
                    setRegisterError('')
                  }}
                >
                  Назад
                </button>
                <button 
                  className="profile__auth-button profile__auth-button--register"
                  onClick={handleRegisterSubmit}
                >
                  Регистрация
                </button>
              </div>
            </div>
          ) : showLoginForm ? (
            // Форма входа
            <div className="profile__login-form">
              <p className="profile__auth-subtitle">
                Введите свои данные для входа
              </p>
              
              {loginError && (
                <div className="profile__error-message">
                  {loginError}
                </div>
              )}
              
              <div className="profile__form-group">
                <label htmlFor="login-email" className="profile__form-label">
                  Email *
                </label>
                <input
                  id="login-email"
                  type="email"
                  className="profile__form-input"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  placeholder="Введите ваш email"
                  required
                />
              </div>
              
              <div className="profile__form-group">
                <label htmlFor="login-password" className="profile__form-label">
                  Пароль *
                </label>
                <input
                  id="login-password"
                  type="password"
                  className="profile__form-input"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  placeholder="Введите ваш пароль"
                  required
                />
              </div>
              
              <div className="profile__auth-options profile__auth-options--form">
                <button 
                  className="profile__auth-button profile__auth-button--cancel"
                  onClick={() => {
                    setShowLoginForm(false)
                    setLoginError('')
                  }}
                >
                  Назад
                </button>
                <button 
                  className="profile__auth-button profile__auth-button--login"
                  onClick={handleLoginSubmit}
                >
                  Войти
                </button>
              </div>
              
              <div className="profile__auth-switch">
                <p>
                  Нет аккаунта?{' '}
                  <button 
                    className="profile__switch-link"
                    onClick={() => setShowRegisterForm(true)}
                  >
                    Зарегистрироваться
                  </button>
                </p>
              </div>
            </div>
          ) : (
            // Выбор: вход или регистрация
            <>
              <p className="profile__auth-subtitle">
                Для доступа к личному кабинету необходимо войти или зарегистрироваться
              </p>
              
              <div className="profile__auth-options">
                <button 
                  className="profile__auth-button profile__auth-button--login"
                  onClick={() => setShowLoginForm(true)}
                >
                  Войти
                </button>
                <button 
                  className="profile__auth-button profile__auth-button--register"
                  onClick={() => setShowRegisterForm(true)}
                >
                  Регистрация
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  const handleEdit = () => {
    if (isEditing) {
      // Отмена редактирования - возвращаем исходные данные
      setFormData({
        name: userData?.name || '',
        email: userData?.email || '',
        phone: userData?.phone || '',
      })
    }
    setIsEditing(!isEditing)
    onEdit?.(!isEditing)
  }

  const handleSave = () => {
    // Валидация
    if (!formData.name.trim()) {
      alert('Введите имя')

      return
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      alert('Введите корректный email')

      return
    }

    if (!formData.phone.trim()) {
      alert('Введите телефон')

      return
    }

    onSave?.(formData)
    setIsEditing(false)
    alert('Данные успешно сохранены!')
  }

  const handleLogout = () => {
    setIsLogoutConfirm(true)
  }

  const handleConfirmLogout = () => {
    setIsLogoutConfirm(false)
    onLogout?.()
  }

  const handleCancelLogout = () => {
    setIsLogoutConfirm(false)
  }

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  return (
    <div className="profile">
      <div className="profile__header">
        <h2 className="profile__title">Личный кабинет</h2>
        {!isEditing && !isLogoutConfirm && (
          <button 
            className="profile__edit-btn"
            onClick={handleEdit}
          >
            Редактировать
          </button>
        )}
      </div>

      {isLogoutConfirm ? (
        <div className="profile__logout-confirm">
          <h3 className="profile__logout-title">Подтверждение выхода</h3>
          <p className="profile__logout-text">
            Вы уверены, что хотите выйти из системы?
          </p>
          <div className="profile__logout-actions">
            <button 
              className="profile__button profile__button--cancel"
              onClick={handleCancelLogout}
            >
              Отмена
            </button>
            <button 
              className="profile__button profile__button--confirm"
              onClick={handleConfirmLogout}
            >
              Да, выйти
            </button>
          </div>
        </div>
      ) : isEditing ? (
        <div className="profile__edit">
          <div className="profile__form">
            <div className="profile__field">
              <label htmlFor="name" className="profile__label">
                Имя и фамилия *
              </label>
              <input
                id="name"
                type="text"
                className="profile__input"
                value={formData.name}
                onChange={handleChange('name')}
                placeholder="Введите имя и фамилию"
                required
              />
            </div>

            <div className="profile__field">
              <label htmlFor="email" className="profile__label">
                Email *
              </label>
              <input
                id="email"
                type="email"
                className="profile__input"
                value={formData.email}
                onChange={handleChange('email')}
                placeholder="Введите email"
                required
              />
            </div>

            <div className="profile__field">
              <label htmlFor="phone" className="profile__label">
                Телефон *
              </label>
              <input
                id="phone"
                type="tel"
                className="profile__input"
                value={formData.phone}
                onChange={handleChange('phone')}
                placeholder="+7 (999) 123-45-67"
                required
              />
            </div>

            <div className="profile__form-actions">
              <button 
                className="profile__button profile__button--cancel"
                onClick={handleEdit}
              >
                Отмена
              </button>
              <button 
                className="profile__button profile__button--save"
                onClick={handleSave}
              >
                Сохранить изменения
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="profile__info">
            <h3 className="profile__name">
              {userData?.name || 'Имя не указано'}
            </h3>
            <p className="profile__email">
              {userData?.email || 'Email не указан'}
            </p>
          </div>

          <div className="profile__details">
            <div className="profile__detail-item">
              <span className="profile__detail-label">Email:</span>
              <span className="profile__detail-value">
                {userData?.email || 'Не указан'}
              </span>
            </div>
            <div className="profile__detail-item">
              <span className="profile__detail-label">Телефон:</span>
              <span className="profile__detail-value">
                {userData?.phone || 'Не указан'}
              </span>
            </div>
          </div>

          <div className="profile__actions">
            <button 
              className="profile__button profile__button--logout"
              onClick={handleLogout}
            >
              Выйти
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Profile