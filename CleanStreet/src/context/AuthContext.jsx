import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const DEMO_PROFILES = {
  citizen: {
    id: 'user-citizen',
    name: 'Asad Qazi',
    email: 'asad.qazi@hyderabad.pk',
    role: 'citizen',
    roleTitle: 'Resident / Reporter',
    avatar: 'AQ',
    badge: 'Level 3 Eco-Guardian',
    neighborhood: 'Qasimabad, Hyderabad',
    ecoPoints: 250
  },
  worker: {
    id: 'user-worker',
    name: 'Tariq Memon',
    email: 'tariq.sswmb@hyderabad.gov.pk',
    role: 'worker',
    roleTitle: 'Field Sanitation Squad Lead',
    avatar: 'TM',
    crewName: 'SSWMB Rapid Response Squad Alpha',
    assignedZone: 'Central & GOR Hyderabad'
  },
  admin: {
    id: 'user-admin',
    name: 'Dr. Rehan Khan',
    email: 'director@cleanstreet.gov.pk',
    role: 'admin',
    roleTitle: 'Municipal Operations Director',
    avatar: 'RK',
    department: 'Sindh Solid Waste Management Board'
  }
};

const AUTH_STORAGE_KEY = 'cleanstreet-auth-user-v3';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    // Default to citizen
    return DEMO_PROFILES.citizen;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {}
  }, [user]);

  const loginAsRole = (roleKey) => {
    const profile = DEMO_PROFILES[roleKey] || DEMO_PROFILES.citizen;
    setUser(profile);
    setIsAuthModalOpen(false);
  };

  const loginWithCredentials = (email, password, role = 'citizen') => {
    const baseProfile = DEMO_PROFILES[role] || DEMO_PROFILES.citizen;
    const customUser = {
      ...baseProfile,
      name: email.split('@')[0].replace(/[._]/g, ' ').toUpperCase(),
      email
    };
    setUser(customUser);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthModalOpen,
        setIsAuthModalOpen,
        loginAsRole,
        loginWithCredentials,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
