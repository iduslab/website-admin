import { put, call, takeEvery, takeLatest } from 'redux-saga/effects'
import * as apis from '../../apis/setting'
import {
  SETTINGS_FAILED,
  SETTINGS_REQUEST,
  SETTINGS_SUCCESS
} from '../action/setting'

function* GetSettings(): any {
  try {
    const res = yield call(apis.GetSettings)
    yield put({
      type: SETTINGS_SUCCESS,
      payload: {
        data: res.data.data.map((data: any, index: any) => ({
          ...data,
          id: index + 1
        }))
      }
    })
  } catch (e) {
    yield put({
      type: SETTINGS_FAILED,
      payload: {
        message: e
      }
    })
  }
}

export default function* sagas() {
  yield takeLatest(SETTINGS_REQUEST, GetSettings)
}
