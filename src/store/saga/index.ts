import { all, fork } from 'redux-saga/effects'
import AuthSagas from './auth'
import SettingSagas from './setting'

export default function* sagas() {
  yield all([AuthSagas(), SettingSagas()])
}
