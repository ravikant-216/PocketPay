import { Box, Divider, Stack } from '@mui/material'
import InputField from '../../atoms/InputField'
import Typography from '../../atoms/Typography'
import info from '../../../../public/assets/icons/info.svg'
import depreciate from '../../../../public/assets/icons/depreciate.svg'
import Image from '../../atoms/Image'
import styled from '@emotion/styled'
import { useState } from 'react'
import CountryDropdown from '../CountryDropdown'
import {
  AGREE,
  CURRENCY_EXCHANGE_CONTINUE,
  CURRENCY_EXCHANGE_TRANSFER,
  DEFAULT_SENDER,
  GURANTEED_RATE,
  GURANTEED_RATE_VALUE,
  LOW_COST_TRANSFER,
  MODAL_CONTENT,
  SELECT_CURRENCY_ARRAY,
  TOTAL_AMOUNT,
  TOTAL_AMOUNT_VALUE,
  TRANSFER_FEE,
} from '../../../strings/constants'
import CustomButton from '../../atoms/Button'
import { KeyboardArrowDown } from '@mui/icons-material'
import theme from '../../../theme'
import ModalBox from '../../molecules/ModalBox'

interface CurrencyCardProps {
  countryName?: string
  iconTitle?: string
  countryImageSrc?: string
  countryImageAlt?: string
  countryCurrencyCode?: string
  currencyValue: number
}
interface Data {
  senderAmount?: string
  recipientAmount?: string
  senderCountry?: string
  recipientCountry?: string
}

export interface CurrencyExchangeProps {
  data: Data
  style?: React.CSSProperties
  onClick: (data: Data) => void
}
const CommonStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
}
const OuterWrapper = styled(Box)({
  ...CommonStyles,
  gap: theme.spacing(13),

  position: 'relative',
  '& .float-button': {
    bottom: 0,
    right: theme.spacing(-35),
  },
})

const OuterBoxWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
})

const ContentBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const IconBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
})

const ButtonWrapper = styled(Box)({
  ...CommonStyles,
  justifyContent: 'flex-end',

  paddingTop: theme.spacing(125),
})

const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
})

const modalStyles: React.CSSProperties = {
  width: theme.spacing(141),
  minWidth: theme.spacing(95),
  height: theme.spacing(84.25),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(5),
}

const StyledWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(7),
})

