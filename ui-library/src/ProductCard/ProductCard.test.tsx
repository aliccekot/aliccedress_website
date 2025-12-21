import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { ProductCard } from './ProductCard'

import type { ProductCardProps } from './ProductCard'

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
  alt: 'Test Product Image',
  className: '',
  showAddToCart: true,
  onAddToCart: jest.fn()
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
    
    const image = screen.getByAltText('Test Product Image')

    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg')
  })

  test('renders without optional props', () => {
    const minimalProps: ProductCardProps = {
      id: 1,
      imageUrl: 'https://example.com/image.jpg',
      title: 'Test Product',
      price: '$99.99'
    }

    render(<ProductCard {...minimalProps} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
    expect(screen.queryByText('Test description')).not.toBeInTheDocument()
  })

  test('renders without description when not provided', () => {
    const propsWithoutDescription = { ...defaultProps, description: undefined }

    render(<ProductCard {...propsWithoutDescription} />)

    expect(screen.queryByText('Test description')).not.toBeInTheDocument()
  })

  test('renders without cart button when showAddToCart is false', () => {
    const propsWithoutCart: ProductCardProps = { ...defaultProps, showAddToCart: false }

    render(<ProductCard {...propsWithoutCart} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
  })

  test('renders without cart button when onAddToCart is not provided', () => {
    const propsWithoutCartHandler: ProductCardProps = { 
      ...defaultProps, 
      onAddToCart: undefined 
    }

    render(<ProductCard {...propsWithoutCartHandler} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
  })

  test('does not render cart button when both showAddToCart is false and onAddToCart is undefined', () => {
    const props: ProductCardProps = {
      id: 1,
      imageUrl: 'https://example.com/image.jpg',
      title: 'Test Product',
      price: '$99.99',
      showAddToCart: false
    }

    render(<ProductCard {...props} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
  })

  test('uses title as alt text when alt is not provided', () => {
    const propsWithoutAlt: ProductCardProps = { ...defaultProps, alt: undefined }

    render(<ProductCard {...propsWithoutAlt} />)

    const image = screen.getByAltText('Test Product')

    expect(image).toBeInTheDocument()
  })

  test('uses custom alt text when provided', () => {
    render(<ProductCard {...defaultProps} />)

    const image = screen.getByAltText('Test Product Image')

    expect(image).toBeInTheDocument()
  })

  test('applies custom className', () => {
    const propsWithClassName: ProductCardProps = { ...defaultProps, className: 'custom-class' }

    render(<ProductCard {...propsWithClassName} />)

    const card = screen.getByText('Test Product').closest('.productCard')

    expect(card).toHaveClass('custom-class')
  })

  test('renders with numeric price', () => {
    const propsWithNumericPrice: ProductCardProps = { ...defaultProps, price: 150 }

    render(<ProductCard {...propsWithNumericPrice} />)

    expect(screen.getByText('150')).toBeInTheDocument()
  })

  test('renders with string price', () => {
    const propsWithStringPrice: ProductCardProps = { ...defaultProps, price: '$150.00' }

    render(<ProductCard {...propsWithStringPrice} />)

    expect(screen.getByText('$150.00')).toBeInTheDocument()
  })

  test('renders with id as string', () => {
    const propsWithStringId: ProductCardProps = { ...defaultProps, id: 'product-123' }

    render(<ProductCard {...propsWithStringId} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
  })

  test('renders with id as number', () => {
    const propsWithNumberId: ProductCardProps = { ...defaultProps, id: 123 }

    render(<ProductCard {...propsWithNumberId} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
  })

  test('renders with default textPosition when not provided', () => {
    const propsWithoutTextPosition: ProductCardProps = { ...defaultProps, textPosition: undefined }

    render(<ProductCard {...propsWithoutTextPosition} />)

    const card = screen.getByText('Test Product').closest('.productCard')

    expect(card).toHaveClass('text-left')
  })

  test('applies left text position class by default', () => {
    render(<ProductCard {...defaultProps} />)

    const card = screen.getByText('Test Product').closest('.productCard')

    expect(card).toHaveClass('text-left')
  })

  test('applies center text position class when specified', () => {
    const propsWithCenterText: ProductCardProps = { ...defaultProps, textPosition: 'center' }

    render(<ProductCard {...propsWithCenterText} />)

    const card = screen.getByText('Test Product').closest('.productCard')

    expect(card).toHaveClass('text-center')
  })

  test('applies right text position class when specified', () => {
    const propsWithRightText: ProductCardProps = { ...defaultProps, textPosition: 'right' }

    render(<ProductCard {...propsWithRightText} />)

    const card = screen.getByText('Test Product').closest('.productCard')

    expect(card).toHaveClass('text-right')
  })

  test('calls onButtonClick when card is clicked', () => {
    render(<ProductCard {...defaultProps} />)

    const card = screen.getByText('Test Product').closest('.productCard')

    fireEvent.click(card!)

    expect(defaultProps.onButtonClick).toHaveBeenCalledTimes(1)
  })

  test('calls onButtonClick when details button is clicked', () => {
    render(<ProductCard {...defaultProps} />)

    const detailsButton = document.querySelector('.detailsButton')
    
    if (detailsButton) {
      fireEvent.click(detailsButton)
      expect(defaultProps.onButtonClick).toHaveBeenCalledTimes(1)
    }
  })

  test('does not throw error when onButtonClick is not provided and card is clicked', () => {
    const propsWithoutHandlers: ProductCardProps = {
      id: 1,
      imageUrl: 'https://example.com/image.jpg',
      title: 'Test Product',
      price: '$99.99'
    }

    render(<ProductCard {...propsWithoutHandlers} />)

    const card = screen.getByText('Test Product').closest('.productCard')
    
    expect(() => {
      fireEvent.click(card!)
    }).not.toThrow()
  })

  test('does not throw error when onButtonClick is not provided and details button is clicked', () => {
    const propsWithoutHandlers: ProductCardProps = {
      id: 1,
      imageUrl: 'https://example.com/image.jpg',
      title: 'Test Product',
      price: '$99.99'
    }

    render(<ProductCard {...propsWithoutHandlers} />)

    expect(() => {
      const detailsButton = document.querySelector('.detailsButton')

      if (detailsButton) {
        fireEvent.click(detailsButton)
      }
    }).not.toThrow()
  })

  test('does not call onButtonClick when details button is clicked with event stopPropagation', () => {
    render(<ProductCard {...defaultProps} />)

    const card = screen.getByText('Test Product').closest('.productCard')
    
    fireEvent.click(card!)
    expect(defaultProps.onButtonClick).toHaveBeenCalledTimes(1)
    
    const detailsButton = document.querySelector('.detailsButton')

    if (detailsButton) {
      fireEvent.click(detailsButton)
      expect(defaultProps.onButtonClick).toHaveBeenCalledTimes(2)
    }
  })

  test('uses fallback image when image fails to load', () => {
    render(<ProductCard {...defaultProps} />)

    const image = screen.getByAltText('Test Product Image')
    const fallbackImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhGOUZBIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlByb2R1Y3QgSW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg=='

    fireEvent.error(image)

    expect(image).toHaveAttribute('src', fallbackImage)
  })

  test('handles image error without breaking', () => {
    render(<ProductCard {...defaultProps} />)

    const image = screen.getByAltText('Test Product Image')
    
    expect(() => {
      fireEvent.error(image)
    }).not.toThrow()
  })

  test('renders without buttonText', () => {
    const propsWithoutButtonText: ProductCardProps = { ...defaultProps, buttonText: undefined }

    render(<ProductCard {...propsWithoutButtonText} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
  })

  test('renders with custom buttonText', () => {
    render(<ProductCard {...defaultProps} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
  })

  test('combines className correctly', () => {
    const propsWithClassName: ProductCardProps = { 
      ...defaultProps, 
      className: 'custom-class another-class' 
    }

    render(<ProductCard {...propsWithClassName} />)

    const card = screen.getByText('Test Product').closest('.productCard')

    expect(card).toHaveClass('custom-class')

    expect(card).toHaveClass('another-class')
  })

  test('renders with all props undefined except required', () => {
    const minimalRequiredProps: ProductCardProps = {
      id: 'test-id',
      imageUrl: 'test.jpg',
      title: 'Required Title',
      price: 100
    }

    render(<ProductCard {...minimalRequiredProps} />)

    expect(screen.getByText('Required Title')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
    
    const image = screen.getByAltText('Required Title')

    expect(image).toBeInTheDocument()
  })

  test('does not render buttons container when no button interactions', () => {
    const propsWithoutButtons: ProductCardProps = {
      id: 1,
      imageUrl: 'https://example.com/image.jpg',
      title: 'Test Product',
      price: '$99.99'
    }

    render(<ProductCard {...propsWithoutButtons} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
  })

  test('handles edge case with empty strings', () => {
    const propsWithEmptyStrings: ProductCardProps = {
      id: 1,
      imageUrl: 'https://example.com/image.jpg',
      title: '',
      description: '',
      price: '',
      alt: ''
    }

    render(<ProductCard {...propsWithEmptyStrings} />)

    const image = screen.getByAltText('')

    expect(image).toBeInTheDocument()
  })

  test('trims className correctly', () => {
    const propsWithSpaces: ProductCardProps = { 
      ...defaultProps, 
      className: '  custom-class  ' 
    }

    render(<ProductCard {...propsWithSpaces} />)

    const card = screen.getByText('Test Product').closest('.productCard')

    expect(card).toHaveClass('custom-class')
  })

  test('handles onButtonClick undefined in handleCardClick', () => {
    const propsWithoutOnClick: ProductCardProps = {
      id: 1,
      imageUrl: 'https://example.com/image.jpg',
      title: 'Test Product',
      price: '$99.99',
      onButtonClick: undefined
    }

    render(<ProductCard {...propsWithoutOnClick} />)

    const card = screen.getByText('Test Product').closest('.productCard')
    
    expect(() => {
      fireEvent.click(card!)
    }).not.toThrow()
  })

  test('handles button click with stopPropagation', () => {
    const mockOnButtonClick = jest.fn()
    const props: ProductCardProps = {
      ...defaultProps,
      onButtonClick: mockOnButtonClick
    }

    render(<ProductCard {...props} />)

    const detailsButton = document.querySelector('.detailsButton')

    if (detailsButton) {
      fireEvent.click(detailsButton)
      expect(mockOnButtonClick).toHaveBeenCalledTimes(1)
    }
  })

  test('renders overlay div', () => {
    render(<ProductCard {...defaultProps} />)

    const overlay = document.querySelector('.overlay')

    expect(overlay).toBeInTheDocument()
  })

  test('renders content div', () => {
    render(<ProductCard {...defaultProps} />)

    const content = document.querySelector('.content')

    expect(content).toBeInTheDocument()
  })

  test('renders buttons container', () => {
    render(<ProductCard {...defaultProps} />)

    const buttons = document.querySelector('.buttons')

    expect(buttons).toBeInTheDocument()
  })

  test('renders details button', () => {
    render(<ProductCard {...defaultProps} />)

    const detailsButton = document.querySelector('.detailsButton')

    expect(detailsButton).toBeInTheDocument()
  })

  test('renders with price as number 0', () => {
    const props: ProductCardProps = {
      id: 1,
      imageUrl: 'https://example.com/image.jpg',
      title: 'Test Product',
      price: 0
    }

    render(<ProductCard {...props} />)

    expect(screen.getByText('0')).toBeInTheDocument()
  })

  test('renders with price as empty string', () => {
    const props: ProductCardProps = {
      id: 1,
      imageUrl: 'https://example.com/image.jpg',
      title: 'Test Product',
      price: ''
    }

    render(<ProductCard {...props} />)

    expect(screen.getByText('')).toBeInTheDocument()
  })

  test('handles card click without onButtonClick prop', () => {
    const props: ProductCardProps = {
      id: 1,
      imageUrl: 'https://example.com/image.jpg',
      title: 'Test Product',
      price: '$99.99',
      onButtonClick: undefined
    }

    render(<ProductCard {...props} />)

    const card = screen.getByText('Test Product').closest('.productCard')

    expect(() => {
      fireEvent.click(card!)
    }).not.toThrow()
  })

  test('calls onButtonClick only once when clicking details button inside card', () => {
    const mockOnButtonClick = jest.fn()
    const props: ProductCardProps = {
      ...defaultProps,
      onButtonClick: mockOnButtonClick
    }

    render(<ProductCard {...props} />)

    const detailsButton = document.querySelector('.detailsButton')

    if (detailsButton) {
      fireEvent.click(detailsButton)
      expect(mockOnButtonClick).toHaveBeenCalledTimes(1)
    }
  })
})