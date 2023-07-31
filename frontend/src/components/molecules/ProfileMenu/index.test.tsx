import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import ProfileMenu from '.'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'

const onLogoutMock = jest.fn()
const testId = 'ProfileMenu'

const customRender = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)

test('Should render', () => {
  customRender(<ProfileMenu onLogout={onLogoutMock} open={true} />)
  expect(screen.getByTestId(testId)).toBeInTheDocument()
})

test('Should not render', () => {
  customRender(<ProfileMenu onLogout={onLogoutMock} open={false} />)
  expect(screen.queryByTestId(testId)).not.toBeInTheDocument()
})

test('Should call onLogoutMock on clicking logout menu-item', () => {
  customRender(<ProfileMenu onLogout={onLogoutMock} open={true} />)
  expect(screen.getByTestId(testId)).toBeInTheDocument()
  fireEvent.click(screen.getByText('Logout'))
  expect(onLogoutMock).toBeCalledTimes(1)
})
