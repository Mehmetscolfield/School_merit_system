import { LogOut, Trophy, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getMeritTier, getNextTier } from '../utils/meritTiers';

export default function StudentDashboard() {
  const { currentUser, students, logout } = useAuth();

  if (!currentUser) return null;

  const tier = getMeritTier(currentUser.merit_points);
  const nextTier = getNextTier(currentUser.merit_points);
  const progress = (currentUser.merit_points / 220) * 100;

  const sortedStudents = [...students].sort((a, b) => b.merit_points - a.merit_points);
  const currentRank = sortedStudents.findIndex(s => s.id === currentUser.id) + 1;

  const studentsWithLowerScore = students.filter(s => s.merit_points < currentUser.merit_points).length;
  const percentile = Math.round((studentsWithLowerScore / students.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
            </svg>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600/50 backdrop-blur text-white rounded-xl hover:bg-blue-600/70 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <div className="bg-blue-700/30 backdrop-blur-lg rounded-3xl p-8 mb-6 border border-blue-500/30">
          <p className="text-blue-200 text-lg mb-2">Welcome back,</p>
          <h2 className="text-4xl font-bold text-white mb-8">{currentUser.name}</h2>

          <div className="bg-blue-600/40 rounded-2xl p-8 text-center mb-6">
            <p className="text-blue-100 text-lg mb-4">Your Current Merit Score</p>
            <div className="text-8xl font-bold text-white mb-4">{currentUser.merit_points}</div>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/50 rounded-full">
              <span className="text-3xl">{tier.icon}</span>
              <span className="text-xl font-bold text-white">{tier.name}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-800/40 rounded-2xl p-6 text-center">
              <div className="flex justify-center mb-2">
                <Trophy className="text-yellow-400" size={32} />
              </div>
              <p className="text-blue-200 text-sm mb-1">Your Rank</p>
              <p className="text-4xl font-bold text-white">#{currentRank}</p>
              <p className="text-blue-300 text-xs mt-1">out of {students.length} students</p>
            </div>

            <div className="bg-blue-800/40 rounded-2xl p-6 text-center">
              <div className="flex justify-center mb-2">
                <TrendingUp className="text-green-400" size={32} />
              </div>
              <p className="text-blue-200 text-sm mb-1">Percentile</p>
              <p className="text-4xl font-bold text-white">{percentile}%</p>
              <p className="text-blue-300 text-xs mt-1">
                {percentile >= 75 ? 'Top performer!' : percentile >= 50 ? 'Above average' : 'Keep growing!'}
              </p>
            </div>
          </div>

          <div className="bg-blue-800/40 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Merit Progress</h3>
            <div className="w-full bg-blue-900/50 rounded-full h-4 mb-3">
              <div
                className="bg-gradient-to-r from-blue-400 to-cyan-400 h-4 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-blue-200 text-sm">
              <span>0 points</span>
              <span>220 points (max)</span>
            </div>
            {nextTier && (
              <p className="text-center text-blue-100 mt-4">
                {nextTier.threshold - currentUser.merit_points} points to reach {nextTier.name} level
              </p>
            )}
          </div>

          <div className="bg-blue-800/40 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Merit Levels</h3>
            <div className="space-y-3">
              {[
                { name: 'Elite', icon: '👑', range: '220' },
                { name: 'Outstanding', icon: '⭐', range: '180-219' },
                { name: 'Excellent', icon: '🏆', range: '140-179' },
                { name: 'Great', icon: '🎖️', range: '100-139' },
                { name: 'Developing', icon: '📈', range: '50-99' },
                { name: 'Beginner', icon: '🌱', range: '0-49' }
              ].map((level) => (
                <div
                  key={level.name}
                  className={`flex items-center justify-between rounded-xl p-4 transition ${
                    tier.name === level.name
                      ? 'bg-blue-600/50 border-2 border-blue-400'
                      : 'bg-blue-700/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{level.icon}</span>
                    <span className="text-white font-semibold">{level.name}</span>
                  </div>
                  <span className="text-blue-200">{level.range}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-white/60 text-sm">Galaxy International School — Merit System</p>
      </div>
    </div>
  );
}
