import { Box, Stack, styled } from '@mui/material'
import Image from '../../components/atoms/Image'
import LeftArrowIcon from '../../../public/assets/icons/left-arrow.svg'
import CrossIcon from '../../../public/assets/icons/crossIcon.svg'
import { useEffect, useRef, useState } from 'react'

import RecipientType from '../../components/organisms/RecipientType'

import PocketPayPurpose from '../../components/organisms/PocketPayPurpose'
import DirectorInputField from '../../components/organisms/DirectorInputField'
import ReviewTransferDetails, {
  Recipient,
  Transfer,
} from '../../components/organisms/ReviewTransferDetails'
import ReviewTransfer from '../../components/organisms/ReviewTransfer'
import ChooseBank from '../../components/organisms/ChooseBank'
import { useLocation, useNavigate } from 'react-router-dom'
import LloydsConfirmation from '../../components/organisms/LloydsConfirmation'
import PaymentConfirmation from '../../components/organisms/PaymentConfirmation'
import CancelTransferModal from '../../components/organisms/CancelTransferModal'

import Stepper from '../../components/molecules/Stepper'
import theme from '../../theme'
import axios from 'axios'
import CurrencyExchange, {
  CurrencyCardProps,
  CardProps,
} from '../../components/organisms/CurrencyExchange'
import RecipientDetails from '../../components/organisms/RecipientDetails'
import SendMoneyTemplate from '../../components/templates/SendMoneyTemplate'
import { baseURL } from '../../strings/constants'

const StyledStack = styled(Stack)(({ theme }) => ({
  width: '100%',
  height: '100%',

  // layout
  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: theme.spacing(6),

  '& > .content': {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },

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
  const location = useLocation()

  const id = location.state.id
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
    navigate(`/dashboard`, { state: { id: id } })
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

  const { v4: uuidv4 } = require('uuid')
  function generateCustomUUID() {
    const uuid = uuidv4()
    return `${uuid.substring(0, 11)}`
  }

  const customUUID = generateCustomUUID()
  const createTransaction = async () => {
    let recipientId = 0
    const { data } = await axios.get(
      `${baseURL}/beneficiary?email=${recipient.current.email}`
    )
    if (data.length === 0) {
      try {
        const response = await axios.post(`${baseURL}/beneficiary`, {
          firstName: recipient.current.firstName,
          lastName: recipient.current.lastName,
          email: recipient.current.email,
          account: recipient.current.accountNumber,
          accountType: recipient.current.accountType,
          ifsc: recipient.current.ifsc,
          userId: Number(id),
        })

        recipientId = response.data.id
      } catch (err) {
        console.error(err)
      }
    } else {
      recipientId = data[0].id
    }
    try {
      await axios.post(`${baseURL}/transaction`, {
        referenceNumber: customUUID,
        status: 'PENDING',
        time: new Date(),
        sendingAmount: transfer.current.senderAmount,
        recievingAmount: transfer.current.recipientAmount,
        sendingCurrencyCode: transfer.current.senderCurrencyCode,
        recievingCurrencyCode: transfer.current.recipientCurrencyCode,
        userId: Number(id),
        recipientId: recipientId,
      })
    } catch (err) {
      console.error(err)
    }
  }

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
        recipient.current.name = data.firstName + ' ' + data.lastName
        recipient.current.lastName = data.lastName
        recipient.current.firstName = data.firstName
        recipient.current.ifsc = data.ifsc
        navigateToPocketPayPurpose()
      }}
    />
  )

  const completeTransaction = () => {
    createTransaction()
    navigateToDashboard()
  }

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

  const [countryList, setCountryList] = useState<CurrencyCardProps[]>([])
  const FetchCountryList = async () => {
    const response = await axios.get(`${baseURL}/country`)
    const data: CardProps[] = response.data

    setCountryList(
      data.map((item) => {
        return {
          key: item.name,
          currencyValue: item.currencyRate,
          iconTitle: item.name,
          src: item.countryImageUrl,
          alt: item.name,
          countryCurrencyCode: item.currencyCode,
        }
      })
    )
  }
  useEffect(() => {
    FetchCountryList()
  }, [])

  const directors = (
    <DirectorInputField
      buttonOnClick={navigateBusinessOwners}
      variant="director"
      countryList={countryList}
      sx={{
        width: theme.spacing(162.75),
        marginRight: theme.spacing(-33.75),
      }}
    />
  )

  const owners = (
    <DirectorInputField
      buttonOnClick={navigateToBusinessDetails}
      variant="owner"
      countryList={countryList}
      sx={{
        width: theme.spacing(162.75),
        marginRight: theme.spacing(-33.75),
      }}
    />
  )

  const reviewTransferDetails = (
    <ReviewTransferDetails
      data={{ transfer: transfer.current, recipient: recipient.current }}
      onConfirmAndContinue={(t, r) => {
        transfer.current = { ...t }
        recipient.current = { ...r }
        navigateToComponent(8)
      }}
      editable={true}
    />
  )

  const component9 = (
    <ChooseBank
      onClickHandler={() => navigateToComponent(10)}
      onCancelHandler={() => {
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
      onCompleteCardTransfer={completeTransaction}
    />
  )

  const lloydsConfirmation = (
    <LloydsConfirmation
      amount={transfer.current.conversionAmount}
      currency={transfer.current.senderCurrencyCode.toString()}
      onPayHandler={() => {
        setCurrentComponentIdx(11)
      }}
    />
  )

  const paymentConfirmation = (
    <PaymentConfirmation
      payeeName={recipient.current.name}
      reference={'8437658465'}
      amount={transfer.current.conversionAmount.toString()}
      code="24-14-70"
      accountNumber={recipient.current.accountNumber}
      address={'PocketPay 56 Shordech High Street London E16JJ United Knigdom'}
      onClick={completeTransaction}
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
            onPositiveAction={navigateToDashboard}
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
