import { Box, Stack } from '@mui/system'
import theme from '../../../theme'
import Typography from '../../atoms/Typography'
import RadioButton from '../../atoms/RadioButton'
import CustomButton from '../../atoms/Button'
import { Grid, RadioGroup } from '@mui/material'
import React, { useEffect, useState } from 'react'

import InputField from '../../atoms/InputField'
import {
  ADD,
  ADD_TRADING_ADDRESS,
  CANCEL,
  CHANGE,
  CONFIRM_BUTTON_LABEL,
  SAVE,
  TRADING_ADDRESSES,
  TRADING_ADDRESS_HEADING,
  TRADING_ADDRESS_SUBHEADING,
  baseURL,
} from '../../../strings/constants'
import ModalBox from '../../molecules/ModalBox'

import axios from 'axios'

export interface TradingAddressProps {
  onClick: (address: string) => void
  sx?: React.CSSProperties
}

interface AddressList {
  address: string
}

interface Address {
  id: 1
  name: string
}

interface ModalContentProps {
  selectedValue: number
  onClick: (data: string) => void
  addressList: AddressList[]
}
const ModalContent = (props: ModalContentProps) => {
  return (
    <>
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={theme.spacing(10)}
        padding={theme.spacing(6)}
      >
        <Typography variant="body1" color={theme.palette.Greys.icon1}>
          {ADD_TRADING_ADDRESS}
        </Typography>
        <InputField
          variant="outlined"
          multiline
          label={`trading address`}
          value={props.addressList[props.selectedValue].address}
        />
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <CustomButton
            variant="contained"
            onClick={() =>
              props.onClick(props.addressList[props.selectedValue].address)
            }
            data-testid="addButton"
          >
            {ADD}
          </CustomButton>
        </Box>
      </Box>
    </>
  )
}

const ConfirmTradingAddress = (props: TradingAddressProps) => {
  const [addAddress, setaddAddress] = useState(false)
  const [input, setInput] = useState('')
  const [addressList, setAddressList] = useState<AddressList[]>([])
  const [selectedValue, setSelectedValue] = useState<number>(0)
  const [editedInput, setEditedInput] = useState<string>('')

  const [showModal, setShowModal] = useState(false)
  const [edit, setEdit] = useState(false)
  const addTradingAddress = () => {
    setaddAddress(true)
  }

  const fetchTradingAddressList = async () => {
    const response = await axios.get(`${baseURL}/address`)
    const responseData: Address[] = response.data
    const addressess: AddressList[] = responseData.map((item) => {
      return { address: item.name }
    })

    setAddressList(addressess)
    setEditedInput(addressess[0].address)
  }
  const addNewTradingAddress = () => {
    setAddressList((prev) => [...prev, { address: input }])
  }

  const updateTradingAddress = () => {
    addressList[selectedValue].address = editedInput
  }

  useEffect(() => {
    fetchTradingAddressList()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value.trim())
  }

  const handleAddAddress = () => {
    if (input != '') {
      addNewTradingAddress()
    }

    setInput('')
    setaddAddress(false)
  }

  const handleEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedInput(event.target.value.trim())
  }

  const handleEditAddress = () => {
    updateTradingAddress()
    setEdit(false)
  }

  return (
    <>
      <Box gap={theme.spacing(3)} data-testid="TradingAddress" sx={props.sx}>
        <Stack
          direction={'column'}
          display={'flex'}
          justifyContent={'flex-start'}
          gap={theme.spacing(3)}
        >
          <Typography variant="h1" color="text.highEmphasis">
            {TRADING_ADDRESS_HEADING}
          </Typography>

          <Typography
            variant="body3"
            color="text.mediumEmphasis"
            sx={{ paddingBottom: theme.spacing(8) }}
          >
            {TRADING_ADDRESS_SUBHEADING}
          </Typography>
        </Stack>
        <Grid container>
          <Grid item xs={6} paddingBottom={theme.spacing(6)}>
            <Typography variant="body2" color="text.mediumEmphasis">
              {TRADING_ADDRESSES}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            {!addAddress && !edit && (
              <Box
                sx={{ cursor: 'pointer' }}
                onClick={() => setEdit(true)}
                data-testid="editButton"
              >
                <Typography variant="link" color={theme.palette.primary[500]}>
                  {CHANGE}
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
        {addAddress || edit ? (
          <>
            <InputField
              variant="outlined"
              multiline
              type="text"
              label={`TradingAddress ${
                edit ? selectedValue + 1 : addressList.length + 1
              }`}
              onChange={edit ? handleEdit : handleChange}
              sx={{ width: '100%' }}
              value={edit ? editedInput : input}
              data-testid="inputField"
            />
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'flex-start'}
              flexDirection={'column'}
              paddingTop={theme.spacing(15.5)}
              flex={1}
            >
              <Box
                display={'flex'}
                flexDirection={'column'}
                gap={theme.spacing(5)}
                width={'40%'}
              >
                <CustomButton
                  variant="outlined"
                  onClick={() =>
                    edit ? setEdit(false) : (setaddAddress(false), setInput(''))
                  }
                  data-testid="cancelButton"
                >
                  {CANCEL}
                </CustomButton>
                <CustomButton
                  variant="contained"
                  onClick={edit ? handleEditAddress : handleAddAddress}
                  data-testId="saveButton"
                >
                  {SAVE}
                </CustomButton>
              </Box>
            </Box>
          </>
        ) : (
          <>
            <RadioGroup
              value={selectedValue}
              onChange={(event) => {
                setSelectedValue(Number(event.target.value))
                setEditedInput(addressList[Number(event.target.value)].address)
              }}
              defaultValue={selectedValue}
              defaultChecked
              data-testid="radioGroup"
            >
              {addressList.map((item, index) => (
                <Box gap={theme.spacing(3)} key={item.address}>
                  <Stack paddingLeft={theme.spacing(19.5)}>
                    <Typography variant="body2" color="text.mediumEmphasis">
                      Address {index + 1}
                    </Typography>
                  </Stack>

                  <RadioButton
                    value={index}
                    label={
                      <Typography variant="body2" color="text.highEmphasis">
                        {item.address}
                      </Typography>
                    }
                    sx={{
                      gap: theme.spacing(7),
                      paddingBottom: theme.spacing(10),
                    }}
                    data-testid={`radio-${index}`}
                  />
                </Box>
              ))}
            </RadioGroup>

            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'flex-start'}
              flexDirection={'column'}
            >
              <Box
                display={'flex'}
                flexDirection={'column'}
                gap={theme.spacing(5)}
              >
                <CustomButton
                  variant="outlined"
                  onClick={addTradingAddress}
                  data-testid="addTradingAddressButton"
                >
                  {ADD_TRADING_ADDRESS}
                </CustomButton>
                <CustomButton
                  variant="contained"
                  onClick={() => setShowModal(true)}
                  data-testid="confirmButton"
                >
                  {CONFIRM_BUTTON_LABEL}
                </CustomButton>
              </Box>
            </Box>
          </>
        )}
      </Box>

      <ModalBox
        style={{ width: theme.spacing(144), height: theme.spacing(76.5) }}
        open={showModal}
        onClose={() => setShowModal(false)}
        data-testid="modal"
      >
        <ModalContent
          onClick={props.onClick}
          selectedValue={selectedValue}
          addressList={addressList}
        />
      </ModalBox>
    </>
  )
}

export default ConfirmTradingAddress
