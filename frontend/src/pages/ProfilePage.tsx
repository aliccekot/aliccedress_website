import React from 'react'

import { Profile } from '@my-app/ui-library'

interface UserData {
  name: string
  email: string
  phone: string
}

const ProfilePage: React.FC<{
  onBack: () => void;
  userData?: UserData;
  isLoggedIn?: boolean;
  onLogin?: (email: string, password: string) => void;
  onRegister?: (registerData: { name: string; email: string; phone: string; password: string }) => void;
  onLogout?: () => void;
  onSave?: (data: { name: string; email: string; phone: string }) => void;
  onEdit?: (isEditing: boolean) => void;
}> = ({ 
  onBack, 
  userData, 
  isLoggedIn = false, 
  onLogin, 
  onRegister, 
  onLogout, 
  onSave,
  onEdit 
}) => {
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
          <div className="profile-container">
            <Profile
              userData={userData}
              isLoggedIn={isLoggedIn}
              onLogin={onLogin}
              onRegister={onRegister}
              onLogout={onLogout}
              onSave={onSave}
              onEdit={onEdit}
            />
          </div>
        </div>
      </div>

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