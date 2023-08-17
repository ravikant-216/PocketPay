import Box from '@mui/material/Box'
import { AuthTemplate } from '../../components/templates/AuthTemplate'
import SignUpForm from '../../components/organisms/SignUpForm'
import theme from '../../theme'
export function SignUpPage() {
  return (
    <Box>
      <AuthTemplate
        Content={
          <SignUpForm
            style={{ maxWidth: theme.spacing(129), width: '100%' }}
          ></SignUpForm>
        }
      ></AuthTemplate>
    </Box>
  )
}
