import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import CountrySelect from '.'
describe('CountrySelect', () => {
  const names = [
    {
      key: 'India',
      iconTitle: 'India',
      src: '/path/to/india/flag/image',
      alt: 'India Flag',
    },
    {
      key: 'Australia',
      iconTitle: 'Australia',
      src: '/path/to/australia/flag/image',
      alt: 'Australia Flag',
    },
    {
      key: 'United States',
      iconTitle: 'United States',
      src: '/path/to/united-states/flag/image',
      alt: 'United States Flag',
    },
  ]

  it('renders without crashing', () => {
    const { getByText } = render(<CountrySelect countryList={names} />)
    expect(getByText('Select Your Country')).toBeInTheDocument()
  })

  it('changes the value when an option is selected', () => {
    const onChange = jest.fn()
    const { getByText, getByRole } = render(
      <CountrySelect countryList={names} onChange={onChange} />
    )
    fireEvent.mouseDown(getByRole('button'))
    fireEvent.click(getByText('India'))
    expect(onChange).toHaveBeenCalledWith('India')
  })

  it('displays the selected value', () => {
    const { getByText, getByRole } = render(
      <CountrySelect countryList={names} />
    )
    fireEvent.mouseDown(getByRole('button'))
    fireEvent.click(getByText('India'))
    expect(getByRole('button')).toHaveTextContent('India')
  })
})
