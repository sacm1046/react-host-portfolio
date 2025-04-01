import { lazy, Suspense } from 'react';
import Loader from '../../components/loader';
import ErrorBoundary from '../../components/errorBoundary';
const RemoteActions = lazy(() => import('remoteApp/Actions'));

export default function FederatedActions() {
    return <ErrorBoundary>
        <Suspense fallback={<Loader />}>
            <RemoteActions />
        </Suspense>
    </ErrorBoundary>
}