import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/index'
import * as actions from '../store/action/auth'

export const useAuth = () => {
  const dispatch = useDispatch()
  const authState = useSelector((store: RootState) => store.auth)

  const exchangeCode = (code: string) => {
    dispatch(actions.signinCodeAction.request({ code }))
  }

  const signIn = (accessToken: string, refreshToken: string) => {
    dispatch(actions.signinAction.request({ accessToken, refreshToken }))
  }

  const SignOut = () => {
    dispatch(actions.signoutAction(''))
  }

  const stopLoading = () => {
    dispatch(actions.stopLoading(''))
  }

  return { authState, exchangeCode, signIn, SignOut, stopLoading }
}
