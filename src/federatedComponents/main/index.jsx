import { lazy, Suspense } from 'react';
import Loader from '../../components/loader';
const RemoteMain = lazy(() => import('remoteApp/Main'));

export default function FederatedMain() {
    return <Suspense fallback={<Loader />}>
        <RemoteMain />
    </Suspense>
}