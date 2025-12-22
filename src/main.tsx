//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
//import { BrowserRouter } from 'react-router'
//import { AuthProvider } from './context/AuthProvider.tsx'
import { store } from './features/index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
//import { initAxios } from './api/api.axios.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>

      <Suspense fallback={<div>Cargando...</div>}>
        <Provider store={store}>
          <Routes>

            <Route path="/*" element={<App />} />

          </Routes>
        </Provider>
      </Suspense>

    </BrowserRouter>
  </QueryClientProvider>
)
