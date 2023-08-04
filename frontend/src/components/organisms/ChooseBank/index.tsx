import { useState } from 'react'
import { CANCEL_TRANSFER, CHOOSE_BANK } from '../../../strings/constants'
import CustomButton from '../../atoms/Button'
import InputField from '../../atoms/InputField'
import Typography from '../../atoms/Typography'
import BankCard from '../../molecules/BankCard'
import { Box, BoxProps, styled } from '@mui/material'
import theme from '../../../theme'
import SBI from '../../../../public/assets/icons/sbi.svg'
import HDFC from '../../../../public/assets/icons/hdfc.svg'
import LLoyds from '../../../../public/assets/icons/lloyd.svg'
import HSBC from '../../../../public/assets/icons/hsbc.svg'
import AXIS from '../../../../public/assets/icons/axis.svg'
import OTHER from '../../../../public/assets/icons/otherBank.svg'

const StyledContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: theme.spacing(10),
  width: '100%',
})
const ButtonWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})
export interface ChooseBankProps extends Omit<BoxProps, 'onclick'> {
  onClickHandler?: () => void
  onCancelHandler?: () => void
}
const ChooseBank = (props: ChooseBankProps) => {
  const BANK_LIST = [
    {
      bankIcon: SBI,
      bank: 'State bank of India',
    },
    { bankIcon: HDFC, bank: 'HDFC' },
    { bankIcon: HSBC, bank: 'HSBC' },
    { bankIcon: AXIS, bank: 'AXIS' },
    {
      bankIcon: LLoyds,
      bank: 'LLOYDS',
      onClickHandler: props.onClickHandler,
    },
    {
      bankIcon: OTHER,
      bank: 'Other bank',
    },
  ]
  const [list, setList] = useState(BANK_LIST)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim()
    const updatedList = BANK_LIST.filter((item) =>
      item.bank.toLowerCase().includes(value.toLowerCase())
    )
    setList(value === '' ? BANK_LIST : updatedList)
  }
  return (
    <StyledContainer {...props} data-testid="ChooseBank">
      <Typography variant="h1" color="text.highEmphasis">
        {CHOOSE_BANK}
      </Typography>
      <InputField
        type="text"
        variant="outlined"
        placeholder="Start typing to search"
        onChange={handleChange}
        sx={{ width: 'auto' }}
      />
      {list.map((item) => (
        <BankCard
          key={item.bank}
          src={item.bankIcon}
          alt={item.bank}
          iconTitle={item.bank}
          onClick={item.onClickHandler}
        />
      ))}
      <ButtonWrapper>
        <CustomButton variant="outlined" onClick={props.onCancelHandler}>
          {CANCEL_TRANSFER}
        </CustomButton>
      </ButtonWrapper>
    </StyledContainer>
  )
}

export default ChooseBank
