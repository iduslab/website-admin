import React, { FC, useEffect } from 'react'
import { GetOAuthLink } from '../apis/auth'
import { Button, Icon, Notification } from 'rsuite'
import { useAuth } from '../hooks/auth'
import { useHistory } from 'react-router-dom'

const Home: FC = () => {
  const auth = useAuth()
  const history = useHistory()
  const SignIn = async () => {
    try {
      const {
        data: { link }
      } = await GetOAuthLink()
      if (link) window.location.href = link
    } catch (e) {
      Notification['error']({
        title: 'Error',
        description: `요청중 에러가 발생하였습니다. ${e}`
      })
    }
  }

  useEffect(() => {
    if (auth.authState.isAuth) {
      history.push('/dashboard')
    }
  }, [auth.authState.isAuth])

  return (
    <div className='centerAll'>
      <Button color='blue' onClick={SignIn}>
        <Icon icon='comment-o' size='lg' /> 디스코드로 로그인하기
      </Button>
    </div>
  )
}

export default Home
