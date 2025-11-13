export interface MeritTier {
  name: string;
  icon: string;
  color: string;
  range: string;
}

export function getMeritTier(points: number): MeritTier {
  if (points >= 220) return { name: 'Elite', icon: '👑', color: '#FFD700', range: '220+' };
  if (points >= 180) return { name: 'Outstanding', icon: '⭐', color: '#FFA500', range: '180-219' };
  if (points >= 140) return { name: 'Excellent', icon: '🏆', color: '#32CD32', range: '140-179' };
  if (points >= 100) return { name: 'Great', icon: '🎖️', color: '#4169E1', range: '100-139' };
  if (points >= 50) return { name: 'Developing', icon: '📈', color: '#9370DB', range: '50-99' };
  return { name: 'Beginner', icon: '🌱', color: '#87CEEB', range: '0-49' };
}

export function getNextTier(points: number): { name: string; threshold: number } | null {
  if (points >= 220) return null;
  if (points >= 180) return { name: 'Elite', threshold: 220 };
  if (points >= 140) return { name: 'Outstanding', threshold: 180 };
  if (points >= 100) return { name: 'Excellent', threshold: 140 };
  if (points >= 50) return { name: 'Great', threshold: 100 };
  return { name: 'Developing', threshold: 50 };
}
