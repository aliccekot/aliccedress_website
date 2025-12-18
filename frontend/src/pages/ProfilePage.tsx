import React, { useState } from 'react'

import { Profile } from '@my-app/ui-library'

// Тип для данных пользователя
interface UserData {
  name: string
  email: string
  phone: string
}

const ProfilePage: React.FC<{
  onBack: () => void;
}> = ({ onBack }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [userData] = useState<UserData>({
    name: 'Алиса Котова',
    email: 'alicekot@gmail.com',
    phone: '+7 (999) 123-45-67',
  })

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleSave = (data: Record<string, unknown>) => {
  // Проверяем, что данные соответствуют UserData
    if (
      data.name && 
    data.email && 
    data.phone &&
    typeof data.name === 'string' &&
    typeof data.email === 'string' &&
    typeof data.phone === 'string'
    ) {
    // Теперь TypeScript знает, что это UserData
      const userData: UserData = {
        name: data.name,
        email: data.email,
        phone: data.phone
      }
    
      alert(`Данные профиля сохранены!\n\nИмя: ${userData.name}\nEmail: ${userData.email}\nТелефон: ${userData.phone}`)
      setIsEditing(false)
    } else {
      console.error('Некорректные данные пользователя')
    }
  }

  return (
    <div className="profile-page">
      <div className="page-header">
        <div className="page-header__content">
          <button 
            className="page-header__back-btn"
            onClick={onBack}
          >
            ← Назад
          </button>
          <h1 className="page-header__title">Мой профиль</h1>
          <p className="page-header__subtitle">Управление личной информацией и настройками аккаунта</p>
        </div>
      </div>

      <div className="profile-page__main">
        <div className="profile-page__content">
          <Profile 
            userData={userData}
            onEdit={handleEdit}
            onSave={handleSave}
            isEditing={isEditing}
          />
          
        </div>
      </div>

      {/* Используем общий подвал */}
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

export default ProfilePage