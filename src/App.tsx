import { StrictMode } from 'react';
import './assets/css/App.css';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './QueryClient.ts';
import AuthProvider from './provider/AuthProvider.tsx';
import MessagesProvider from './provider/MessagesProvider.tsx';
import Routes from './route/routes.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import CONFIGURATION from './api/EndPoints/Configuration.ts';

function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <GoogleOAuthProvider clientId={CONFIGURATION.OPENID_CONNECT}>
            <MessagesProvider>
              <Routes />
            </MessagesProvider>
          </GoogleOAuthProvider>
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}

export default App;
