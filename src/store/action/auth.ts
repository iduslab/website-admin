import { createAsyncAction, ActionType } from 'typesafe-actions'

export const SIGNINCODE_REQUEST = 'auth/signincode/request'
export const SIGNINCODE_SUCCESS = 'auth/signincode/success'
export const SIGNINCODE_FAILED = 'auth/signincode/failed'

export interface ISigninCodeRequest {
  code: string
}
interface ISigninCodeResponse {
  accessToken: string
  refreshToken: string
}
interface ISigninCodeError {
  message: string
}

export const signinCodeAction = createAsyncAction(
  SIGNINCODE_REQUEST,
  SIGNINCODE_SUCCESS,
  SIGNINCODE_FAILED
)<ISigninCodeRequest, ISigninCodeResponse, ISigninCodeError>()

export const SIGNIN_REQUEST = 'auth/signin/request'
export const SIGNIN_SUCCESS = 'auth/signin/success'
export const SIGNIN_FAILED = 'auth/signin/failed'

export interface ISigninRequest {
  accessToken: string
  refreshToken: string
}
interface ISigninResponse {
  accessToken: string
  refreshToken: string
  isAdmin: boolean
}
interface ISigninError {
  message: string
}

export const signinAction = createAsyncAction(
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILED
)<ISigninRequest, ISigninResponse, ISigninError>()

export const actions = {
  signinCodeAction,
  signinAction
}

export type Actions = ActionType<typeof actions>

export default () => {}
