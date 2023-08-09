import { Box, BoxProps, InputAdornment, Link } from '@mui/material'
import Typography from '../../atoms/Typography'
import theme from '../../../theme'
import CustomButton from '../../atoms/Button'
import { useState, useEffect } from 'react'
import InputField from '../../atoms/InputField'
import Image from '../../atoms/Image'
import divider from '../../../../public/assets/icons/divider.svg'
import dropdownIcon from '../../../../public/assets/icons/dropdownIcon.svg'
import {
  ACCOUNT_MESSAGE,
  ANOTHER_PHONE,
  APPROVE,
  CALL_CODE,
  CODE_ENTER,
  CODE_NOTFOUND,
  CODE_SEND,
  CODE_SENT,
  CONTINUE_BUTTON,
  COUNTRIES,
  ENTER_OTP,
  SMS_CODE,
  SUBMIT,
  VERIFY_PHONE,
} from '../../../strings/constants'
import BankCard from '../../molecules/BankCard'

export interface PhoneNumberProps extends BoxProps {
  country?: string
  onSubmit?: () => void
}

export default function PhoneNumber({
  country = 'India',
  onSubmit,
  ...props
}: PhoneNumberProps) {
  const [countryCode, setCountryCode] = useState('')
  const [flagUrl, setFlagUrl] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState(1)
  const [showResendOptions, setShowResendOptions] = useState(false)

  useEffect(() => {
    const selectedCountry = COUNTRIES.find(
      (item) => item.name.toLowerCase() === country.toLowerCase()
    )
    if (selectedCountry) {
      setCountryCode(selectedCountry.code)
      setFlagUrl(selectedCountry.flagIconSrc)
    }
  }, [country])

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value)
  }

  const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(event.target.value)
  }

  const handleContinueClick = () => {
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      if (onSubmit) {
        onSubmit()
      }
    }
  }

  const handleDidNotReceiveCodeClick = () => {
    setShowResendOptions(true)
    setStep(3)
  }

  const handleUseDifferentPhoneNumberClick = () => {
    setPhoneNumber('')
    setStep(1)
    setShowResendOptions(false)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        ...props.sx,
      }}
      {...props}
    >
      <Box sx={{ width: '100%', minHeight: theme.spacing(131) }}>
        {step === 1 && (
          <>
            <Typography
              variant="h1"
              color="text.highEmphasis"
              sx={{ marginBottom: theme.spacing(3) }}
            >
              {VERIFY_PHONE}
            </Typography>
            <Box sx={{ marginBottom: theme.spacing(8) }}>
              <Typography variant="body3" color="text.mediumEmphasis">
                {ACCOUNT_MESSAGE}
              </Typography>
            </Box>
            <InputField
              type="number"
              sx={{ width: '100%' }}
              label="Mobile Number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              startAdornment={
                <InputAdornment position="start">
                  <Box sx={{ display: 'flex', columnGap: theme.spacing(2) }}>
                    <Image src={flagUrl} alt={country} />
                    <Box sx={{ display: 'flex', columnGap: theme.spacing(4) }}>
                      <Image src={dropdownIcon} alt="" />
                      <Image src={divider} alt="" />
                      <Typography variant="body2" color="text.highEmphasis">
                        {countryCode && `+${countryCode}`}
                      </Typography>
                    </Box>
                  </Box>
                </InputAdornment>
              }
            />
          </>
        )}
        {step === 2 && (
          <>
            <Typography
              variant="h1"
              color="text.highEmphasis"
              sx={{ marginBottom: theme.spacing(3) }}
            >
              {ENTER_OTP}
            </Typography>
            <Box sx={{ marginBottom: theme.spacing(8) }}>
              <Typography variant="body3" color="text.mediumEmphasis">
                {CODE_SENT}
                {countryCode}
                {phoneNumber}
              </Typography>
            </Box>
            <InputField
              type="number"
              sx={{ width: '100%' }}
              label={CODE_ENTER}
              value={otp}
              onChange={handleOtpChange}
            />
            {!showResendOptions && (
              <Box sx={{ marginTop: theme.spacing(4) }}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={handleDidNotReceiveCodeClick}
                >
                  {CODE_NOTFOUND}
                </Link>
              </Box>
            )}
          </>
        )}
        {step === 3 && (
          <>
            <Typography
              variant="h1"
              color="text.highEmphasis"
              sx={{ marginBottom: theme.spacing(3) }}
            >
              {APPROVE}
            </Typography>
            <Box sx={{ marginBottom: theme.spacing(8) }}>
              <Typography variant="body3" color="text.mediumEmphasis">
                {CODE_SEND}
                {countryCode}
                {phoneNumber}
              </Typography>
            </Box>
            <Box sx={{ marginTop: theme.spacing(4) }}>
              <BankCard iconTitle={SMS_CODE} alt=""></BankCard>
              <BankCard
                iconTitle={CALL_CODE}
                alt=""
                sx={{ marginTop: theme.spacing(4) }}
              ></BankCard>
            </Box>
            <Box sx={{ marginTop: theme.spacing(4) }}>
              <Link
                component="button"
                variant="body2"
                onClick={handleUseDifferentPhoneNumberClick}
              >
                {ANOTHER_PHONE}
              </Link>
            </Box>
          </>
        )}
      </Box>
      {step !== 3 && (
        <Box>
          <CustomButton
            variant="contained"
            disabled={
              (step === 1 && phoneNumber.length !== 10) ||
              (step === 2 && otp.length !== 6)
            }
            onClick={handleContinueClick}
          >
            {step === 2 ? SUBMIT : CONTINUE_BUTTON}
          </CustomButton>
        </Box>
      )}
    </Box>
  )
}
