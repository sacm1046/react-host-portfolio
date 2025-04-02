import { lazy } from 'react';
const RemoteComments = lazy(() => import('remoteApp/Comments'));

export default function FederatedComments() {
    return <RemoteComments />
}