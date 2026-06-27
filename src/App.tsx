import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Providers } from './components/layout/Providers';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { ErrorBoundary } from './components/layout/ErrorBoundary';

import { AnimatedLoginPage } from './components/ui/animated-login-page';
import { AnimatedSignupPage } from './components/ui/animated-signup-page';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { VerifyEmail } from './pages/VerifyEmail';
import { DashboardMaster } from './pages/DashboardMaster';
import { ProfileDashboard } from './pages/ProfileDashboard';
import { NotFound } from './pages/NotFound';

// Setup central application routing matrix
const router = createBrowserRouter([
  { path: '/login', element: <AnimatedLoginPage /> },
  { path: '/signup', element: <AnimatedSignupPage /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-password', element: <ResetPassword /> },
  { path: '/verify-email', element: <VerifyEmail /> },
  {
    path: '/',
    element: <ProtectedRoute />,
    errorElement: <ErrorBoundary children={<NotFound />} />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" replace /> },
      { path: '/dashboard', element: <DashboardMaster /> },
      { path: '/profile', element: <ProfileDashboard /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

/**
 * Main application component.
 */
export default function App() {
  return (
    <AuthProvider>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </AuthProvider>
  );
}
