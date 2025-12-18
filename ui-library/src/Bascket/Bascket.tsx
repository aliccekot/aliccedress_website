import React from 'react'

export interface BascketProps {
  /**
   * Количество товаров в корзине
   */
  isOpen?: boolean
  
  /**
   * Callback для открытия/закрытия корзины 
   */
  onToggle?: () => void
}

/**
 временная заглушка
 * @component
 * @example
 * return (
 *   <Bascket />
 * )
 */
const Bascket: React.FC<BascketProps> = () => {
  const containerStyle: React.CSSProperties = {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    padding: "24px",
    margin: "16px",
    maxWidth: "400px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
    transition: "all 0.3s ease",
  }

  const placeholderStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  }

  const iconStyle: React.CSSProperties = {
    fontSize: "48px",
    marginBottom: "16px",
    opacity: 0.7,
  }

  const titleStyle: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: 600,
    color: "#333",
    margin: "0 0 8px 0",
  }

  const descriptionStyle: React.CSSProperties = {
    fontSize: "16px",
    color: "#666",
    margin: "0 0 20px 0",
    lineHeight: 1.5,
  }

  return (
    <div style={containerStyle}>
      <div style={placeholderStyle}>
        <div style={iconStyle}>🛒</div>
        <h3 style={titleStyle}>Компонент корзины</h3>
        <p style={descriptionStyle}>Будет реализован позже</p>
      </div>
    </div>
  )
}

export default Bascket