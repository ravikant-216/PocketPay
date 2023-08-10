import { Box, Stack, styled } from '@mui/material'
import Typography from '../../atoms/Typography'
import {
  CHANGE,
  CONFIRM_CONTINUE_LABEL,
  EDIT,
  RECIEPIENT_DETAILS_LABEL,
  REVIEW_TRANSFER_DETAILS_TITLE,
  SCHEDULE_DETAILS_LABEL,
  TERMS_AND_CONDITIONS_LABEL,
  TRANSFER_DETAILS_LABEL,
} from '../../../strings/constants'
import LabelValue from '../../molecules/LabelValue'
import LeftArrow from '../../../../public/assets/icons/left-arrow.svg'
import Button from '../../atoms/Button'
import Image from '../../atoms/Image'
import { useState } from 'react'
import TransferDetailsForm from '../TransferDetailsForm'
import BusinessDetailsForm from '../BusinessDetailsForm'

interface ReviewTransferDetailsProps {
  onConfirmAndContinue: React.MouseEventHandler<HTMLButtonElement>
}

enum ScreenType {
  TRANSFER_DETAILS_EDITING,
  RECIPIENT_DETAILS_EDITING,
  REVIEW_DETAILS,
}

const StyledLabelValue = styled(LabelValue)(() => ({
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

StyledLabelValue.defaultProps = {
  infoColor: 'text.mediumEmphasis',
}

const StyledStack = styled(Stack)(({ theme }) => ({
  width: theme.spacing(129),

  // layout
  display: 'flex',
  flexFlow: 'column wrap',
  gap: theme.spacing(8),

  '& .details': {
    display: 'flex',
    flexFlow: 'column wrap',
    gap: theme.spacing(4),
  },

  '& .options': {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  '& .edit-or-change-typo:hover': {
    cursor: 'pointer',
  },
  '& .footer': {
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(5),
  },
}))

const ReviewTransferDetails: React.FC<ReviewTransferDetailsProps> = ({
  onConfirmAndContinue,
}) => {
  const [userCurrentScreen, setUserCurrentScreen] = useState(
    ScreenType.REVIEW_DETAILS
  )

  const [transferDetails, setTransferDetails] = useState({
    amount: 100,
    recievingAmount: 114,
    senderCurrencyCode: 'GBP',
    recieverCurrencyCode: 'EUR',
    fee: 0.0,
    conversionAmount: 77.44,
    rate: 1.14,
  })

  const [recipientDetails, setRecipientsDetails] = useState({
    name: 'Mario Gabriel',
    email: 'mario.gabriel@gmail.com',
    accountNumber: '21363738391910',
    accountType: 'Checking',
  })

  const scheduleDetails = {
    sending: 'Now',
    arriveDate: new Date('2023/04/28'),
    repeats: 'Never',
  }

  const transferDetailsLabelvalues = [
    {
      info: 'Fee:',
      description: `${transferDetails.fee} ${transferDetails.senderCurrencyCode}`,
    },
    {
      info: "Amount we'll convert:",
      description: `${transferDetails.conversionAmount} ${transferDetails.recieverCurrencyCode}`,
    },
    {
      info: 'Guranteed rate:',
      description: `1 ${transferDetails.senderCurrencyCode} = ${transferDetails.rate} ${transferDetails.recieverCurrencyCode}`,
    },
  ]

  const recipientDetailsLabelvalues = [
    {
      info: 'Name:',
      description: recipientDetails.name,
    },
    {
      info: 'Email:',
      description: recipientDetails.email,
    },
    {
      info: 'Account number:',
      description: recipientDetails.accountNumber,
    },
    {
      info: 'Account type:',
      description: recipientDetails.accountType,
    },
  ]

  const scheduleDetailsLabelvalues = [
    {
      info: 'Sending:',
      description: scheduleDetails.sending,
    },
    {
      info: 'Should arrive:',
      description: `by ${getMonthName(
        scheduleDetails.arriveDate.getMonth()
      )} ${scheduleDetails.arriveDate.getDate()}`,
    },
    {
      info: 'Repeats:',
      description: scheduleDetails.repeats,
    },
  ]

  const renderLabeValuesOf = (items: typeof transferDetailsLabelvalues) =>
    items.map((item) => (
      <StyledLabelValue
        key={item.info}
        infoVar="body2"
        descVar="body2"
        {...item}
      />
    ))

  const onClickEdit = () => {
    setUserCurrentScreen(ScreenType.TRANSFER_DETAILS_EDITING)
  }

  const onClickChange = () => {
    setUserCurrentScreen(ScreenType.RECIPIENT_DETAILS_EDITING)
  }

  const onSaveRecipientsDetails = (data: typeof recipientDetails) => {
    setRecipientsDetails(data)
    setUserCurrentScreen(ScreenType.REVIEW_DETAILS)
  }

  const onCancelEditing = () => {
    setUserCurrentScreen(ScreenType.REVIEW_DETAILS)
  }

  if (userCurrentScreen === ScreenType.RECIPIENT_DETAILS_EDITING) {
    return (
      <BusinessDetailsForm
        {...recipientDetails}
        cancelOnClick={onCancelEditing}
        saveOnClick={onSaveRecipientsDetails}
      />
    )
  } else if (userCurrentScreen === ScreenType.TRANSFER_DETAILS_EDITING) {
    return (
      <TransferDetailsForm
        amount={transferDetails.amount.toString()}
        fee={transferDetailsLabelvalues[0].description}
        amountRate={transferDetailsLabelvalues[1].description}
        guaranteedRate={transferDetailsLabelvalues[2].description}
        cancelOnClick={onCancelEditing}
        saveOnClick={(data) => {
          setTransferDetails({
            ...transferDetails,
            amount: Number(data.amount),
            recievingAmount: Number(data.amount) * transferDetails.rate,
          })
          onCancelEditing()
        }}
      />
    )
  }

  const senderAmountLabel =
    transferDetails.amount.toFixed(2) + ' ' + transferDetails.senderCurrencyCode
  const recieverAmountLabel =
    transferDetails.recievingAmount.toFixed(2) +
    ' ' +
    transferDetails.recieverCurrencyCode

  return (
    <StyledStack data-testid="ReviewTransferDetails">
      <Typography variant="h1">{REVIEW_TRANSFER_DETAILS_TITLE}</Typography>
      <Stack className="details">
        <Stack className="options">
          <Typography variant="caption" color="text.lowEmphasis">
            {TRANSFER_DETAILS_LABEL}
          </Typography>
          <Box onClick={onClickEdit}>
            <Typography
              className="edit-or-change-typo"
              variant="link"
              color="primary.500"
            >
              {EDIT}
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" gap={2}>
          <Typography variant="body2">{senderAmountLabel}</Typography>
          <Image src={LeftArrow} alt="left Arrow" />
          <Typography variant="body2">{recieverAmountLabel}</Typography>
        </Stack>
        {renderLabeValuesOf(transferDetailsLabelvalues)}
      </Stack>
      <Stack className="details">
        <Stack className="options">
          <Typography variant="caption" color="text.lowEmphasis">
            {RECIEPIENT_DETAILS_LABEL}
          </Typography>
          <Box onClick={onClickChange}>
            <Typography
              className="edit-or-change-typo"
              variant="link"
              color="primary.500"
            >
              {CHANGE}
            </Typography>
          </Box>
        </Stack>

        {renderLabeValuesOf(recipientDetailsLabelvalues)}
      </Stack>
      <Stack className="details">
        <Stack className="options">
          <Typography variant="caption" color="text.lowEmphasis">
            {SCHEDULE_DETAILS_LABEL}
          </Typography>
          <Typography
            className="edit-or-change-typo"
            variant="link"
            color="primary.500"
          >
            {CHANGE}
          </Typography>
        </Stack>
        {renderLabeValuesOf(scheduleDetailsLabelvalues)}
      </Stack>
      <Stack className="footer">
        <Typography variant="body3" color="text.lowEmphasis">
          {TERMS_AND_CONDITIONS_LABEL}
        </Typography>
        <Button variant="contained" onClick={onConfirmAndContinue}>
          {CONFIRM_CONTINUE_LABEL}
        </Button>
      </Stack>
    </StyledStack>
  )
}

export default ReviewTransferDetails

function getMonthName(monthIdx: number) {
  const monthnames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  return monthnames[monthIdx]
}
