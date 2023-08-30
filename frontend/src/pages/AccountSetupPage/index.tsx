import { useState } from 'react'
import backArrow from '../../../public/assets/icons/backButton.svg'
import { IconLabelPropType } from '../../components/atoms/IconLabel'
import Image from '../../components/atoms/Image'
import Stepper from '../../components/molecules/Stepper'
import CountrySelect from '../../components/organisms/CountrySelect'
import PhoneNumber from '../../components/organisms/PhoneNumber'
import RecipientType from '../../components/organisms/RecipientType'
import SendMoneyTemplate from '../../components/templates/SendMoneyTemplate'
import { ACCOUNT_LABEL } from '../../strings/constants'
import theme from '../../theme'

export interface AccountSetupPageProps {
  onClick: (password: string) => void
  accountType?: (value: string) => void
  countryList: IconLabelPropType[]
  onBackClick: () => void
}
export const AccountSetupPage = (props: AccountSetupPageProps) => {
  const [value, setValue] = useState<number>(1)
  const [phoneStep, setPhoneStep] = useState<number>(1)
  const [country, setCountry] = useState<string>('')
  const handleChange = (selectedValue: {
    country: string
    password: string
  }) => {
    if (value === 4) props.onClick(selectedValue.password)
    else {
      setCountry(selectedValue.country)
      setValue(value + 1)
    }
  }

  let content
  switch (value) {
    case 2:
      content = (
        <CountrySelect
          inputVariant={'country'}
          country={country}
          sx={{
            width: theme.spacing(162.75),
            marginRight: theme.spacing(-33.75),
          }}
          onChange={handleChange}
          countryList={props.countryList}
        ></CountrySelect>
      )
      break
    case 3:
      content = (
        <PhoneNumber
          countryList={props.countryList}
          width={theme.spacing(129)}
          stepProp={phoneStep}
          handlePhoneStep={(value: number) => {
            setPhoneStep(value)
          }}
          country={country}
          onCountrySelect={() => {
            setValue(value - 1)
          }}
          onSubmit={() => {
            setValue(value + 1)
          }}
        />
      )
      break
    case 4:
      content = (
        <CountrySelect
          inputVariant={'password'}
          sx={{
            width: theme.spacing(162.75),
            marginRight: theme.spacing(-33.75),
          }}
          onChange={handleChange}
        ></CountrySelect>
      )
      break
    default:
      content = (
        <RecipientType
          type={'accountType'}
          onClickBusinessAccountHandler={(type: string) => {
            if (props.accountType) props.accountType(type)
            setValue(value + 1)
          }}
          onClickPersonalAccountHandler={(type: string) => {
            if (props.accountType) props.accountType(type)
            setValue(value + 1)
          }}
        />
      )
  }

  return (
    <>
      <SendMoneyTemplate
        content={content}
        backButton={
          <Image
            alt={'back'}
            src={backArrow}
            onClick={() => {
              if (value === 1) props.onBackClick()
              else if (value === 3 && phoneStep > 1) {
                if (phoneStep === 2) {
                  setPhoneStep(1)
                } else if (phoneStep === 3) {
                  setPhoneStep(2)
                }
              } else setValue(value - 1)
            }}
          ></Image>
        }
        stepperComponent={
          <Stepper
            labels={ACCOUNT_LABEL}
            value={value}
            sx={{ width: '100%' }}
          ></Stepper>
        }
      ></SendMoneyTemplate>
    </>
  )
}
