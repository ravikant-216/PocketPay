import { Box, Stack, styled } from '@mui/material'
import Image from '../../components/atoms/Image'
import LeftArrowIcon from '../../../public/assets/icons/left-arrow.svg'
import CrossIcon from '../../../public/assets/icons/crossIcon.svg'
import { useRef, useState } from 'react'
import CurrencyExchange from '../../components/organisms/CurrencyExchange'
import RecipientType from '../../components/organisms/RecipientType'
import RecipientDetails from '../../components/organisms/RecipientDetails'
import PocketPayPurpose from '../../components/organisms/PocketPayPurpose'
import DirectorInputField from '../../components/organisms/DirectorInputField'
import ReviewTransferDetails, {
  Recipient,
  Transfer,
} from '../../components/organisms/ReviewTransferDetails'
import ReviewTransfer from '../../components/organisms/ReviewTransfer'
import ChooseBank from '../../components/organisms/ChooseBank'
import { useNavigate } from 'react-router-dom'
import LloydsConfirmation from '../../components/organisms/LloydsConfirmation'
import PaymentConfirmation from '../../components/organisms/PaymentConfirmation'
import CancelTransferModal from '../../components/organisms/CancelTransferModal'
import SendMoneyTemplate from '../../components/templates/SendMoneyTemplate'
import Stepper from '../../components/molecules/Stepper'
import theme from '../../theme'

const StyledStack = styled(Stack)(({ theme }) => ({
  width: '100%',
  height: '100%',

  // layout
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: theme.spacing(6),

  '& .back-icon': {
    alignSelf: 'flex-start',
  },
}))

const stepperLabels = [
  'Amount',
  'You',
  'Recipient',
  'Verification',
  'Review',
  'Pay',
]

