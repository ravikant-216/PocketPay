import { Box, Divider, RadioGroup, Stack, styled } from '@mui/material'
import Typography from '../../atoms/Typography'
import TransferTypeRadio from '../../molecules/TransferTypeRadio'
import CardIcon from '../../../../public/assets/icons/atm-card.svg'
import BankIcon from '../../../../public/assets/icons/bank.svg'
import GlobeIcon from '../../../../public/assets/icons/globe.svg'
import LloydsBankLogo from '../../../../public/assets/icons/lloyds_bank_logo.svg'
import VisaLogo from '../../../../public/assets/icons/visa.svg'
import TabsComponent from '../../molecules/Tabs'
import BankCardDetailsRadio from '../../molecules/BankCardDetailsRadio'
import Image from '../../atoms/Image'
import Button from '../../atoms/Button'
import {
  CHOOSE_TRANSFER_TYPE_TITLE,
  COMPLETE_BUTTON_LABEL,
  CONFIRM_PURCHASE_LABEL,
  ENDING_CARD_LABEL,
  FEATURE_DESCRIPTION_LABEL_1,
  FEATURE_DESCRIPTION_LABEL_2,
  FEATURE_DESCRIPTION_LABEL_3,
  GBP_LABEL,
  PAYMENT_CONFIRMATION_STEP_1,
  PAYMENT_CONFIRMATION_STEP_2,
  PAY_WITH_CARD_LABEL,
} from '../../../strings/constants'
import React, { useState } from 'react'

export enum ScreenType {
  CHOOSE_PAYMENT_TYPE = 'CHOOSE_PAYMENT_TYPE',
  PAY_WITH_CARD = 'PAY_WITH_CARD',
  PAYMENT_CONFIRMATION = 'PAYMENT_CONFIRMATION',
}

interface PaymentProps {
  userCurrentScreen: ScreenType
  onTransferOptionSelected: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => void
}

const transferOptions = [
  {
    value: 'debit',
    src: CardIcon,
    alt: 'Card Icon',
    title: 'Debit card',
    description:
      'Send from your Visa or Mastercard. Should arrive by January 28th.',
  },
  {
    src: CardIcon,
    alt: 'Card Icon',
    description:
      'Send from your Visa or Mastercard. Should arrive by January 28th.',
    title: 'Credit card',
    value: 'credit',
  },
  {
    src: BankIcon,
    alt: 'Bank Icon',
    title: 'Transfer from your bank account',
    description:
      'Transfer the money using bank account. Should arrive by January 28th.',
    value: 'bank',
  },
  {
    src: GlobeIcon,
    alt: 'Globe Icon',
    title: 'SWIFT Transfer',
    description:
      'Send GBP from your bank account outside the UK. Should arrive by January 28th.',
    value: 'swift',
  },
]

const cardPaymentOptions = [
  {
    value: 0,
    title: 'EUR Credit card',
    lastFourDigitsOfCardNumber: 9313,
    expirationDate: new Date('2025/06/06'),
  },
  {
    value: 1,
    title: 'EUR Credit card',
    lastFourDigitsOfCardNumber: 9813,
    expirationDate: new Date('2025/06/06'),
  },
]

const Wrapper = styled(Box)(({ theme }) => ({
  width: theme.spacing(118.25),
  '.payment-confirmation': {
    height: theme.spacing(98.25),
    flexShrink: 0,
    borderRadius: theme.spacing(4),
    border: `${theme.spacing(0.25)} solid ${theme.palette.Greys.stroke}`,
    background: 'white',

    display: 'flex',
    flexFlow: 'column wrap',
    gap: theme.spacing(4),

    '& .header': {
      diplay: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
      paddingTop: theme.spacing(6),
    },
    '& .content': {
      display: 'flex',
      flexFlow: 'column wrap',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingLeft: theme.spacing(12),
      paddingRight: theme.spacing(12),
      paddingTop: theme.spacing(4),
      gap: theme.spacing(2),
    },
    '& .button': {
      alignSelf: 'center',
      marginTop: theme.spacing(5),
    },
  },

  '& .card-options': {
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'center',
    gap: theme.spacing(7),
    ' & .MuiTabs-flexContainer': {
      justifyContent: 'space-evenly',
    },
  },
  '& .transfer-type': {
    display: 'flex',
    flexFlow: 'column wrap',
    gap: theme.spacing(7.5),
    '& .transfer-options': {
      display: 'flex',
      flexFlow: 'column wrap',
      gap: theme.spacing(1),
    },
  },
}))

