import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './providers/provider.tsx'
import { RouterProvider } from 'react-router'
import { router } from './routes/index.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { Toaster } from 'sonner'


createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <Provider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router}></RouterProvider>
         <Toaster richColors  position="top-center"/>
      </ThemeProvider>
    </Provider>



  </StrictMode>,
)
