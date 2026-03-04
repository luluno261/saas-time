import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/hooks/use-auth'
import { AppLayout } from '@/components/layout/AppLayout'
import { LoginForm } from '@/components/auth/LoginForm'
import { SignupForm } from '@/components/auth/SignupForm'
import { Toaster } from '@/components/ui/sonner'
import { Spinner } from '@/components/ui/spinner'

import Landing from '@/pages/Landing'
import Dashboard from '@/pages/Dashboard'
import Workflows from '@/pages/Projects'
import Integrations from '@/pages/TimeLogs'
import Analytics from '@/pages/Reports'
import Settings from '@/pages/Settings'

// Auth page component for login/signup
function AuthPage({ mode }: { mode: 'login' | 'signup' }) {
  const [showSignup, setShowSignup] = useState(mode === 'signup')
  
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-muted/30 p-4">
      {showSignup ? (
        <SignupForm onToggle={() => setShowSignup(false)} />
      ) : (
        <LoginForm onToggle={() => setShowSignup(true)} />
      )}
    </div>
  )
}

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <Spinner size="lg" className="text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

function AppContent() {
  const { isLoading, isAuthenticated } = useAuth()
  const location = useLocation()

  // Show loading spinner during initial auth check
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <Spinner size="lg" className="text-primary" />
      </div>
    )
  }

  return (
    <>
      <div className="noise-overlay" />
      <Routes>
        {/* Public routes */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Landing />} 
        />
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthPage mode="login" />} 
        />
        <Route 
          path="/signup" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthPage mode="signup" />} 
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/workflows"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Workflows />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/integrations"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Integrations />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Analytics />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Settings />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
        <Toaster position="top-center" expand={true} richColors />
      </AuthProvider>
    </Router>
  )
}