import React from 'react'
import ReactDOMServer from 'react-dom/server'
import EntryComponent from './entry-component'

export function render() {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <EntryComponent />
    </React.StrictMode>
  )
  return { html }
}
