import { AxiosResponse } from 'axios'
import { Req } from './basic'

export const GetOAuthLink = (): Promise<AxiosResponse> =>
  Req().get('/auth/link', {
    params: {
      redirect_uri: process.env.REACT_APP_DISCORD_REDIRECT_URI
    }
  })

export const OAuthExchange = (code: string): Promise<AxiosResponse> =>
  Req().get('/auth/', {
    params: {
      code,
      redirect_uri: process.env.REACT_APP_DISCORD_REDIRECT_URI
    }
  })

export const OAuthSignIn = (
  access_token: string,
  refresh_token: string
): Promise<AxiosResponse> =>
  Req().post('/auth/token', {
    access_token,
    refresh_token
  })
