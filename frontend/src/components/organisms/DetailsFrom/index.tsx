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
  },
  ...props
}: DetailsFormProps) {
  const [formData, setFormData] = useState<formData>(initialData)

  const handleInputChange = (field: FieldName, value: string) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, [field]: value }
    })
  }
  type FieldName = 'firstName' | 'lastName' | 'dob' | 'country' | 'address'

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
          maxDate="01-01-2005"
          label={DOB}
        />
        <CountryDropdown
          country={formData.country}
          label={COUNTRY_RESIDENCE}
          placeHolder={COUNTRY_RESIDENCE}
          onChange={(value) => handleInputChange('country', value)}
          countryList={countryList}
        ></CountryDropdown>
        <InputField
          type="text"
          value={formData.address}
          variant="outlined"
          sx={{ width: 'auto' }}
          label="Home Address"
          placeholder="Home Address"
          onChange={(event) => handleInputChange('address', event.target.value)}
        ></InputField>
      </Box>
      <Box display={'flex'} alignItems={'flex-end'} justifyContent={'flex-end'}>
        <CustomButton
          variant="contained"
          disabled={
            !formData.firstName ||
            !formData.lastName ||
            !formData.dob ||
            !formData.country ||
            !formData.address
          }
          sx={{ width: props.buttonWidth }}
          onClick={() => {
            buttonOnClick(formData)
          }}
        >
          Continue
        </CustomButton>
      </Box>
    </Stack>
  )
}
