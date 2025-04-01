import { lazy, Suspense } from 'react';
import Loader from '../../components/loader';
import ErrorBoundary from '../../components/errorBoundary';
const RemoteMain = lazy(() => import('remoteApp/Main'));

export default function FederatedMain() {
    return <ErrorBoundary>
        <Suspense fallback={<Loader />}>
            <RemoteMain />
        </Suspense>
    </ErrorBoundary>
}