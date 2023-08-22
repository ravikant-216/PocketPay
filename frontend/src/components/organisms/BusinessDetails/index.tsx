import { Box, Stack, styled } from '@mui/material'
import Typography from '../../atoms/Typography'
import {
  BUSINESS_DETAILS_LABEL,
  CANCEL_BUTTON_LABEL,
  CONFIRM_BUSINESS_DETAILS_TITLE,
  CONFIRM_BUSINESS_DETAILS_TITLE_CAPTION,
  CONFIRM_BUTTON_LABEL,
  EDIT_LABEL,
  SAVE_BUTTON_LABEL,
} from '../../../strings/constants'
import Button from '../../atoms/Button'
import { useState } from 'react'
import InputField from '../../atoms/InputField'

export interface Business {
  name: string
  registrationNumber: string
  registeredAddress: string
}

interface BusinessDetailsProps {
  onConfirm: (data: Business) => void
}

const BUSINESS_DETAILS = {
  name: 'Zentech Solutions Pvt Ltd',
  registrationNumber: '2020ZEN5367GJ',
  registeredAddress:
    '#2097, Triveni Main Rd, Gokula 1st Stage, Nanjappa Reddy Colony, Yeswanthpur, Bengaluru, Karnataka 560054',
}

const StyledStack = styled(Stack)(({ theme }) => ({
  width: theme.spacing(129),
  display: 'flex',
  flexFlow: 'column wrap',
  gap: theme.spacing(6),

  '& .edit': {
    '&:hover': {
      cursor: 'pointer',
    },
    color: theme.palette.primary[500],
  },

  '& .title': { gap: theme.spacing(3) },

  '& .edit-opt': {
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    top: theme.spacing(2),
  },

  '& .details': {
    gap: theme.spacing(7),
    '& > *': {
      display: 'flex',
      flexFlow: 'column wrap',
      gap: theme.spacing(3),
    },
  },

  position: 'relative',
  '& .float-button': {
    position: 'absolute',
    bottom: theme.spacing(-29.5),
    right: theme.spacing(-35),
  },
  '&& .float-button-cancel': {
    position: 'absolute',
    bottom: theme.spacing(-29.5),
    right: theme.spacing(5),
  },
}))

const BusinessDetails: React.FC<BusinessDetailsProps> = (props) => {
  const [edit, setEdit] = useState<boolean>(false)

  const onPositiveButtonClick = () => {
    if (edit) {
      setDetails(updatedDetails)
      setEdit(false)
    } else {
      props.onConfirm(details)
    }
  }

  const [updatedDetails, setUpdatedDetails] = useState<typeof BUSINESS_DETAILS>(
    { ...BUSINESS_DETAILS }
  )
  const [details, setDetails] = useState(BUSINESS_DETAILS)

  const onCancel = () => {
    setEdit(false)
  }

  const content = [
    {
      label: 'Business name',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedDetails((state) => {
          state.name = e.currentTarget.value
          return state
        })
      },
      value: details.name,
      defaultValue: updatedDetails.name,
    },
    {
      label: 'Registration number',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedDetails((state) => {
          state.registrationNumber = e.currentTarget.value
          return state
        })
      },
      value: details.registrationNumber,
      defaultValue: updatedDetails.registrationNumber,
    },
    {
      label: 'Registration number',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedDetails((state) => {
          state.registeredAddress = e.currentTarget.value
          return state
        })
      },
      value: details.registeredAddress,
      defaultValue: updatedDetails.registeredAddress,
    },
  ]

  const renderContent = () => {
    if (edit) {
      return content.map((item) => (
        <Stack key={item.value}>
          <InputField
            multiline
            label={item.label}
            defaultValue={item.defaultValue}
            onChange={item.onChange}
          />
        </Stack>
      ))
    } else
      return content.map((item) => (
        <Stack key={item.value}>
          <Typography variant="body2" color="text.mediumEmphasis">
            {item.label + ':'}
          </Typography>
          <Typography variant="body2">{item.value}</Typography>
        </Stack>
      ))
  }

  const onEditClick = () => {
    setUpdatedDetails({ ...details })
    setEdit(true)
  }

  return (
    <StyledStack data-testid="BusinessDetails">
      <Stack className="title">
        <Typography variant="h1">{CONFIRM_BUSINESS_DETAILS_TITLE}</Typography>
        <Typography variant="body3" color="text.mediumEmphasis">
          {CONFIRM_BUSINESS_DETAILS_TITLE_CAPTION}
        </Typography>
      </Stack>
      <Stack className="edit-opt">
        <Typography color="text.mediumEmphasis" variant="caption">
          {BUSINESS_DETAILS_LABEL}
        </Typography>
        {!edit && (
          <Box onClick={onEditClick}>
            <Typography className="edit" variant="link">
              {EDIT_LABEL}
            </Typography>
          </Box>
        )}
      </Stack>
      <Stack className="details">{renderContent()}</Stack>
      <Button
        className="float-button"
        variant="contained"
        onClick={onPositiveButtonClick}
      >
        {edit ? SAVE_BUTTON_LABEL : CONFIRM_BUTTON_LABEL}
      </Button>
      {edit && (
        <Button
          className="float-button-cancel"
          variant="outlined"
          onClick={onCancel}
        >
          {CANCEL_BUTTON_LABEL}
        </Button>
      )}
    </StyledStack>
  )
}

export default BusinessDetails
