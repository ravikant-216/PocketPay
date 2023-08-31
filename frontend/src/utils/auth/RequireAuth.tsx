import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
interface RequireAuthProps {
  children: React.ReactNode
}
const RequireAuth = ({ children }: RequireAuthProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useSelector((state: any) => {
    return state.user.user
  })
  console.log(user)
  if (user === null) return <Navigate to="/login" />
  return children
}

export default RequireAuth
