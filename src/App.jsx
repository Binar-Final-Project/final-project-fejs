import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import EmailResetPassword from './pages/user/auth/EmailResetPassword';
import ForgotPassword from './pages/user/auth/ForgotPassword';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/forgot-password" />} />
          <Route path="/forgot-password" element={<EmailResetPassword />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
