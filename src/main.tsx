import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './GeneralComponents/AppRouter/AppRouter'
import { Controller } from './Controller/Controller'
import { ControllerContext } from './Helpers/initStores'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ControllerContext.Provider value={new Controller()}>
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  </ControllerContext.Provider>
)
