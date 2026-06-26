import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import  { loginSchema, type LoginCredentials } from '../../core/types/Auth.types';
import type { Status } from '../../../Common/core/types/Status.types';

interface LoginFormProps {
  onSubmit: (data: LoginCredentials) => void;
  status: Status;
  errorMessage?: string | null;
}

export const LoginForm = ({ onSubmit, status, errorMessage }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  // Wire up React Hook Form with our Zod schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  const isLoading = status === 'loading';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Login to CineView</h2>
      
      {/* Global Error Message from the API/Service */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-500 text-red-200 rounded text-sm">
          {errorMessage}
        </div>
      )}

      {/* Username Field */}
      <div className="mb-4">
        <label className="block text-gray-400 text-sm font-medium mb-2">Username</label>
        <input
          {...register('username')}
          disabled={isLoading}
          className={`w-full p-3 bg-gray-900 text-white rounded border focus:outline-none focus:ring-2 
            ${errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-blue-500'}`}
          placeholder="Enter your username"
        />
        {errors.username && <p className="mt-1 text-sm text-red-400">{errors.username.message}</p>}
      </div>

      {/* Password Field with Toggle */}
      <div className="mb-6">
        <label className="block text-gray-400 text-sm font-medium mb-2">Password</label>
        <div className="relative">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            disabled={isLoading}
            className={`w-full p-3 bg-gray-900 text-white rounded border focus:outline-none focus:ring-2 
              ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-blue-500'}`}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
            className="absolute right-3 top-3 text-sm text-gray-400 hover:text-white"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Authenticating...' : 'Sign In'}
      </button>
      
      
    </form>
  );
};