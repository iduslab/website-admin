import React, { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/auth'
import { DashboardLayout } from './layout/Dashboard'
import { Loading } from './Loading'

const App: FC = ({ children }) => {
  const auth = useAuth()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/signin') return
    const access = localStorage.getItem('access_token')
    const refresh = localStorage.getItem('refresh_token')
    if (access && refresh) auth.signIn(access, refresh)
    else auth.stopLoading()
  }, [])

  if (auth.authState.loading) {
    return <Loading />
  }

  if (!location.pathname.startsWith('/dashboard')) {
    return <div>{children}</div>
  }

  return <DashboardLayout>{children}</DashboardLayout>
}

export default App
