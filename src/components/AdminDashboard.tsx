import { useState } from 'react';
import { LogOut, Search, Trophy, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export default function AdminDashboard() {
  const { students, logout, updateMeritPoints, refreshStudents } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'points'>('name');
  const [editingStudent, setEditingStudent] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const filteredStudents = students
    .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return b.merit_points - a.merit_points;
    });

  const avgPoints = Math.round(students.reduce((sum, s) => sum + s.merit_points, 0) / students.length);
  const topStudent = students.reduce((max, s) => s.merit_points > max.merit_points ? s : max, students[0]);

  const handleEditPoints = (studentId: number, currentPoints: number) => {
    setEditingStudent(studentId);
    setEditValue(currentPoints.toString());
  };

  const handleSavePoints = async (studentId: number) => {
    const newPoints = parseInt(editValue);
    if (!isNaN(newPoints) && newPoints >= 0 && newPoints <= 220) {
      await updateMeritPoints(studentId, newPoints);
      setEditingStudent(null);
    }
  };

  const handleResetPassword = async (studentId: number) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = Math.floor(Math.random() * 3) + 8;
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const { error } = await supabase
      .from('students')
      .update({ password: newPassword })
      .eq('id', studentId);

    if (!error) {
      await refreshStudents();
      alert(`New password: ${newPassword}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-blue-700/30 backdrop-blur-lg rounded-3xl p-6 mb-6 border border-blue-500/30">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-5 py-2 bg-blue-600/50 backdrop-blur text-white rounded-xl hover:bg-blue-600/70 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          <p className="text-blue-200 mb-6">Galaxy International School</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-600/40 rounded-2xl p-6">
              <p className="text-blue-200 mb-2">Total Students</p>
              <p className="text-5xl font-bold text-white">{students.length}</p>
            </div>
            <div className="bg-blue-600/40 rounded-2xl p-6">
              <p className="text-blue-200 mb-2">Average Points</p>
              <p className="text-5xl font-bold text-white">{avgPoints}</p>
            </div>
          </div>

          <div className="bg-blue-800/40 rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-3">
              <Trophy className="text-yellow-400" size={32} />
              <div className="flex-1">
                <p className="text-blue-200 text-sm">Top Performer</p>
                <p className="text-xl font-bold text-white">{topStudent?.name}</p>
              </div>
              <p className="text-4xl font-bold text-yellow-400">{topStudent?.merit_points}</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-blue-600/30 text-white placeholder-blue-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Search students..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSortBy('name')}
                className={`flex-1 py-3 rounded-xl font-semibold transition ${
                  sortBy === 'name'
                    ? 'bg-white text-blue-700'
                    : 'bg-blue-600/30 text-white hover:bg-blue-600/50'
                }`}
              >
                Sort by Name
              </button>
              <button
                onClick={() => setSortBy('points')}
                className={`flex-1 py-3 rounded-xl font-semibold transition ${
                  sortBy === 'points'
                    ? 'bg-white text-blue-700'
                    : 'bg-blue-600/30 text-white hover:bg-blue-600/50'
                }`}
              >
                Sort by Points
              </button>
            </div>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredStudents.map((student) => (
              <div key={student.id} className="bg-blue-600/30 rounded-2xl p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">{student.name}</h3>
                    <p className="text-blue-200 text-sm">ID: {student.id}</p>
                  </div>
                  <div className="text-right">
                    {editingStudent === student.id ? (
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={() => handleSavePoints(student.id)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') handleSavePoints(student.id);
                        }}
                        className="w-20 px-2 py-1 bg-white rounded-lg text-blue-700 font-bold text-2xl outline-none"
                        autoFocus
                        min="0"
                        max="220"
                      />
                    ) : (
                      <p className="text-4xl font-bold text-white">{student.merit_points}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditPoints(student.id, student.merit_points)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
                  >
                    <Award size={16} />
                    Edit Points
                  </button>
                  <button
                    onClick={() => handleResetPassword(student.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-white/60 text-sm">Galaxy International School — Merit System</p>
      </div>
    </div>
  );
}