const SendMoneyPage: React.FC = () => {
  const paymentData = useRef({
    senderAmount: '',
    recipientAmount: '',
    senderCountry: '',
    recipientCountry: '',
    recipientDetails: {
      firstName: '',
      lastName: '',
      email: '',
      ifsc: '',
      account: '',
    },
    directors: [{}],
    owners: [{}],
  })

  const [currentComponentIdx, setCurrentComponentIdx] = useState<number>(0)
  const [openCancelModal, setOpenCancelModal] = useState<boolean>(false)

  const navigate = useNavigate()

  const navigateBack = () => {
    // navigation
    if (currentComponentIdx === 0) {
      navigateToDashboard()
    } else {
      setCurrentComponentIdx(currentComponentIdx - 1)
    }
  }

  const navigateToComponent = (compIdx: number) => {
    setCurrentComponentIdx(compIdx)
  }

  const goToCurrencyExchange = () => {
    navigateToComponent(1)
  }

  const navigateToRecipientTypeOfSendMoney = () => {
    navigateToComponent(2)
  }

  const navigateToRecipientDetails = () => {
    navigateToComponent(3)
  }

  const navigateToPocketPayPurpose = () => {
    navigateToComponent(4)
  }

  const navigateToBusinessDirectors = (val: string) => {
    purpose.current = val
    navigateToComponent(5)
  }

  const navigateBusinessOwners = () => {
    navigateToComponent(6)
  }

  const navigateToBusinessDetails = () => {
    navigateToComponent(7)
  }

  const navigateToChooseBank = () => {
    navigateToComponent(9)
  }

  const navigateToDashboard = () => {
    navigate('/')
  }

  const transfer = useRef<Transfer>({
    senderAmount: 0,
    recipientAmount: 0,
    senderCurrencyCode: '',
    recipientCurrencyCode: '',
    rate: 1.14,
    conversionAmount: 70.1,
    fee: 0,
  })
  const recipient = useRef<Recipient>({
    name: '',
    email: '',
    accountNumber: '',
    accountType: 'Checking',
  })

  const recipientType = (
    <RecipientType
      onClickSendMoneyHandler={goToCurrencyExchange}
      type="default"
    />
  )

  const currencyExchange = (
    <CurrencyExchange
      data={{
        senderAmount: transfer.current.senderAmount.toString(),
        recipientAmount: transfer.current.recipientAmount.toString(),
        recipientCountry: transfer.current.recipientCurrencyCode,
        senderCountry: transfer.current.senderCurrencyCode,
      }}
      onClick={(data) => {
        transfer.current.senderAmount = Number(data.senderAmount)
        transfer.current.recipientAmount = Number(data.recipientAmount)
        transfer.current.recipientCurrencyCode = String(data.recipientCountry)
        transfer.current.senderCurrencyCode = String(data.senderCountry)
        navigateToRecipientTypeOfSendMoney()
      }}
      style={{
        marginRight: theme.spacing(-33.75),
      }}
    />
  )

  const recipientTypeSendMoney = (
    <RecipientType
      type="sendMoney"
      onClickBusinessCharityHandler={navigateToRecipientDetails}
    />
  )
  const recipientDetails = (
    <RecipientDetails
      data={{
        firstName: recipient.current.firstName ?? '',
        lastName: recipient.current.lastName ?? '',
        email: recipient.current.email,
        account: recipient.current.accountNumber,
        ifsc: recipient.current.ifsc ?? '',
      }}
      style={{
        width: theme.spacing(162.75),
        marginRight: theme.spacing(-33.75),
      }}
      onClick={(data) => {
        recipient.current.accountNumber = data.account
        recipient.current.email = data.email
        recipient.current.name = data.firstName + data.lastName
        recipient.current.lastName = data.lastName
        recipient.current.firstName = data.firstName
        recipient.current.ifsc = data.ifsc
        navigateToPocketPayPurpose()
      }}
    />
  )

  const purpose = useRef<string>('')

  const pocketpayPurpose = (
    <PocketPayPurpose
      onClick={navigateToBusinessDirectors}
      style={{
        width: theme.spacing(162.75),
        marginRight: theme.spacing(-33.75),
      }}
    />
  )

  const directors = (
    <DirectorInputField
      sx={{
        width: theme.spacing(162.75),
        marginRight: theme.spacing(-33.75),
      }}
      buttonOnClick={navigateBusinessOwners}
      variant="director"
    />
  )

  const owners = (
    <DirectorInputField
      sx={{
        width: theme.spacing(162.75),
        marginRight: theme.spacing(-33.75),
      }}
      buttonOnClick={navigateToBusinessDetails}
      variant="owner"
    />
  )

  const reviewTransferDetails = (
    <ReviewTransferDetails
      style={{ width: theme.spacing(129) }}
      data={{ transfer: transfer.current, recipient: recipient.current }}
      onConfirmAndContinue={(t, r) => {
        transfer.current = t
        recipient.current = r
        navigateToComponent(8)
      }}
      editable={true}
    />
  )

  const component9 = (
    <ChooseBank
      style={{ width: theme.spacing(129) }}
      onClickHandler={() => navigateToComponent(10)}
      onCancelHandler={() => {
        console.log('open')
        setOpenCancelModal(true)
      }}
    />
  )

  const reviewTransfer = (
    <ReviewTransfer
      ReviewTransferDetailsProps={{
        data: { transfer: transfer.current, recipient: recipient.current },
      }}
      onChooseBankTransfer={navigateToChooseBank}
      onCompleteCardTransfer={navigateToDashboard}
    />
  )

  const lloydsConfirmation = (
    <LloydsConfirmation
      style={{ width: theme.spacing(129) }}
      amount={transfer.current.conversionAmount}
      currency={transfer.current.senderCurrencyCode.toString()}
      onPayHandler={() => {
        setCurrentComponentIdx(11)
      }}
    />
  )

  const paymentConfirmation = (
    <PaymentConfirmation
      style={{ width: theme.spacing(129) }}
      payeeName={recipient.current.name}
      reference={'8437658465'}
      amount={transfer.current.conversionAmount.toString()}
      code="24-14-70"
      accountNumber={paymentData.current.recipientDetails.account}
      address={'PocketPay 56 Shordech High Street London E16JJ United Knigdom'}
      onClick={navigateToDashboard}
    />
  )

  const components = [
    { component: recipientType, stepperLabelIdx: 0 },
    { component: currencyExchange, stepperLabelIdx: 0 },
    { component: recipientTypeSendMoney, stepperLabelIdx: 2 },
    { component: recipientDetails, stepperLabelIdx: 2 },
    { component: pocketpayPurpose, stepperLabelIdx: 3 },
    { component: directors, stepperLabelIdx: 3 },
    { component: owners, stepperLabelIdx: 3 },
    { component: reviewTransferDetails, stepperLabelIdx: 4 },
    { component: reviewTransfer, stepperLabelIdx: 5 },
    { component: component9, stepperLabelIdx: 5 },
    { component: lloydsConfirmation, stepperLabelIdx: 5 },
    { component: paymentConfirmation, stepperLabelIdx: 5 },
  ]

  return (
    <SendMoneyTemplate
      avatar
      crossIcon={
        <Image src={CrossIcon} alt="Cross Icon" onClick={navigateToDashboard} />
      }
      stepperComponent={
        currentComponentIdx !== 0 && (
          <Stepper
            labels={stepperLabels}
            value={components[currentComponentIdx].stepperLabelIdx}
          />
        )
      }
      content={
        <StyledStack data-testid="SendMoneyPage">
          <Image
            style={{ display: 'inline-block' }}
            src={LeftArrowIcon}
            alt="Left Arrow Icon"
            className="back-icon"
            onClick={navigateBack}
          />
          <Box className="content">
            {components[currentComponentIdx].component}
          </Box>
          <CancelTransferModal
            open={openCancelModal}
            onPositiveAction={() => {
              navigate('/home')
            }}
            onNegativeAction={() => {
              setOpenCancelModal(false)
            }}
          />
        </StyledStack>
      }
    />
  )
}

export default SendMoneyPage