const TextContainer = styled(Box)({
  padding: `${theme.spacing(15)} ${theme.spacing(10)} ${theme.spacing(
    30.75
  )} ${theme.spacing(7.5)}`,
})
const CurrencyExchange = (props: CurrencyExchangeProps) => {
  const [dropdown, setDropdown] = useState(false)
  const handleSenderClick = () => {
    setDropdown(true)
  }

  const handleReceiverClick = () => {
    setDropdown(true)
    setReceiver(true)
  }

  const [senderCurrencyCard, setSenderCurrencyCard] =
    useState<CurrencyCardProps>(() => {
      if (props.data.senderCountry === '') return DEFAULT_SENDER.props
      else {
        const value = SELECT_CURRENCY_ARRAY.find(
          (item) => item.props.countryCurrencyCode === props.data.senderCountry
        )
        if (value !== undefined) {
          return value.props
        } else {
          return DEFAULT_SENDER.props
        }
      }
    })

  const [receiverCurrencyCard, setReceiverCurrencyCard] =
    useState<CurrencyCardProps>(SELECT_CURRENCY_ARRAY[3].props)

  const [receiver, setReceiver] = useState(false)

  const handleChange = (selectedValue: string) => {
    const card = SELECT_CURRENCY_ARRAY.find(
      (item) => item.key === selectedValue
    )

    if (card) {
      const updatedCard = {
        iconTitle: card.props.iconTitle,
        countryImageSrc: card.props.countryImageSrc,
        countryImageAlt: card.props.countryImageAlt,
        countryCurrencyCode: card.props.countryCurrencyCode,
        currencyValue: card.props.currencyValue,
      }
      if (!receiver) {
        setSenderCurrencyCard(updatedCard)
      } else {
        setReceiverCurrencyCard(updatedCard)
      }
    }
  }
  const handleSelectCurrency = () => {
    setDropdown(false)
    setReceiver(false)
  }

  const [open, setOpen] = useState(false)
  const handleModalOpen = () => {
    setOpen(!open)
  }

  const [input, setInput] = useState(props.data.senderAmount)
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInput(value)
  }
  const reciverCurrencyValue = (
    (senderCurrencyCard.currencyValue / receiverCurrencyCard.currencyValue) *
    Number(input)
  ).toFixed(3)

  const ModalContent = () => {
    return (
      <>
        <TextContainer>
          <Typography variant="body1" color="text.lowEmphasis">
            {MODAL_CONTENT}
          </Typography>
        </TextContainer>

        <StyledBox>
          <CustomButton
            variant="contained"
            onClick={() => {
              props.onClick({
                senderAmount: input,
                recipientAmount: String(reciverCurrencyValue),
                senderCountry: senderCurrencyCard.countryCurrencyCode,
                recipientCountry: receiverCurrencyCard.countryCurrencyCode,
              })
            }}
            data-testid="modalButton"
          >
            {AGREE}
          </CustomButton>
        </StyledBox>
      </>
    )
  }

  return (
    <>
      <OuterBoxWrapper data-testid="currencyExchange" style={props.style}>
        <OuterWrapper>
          <Typography variant="h1" color="text.highEmphasis">
            {CURRENCY_EXCHANGE_TRANSFER}
          </Typography>
          {dropdown === true ? (
            <>
              <CountryDropdown
                names={SELECT_CURRENCY_ARRAY}
                placeholder="select country"
                onChange={handleChange}
                data-testid="country-dropdown"
              />
            </>
          ) : (
            <>
              <StyledWrapper>
                <InputField
                  placeholder="You send"
                  variant="outlined"
                  endAdornment={
                    <Stack direction={'row'} sx={{ gap: theme.spacing(2.5) }}>
                      <Image
                        src={senderCurrencyCard.countryImageSrc}
                        alt="image"
                      />
                      <Typography
                        variant="caption"
                        data-testid="sender-country-code"
                      >
                        {senderCurrencyCard.countryCurrencyCode}
                      </Typography>
                      <KeyboardArrowDown
                        onClick={handleSenderClick}
                        data-testid="sender-arrow"
                        sx={{ cursor: 'pointer' }}
                      />
                    </Stack>
                  }
                  onChange={handleInput}
                  value={input === '0' ? '' : input}
                  data-testid="senderInput"
                  type="number"
                  inputProps={{ className: 'senderInput' }}
                />
                <InputField
                  placeholder="Recipient gets"
                  variant="outlined"
                  endAdornment={
                    <Stack direction={'row'} sx={{ gap: theme.spacing(2.5) }}>
                      <Image
                        src={receiverCurrencyCard.countryImageSrc}
                        alt="image"
                      />
                      <Typography variant="caption">
                        {receiverCurrencyCard.countryCurrencyCode}
                      </Typography>
                      <KeyboardArrowDown
                        onClick={handleReceiverClick}
                        data-testid="receiver-arrow"
                        sx={{ cursor: 'pointer' }}
                      />
                    </Stack>
                  }
                  disabled
                  value={
                    (input === '0' ? '' : input)
                      ? String(reciverCurrencyValue)
                      : ''
                  }
                  data-testid="recieverInput"
                  type="number"
                />
                <ContentBox>
                  <Typography variant="body3" color="text.lowEmphasis">
                    {LOW_COST_TRANSFER}
                  </Typography>
                  <Divider variant="middle" sx={{ flex: 1 }} />
                  <IconBox>
                    <Typography variant="body3" color="text.lowEmphasis">
                      {TRANSFER_FEE}
                    </Typography>
                    <Image src={info} alt="" />
                  </IconBox>
                </ContentBox>
                <ContentBox>
                  <Typography variant="body3" color="text.lowEmphasis">
                    {GURANTEED_RATE}
                  </Typography>
                  <Divider variant="middle" sx={{ flex: 1 }} />
                  <IconBox>
                    <Typography variant="body3" color="primary.500">
                      {GURANTEED_RATE_VALUE}
                    </Typography>
                    <Image src={depreciate} alt="" />
                  </IconBox>
                </ContentBox>
                <ContentBox>
                  <Typography variant="body3" color="text.lowEmphasis">
                    {TOTAL_AMOUNT}
                  </Typography>
                  <Divider variant="middle" sx={{ flex: 1 }} />
                  <IconBox>
                    <Typography variant="body3" color="text.lowEmphasis">
                      {TOTAL_AMOUNT_VALUE}
                    </Typography>
                    <Image src={info} alt="" />
                  </IconBox>
                </ContentBox>
              </StyledWrapper>
            </>
          )}
        </OuterWrapper>
        <ButtonWrapper className="float-button">
          <CustomButton
            variant="contained"
            onClick={dropdown ? handleSelectCurrency : handleModalOpen}
            data-testid={dropdown ? 'select-currency-button' : 'button'}
            disabled={dropdown ? false : input === '0' || input === ''}
          >
            {CURRENCY_EXCHANGE_CONTINUE}
          </CustomButton>
        </ButtonWrapper>
      </OuterBoxWrapper>
      <ModalBox
        open={open}
        width={theme.spacing(141)}
        height={theme.spacing(83.75)}
        style={modalStyles}
        data-testid="modalContent"
        onClose={() => setOpen(false)}
      >
        <ModalContent />
      </ModalBox>
    </>
  )
}
export default CurrencyExchange
