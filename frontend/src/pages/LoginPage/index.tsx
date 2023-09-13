import Box from '@mui/material/Box'
import { AuthTemplate } from '../../components/templates/AuthTemplate'
import SignIn from '../../components/organisms/LoginForm'
import theme from '../../theme'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { AUTH_LOGIN_API, USER_API, baseURL } from '../../strings/constants'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userActions } from '../../utils/store/user'

interface UserDetails {
  first_name: string
  last_name: string
  country: string
  address: string
  email: string
  dob: string
  account_type: string
  password: string
  id: string
}
export function LoginPage() {
  const [authenticated, setAuthenticated] = useState(true)
  const dispatch = useDispatch()
  const handleLogin = async (email: string, password: string) => {
    try {
      const { data: tokenData } = await axios.post(
        `${baseURL}/${AUTH_LOGIN_API}`,
        { email, password }
      )
      console.log(tokenData.token)
      const response = await axios.get(`${baseURL}/${USER_API}?email=${email}`)
      const data: UserDetails = response.data
      dispatch(userActions.loginUser({ user: data, token: tokenData.token }))
      navigate(`/dashboard`, { state: { id: data.id } })
    } catch (err) {
      console.log(err)
      setAuthenticated(false)
    }
  }
  const navigate = useNavigate()
  return (
    <Box>
      <AuthTemplate
        Content={
          <SignIn
            sx={{ maxWidth: theme.spacing(129), width: '100%' }}
            onSubmit={(email, password) => {
              handleLogin(email, password)
            }}
            authenticated={authenticated}
          ></SignIn>
        }
      ></AuthTemplate>
    </Box>
  )
}
