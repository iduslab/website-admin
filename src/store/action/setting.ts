import { createAsyncAction, ActionType, createAction } from 'typesafe-actions'
import { ISetting } from '../../apis/setting'

export const SETTINGS_REQUEST = 'auth/settings/request'
export const SETTINGS_SUCCESS = 'auth/settings/success'
export const SETTINGS_FAILED = 'auth/settings/failed'

export interface ISettingsRequest {}
interface ISettingsResponse {
  data: ISetting[]
}
interface ISettingsError {
  message: any
}

export const settingsAction = createAsyncAction(
  SETTINGS_REQUEST,
  SETTINGS_SUCCESS,
  SETTINGS_FAILED
)<ISettingsRequest, ISettingsResponse, ISettingsError>()

export const actions = {
  settingsAction
}

export type Actions = ActionType<typeof actions>
