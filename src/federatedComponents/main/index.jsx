import { lazy } from 'react';
const RemoteMain = lazy(() => import('remoteApp/Main'));

export default function FederatedMain({title}) {
    return <RemoteMain title={title} />
}