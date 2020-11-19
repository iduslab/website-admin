import { AxiosResponse } from 'axios'
import { ReqAuth } from './basic'

export interface IWebhook {
  content?: string
  embeds?: IWebhookEmbed[]
}

export interface IWebhookEmbed {
  title: string
  description: string
  color: string | number
  fields?: IWebhookEmbedFields[]
}

export interface IWebhookEmbedFields {
  id: number
  name: string
  value: string
}

export const SendNotice = (
  accessToken: string,
  content: IWebhook
): Promise<AxiosResponse> =>
  ReqAuth(accessToken).post('/util/sendnotice', {
    content
  })
