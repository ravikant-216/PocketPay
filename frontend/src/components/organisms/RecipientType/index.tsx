// Import necessary components and modules
import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import styled from '@emotion/styled'
import theme from '../../../theme'
import OptionCard from '../../molecules/OptionCard'
import { SENDING_MONEY, WHAT_TO_DO } from '../../../strings/constants'
import MyBusiness from '../../../../public/assets/icons/myBusiness.svg'
import SendMoney from '../../../../public/assets/icons/sendMoney.svg'
import Someonelse from '../../../../public/assets/icons/someoneElse.svg'
import BusinessOrCharity from '../../../../public/assets/icons/businessOrCharity.svg'
import Setup from '../../../../public/assets/icons/setupAccount.svg'
export interface RecipientTypeProps {
  type: 'sendMoney' | 'default'
  onClickSendMoneyHandler?: () => void
  onClickBusinessCharityHandler?: () => void
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
  const RECIPIENT_TYPE = {
    sendMoney: [
      {
        icon: MyBusiness,
        option: 'My business',
        onClick: props.onClickBusinessCharityHandler,
      },
      { icon: Someonelse, option: 'Someone else' },
      { icon: BusinessOrCharity, option: 'Business or Charity' },
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
  }
  const mainText = props.type === 'sendMoney' ? SENDING_MONEY : WHAT_TO_DO
  return (
    <StyledContainer style={props.style}>
      <Typography variant="h1" color="text.highEmphasis">
        {mainText}
      </Typography>

      <Stack direction={'column'} gap={theme.spacing(5)}>
        {props.type === 'sendMoney'
          ? RECIPIENT_TYPE.sendMoney.map((item) => (
              <OptionCard
                src={item.icon}
                iconTitle={item.option}
                key={item.option}
                alt=""
                onclick={item.onClick}
              />
            ))
          : RECIPIENT_TYPE.default.map((item) => (
              <OptionCard
                iconTitle={item.option}
                alt=""
                caption={item.title}
                key={item.option}
                src={item.icon}
                onclick={item.onClick}
              />
            ))}
      </Stack>
    </StyledContainer>
  )
}
export default RecipientType
