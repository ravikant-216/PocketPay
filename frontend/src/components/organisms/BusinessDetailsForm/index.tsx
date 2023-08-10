import React, { useState } from 'react'
import Typography from '../../atoms/Typography'
import { Box, BoxProps } from '@mui/material'
import InputField from '../../atoms/InputField'
import CustomButton from '../../atoms/Button'
import theme from '../../../theme'
import {
  BUSINESS_DETAILS,
  CANCEL,
  REVIEW_ACCOUNT,
  SAVE,
} from '../../../strings/constants'

export interface BusinessDetailsProps extends BoxProps {
  name?: string
  email?: string
  accountNumber?: string
  accountType?: string
  cancelOnClick?: () => void
  saveOnClick?: (values: {
    name: string
    email: string
    accountNumber: string
    accountType: string
  }) => void
}

export default function BusinessDetailsForm({
  name: initialName,
  email: initialEmail,
  accountNumber: initialAccountNumber,
  accountType: initialAccountType,
  cancelOnClick,
  saveOnClick,
  ...props
}: BusinessDetailsProps) {
  const [name, setName] = useState(initialName ?? '')
  const [email, setEmail] = useState(initialEmail ?? '')
  const [accountNumber, setAccountNumber] = useState(initialAccountNumber ?? '')
  const [accountType, setAccountType] = useState(initialAccountType ?? '')

  const handleSaveClick = () => {
    if (saveOnClick) {
      saveOnClick({ name, email, accountNumber, accountType })
    }
  }

  const fields = [
    {
      label: 'Name',
      placeholder: 'Enter Name',
      value: name,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setName(event.target.value),
    },
    {
      label: 'Email',
      placeholder: 'Enter Email',
      value: email,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(event.target.value),
    },
    {
      label: 'Account Number',
      placeholder: 'Account Number',
      value: accountNumber,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setAccountNumber(event.target.value),
    },
    {
      label: 'Account type',
      placeholder: 'Account type',
      value: accountType,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setAccountType(event.target.value),
    },
  ]

  return (
    <Box
      {...props}
      sx={{ display: 'flex', alignItems: 'flex-end', ...props.sx }}
    >
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            rowGap: theme.spacing(5),
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
          }}
        >
          <Typography variant="h1" sx={{ marginBottom: theme.spacing(3) }}>
            {REVIEW_ACCOUNT}
          </Typography>
          <Typography variant="caption" color="text.lowEmphasis">
            {BUSINESS_DETAILS}
          </Typography>
          {fields.map((field) => (
            <InputField
              key={field.label}
              label={field.label}
              placeholder={field.placeholder}
              sx={{ width: '100%' }}
              value={field.value}
              onChange={field.onChange}
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <CustomButton
            variant="outlined"
            sx={{
              marginRight: theme.spacing(5),
              marginTop: theme.spacing(5),
              maxWidth: theme.spacing(33.75),
            }}
            onClick={cancelOnClick}
          >
            {CANCEL}
          </CustomButton>
        </Box>
      </Box>
      <Box>
        <CustomButton
          variant="contained"
          sx={{ minWidth: theme.spacing(33.75), marginTop: theme.spacing(5) }}
          onClick={handleSaveClick}
        >
          {SAVE}
        </CustomButton>
      </Box>
    </Box>
  )
}
