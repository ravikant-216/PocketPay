import Box from '@mui/material/Box'
import { AuthTemplate } from '../../components/templates/AuthTemplate'
import SignIn from '../../components/organisms/LoginForm'
import theme from '../../theme'
export interface LogInProps {
  onSubmit?: (email: string, password: string) => void
}

export function LoginPage({ onSubmit }: LogInProps) {
  return (
    <Box>
      <AuthTemplate
        Content={
          <SignIn
            sx={{ maxWidth: theme.spacing(129), width: '100%' }}
            onSubmit={onSubmit}
          ></SignIn>
        }
      ></AuthTemplate>
    </Box>
  )
}
