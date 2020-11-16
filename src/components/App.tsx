import React, { FC, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/auth'

const App: FC = ({ children }) => {
  const auth = useAuth()
  const location = useLocation()

  useEffect(() => {
    const access = localStorage.getItem('access_token')
    const refresh = localStorage.getItem('refresh_token')
    if (access && refresh) {
      auth.signIn(access, refresh)
    }
  }, [])

  if (!location.pathname.startsWith('/dashboard')) {
    return <div>{children}</div>
  }

  return <div>{children}</div>
}

export default App
