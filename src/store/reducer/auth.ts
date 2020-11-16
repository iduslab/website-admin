import { act } from 'react-dom/test-utils'
import { ErrorMessage } from 'rsuite'
import { createReducer } from 'typesafe-actions'
// import { ICafeteria } from 'src/apis/info'
import {
  actions,
  Actions,
  signinAction,
  signinCodeAction
} from '../action/auth'

type State = {
  code: string
  accessToken: string
  refreshToken: string
  isAdmin: boolean
  errorMessage: string
}

const InitialState: State = {
  code: '',
  accessToken: '',
  refreshToken: '',
  isAdmin: false,
  errorMessage: ''
}

export const InfoReducers = createReducer<State, Actions>(InitialState)
  .handleAction(signinCodeAction.success, (state, { payload }) => ({
    ...state,
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken,
    errorMessage: ''
  }))
  .handleAction(signinCodeAction.failure, (state, { payload }) => ({
    ...state,
    errorMessage: payload.message
  }))
  .handleAction(signinCodeAction.request, (state, { payload }) => ({
    ...state,
    code: payload.code
  }))
  .handleAction(signinAction.success, (state, { payload }) => ({
    ...state,
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken,
    isAdmin: payload.isAdmin,
    errorMessage: ''
  }))
  .handleAction(signinAction.failure, (state, { payload }) => ({
    ...state,
    errorMessage: payload.message
  }))
  .handleAction(signinAction.request, (state, { payload }) => ({
    ...state,
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken
  }))
