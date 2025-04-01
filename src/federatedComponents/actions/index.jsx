import { lazy } from 'react';
const RemoteActions = lazy(() => import('remoteApp/Actions'));

export default function FederatedActions() {
    return <RemoteActions />
}