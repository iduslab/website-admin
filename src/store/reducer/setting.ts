import { settings } from 'cluster'
import { createReducer } from 'typesafe-actions'
import { ISetting } from '../../apis/setting'
import { Actions, settingsAction } from '../action/setting'

type State = {
  errorMessage: any
  data?: ISetting[] | undefined
}

const InitialState: State = {
  errorMessage: ''
}

export const SettingReducers = createReducer<State, Actions>(InitialState)
  .handleAction(settingsAction.success, (state, { payload }) => ({
    ...state,
    data: payload.data
  }))
  .handleAction(settingsAction.failure, (state, { payload }) => ({
    ...state,
    errorMessage: payload.message.toString()
  }))
  .handleAction(settingsAction.request, (state, { payload }) => ({
    ...state
  }))
