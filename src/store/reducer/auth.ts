import { act } from 'react-dom/test-utils'
import { ErrorMessage } from 'rsuite'
import { createReducer } from 'typesafe-actions'
import {
  actions,
  Actions,
  signinAction,
  signinCodeAction,
  signoutAction,
  stopLoading
} from '../action/auth'

type State = {
  code: string
  accessToken: string
  refreshToken: string
  isAdmin: boolean
  errorMessage: string
  isAuth: boolean
  loading: boolean
}

const InitialState: State = {
  code: '',
  accessToken: '',
  refreshToken: '',
  isAdmin: false,
  errorMessage: '',
  isAuth: false,
  loading: true
}

export const AuthReducers = createReducer<State, Actions>(InitialState)
  .handleAction(signinCodeAction.success, (state, { payload }) => ({
    ...state,
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken,
    errorMessage: '',
    loading: false
  }))
  .handleAction(signinCodeAction.failure, (state, { payload }) => ({
    ...state,
    errorMessage: payload.message
  }))
  .handleAction(signinCodeAction.request, (state, { payload }) => ({
    ...state,
    code: payload.code,
    loading: true
  }))
  .handleAction(signinAction.success, (state, { payload }) => ({
    ...state,
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken,
    isAdmin: payload.isAdmin,
    errorMessage: '',
    isAuth: true,
    loading: false
  }))
  .handleAction(signinAction.failure, (state, { payload }) => ({
    ...state,
    errorMessage: payload.message,
    loading: false
  }))
  .handleAction(signinAction.request, (state, { payload }) => ({
    ...state,
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken,
    loading: true
  }))
  .handleAction(signoutAction, (_state, _action) => ({
    ...InitialState,
    loading: false
  }))
  .handleAction(stopLoading, (state, _action) => ({
    ...state,
    loading: false
  }))
