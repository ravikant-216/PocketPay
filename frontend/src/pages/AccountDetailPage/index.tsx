import SendMoneyTemplate from '../../components/templates/SendMoneyTemplate'
import SearchBusiness from '../../components/organisms/SearchOrganization'
import Stepper from '../../components/molecules/Stepper'
import { DETAILS_LABEL_ARRAY } from '../../strings/constants'
import BusinessDetails from '../../components/organisms/BusinessDetails'
import { useState } from 'react'
import Image from '../../components/atoms/Image'
import backArrow from '../../../public/assets/icons/backButton.svg'
import AccountVerification from '../../components/organisms/AccountVerification'
import DetailsForm, { formData } from '../../components/organisms/DetailsFrom'
import ConfirmTradingAddress from '../../components/organisms/ConfirmTradingAddress'
import theme from '../../theme'

interface AccountDetailPageProps {
  buttonOnClick: (arg: formData) => void
}
export const AccountDetailPage = ({
  buttonOnClick,
}: AccountDetailPageProps) => {
  const [value, setValue] = useState<number>(0)
  const [stepperValue, setStepperValue] = useState<number>(0)
  const [formData, setFormData] = useState<formData>({
    firstName: '',
    lastName: '',
    dob: '',
    country: '',
    address: '',
  })
  const backButton = (
    <Image
      alt={'back'}
      src={backArrow}
      onClick={() => {
        if (stepperValue === 0) setValue(value - 1)
      }}
    ></Image>
  )

  const stepperComponent = (
    <Stepper labels={DETAILS_LABEL_ARRAY} value={stepperValue}></Stepper>
  )

  let content, showBackButton, showStepper
  if (stepperValue === 0) {
    showStepper = true
    if (value === 0) {
      content = (
        <SearchBusiness
          onValueChange={() => setValue(value + 1)}
          style={{ width: theme.spacing(129) }}
        />
      )
      showBackButton = false
    } else if (value === 1) {
      content = (
        <BusinessDetails
          onConfirm={() => {
            setValue(value + 1)
          }}
        />
      )
      showBackButton = true
    } else if (value === 2) {
      content = (
        <ConfirmTradingAddress
          onClick={() => {
            setStepperValue(stepperValue + 1)
          }}
          sx={{ width: theme.spacing(129) }}
        />
      )
      showBackButton = false
    }
  } else if (stepperValue === 1) {
    content = (
      <AccountVerification
        style={{
          minHeight: '80vh',
          width: theme.spacing(162.75),
          marginRight: theme.spacing(-33.75),
        }}
        onClick={() => {
          setStepperValue(stepperValue + 1)
        }}
      />
    )
    showStepper = true
    showBackButton = false
  } else if (stepperValue === 2) {
    content = (
      <DetailsForm
        initialData={formData}
        buttonOnClick={(formData) => {
          setFormData(formData)
          buttonOnClick(formData)
        }}
        sx={{
          width: theme.spacing(162.75),
          marginRight: theme.spacing(-33.75),
        }}
      />
    )
    showStepper = true
    showBackButton = false
  }

  return (
    <>
      {content && (
        <SendMoneyTemplate
          content={content}
          backButton={showBackButton && backButton}
          stepperComponent={showStepper && stepperComponent}
        ></SendMoneyTemplate>
      )}
    </>
  )
}
