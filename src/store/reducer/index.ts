import { combineReducers } from 'redux'
import { AuthReducers } from './auth'
import { SettingReducers } from './setting'

export const reducers = combineReducers({
  auth: AuthReducers,
  setting: SettingReducers
})
