import { Suspense } from 'react';
import Loader from '../loader';
import ErrorBoundary from '../errorBoundary';

export default function FederatedWrapper({ children }) {
    return <ErrorBoundary>
        <Suspense fallback={<Loader />}>
            {children}
        </Suspense>
    </ErrorBoundary>
}