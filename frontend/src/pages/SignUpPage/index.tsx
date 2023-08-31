import Box from '@mui/material/Box'
import React, { useEffect, useState } from 'react'
import { AuthTemplate } from '../../components/templates/AuthTemplate'

import theme from '../../theme'
import { AccountSetupPage } from '../AccountSetupPage'
import { formData } from '../../components/organisms/DetailsFrom'
import { AccountDetailPage } from '../AccountDetailPage'
import { IconLabelPropType } from '../../components/atoms/IconLabel'
import getCountryList from '../../components/api/CountryList'
import axios from 'axios'
import { baseURL } from '../../strings/constants'
import SignUpForm from '../../components/organisms/SignUpForm'
import { userActions } from '../../utils/store/user'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

interface SignUpFormProps {
  onSubmit?: () => void
}
export function SignUpPage(props: SignUpFormProps) {
  const [countryList, setCountryList] = useState<IconLabelPropType[]>([])
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [accountType, setAccountType] = useState<string>('')
  const [show, setShow] = useState<number>(1)
  const dispatch = useDispatch()
  const handleClick = (email: string) => {
    setEmail(email)
    setShow(2)
  }

  const navigate = useNavigate()
  useEffect(() => {
    async function fetchCountryList() {
      const list: IconLabelPropType[] = await getCountryList()

      setCountryList(list)
    }

    fetchCountryList()
  }, [])

  return (
    <>
      {show === 1 && (
        <Box>
          <AuthTemplate
            Content={
              <SignUpForm
                style={{ maxWidth: theme.spacing(129), width: '100%' }}
                onSubmit={handleClick}
              ></SignUpForm>
            }
          ></AuthTemplate>
        </Box>
      )}

      {show === 2 && (
        <AccountSetupPage
          onClick={(password: string) => {
            setPassword(password)
            setShow(3)
          }}
          accountType={setAccountType}
          onBackClick={() => {
            setShow(1)
          }}
          countryList={countryList}
          data-testid="account"
        ></AccountSetupPage>
      )}
      {show === 3 && (
        <AccountDetailPage
          buttonOnClick={async (form: formData) => {
            if (props.onSubmit) props.onSubmit()
            const { data: user } = await axios.post(`${baseURL}/user`, {
              first_name: form.firstName,
              last_name: form.lastName,
              country: form.country,
              address: form.address,
              email: email,
              dob: form.dob,
              account_type: accountType,
              password: password,
            })
            dispatch(userActions.loginUser(user))
            navigate('/dashboard', { state: { id: user.id, newUser: true } })
          }}
          countryList={countryList}
        ></AccountDetailPage>
      )}
    </>
  )
}
