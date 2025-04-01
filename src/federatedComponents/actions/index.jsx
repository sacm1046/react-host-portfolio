import { lazy, Suspense } from 'react';
import Loader from '../../components/loader';
const RemoteActions = lazy(() => import('remoteApp/Actions'));

export default function FederatedActions() {
    return <Suspense fallback={<Loader />}>
        <RemoteActions />
    </Suspense>
}