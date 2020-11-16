import { all, fork } from 'redux-saga/effects'
import AuthSagas from './auth'

export default function* sagas() {
  yield all([fork(AuthSagas)])
}
