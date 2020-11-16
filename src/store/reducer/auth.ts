import { act } from 'react-dom/test-utils'
import { ErrorMessage } from 'rsuite'
import { createReducer } from 'typesafe-actions'
import {
  actions,
  Actions,
  signinAction,
  signinCodeAction,
  signoutAction
} from '../action/auth'

type State = {
  code: string
  accessToken: string
  refreshToken: string
  isAdmin: boolean
  errorMessage: string
  isAuth: boolean
}

const InitialState: State = {
  code: '',
  accessToken: '',
  refreshToken: '',
  isAdmin: false,
  errorMessage: '',
  isAuth: false
}

export const AuthReducers = createReducer<State, Actions>(InitialState)
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
    errorMessage: '',
    isAuth: true
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
  .handleAction(signoutAction, (state, action) => ({
    ...InitialState
  }))
