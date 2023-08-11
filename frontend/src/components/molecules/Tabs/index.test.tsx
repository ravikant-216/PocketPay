import { fireEvent, render } from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'
import TabsComponent from '.'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'

describe('TabsComponent', () => {
  const tabs = [
    { label: 'Tab 1', content: 'Tab 1 Content' },
    { label: 'Tab 2', content: 'Tab 2 Content' },
  ]
  test('updates the value when a tab is clicked', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <TabsComponent tabs={tabs} />
      </ThemeProvider>
    )
    const tab1 = getByText('Tab 1')
    const tab2 = getByText('Tab 2')

    expect(tab1).toHaveClass('Mui-selected')
    expect(tab2).not.toHaveClass('Mui-selected')

    fireEvent.click(tab2)

    expect(tab1).not.toHaveClass('Mui-selected')
    expect(tab2).toHaveClass('Mui-selected')
  })
  test('should not render the content when the tabs prop is undefined', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <TabsComponent tabs={undefined} />
      </ThemeProvider>
    )
    expect(container.querySelector('.MuiTabs-root')).toBeTruthy()
    expect(container.querySelector('.MuiTabs-content')).toBeFalsy()
  })
  test('should not render the content when the value prop is undefined', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <TabsComponent tabs={undefined} />
      </ThemeProvider>
    )
    expect(container.querySelector('.MuiTabs-root')).toBeTruthy()
    expect(container.querySelector('.MuiTabs-content')).toBeFalsy()
  })
  test('displays the content of the selected tab', () => {
    const { getByText, getByRole } = render(
      <ThemeProvider theme={theme}>
        <TabsComponent tabs={tabs} />
      </ThemeProvider>
    )
    const tab1Content = getByText('Tab 1 Content')
    expect(tab1Content).toBeInTheDocument()

    const tab2Button = getByRole('tab', { name: 'Tab 2' })
    fireEvent.click(tab2Button)

    const tab2Content = getByText('Tab 2 Content')
    expect(tab2Content).toBeVisible()
  })

  test('uses provided value from props when available', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <TabsComponent tabs={tabs} value={1} />
      </ThemeProvider>
    )
    const tab1 = getByText('Tab 1')
    const tab2 = getByText('Tab 2')

    expect(tab1).not.toHaveClass('Mui-selected')
    expect(tab2).toHaveClass('Mui-selected')

    fireEvent.click(tab1)

    expect(tab1).toHaveClass('MuiButtonBase-root')
    expect(tab2).toHaveClass('MuiButtonBase-root')
  })
})
