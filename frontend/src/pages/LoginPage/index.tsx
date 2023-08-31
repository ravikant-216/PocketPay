import Box from '@mui/material/Box'
import { AuthTemplate } from '../../components/templates/AuthTemplate'
import SignIn from '../../components/organisms/LoginForm'
import theme from '../../theme'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { baseURL } from '../../strings/constants'
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
  id: number
}
export function LoginPage() {
  const [authenticated, setAuthenticated] = useState(true)
  const dispatch = useDispatch()
  const handleLogin = async (email: string, password: string) => {
    const response = await axios.get(`${baseURL}/user`)
    const data: UserDetails[] = response.data
    const user = data.find(
      (item) => item.password === password && item.email === email
    )
    if (user) {
      dispatch(userActions.loginUser(user))
      navigate(`/dashboard`, { state: { id: user.id } })
    } else {
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
