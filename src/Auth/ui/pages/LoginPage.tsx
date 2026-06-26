import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import { SessionService } from '../../data/services/SessionService';
import type { LoginCredentials } from '../../core/types/Auth.types';
import type { Status } from '../../../Common/core/types/Status.types';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (credentials: LoginCredentials) => {
    // 1. Set loading state before the async operation begins
    setStatus('loading');
    setErrorMessage(null);

    try {
      // 2. Await the service
      await SessionService.login(credentials);
      
      // 3. On success, update state and redirect to the home page
      setStatus('success');
      navigate('/');
    } catch (error) {
      // 4. Always catch errors and update state accordingly
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <LoginForm onSubmit={handleLogin} status={status} errorMessage={errorMessage} />
    </div>
  );
};