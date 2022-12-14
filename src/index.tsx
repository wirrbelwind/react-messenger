import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { AppContext } from './Config/Context';
import { UserStore } from './Stores/UserStore';
import { ChatStore } from './Stores/ChatStore';
import { AppStore } from './Stores/AppStore';
import { ControllerContext, initStores } from './Helpers/context';
import { Controller } from './Controller/Controller';
import AppRouter from './AppRouter/AppRouter';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const stores = initStores()
const controller = new Controller(stores.userStore, stores.appStore, stores.chatListStore, stores.chatStore, stores.globalSearchStore)

root.render(
  <ControllerContext.Provider value={controller}>
    <AppRouter />
  </ControllerContext.Provider>
);

reportWebVitals();
