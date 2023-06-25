import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { StartPage, GamePage } from './pages';
import { App } from './App.tsx';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<StartPage />} />
              <Route path="game" element={<GamePage />} />
            </Route>
          </Routes>
        </PersistGate>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
