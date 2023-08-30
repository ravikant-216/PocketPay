import Icon from '.'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'
import googleIcon from '../../../../public/assets/icons/google.svg'
describe('IconButton', () => {
  const backgroundColor = 'red'
  const borderColor = 'blue'
  const borderRadius = '10px'
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
      <Icon icon={icon} alt={alt} onClick={onClickMock} />
    )
    const iconWrapper = getByRole('button')

    fireEvent.click(iconWrapper)

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('should have correct styles', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Icon
          icon={googleIcon}
          backgroundColor={backgroundColor}
          borderColor={borderColor}
          borderRadius={borderRadius}
        />
      </ThemeProvider>
    )

    const iconButton = getByTestId('iconButton')
    expect(iconButton).toHaveStyle(`background-color: rgba(0, 0, 0, 0.04)`)
    expect(iconButton).toHaveStyle(`border-color: ${borderColor}`)
    expect(iconButton).toHaveStyle(`border-radius: ${borderRadius}`)
  })

  it('should use default styles if no custom styles are provided', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Icon icon={googleIcon} />
      </ThemeProvider>
    )

    const iconButton = getByTestId('iconButton')

    expect(iconButton).toHaveStyle('background-color: rgba(0, 0, 0, 0.04)')
    expect(iconButton).toHaveStyle(
      `border: 1px solid ${theme.palette.Greys.stroke}`
    )
    expect(iconButton).toHaveStyle(`border-radius: ${theme.spacing(1)}`)
  })
})
