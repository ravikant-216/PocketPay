import Typography from '../../atoms/Typography'
import InputField from '../../atoms/InputField'
import { Stack, Box, StackProps } from '@mui/material'
import theme from '../../../theme'
import { useState } from 'react'
import { IconLabelPropType } from '../../atoms/IconLabel'
import CustomButton from '../../atoms/Button'
import {
  COUNTRY_RESIDENCE,
  FILL_DETAIL,
  ACCOUNT_OPEN,
  DOB,
} from '../../../strings/constants'
import CountryDropdown from '../CountryDropdown'
import DatePicker from '../../atoms/DatePicker'
import dayjs from 'dayjs'

export type formData = {
  firstName: string
  lastName: string
  dob: string
  country: string
  address: string
  city: string
  postal_code: string
}
export interface DetailsFormProps extends StackProps {
  buttonOnClick: (formData: formData) => void
  buttonWidth?: string
  initialData?: formData
  countryList: IconLabelPropType[]
}

export default function DetailsForm({
  buttonOnClick,
  countryList,
  initialData = {
    firstName: '',
    lastName: '',
    dob: '',
    country: '',
    address: '',
    city: '',
    postal_code: '',
  },
  ...props
}: DetailsFormProps) {
  const [formData, setFormData] = useState<formData>(initialData)

  const handleInputChange = (field: FieldName, value: string) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, [field]: value }
    })
  }
  type FieldName =
    | 'firstName'
    | 'lastName'
    | 'dob'
    | 'country'
    | 'address'
    | 'city'
    | 'postal_code'

  const fields: {
    name: FieldName
    label: string
    placeholder: string
    type: string
  }[] = [
    {
      name: 'firstName',
      label: 'First Name',
      placeholder: 'First Name',
      type: 'text',
    },
    {
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Last Name',
      type: 'text',
    },
  ]
  const fields_address: {
    name: FieldName
    label: string
    placeholder: string
    type: string
  }[] = [
    {
      name: 'address',
      label: 'Home Address',
      placeholder: 'Home Address',
      type: 'text',
    },
    {
      name: 'city',
      label: 'City',
      placeholder: 'City',
      type: 'text',
    },
    {
      name: 'postal_code',
      label: 'Postal code',
      placeholder: 'Postal code',
      type: 'number',
    },
  ]
  return (
    <Stack direction={'row'} {...props}>
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
          gap: theme.spacing(5),
          marginBottom: theme.spacing(15),
        }}
      >
        <Typography variant="h1" color="text.highEmphasis">
          {FILL_DETAIL}
        </Typography>
        <Typography variant="body3" color="text.mediumEmphasis">
          {ACCOUNT_OPEN}
        </Typography>
        {fields.map((field) => (
          <InputField
            key={field.name}
            type={field.type}
            value={formData[field.name]}
            variant="outlined"
            label={field.label}
            placeholder={field.placeholder}
            sx={{ width: 'auto' }}
            onChange={(event) =>
              handleInputChange(field.name, event.target.value)
            }
          />
        ))}
        <DatePicker
          onChange={(value) => {
            const formattedDate = dayjs(value as string).format('DD/MM/YYYY')
            handleInputChange('dob', formattedDate)
          }}
          maxDate={`${new Date().getMonth() + 1}-${new Date().getDate()}-${(
            new Date().getFullYear() - 18
          ).toString()}`}
          label={DOB}
        />
        <CountryDropdown
          country={formData.country}
          label={COUNTRY_RESIDENCE}
          placeHolder={COUNTRY_RESIDENCE}
          onChange={(value) => handleInputChange('country', value)}
          countryList={countryList}
        ></CountryDropdown>
        {fields_address.map((field) => (
          <InputField
            key={field.name}
            type={field.type}
            value={formData[field.name]}
            variant="outlined"
            label={field.label}
            placeholder={field.placeholder}
            sx={{ width: 'auto' }}
            onChange={(event) =>
              handleInputChange(field.name, event.target.value)
            }
          />
        ))}
      </Box>
      <Box display={'flex'} alignItems={'flex-end'} justifyContent={'flex-end'}>
        <CustomButton
          variant="contained"
          disabled={
            !formData.firstName ||
            !formData.lastName ||
            !formData.dob ||
            !formData.country ||
            !formData.address ||
            !formData.city ||
            !formData.postal_code
          }
          sx={{ width: props.buttonWidth }}
          onClick={() => {
            buttonOnClick(formData)
          }}
          data-testid="continueButton"
        >
          Continue
        </CustomButton>
      </Box>
    </Stack>
  )
}
