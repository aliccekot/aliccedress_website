// src/ProductCard/ProductCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { ProductCard } from './ProductCard'

import type { ProductCardProps } from './ProductCard'

// Mock CSS modules
jest.mock('./ProductCard.module.css', () => ({
  productCard: 'productCard',
  productImage: 'productImage',
  overlay: 'overlay',
  content: 'content',
  title: 'title',
  description: 'description',
  price: 'price',
  buttons: 'buttons',
  detailsButton: 'detailsButton',
  cartButton: 'cartButton',
  'text-left': 'text-left',
  'text-center': 'text-center',
  'text-right': 'text-right'
}))

const defaultProps: ProductCardProps = {
  id: 1,
  imageUrl: 'https://example.com/image.jpg',
  title: 'Test Product',
  description: 'Test description',
  price: '$99.99',
  textPosition: 'left',
  buttonText: 'Learn more',
  onButtonClick: jest.fn(),
  onAddToCart: jest.fn(),
  showAddToCart: true
}

describe('ProductCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders with required props', () => {
    render(<ProductCard {...defaultProps} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
    expect(screen.getByText('Learn more')).toBeInTheDocument()
    expect(screen.getByText('Добавить в корзину')).toBeInTheDocument()

    const image = screen.getByAltText('Test Product')

    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg')
  })

  test('renders without description when not provided', () => {
    const propsWithoutDescription = { ...defaultProps, description: undefined }

    render(<ProductCard {...propsWithoutDescription} />)

    expect(screen.queryByText('Test description')).not.toBeInTheDocument()
  })

  test('renders without cart button when showAddToCart is false', () => {
    const propsWithoutCart = { ...defaultProps, showAddToCart: false }

    render(<ProductCard {...propsWithoutCart} />)

    expect(screen.queryByText('Добавить в корзину')).not.toBeInTheDocument()
  })

  test('uses title as alt text when alt is not provided', () => {
    render(<ProductCard {...defaultProps} />)

    const image = screen.getByAltText('Test Product')

    expect(image).toBeInTheDocument()
  })

  test('uses custom alt text when provided', () => {
    const propsWithAlt = { ...defaultProps, alt: 'Custom alt text' }

    render(<ProductCard {...propsWithAlt} />)

    const image = screen.getByAltText('Custom alt text')

    expect(image).toBeInTheDocument()
  })

  test('applies custom className', () => {
    const propsWithClassName = { ...defaultProps, className: 'custom-class' }

    render(<ProductCard {...propsWithClassName} />)

    const card = screen.getByText('Test Product').closest('.productCard')

    expect(card).toHaveClass('custom-class')
  })

  test('renders with numeric price', () => {
    const propsWithNumericPrice = { ...defaultProps, price: 150 }

    render(<ProductCard {...propsWithNumericPrice} />)

    expect(screen.getByText('150')).toBeInTheDocument()
  })

  test('renders with string price', () => {
    const propsWithStringPrice = { ...defaultProps, price: '$150.00' }

    render(<ProductCard {...propsWithStringPrice} />)

    expect(screen.getByText('$150.00')).toBeInTheDocument()
  })

  test('renders with default button text when not provided', () => {
    const propsWithoutButtonText = { ...defaultProps, buttonText: undefined }

    render(<ProductCard {...propsWithoutButtonText} />)

    expect(screen.getByText('Узнать подробнее')).toBeInTheDocument()
  })

  test('calls onButtonClick when card is clicked', () => {
    render(<ProductCard {...defaultProps} />)

    const card = screen.getByText('Test Product').closest('.productCard')

    fireEvent.click(card!)

    expect(defaultProps.onButtonClick).toHaveBeenCalledTimes(1)
  })

  test('calls onButtonClick when details button is clicked', () => {
    render(<ProductCard {...defaultProps} />)

    const detailsButton = screen.getByText('Learn more')

    fireEvent.click(detailsButton)

    expect(defaultProps.onButtonClick).toHaveBeenCalledTimes(1)
  })

  test('calls onAddToCart when cart button is clicked', () => {
    render(<ProductCard {...defaultProps} />)

    const cartButton = screen.getByText('Добавить в корзину')

    fireEvent.click(cartButton)

    expect(defaultProps.onAddToCart).toHaveBeenCalledTimes(1)
  })

  test('does not call onButtonClick when cart button is clicked', () => {
    const cardClickMock = jest.fn()
    const propsWithCardClick = { ...defaultProps, onButtonClick: cardClickMock }

    render(<ProductCard {...propsWithCardClick} />)

    const cartButton = screen.getByText('Добавить в корзину')

    fireEvent.click(cartButton)

    expect(cardClickMock).not.toHaveBeenCalled()
  })

  test('does not throw errors when handlers are not provided', () => {
    const propsWithoutHandlers = {
      id: 1,
      imageUrl: 'https://example.com/image.jpg',
      title: 'Test Product',
      price: '$99.99'
    }

    expect(() => {
      render(<ProductCard {...propsWithoutHandlers} />)

      const card = screen.getByText('Test Product').closest('.productCard')

      fireEvent.click(card!)

      const detailsButton = screen.getByText('Узнать подробнее')

      fireEvent.click(detailsButton)
    }).not.toThrow()
  })

  test('uses fallback image when image fails to load', () => {
    render(<ProductCard {...defaultProps} />)

    const image = screen.getByAltText('Test Product')
    const fallbackImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhGOUZBIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlByb2R1Y3QgSW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg=='

    fireEvent.error(image)

    expect(image).toHaveAttribute('src', fallbackImage)
  })

  test('applies left text position class by default', () => {
    render(<ProductCard {...defaultProps} />)

    const card = screen.getByText('Test Product').closest('.productCard')

    expect(card).toHaveClass('text-left')
  })

  test('applies center text position class when specified', () => {
    const propsWithCenterText = { ...defaultProps, textPosition: 'center' as const }

    render(<ProductCard {...propsWithCenterText} />)

    const card = screen.getByText('Test Product').closest('.productCard')

    expect(card).toHaveClass('text-center')
  })

  test('applies right text position class when specified', () => {
    const propsWithRightText = { ...defaultProps, textPosition: 'right' as const }

    render(<ProductCard {...propsWithRightText} />)

    const card = screen.getByText('Test Product').closest('.productCard')

    expect(card).toHaveClass('text-right')
  })
})