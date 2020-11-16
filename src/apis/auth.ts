import { AxiosResponse } from 'axios'
import { Req } from './basic'

export const GetOAuthLink = (): Promise<AxiosResponse> =>
  Req().get('/auth/link', {
    params: {
      redirect_uri: process.env.REACT_APP_DISCORD_REDIRECT_URI
    }
  })
