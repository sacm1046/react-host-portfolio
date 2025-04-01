import { Suspense } from 'react';
import Loader from '../../components/loader';
import ErrorBoundary from '../../components/errorBoundary';

export default function FederatedWrapper({ children }) {
    return <ErrorBoundary>
        <Suspense fallback={<Loader />}>
            {children}
        </Suspense>
    </ErrorBoundary>
}