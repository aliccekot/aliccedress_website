import React from 'react'
import './Profile.css'

export interface ProfileProps {

  userData?: {
    name?: string
    email?: string
    phone?: string
    avatar?: string
  }
  
  onLogout?: () => void
  
  onEdit?: () => void

  isEditing?: boolean

  onSave?: (data: Record<string, unknown>) => void
}

export const Profile: React.FC<ProfileProps> = ({
  userData = {
    name: 'Имя пользователя',
    email: 'user@example.com',
    phone: '+7 (XXX) XXX-XX-XX',
  },
  onLogout,
  onEdit,
  isEditing = false,
  onSave,
}) => {
  return (
    <div className="profile">
      <div className="profile__placeholder">
        <h3 className="profile__title">Личный кабинет</h3>
        <p className="profile__description">
          Компонент личного кабинета будет реализован позже
        </p>
        
        <div className="profile__info">
          <div className="profile__info-item">
            <span className="profile__info-label">Имя:</span>
            <span className="profile__info-value">{userData.name}</span>
          </div>
          <div className="profile__info-item">
            <span className="profile__info-label">Email:</span>
            <span className="profile__info-value">{userData.email}</span>
          </div>
          <div className="profile__info-item">
            <span className="profile__info-label">Телефон:</span>
            <span className="profile__info-value">{userData.phone}</span>
          </div>
        </div>
        
        <div className="profile__actions">
          <button 
            className="profile__button profile__button--edit"
            onClick={() => {
              if (onEdit) {
                onEdit()
              } else {
                alert('Редактирование профиля будет доступно позже')
              }
            }}
          >
            {isEditing ? 'Отменить редактирование' : 'Редактировать'}
          </button>
          <button 
            className="profile__button profile__button--logout"
            onClick={() => {
              if (onLogout) {
                onLogout()
              } else {
                alert('Выход из системы будет доступен позже')
              }
            }}
          >
            Выйти
          </button>
        </div>
        
        {isEditing && onSave && (
          <div className="profile__edit-section">
            <button 
              className="profile__button profile__button--save"
              onClick={() => onSave(userData as Record<string, unknown>)}
            >
              Сохранить изменения
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile