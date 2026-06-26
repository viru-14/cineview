import type { LoginCredentials, UserSession } from '../../core/types/Auth.types';

const SESSION_KEY = 'cineview_session';

// Hardcoded credentials as requested by the project specification
const MOCK_CREDENTIALS = {
  username: 'admin',
  password: 'password123',
};

export const SessionService = {
  /**
   * Simulates an API call to verify user credentials.
   * Rejects if credentials do not match the hardcoded values.
   */
  login(credentials: LoginCredentials): Promise<UserSession> {
    return new Promise((resolve, reject) => {
      // Simulate network latency (500ms)
      setTimeout(() => {
        if (
          credentials.username === MOCK_CREDENTIALS.username &&
          credentials.password === MOCK_CREDENTIALS.password
        ) {
          const mockSession: UserSession = {
            username: credentials.username,
            token: 'mock-jwt-token-xyz123',
            authenticatedAt: new Date().toISOString(),
          };
          this.saveSession(mockSession);
          resolve(mockSession);
        } else {
          reject(new Error('Invalid username or password.'));
        }
      }, 500);
    });
  },

  /**
   * Persists the authenticated session token to sessionStorage.
   */
  saveSession(session: UserSession): void {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch (error) {
      console.error('Error saving session to sessionStorage', error);
    }
  },

  /**
   * Retrieves the current session object from sessionStorage.
   */
  getSession(): UserSession | null {
    try {
      const sessionData = sessionStorage.getItem(SESSION_KEY);
      return sessionData ? JSON.parse(sessionData) : null;
    } catch (error) {
      console.error('Error reading session from sessionStorage', error);
      return null;
    }
  },

  /**
   * Checks if a valid session exists.
   */
  isAuthenticated(): boolean {
    return this.getSession() !== null;
  },

  /**
   * Clears the session data to log the user out.
   */
  clearSession(): void {
    sessionStorage.removeItem(SESSION_KEY);
  }
};