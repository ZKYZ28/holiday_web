import { StrictMode } from 'react';
import './assets/css/App.css';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './QueryClient.ts';
import AuthProvider from './provider/AuthProvider.tsx';
import MessagesProvider from './provider/MessagesProvider.tsx';
import Routes from './route/routes.tsx';

function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <MessagesProvider>
                <Routes />
            </MessagesProvider>
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}

export default App;
