import React, { Suspense, lazy } from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';

import { AuthProvider } from './src/context/AuthContext';
import ProtectedRoute from './src/components/ProtectedRoute';
import LoadingSpinner from './src/components/LoadingSpinner';

const Home = lazy(() => import('./src/pages/Home'));
const Login = lazy(() => import('./src/pages/Login'));
const Catalog = lazy(() => import('./src/pages/Catalog'));
const Dashboard = lazy(() => import('./src/pages/Dashboard'));
const Admin = lazy(() => import('./src/pages/Admin'));
const Features = lazy(() => import('./src/pages/Features'));
const Pricing = lazy(() => import('./src/pages/Pricing'));
const NotFound = lazy(() => import('./src/pages/NotFound'));

const App: React.FC = () => {
  return (
    <Theme appearance="inherit" radius="large" scaling="100%">
      <AuthProvider>
        <Router>
          <Suspense fallback={
            <div className="min-h-screen bg-[hsl(220,20%,7%)] flex items-center justify-center">
              <LoadingSpinner message="Loading LibraryOS…" />
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="dark"
            toastStyle={{
              background: 'hsl(220,18%,12%)',
              border: '1px solid hsl(220,15%,22%)',
              color: 'white',
            }}
          />
        </Router>
      </AuthProvider>
    </Theme>
  );
};

export default App;