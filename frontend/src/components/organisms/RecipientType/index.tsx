import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import styled from '@emotion/styled'
import theme from '../../../theme'
import OptionCard from '../../molecules/OptionCard'
import {
  ADD_ANOTHER_ACCOUNT,
  SENDING_MONEY,
  WHAT_ACCOUNT_SETUP,
  WHAT_TO_DO,
} from '../../../strings/constants'
import MyBusiness from '../../../../public/assets/icons/myBusiness.svg'
import SendMoney from '../../../../public/assets/icons/sendMoney.svg'
import Someonelse from '../../../../public/assets/icons/someoneElse.svg'
import BusinessOrCharity from '../../../../public/assets/icons/businessOrCharity.svg'
import Setup from '../../../../public/assets/icons/setupAccount.svg'
export interface RecipientTypeProps {
  type: 'sendMoney' | 'default' | 'accountType'
  onClickSendMoneyHandler?: () => void
  onClickBusinessCharityHandler?: () => void
  onClickPersonalAccountHandler?: () => void
  onClickBusinessAccountHandler?: () => void
  style?: React.CSSProperties
}
const StyledContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(10),
})
const RecipientType: React.FC<RecipientTypeProps> = (
  props: RecipientTypeProps
) => {
  let mainText = ''

  let accountType = []
  const RECIPIENT_TYPE = {
    sendMoney: [
      {
        icon: MyBusiness,
        option: 'My business',
        onClick: props.onClickBusinessCharityHandler,
        title: '',
      },
      { icon: Someonelse, option: 'Someone else', title: '' },
      { icon: BusinessOrCharity, option: 'Business or Charity', title: '' },
    ],
    default: [
      {
        icon: SendMoney,
        option: 'Send money',
        title: 'Pay an international employee, invoice, or expense',
        onClick: props.onClickSendMoneyHandler,
      },
      {
        icon: Setup,
        option: 'Finish account setup',
        title: 'Get balances in multiple currencies, and take buisness goals',
      },
    ],
    accountSetup: [
      {
        icon: Someonelse,
        option: 'Personal Account',
        title: 'Send, spend, and receive around the world for less.',
        onClick: props.onClickPersonalAccountHandler,
      },
      {
        icon: MyBusiness,
        option: 'Business Account',
        title: 'Do business or freelance work internationally.',
        onClick: props.onClickBusinessAccountHandler,
      },
    ],
  }

  if (props.type === 'sendMoney') {
    mainText = SENDING_MONEY
    accountType = RECIPIENT_TYPE.sendMoney
  } else if (props.type === 'accountType') {
    mainText = WHAT_ACCOUNT_SETUP
    accountType = RECIPIENT_TYPE.accountSetup
  } else {
    mainText = WHAT_TO_DO
    accountType = RECIPIENT_TYPE.default
  }

  return (
    <StyledContainer style={props.style}>
      <Typography variant="h1" color="text.highEmphasis">
        {mainText}
        {props.type === 'accountType' ? (
          <Typography
            variant="body3"
            color="text.mediumEmphasis"
            sx={{ display: 'block', paddingTop: '12px' }}
          >
            {ADD_ANOTHER_ACCOUNT}
          </Typography>
        ) : (
          ''
        )}
      </Typography>

      <Stack direction={'column'} gap={theme.spacing(5)}>
        {accountType.map((item) => (
          <OptionCard
            src={item.icon}
            iconTitle={item.option}
            caption={item.title}
            key={item.option}
            alt=""
            onclick={item.onClick}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </Stack>
    </StyledContainer>
  )
}
export default RecipientType
