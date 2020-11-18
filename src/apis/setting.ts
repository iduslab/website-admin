import { AxiosResponse } from 'axios'
import { Req, ReqAuth } from './basic'

export interface ISetting {
  name: string
  description: string
  value: any
}

export const GetSettings = (): Promise<AxiosResponse> =>
  Req().get('/setting/', {})

export const GetSettingDetail = (name: string): Promise<AxiosResponse> =>
  Req().get(`setting/${name}`, {})

export const UpdateSetting = (
  accessToken: string,
  name: string,
  data: any
): Promise<AxiosResponse> =>
  ReqAuth(accessToken).patch(`/setting/${name}`, { value: { data } })

export const AddSetting = (
  accessToken: string,
  name: string,
  description: string,
  value: string
): Promise<AxiosResponse> =>
  ReqAuth(accessToken).post(`/setting`, {
    name,
    description,
    value
  })
