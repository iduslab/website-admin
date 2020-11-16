import {
  createStore,
  applyMiddleware,
  Store,
  combineReducers,
  compose
} from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import saga from './saga'
import { reducers } from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  reducers,
  // @ts-ignore
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(saga)

export type RootState = ReturnType<typeof reducers>
