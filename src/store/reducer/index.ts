import { combineReducers } from 'redux'
import { AuthReducers } from './auth'

export const reducers = combineReducers({
  auth: AuthReducers
})
