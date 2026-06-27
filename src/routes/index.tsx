import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';
import { MainContainer } from '@/pages/MainContainer';
import { NotFound } from '@/pages/NotFound';
import { AnimatedLoginPage } from '@/components/ui/animated-login-page';
import { AnimatedSignupPage } from '@/components/ui/animated-signup-page';
import { ForgotPassword } from '@/pages/ForgotPassword';
import { ResetPassword } from '@/pages/ResetPassword';
import { VerifyEmail } from '@/pages/VerifyEmail';
import { Dashboard } from '@/pages/Dashboard';
import { ProfileDashboard } from '@/pages/ProfileDashboard';
import { ProtectedRoute } from '@/components/ProtectedRoute';

/**
 * Router configuration.
 */
export const router = createBrowserRouter([
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
      { path: '/', element: <MainContainer /> },
      {
        path: '/dashboard',
        element: <Layout />,
        children: [
          { path: '/dashboard', element: <Dashboard /> },
        ],
      },
      { path: '/profile', element: <ProfileDashboard /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);
