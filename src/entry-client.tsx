import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import EntryComponent from './entry-component'


ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <EntryComponent />
  </React.StrictMode>
)
