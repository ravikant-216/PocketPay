import React, { useState } from 'react'
import Typography from '../../atoms/Typography'
import { Box, BoxProps } from '@mui/material'
import InputField from '../../atoms/InputField'
import CustomButton from '../../atoms/Button'
import theme from '../../../theme'
import {
  REVIEW_ACCOUNT,
  AMOUNT_CONVERT,
  CANCEL,
  SAVE,
  TRANSFER_DETAIL,
} from '../../../strings/constants'

export interface TransferDetailsProps extends BoxProps {
  amount: string
  fee: string
  amountRate: string
  guaranteedRate: string
  cancelOnClick?: () => void
  saveOnClick?: (values: {
    amount: string
    fee: string
    amountRate: string
    guaranteedRate: string
  }) => void
}

export default function TransferDetailsForm({
  amount: initialAmount,
  fee,
  amountRate,
  guaranteedRate,
  cancelOnClick,
  saveOnClick,
  ...props
}: TransferDetailsProps) {
  const [amount, setAmount] = useState(initialAmount)
  const handleSaveClick = () => {
    if (saveOnClick) {
      saveOnClick({ amount, fee, amountRate, guaranteedRate })
    }
  }

  const fields = [
    {
      label: 'Amount',
      placeholder: 'Enter amount',
      disabled: false,
      value: amount,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setAmount(event.target.value),
    },
    {
      label: 'Fee',
      disabled: true,
      value: fee,
    },
    {
      label: AMOUNT_CONVERT,
      disabled: true,
      value: amountRate,
    },
    {
      label: 'Guaranteed rate',
      disabled: true,
      value: guaranteedRate,
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
          rowGap: theme.spacing(5),
        }}
      >
        <Typography variant="h1" sx={{ marginBottom: theme.spacing(3) }}>
          {REVIEW_ACCOUNT}
        </Typography>
        <Typography variant="caption" color="text.lowEmphasis">
          {TRANSFER_DETAIL}
        </Typography>
        {fields.map((field) => (
          <InputField
            key={field.label}
            label={field.label}
            placeholder={field.placeholder}
            sx={{ width: '100%' }}
            value={field.value}
            disabled={field.disabled}
            onChange={field.onChange}
          />
        ))}
        <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <CustomButton
            variant="outlined"
            sx={{
              marginRight: theme.spacing(5),
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
          sx={{ minWidth: theme.spacing(33.75) }}
          onClick={handleSaveClick}
        >
          {SAVE}
        </CustomButton>
      </Box>
    </Box>
  )
}
