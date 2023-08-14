import { useState } from 'react'
import {
  ACCOUNT_VERIFICATION_CATEGORY,
  ACCOUNT_VERIFICATION_HEADING,
  ACCOUNT_VERIFICATION_SUBHEADING,
  CONTINUE_BUTTON,
} from '../../../strings/constants'
import Typography from '../../atoms/Typography'
import SearchDropdown from '../../molecules/SearchDropDown'
import CustomButton from '../../atoms/Button'
import styled from '@emotion/styled'
import { Box, Stack } from '@mui/material'
import theme from '../../../theme'

export interface AccountVerificationProps {
  onClick?: () => void
  style?: React.CSSProperties
}
const ContentWrapper = styled(Box)({
  display: 'flex',
  height: theme.spacing(180),
})
const TextWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
})

const DropDownWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(7),
})

const AccountVerification = (props: AccountVerificationProps) => {
  const accountVerificationData = {
    category: '',
    subcategory: '',
    businessSize: '',
  }

  const [value, setValue] = useState(accountVerificationData)

  const handleChange = (field: string, selectedValue: string) => {
    setValue((previousValue) => ({
      ...previousValue,
      [field]: selectedValue,
    }))
  }

  const isContinueButtonDisabled = !(
    value.businessSize &&
    value.category &&
    value.subcategory
  )

  console.log(value.businessSize)
  return (
    <>
      <ContentWrapper data-testid="accountVerification" style={props.style}>
        <Stack direction={'column'} flex={1} gap={theme.spacing(13)}>
          <TextWrapper>
            <Typography variant="h1" color="text.highEmpahis">
              {ACCOUNT_VERIFICATION_HEADING}
            </Typography>
            <Typography variant="body3" color="text.lowEmphasis">
              {ACCOUNT_VERIFICATION_SUBHEADING}
            </Typography>
          </TextWrapper>

          <DropDownWrapper>
            <SearchDropdown
              onValueChange={(selectedValue) =>
                handleChange('category', selectedValue)
              }
              options={ACCOUNT_VERIFICATION_CATEGORY.category}
              placeholder="Category"
              label="Category"
              data-testid="category"
            />
            <SearchDropdown
              onValueChange={(selectedValue) =>
                handleChange('subcategory', selectedValue)
              }
              options={ACCOUNT_VERIFICATION_CATEGORY.subcategory}
              placeholder="Subcategory"
              label="Subcategory"
            />
            <SearchDropdown
              onValueChange={(selectedValue) =>
                handleChange('businessSize', selectedValue)
              }
              options={ACCOUNT_VERIFICATION_CATEGORY.businessSize}
              placeholder="Size of your business"
              label="Size of your business"
            />
          </DropDownWrapper>
        </Stack>

        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'flex-end'}
        >
          <CustomButton
            variant="contained"
            disabled={isContinueButtonDisabled}
            data-testid={'continue'}
            onClick={props.onClick}
          >
            {CONTINUE_BUTTON}
          </CustomButton>
        </Box>
      </ContentWrapper>
    </>
  )
}

export default AccountVerification
