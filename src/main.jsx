import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'

const RemoteMain = lazy(() => import('remoteApp/Main'));
const RemoteActions = lazy(() => import('remoteApp/Actions'));

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <div>
      <h1>React Host App</h1>
      <Suspense fallback={<div>Cargando widget...</div>}>
        <RemoteMain />
        <RemoteActions />
      </Suspense>
    </div>
  </StrictMode>,
)
