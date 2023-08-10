import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import BusinessDetailsForm from '.'
import '@testing-library/jest-dom'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'

const renderWithTheme = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)

describe('BusinessDetailsForm', () => {
  it('renders the form with the provided values', () => {
    renderWithTheme(
      <BusinessDetailsForm
        name="ravi kant"
        email="ravi.kant@gmail.com"
        accountNumber="123456789"
        accountType="Savings"
      />
    )

    expect(
      screen.getByText('Review details of your transfer')
    ).toBeInTheDocument()
    expect(screen.getByText('Business details')).toBeInTheDocument()
    expect(screen.getByLabelText('Name')).toHaveValue('ravi kant')
    expect(screen.getByLabelText('Email')).toHaveValue('ravi.kant@gmail.com')
    expect(screen.getByLabelText('Account Number')).toHaveValue('123456789')
    expect(screen.getByLabelText('Account type')).toHaveValue('Savings')
  })

  it('renders the form with empty values when no props are provided', () => {
    renderWithTheme(<BusinessDetailsForm />)

    expect(
      screen.getByText('Review details of your transfer')
    ).toBeInTheDocument()
    expect(screen.getByText('Business details')).toBeInTheDocument()
    expect(screen.getByLabelText('Name')).toHaveValue('')
    expect(screen.getByLabelText('Email')).toHaveValue('')
    expect(screen.getByLabelText('Account Number')).toHaveValue('')
    expect(screen.getByLabelText('Account type')).toHaveValue('')
  })
  it('calls the saveOnClick prop with the form values when the Save button is clicked', () => {
    const saveOnClick = jest.fn()
    renderWithTheme(
      <BusinessDetailsForm
        name="ravi kant"
        email="ravi.kant@gmail.com"
        accountNumber="123456789"
        accountType="Savings"
        saveOnClick={saveOnClick}
      />
    )

    fireEvent.click(screen.getByText('Save'))

    expect(saveOnClick).toHaveBeenCalledWith({
      name: 'ravi kant',
      email: 'ravi.kant@gmail.com',
      accountNumber: '123456789',
      accountType: 'Savings',
    })
  })
  it('updates the form values when the fields are changed', () => {
    renderWithTheme(<BusinessDetailsForm />)

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'ravi kant' },
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'ravi.kant@gmail.com' },
    })
    fireEvent.change(screen.getByLabelText('Account Number'), {
      target: { value: '123456789' },
    })
    fireEvent.change(screen.getByLabelText('Account type'), {
      target: { value: 'Savings' },
    })

    expect(screen.getByLabelText('Name')).toHaveValue('ravi kant')
    expect(screen.getByLabelText('Email')).toHaveValue('ravi.kant@gmail.com')
    expect(screen.getByLabelText('Account Number')).toHaveValue('123456789')
    expect(screen.getByLabelText('Account type')).toHaveValue('Savings')
  })
})
