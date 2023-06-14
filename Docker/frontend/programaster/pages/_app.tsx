import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import PrivateRoute from '../components/PrivateRoute';
import { AuthProvider } from '@/context/AuthContext';


export default function App({ Component, pageProps, router }: AppProps) {
  const protectedRoutes = [
    '/playground/[problem]',
    '/userview/[rank]',
    '/reactivos',
    '/grupos'
  ];

  const isProtectedRoute = protectedRoutes.includes(router.pathname);

  return (
    <AuthProvider>
      {isProtectedRoute ? (
        <PrivateRoute>
          <Component {...pageProps} />
        </PrivateRoute>
      ) : (
        <Component {...pageProps} />
      )}
    </AuthProvider>
  );
}
