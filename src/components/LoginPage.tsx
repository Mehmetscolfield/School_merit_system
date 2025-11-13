import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, adminLogin, students } = useAuth();
  const [loginForm, setLoginForm] = useState({ name: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAllPasswords, setShowAllPasswords] = useState(false);

  const filteredSuggestions = students
    .filter(s => s.name.toLowerCase().includes(loginForm.name.toLowerCase()) && loginForm.name.length > 0)
    .slice(0, 4);

  const handleStudentLogin = async () => {
    setError('');
    const success = await login(loginForm.name, loginForm.password);
    if (!success) {
      setError('Invalid name or password. Please try again.');
    }
  };

  const handleAdminLoginSubmit = () => {
    setError('');
    const success = adminLogin(adminPassword);
    if (!success) {
      setError('Invalid admin password');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  if (isAdminView) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto bg-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Galaxy International School</h1>
            <p className="text-blue-200">Merit System</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <h2 className="text-2xl font-bold text-white text-center mb-6">Admin Login</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2">Admin Password</label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleAdminLoginSubmit)}
                  className="w-full px-4 py-3 bg-white/90 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none text-gray-800"
                  placeholder="Enter admin password"
                />
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              <button
                onClick={handleAdminLoginSubmit}
                className="w-full bg-white text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-50 transition"
              >
                Login as Admin
              </button>

              <button
                onClick={() => {
                  setIsAdminView(false);
                  setError('');
                  setAdminPassword('');
                }}
                className="w-full text-blue-200 underline text-sm hover:text-white"
              >
                Back to Student Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto bg-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Galaxy International School</h1>
          <p className="text-blue-200">Merit System</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Student Login</h2>

          <div className="space-y-4">
            <div className="relative">
              <label className="block text-white font-semibold mb-2">Your Name</label>
              <input
                type="text"
                value={loginForm.name}
                onChange={(e) => {
                  setLoginForm({ ...loginForm, name: e.target.value });
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyPress={(e) => handleKeyPress(e, handleStudentLogin)}
                className="w-full px-4 py-3 bg-white/90 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none text-gray-800"
                placeholder="Enter your name"
              />
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-xl overflow-hidden">
                  {filteredSuggestions.map(student => (
                    <button
                      key={student.id}
                      onClick={() => {
                        setLoginForm({ ...loginForm, name: student.name });
                        setShowSuggestions(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-blue-50 text-gray-800"
                    >
                      {student.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  onKeyPress={(e) => handleKeyPress(e, handleStudentLogin)}
                  className="w-full px-4 py-3 bg-white/90 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none pr-12 text-gray-800"
                  placeholder="Enter your password"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              onClick={handleStudentLogin}
              className="w-full bg-white text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-50 transition"
            >
              Login
            </button>

            <button
              onClick={() => {
                setIsAdminView(true);
                setError('');
                setLoginForm({ name: '', password: '' });
              }}
              className="w-full text-blue-200 underline text-sm hover:text-white mt-2"
            >
              Admin Login
            </button>

            <button
              onClick={() => setShowAllPasswords(!showAllPasswords)}
              className="w-full text-blue-200 text-xs hover:text-white mt-2"
            >
              {showAllPasswords ? 'Hide' : 'Show'} All Student Passwords
            </button>

            {showAllPasswords && (
              <div className="bg-blue-900/50 rounded-xl p-4 max-h-64 overflow-y-auto">
                <h3 className="text-white font-bold mb-3 text-sm">Student Login Credentials:</h3>
                <div className="space-y-2 text-xs">
                  {students.map(s => (
                    <div key={s.id} className="bg-blue-800/50 rounded p-2">
                      <div className="text-white font-semibold">{s.name}</div>
                      <div className="text-blue-200 font-mono">Password: {s.password}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-blue-700">
                  <div className="text-white font-semibold">Admin Login:</div>
                  <div className="text-blue-200">Username: admin</div>
                  <div className="text-blue-200 font-mono">Password: admin123</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-white/60 text-sm mt-6">Galaxy International School — Merit System</p>
      </div>
    </div>
  );
}
