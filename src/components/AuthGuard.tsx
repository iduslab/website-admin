import React, { FC, useEffect } from 'react'
import { Notification } from 'rsuite'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/auth'

export const authGuard = (originalComponent: React.FC) => {
  return () => {
    const history = useHistory()
    const auth = useAuth()

    useEffect(() => {
      if (!auth.authState.isAuth) history.push('/')
      else if (!auth.authState.isAdmin) {
        Notification['error']({
          title: '권한 경고',
          description: '어드민페이지에 접근할 권한을 가지고 있지 않습니다.'
        })
        auth.SignOut()
        history.push('/')
      }
    }, [])

    return <>{originalComponent}</>
  }
}
