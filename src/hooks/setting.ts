import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/index'
import * as actions from '../store/action/setting'

export const useSetting = () => {
  const dispatch = useDispatch()
  const state = useSelector((store: RootState) => store.setting)

  const fetchSettings = () => {
    dispatch(actions.settingsAction.request(''))
  }

  return { state, fetchSettings }
}
