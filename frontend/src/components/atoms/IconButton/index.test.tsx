import Icon from '.'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
describe('IconButton', () => {
  it('should render the icon', () => {
    const icon = '../../../../public/assets/icons/facebook.svg'
    const alt = 'googleIcon'
    const { getByRole } = render(<Icon icon={icon} alt={alt} />)
    const element = getByRole('img')
    expect(element).toBeInTheDocument
    expect(element).toHaveAttribute('src', icon)
    expect(element).toHaveAttribute('alt', alt)
  })

  it('should call onclick when clicked', () => {
    const onClickMock = jest.fn()

    const icon = '../../../../public/assets/icons/google.svg'
    const alt = 'googleIcon'
    const { getByRole } = render(
      <Icon icon={icon} alt={alt} onclick={onClickMock} />
    )
    const iconWrapper = getByRole('button')

    fireEvent.click(iconWrapper)

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })
})
