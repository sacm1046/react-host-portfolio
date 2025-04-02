import { lazy } from 'react';
const RemoteList = lazy(() => import('remoteApp/List'));

export default function FederatedList() {
    return <RemoteList />
}