const Payment: React.FC<PaymentProps> = ({
  userCurrentScreen,
  onTransferOptionSelected,
}) => {
  const TransferTypeSelection = (
    <Stack className="transfer-type">
      <Typography variant="h1" color="text.highEmphasis">
        {CHOOSE_TRANSFER_TYPE_TITLE}
      </Typography>
      <RadioGroup defaultValue={'bank'} onChange={onTransferOptionSelected}>
        <Stack className="transfer-options">
          <Typography variant="caption" color="text.mediumEmphasis">
            {FEATURE_DESCRIPTION_LABEL_1}
          </Typography>
          <TransferTypeRadio {...transferOptions[0]} />
          <TransferTypeRadio {...transferOptions[1]} />
        </Stack>
        <Stack className="transfer-options">
          <Typography variant="caption" color="text.mediumEmphasis">
            {FEATURE_DESCRIPTION_LABEL_2}
          </Typography>
          <TransferTypeRadio {...transferOptions[2]} />
        </Stack>
        <Stack className="transfer-options">
          <Typography variant="caption" color="text.mediumEmphasis">
            {FEATURE_DESCRIPTION_LABEL_3}
          </Typography>
          <TransferTypeRadio {...transferOptions[3]} />
        </Stack>
      </RadioGroup>
    </Stack>
  )

  const [selectedCardLastFourDigits, setSelectedCardLastFourDigits] =
    useState<number>(cardPaymentOptions[0].lastFourDigitsOfCardNumber)

  const onCardSelect: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => void = (e, value) => {
    setSelectedCardLastFourDigits(
      cardPaymentOptions[Number(value)].lastFourDigitsOfCardNumber
    )
  }

  const tabs = [
    {
      label: 'SAVED CARDS',
      content: (
        <RadioGroup
          defaultValue={selectedCardLastFourDigits}
          onChange={onCardSelect}
        >
          <BankCardDetailsRadio {...cardPaymentOptions[0]} />
          <BankCardDetailsRadio {...cardPaymentOptions[1]} />
        </RadioGroup>
      ),
    },
    {
      label: 'NEW CARD',
      content: '',
    },
  ]

  const PaymentWithCard = (
    <Stack className="card-options">
      <Typography variant="h1">{PAY_WITH_CARD_LABEL}</Typography>
      <TabsComponent tabs={tabs} />
    </Stack>
  )

  const PaymentConfirmation = (
    <Stack className="payment-confirmation">
      <Stack className="header">
        <Image src={LloydsBankLogo} alt="Lloyds bank Logo" />
        <Image src={VisaLogo} alt="Visa logo" />
      </Stack>
      <Divider />
      <Stack className="content">
        <Typography
          sx={{ alignSelf: 'center' }}
          variant="body1"
          color="text.highEmphasis"
        >
          {CONFIRM_PURCHASE_LABEL}
        </Typography>
        <Typography variant="caption" color="text.mediumEmphasis">
          <Typography variant="caption" color="text.highEmphasis">
            {GBP_LABEL}
          </Typography>
          {ENDING_CARD_LABEL}
          <Typography variant="caption" color="text.highEmphasis">
            {selectedCardLastFourDigits}
          </Typography>
        </Typography>
        <Typography variant="caption" color="text.mediumEmphasis">
          {PAYMENT_CONFIRMATION_STEP_1}
        </Typography>
        <Typography variant="caption" color="text.mediumEmphasis">
          {PAYMENT_CONFIRMATION_STEP_2}
        </Typography>
        <Button className="button" variant="contained">
          {COMPLETE_BUTTON_LABEL}
        </Button>
      </Stack>
    </Stack>
  )

  let RenderingComponent: React.ReactNode = PaymentConfirmation

  if (userCurrentScreen === ScreenType.CHOOSE_PAYMENT_TYPE)
    RenderingComponent = TransferTypeSelection
  else if (userCurrentScreen === ScreenType.PAY_WITH_CARD)
    RenderingComponent = PaymentWithCard
  return <Wrapper data-testid="Payment">{RenderingComponent}</Wrapper>
}

export default Payment
