import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useStore } from "./stores/useStore";
import MainLayout from "./layout/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import BotStatusPage from "./pages/BotStatusPage";
import TaskAllocationPage from "./pages/TaskAllocationPage";
import TaskQueuePage from "./pages/TaskQueuePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import MapPage from "./pages/MapPage";
import AuthPage from "./pages/AuthPage";

// Protected Route Component
function ProtectedRoute({ children }) {
  const isLoggedIn = useStore((s) => s.auth.loggedIn);
  
  if (!isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }
  
  return <MainLayout>{children}</MainLayout>;
}

// Public Route Component (redirect to dashboard if already logged in)
function PublicRoute({ children }) {
  const isLoggedIn = useStore((s) => s.auth.loggedIn);
  
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
}

export default function App() {
  return (
    <Routes>
      {/* Default Route - Redirect based on auth status */}
      <Route
        path="/"
        element={
          <Navigate
            to={useStore.getState().auth.loggedIn ? "/dashboard" : "/auth"}
            replace
          />
        }
      />

      {/* Public Route - Auth Page */}
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/bots"
        element={
          <ProtectedRoute>
            <BotStatusPage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/allocate"
        element={
          <ProtectedRoute>
            <TaskAllocationPage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/queue"
        element={
          <ProtectedRoute>
            <TaskQueuePage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <AnalyticsPage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/map"
        element={
          <ProtectedRoute>
            <MapPage />
          </ProtectedRoute>
        }
      />

      {/* Catch all - redirect to auth if not logged in, dashboard if logged in */}
      <Route
        path="*"
        element={
          <Navigate
            to={useStore.getState().auth.loggedIn ? "/dashboard" : "/auth"}
            replace
          />
        }
      />
    </Routes>
  );
}