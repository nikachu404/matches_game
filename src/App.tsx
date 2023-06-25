import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

export const App: React.FC = () => {
  return (
    <>
      <ToastContainer
        theme="dark"
        position="bottom-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover={false}
        icon={false}
        progressStyle={{ background: '#f7630c' }}
      />

      <div className="app">
        <Outlet />
      </div>
    </>
  );
};
