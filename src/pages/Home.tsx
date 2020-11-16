import React, { FC } from 'react'
import { GetOAuthLink } from '../apis/auth'
import { Notification } from 'rsuite'

const Home: FC = () => {
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

  return (
    <div>
      <div onClick={SignIn}>디스코드로 로그인하기</div>
    </div>
  )
}

export default Home
