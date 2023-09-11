import { Box, Stack, StackProps } from '@mui/material'
import { useEffect, useState } from 'react'
import plusIcon from '../../../../public/assets/icons/plusIcon.svg'
import theme from '../../../theme'
import CustomButton from '../../atoms/Button'
import IconLabel, { IconLabelPropType } from '../../atoms/IconLabel'
import InputField from '../../atoms/InputField'
import Typography from '../../atoms/Typography'

import dayjs from 'dayjs'
import {
  CONFIRM_BUSINESS,
  COUNTRY_RESIDENCE,
  DIRECTOR_MESSAGE,
  DOB,
  OWNERS_MESSAGE,
} from '../../../strings/constants'
import DatePicker from '../../atoms/DatePicker'
import CountryDropdown from '../CountryDropdown'

export interface DirectorInputFieldProps extends StackProps {
  buttonOnClick: (
    formData: {
      firstName: string
      lastName: string
      dob: string
      country: string
    }[]
  ) => void
  variant: 'director' | 'owner'
  buttonWidth?: string
  countryList: IconLabelPropType[]
}

export default function DirectorInputField({
  buttonOnClick,
  variant,
  countryList,
  ...props
}: DirectorInputFieldProps) {
  const [formCount, setFormCount] = useState(1)
  const [formData, setFormData] = useState<
    { firstName: string; lastName: string; dob: string; country: string }[]
  >([])

  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  useEffect(() => {
    if (formData.length === 0) {
      setIsButtonDisabled(true)
    } else {
      setIsButtonDisabled(
        formData.some(
          (data) =>
            !data.firstName || !data.lastName || !data.dob || !data.country
        )
      )
    }
  }, [formData])

  const handleInputChange = (
    index: number,
    field: 'firstName' | 'lastName' | 'dob' | 'country',
    value: string
  ) => {
    setFormData((prevFormData) => {
      const newFormData = [...prevFormData]
      newFormData[index] = { ...newFormData[index], [field]: value }
      return newFormData
    })
  }

  const inputFields = [
    {
      type: 'text',
      label: 'First Name',
      placeholder: 'First Name',
      field: 'firstName',
    },
    {
      type: 'text',
      label: 'Last Name',
      placeholder: 'Last Name',
      field: 'lastName',
    },
  ]

  const renderForm = (index: number) => (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={'space-between'}
      >
        <Typography variant="body3" color={theme.palette.text.highEmphasis}>
          {variant === 'director'
            ? `Director ${index}`
            : `Shareholder ${index}`}
        </Typography>
        {index > 1 && (
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setFormCount(formCount - 1)
              setFormData((prevFormData) =>
                prevFormData.filter((_, i) => i !== index - 1)
              )
            }}
          >
            <Typography variant="link" color={theme.palette.primary[500]}>
              {`Remove ${variant === 'director' ? 'director' : 'owner'}`}
            </Typography>
          </Box>
        )}
      </Stack>
      {inputFields.map(({ type, label, placeholder, field }) => (
        <InputField
          key={field}
          type={type}
          variant="outlined"
          label={label}
          placeholder={placeholder}
          sx={{ width: 'auto' }}
          onChange={(event) =>
            handleInputChange(index - 1, field as any, event.target.value)
          }
        />
      ))}
      <DatePicker
        onChange={(value) => {
          const formattedDate = dayjs(value as string).format('DD/MM/YYYY')
          handleInputChange(index - 1, 'dob', formattedDate)
        }}
        maxDate={`${new Date().getMonth() + 1}-${new Date().getDate()}-${(
          new Date().getFullYear() - 18
        ).toString()}`}
        label={DOB}
      />
      <CountryDropdown
        countryList={countryList}
        label={COUNTRY_RESIDENCE}
        placeHolder={COUNTRY_RESIDENCE}
        onChange={(value) => handleInputChange(index - 1, 'country', value)}
      />
    </>
  )

  return (
    <Stack direction={'row'} {...props}>
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
          gap: '20px',
          marginBottom: '60px',
        }}
      >
        <Stack>
          <Typography variant="h1" color={theme.palette.text.highEmphasis}>
            {CONFIRM_BUSINESS} {variant === 'director' ? `directors` : `owners`}
          </Typography>
          <Typography variant="body3" color={theme.palette.text.mediumEmphasis}>
            {variant === 'director' ? DIRECTOR_MESSAGE : OWNERS_MESSAGE}
          </Typography>
        </Stack>
        {[...Array(formCount)].map((_, index) => renderForm(index + 1))}
        <IconLabel
          alt="plusIcon"
          style={{ cursor: 'pointer' }}
          color={theme.palette.primary[500]}
          iconTitle={`Add another ${
            variant === 'director' ? `director` : `owner`
          }`}
          onClick={() => {
            setFormCount(formCount + 1)
            setFormData((prevFormData) => [
              ...prevFormData,
              { firstName: '', lastName: '', dob: '', country: '' },
            ])
          }}
          src={plusIcon}
        />
      </Box>
      <Box display={'flex'} alignItems={'flex-end'} justifyContent={'flex-end'}>
        <CustomButton
          variant="contained"
          sx={{ width: props.buttonWidth }}
          onClick={() => buttonOnClick(formData)}
          disabled={isButtonDisabled}
          data-testId="continueButton"
        >
          Continue
        </CustomButton>
      </Box>
    </Stack>
  )
}
