/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BrowserRouter } from 'react-router-dom'

import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { Auth0Provider } from '@auth0/auth0-react'
import { Provider } from 'react-redux'
import { persistor, store } from './utils/store'
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Auth0Provider
            domain={`${process.env.REACT_APP_DOMAIN}`}
            clientId={`${process.env.REACT_APP_CLIENT_ID}`}
            authorizationParams={{
              redirect_uri: window.location.origin + '/login',
            }}
          >
            <App />
          </Auth0Provider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
