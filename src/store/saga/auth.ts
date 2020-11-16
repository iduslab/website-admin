import { access } from 'fs'
import { takeEvery, takeLatest, put, call } from 'redux-saga/effects'
import { OAuthExchange, OAuthSignIn } from '../../apis/auth'
import {
  SIGNINCODE_REQUEST,
  SIGNIN_REQUEST,
  signinAction,
  signinCodeAction,
  SIGNINCODE_FAILED,
  SIGNINCODE_SUCCESS,
  SIGNIN_SUCCESS,
  SIGNIN_FAILED,
  SIGNOUT
} from '../action/auth'

function* SigninCode({ payload }: ReturnType<typeof signinCodeAction.request>) {
  try {
    const res = yield call(OAuthExchange, payload.code)
    const { access_token, refresh_token } = res.data
    yield put({
      type: SIGNINCODE_SUCCESS,
      payload: {
        accessToken: access_token,
        refreshToken: refresh_token
      }
    })
    yield put({
      type: SIGNIN_REQUEST,
      payload: {
        accessToken: access_token,
        refreshToken: refresh_token
      }
    })
  } catch (e) {
    yield put({
      type: SIGNINCODE_FAILED,
      payload: { message: e }
    })
  }
}
function* Signin({ payload }: ReturnType<typeof signinAction.request>) {
  try {
    const res = yield call(
      OAuthSignIn,
      payload.accessToken,
      payload.refreshToken
    )
    const { access_token, refresh_token, is_admin } = res.data
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
    yield put({
      type: SIGNIN_SUCCESS,
      payload: {
        accessToken: access_token,
        refreshToken: refresh_token,
        isAdmin: is_admin
      }
    })
  } catch (e) {
    yield put({
      type: SIGNIN_FAILED,
      payload: { message: e }
    })
  }
}
function* SignOut() {
  console.log('called')
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

export default function* sagas() {
  yield takeLatest(SIGNINCODE_REQUEST, SigninCode)
  yield takeLatest(SIGNIN_REQUEST, Signin)
  yield takeLatest(SIGNOUT, SignOut)
}
