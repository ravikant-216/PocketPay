// import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { Navigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'

interface RequireAuthProps {
  children: React.ReactNode
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { isAuthenticated } = useAuth0()
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }
  return children
}

export default RequireAuth
