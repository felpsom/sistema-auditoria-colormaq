
import React, { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

type AuthMode = 'login' | 'register' | 'forgot-password';

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');

  const handleModeChange = (newMode: AuthMode) => setMode(newMode);

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {mode === 'login' && (
          <LoginForm 
            onToggleMode={() => handleModeChange('register')}
            onForgotPassword={() => handleModeChange('forgot-password')}
          />
        )}
        {mode === 'register' && (
          <RegisterForm onToggleMode={() => handleModeChange('login')} />
        )}
        {mode === 'forgot-password' && (
          <ForgotPasswordForm onBack={() => handleModeChange('login')} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
