import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Student, supabase } from '../lib/supabase';

interface AuthContextType {
  currentUser: Student | null;
  isAdmin: boolean;
  students: Student[];
  login: (name: string, password: string) => Promise<boolean>;
  adminLogin: (password: string) => boolean;
  logout: () => void;
  updateMeritPoints: (studentId: number, points: number) => Promise<void>;
  refreshStudents: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_PASSWORD = 'admin123';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Student | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);

  const fetchStudents = async () => {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('name');

    if (!error && data) {
      setStudents(data);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const login = async (name: string, password: string): Promise<boolean> => {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .ilike('name', name)
      .maybeSingle();

    if (error || !data) {
      return false;
    }

    if (data.password === password) {
      setCurrentUser(data);
      setIsAdmin(false);
      return true;
    }

    return false;
  };

  const adminLogin = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setCurrentUser({
        id: 0,
        name: 'Administrator',
        password: '',
        merit_points: 0,
        created_at: '',
        updated_at: ''
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
  };

  const updateMeritPoints = async (studentId: number, points: number) => {
    const { error } = await supabase
      .from('students')
      .update({ merit_points: points })
      .eq('id', studentId);

    if (!error) {
      await fetchStudents();
      if (currentUser && currentUser.id === studentId) {
        setCurrentUser({ ...currentUser, merit_points: points });
      }
    }
  };

  const refreshStudents = async () => {
    await fetchStudents();
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin,
        students,
        login,
        adminLogin,
        logout,
        updateMeritPoints,
        refreshStudents,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
