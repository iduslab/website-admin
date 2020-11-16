import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Route } from 'react-router-dom'

import './styles/index.css'
import 'rsuite/dist/styles/rsuite-default.css'

import App from './components/App'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import * as Dashboard from './pages/dashboard'

import { Provider } from 'react-redux'
import { store } from './store'
import { authGuard } from './components/AuthGuard'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App>
          <Route exact path='/' component={Home} />
          <Route exact path='/signin' component={SignIn} />
          <Route path='/dashboard' component={authGuard(Dashboard.Home)} />
        </App>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
