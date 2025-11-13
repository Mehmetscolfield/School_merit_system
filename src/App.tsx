import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';

function AppContent() {
  const { currentUser, isAdmin } = useAuth();

  if (!currentUser) {
    return <LoginPage />;
  }

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return <StudentDashboard />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
