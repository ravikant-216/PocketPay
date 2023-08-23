import Typography from '../../atoms/Typography'
import InputField from '../../atoms/InputField'
import { Stack, Box, StackProps } from '@mui/material'
import theme from '../../../theme'
import { useState } from 'react'
import CustomButton from '../../atoms/Button'
import {
  COUNTRY_ARRAY,
  DOB,
  COUNTRY_RESIDENCE,
  FILL_DETAIL,
  ACCOUNT_OPEN,
} from '../../../strings/constants'
import CountryDropdown from '../CountryDropdown'

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
}

export default function DetailsForm({
  buttonOnClick,
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
    {
      name: 'dob',
      label: DOB,
      placeholder: DOB,
      type: 'date',
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
        <CountryDropdown
          names={COUNTRY_ARRAY}
          country={formData.country}
          label={COUNTRY_RESIDENCE}
          placeHolder={COUNTRY_RESIDENCE}
          onChange={(value) => handleInputChange('country', value)}
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
          onClick={() => buttonOnClick(formData)}
        >
          Continue
        </CustomButton>
      </Box>
    </Stack>
  )
}
