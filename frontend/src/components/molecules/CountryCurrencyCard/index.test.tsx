import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import CountryCurrencyCard from '.'
import IndiaFlagIcon from '../../../../public/assets/icons/india.svg'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'

const testId = 'CountryCurrencyCard'

const renderWithTheme = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)

test('Should render', () => {
  renderWithTheme(
    <CountryCurrencyCard
      countryImageSrc={IndiaFlagIcon}
      countryImageAlt={'India Flag Icon'}
      countryCurrencyCode={'INR'}
      countryName={'India'}
    />
  )

  expect(screen.getByTestId(testId)).toBeInTheDocument()
  expect(screen.getByAltText('India Flag Icon')).toBeInTheDocument()
  expect(screen.getByText('INR')).toBeInTheDocument()
  expect(screen.getByText('India')).toBeInTheDocument()
})
