import Typography from '../../atoms/Typography'
import InputField from '../../atoms/InputField'
import { Stack, Box, StackProps } from '@mui/material'
import theme from '../../../theme'
import IconLabel from '../../atoms/IconLabel'
import plusIcon from '../../../../public/assets/icons/plusIcon.svg'
import { useState, useEffect } from 'react'
import CustomButton from '../../atoms/Button'

import {
  DIRECTOR_MESSAGE,
  OWNERS_MESSAGE,
  COUNTRY_ARRAY,
  DOB,
  COUNTRY_RESIDENCE,
  CONFIRM_BUSINESS,
} from '../../../strings/constants'
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
}

export default function DirectorInputField({
  buttonOnClick,
  variant,
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
    {
      type: 'date',
      label: DOB,
      placeholder: DOB,
      field: 'dob',
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
      <CountryDropdown
        names={COUNTRY_ARRAY}
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
        >
          Continue
        </CustomButton>
      </Box>
    </Stack>
  )
}
