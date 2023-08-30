import { useState } from 'react'
import backArrow from '../../../public/assets/icons/backButton.svg'
import { IconLabelPropType } from '../../components/atoms/IconLabel'
import Image from '../../components/atoms/Image'
import Stepper from '../../components/molecules/Stepper'
import AccountVerification from '../../components/organisms/AccountVerification'
import BusinessDetails from '../../components/organisms/BusinessDetails'
import ConfirmTradingAddress from '../../components/organisms/ConfirmTradingAddress'
import DetailsForm, { formData } from '../../components/organisms/DetailsFrom'
import SearchBusiness from '../../components/organisms/SearchOrganization'
import SendMoneyTemplate from '../../components/templates/SendMoneyTemplate'
import { DETAILS_LABEL_ARRAY } from '../../strings/constants'
import theme from '../../theme'
import { useNavigate } from 'react-router'

interface AccountDetailPageProps {
  buttonOnClick: (arg: formData) => void
  countryList: IconLabelPropType[]
}
export const AccountDetailPage = ({
  buttonOnClick,
  countryList,
}: AccountDetailPageProps) => {
  const navigate = useNavigate()
  const [businessName, setBusinessName] = useState<string>('')
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
          onValueChange={(business: string) => {
            setValue(value + 1)
            setBusinessName(business)
          }}
          style={{ width: theme.spacing(129) }}
        />
      )
      showBackButton = false
    } else if (value === 1) {
      content = (
        <BusinessDetails
          name={businessName}
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
        countryList={countryList}
        initialData={formData}
        buttonOnClick={(formData) => {
          setFormData(formData)
          buttonOnClick(formData)
          navigate('/dashboard')
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
