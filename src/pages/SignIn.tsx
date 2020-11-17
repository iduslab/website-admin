import React, { FC, useEffect } from 'react'
import { GetOAuthLink } from '../apis/auth'
import { Notification } from 'rsuite'
import { useHistory, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { useAuth } from '../hooks/auth'

const SignIn: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const auth = useAuth()

  const signIn = async (code: string) => {
    await auth.exchangeCode(code)
  }

  useEffect(() => {
    const { code } = queryString.parse(location.search)
    if (code?.length != 30) {
      history.push('/')
      Notification['error']({
        title: 'ERROR',
        description: '올바른 요청이 아닙니다'
      })
    } else {
      signIn(Array.isArray(code) ? code[0] : code)
    }
  }, [])

  useEffect(() => {
    if (auth.authState.isAuth) history.push('/dashboard/home')
  }, [auth.authState.isAuth])

  return (
    <div>
      <div>로그인 확인 중입니다</div>
    </div>
  )
}

export default SignIn
