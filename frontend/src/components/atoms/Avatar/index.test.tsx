import { render, fireEvent } from '@testing-library/react'
import Avatar from '.'
import '@testing-library/jest-dom/extend-expect'

describe('Avatar', () => {
  it('renders the Avatar component with the correct props', () => {
    const { getByAltText } = render(
      <Avatar src="test-image.jpg" alt="Test Image" />
    )
    const avatar = getByAltText('Test Image')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', 'test-image.jpg')
  })

  it('calls the onClick function when clicked', () => {
    const onClick = jest.fn()
    const { getByAltText } = render(
      <Avatar src="test-image.jpg" alt="Test Image" onClick={onClick} />
    )
    const avatar = getByAltText('Test Image')
    fireEvent.click(avatar)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
