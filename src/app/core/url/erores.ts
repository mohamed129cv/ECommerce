export const FirebaseErrors: Record<string, string> = {

  // Register
  'auth/email-already-in-use': 'This email is already in use.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/weak-password': 'Password should be at least 6 characters.',

  // Login
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password.',
  'auth/invalid-credential': 'Invalid email or password.',
  'auth/user-disabled': 'This account has been disabled.',

  // Verification
  'auth/email-not-verified': 'Please verify your email address first.',

  // Session
  'auth/requires-recent-login': 'Please sign in again and try later.',
  'auth/user-token-expired': 'Your session has expired. Please sign in again.',

  // Network
  'auth/network-request-failed': 'Network error. Please check your connection.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
  'auth/timeout': 'Request timed out. Please try again.',

  // Account
  'auth/account-exists-with-different-credential':
    'An account already exists with a different sign-in method.',

  'auth/credential-already-in-use':
    'This credential is already associated with another account.',

  // Popup / Redirect
  'auth/popup-closed-by-user':
    'The sign-in popup was closed before completing the process.',

  'auth/popup-blocked':
    'The sign-in popup was blocked by the browser.',

  'auth/cancelled-popup-request':
    'The sign-in process was cancelled.',

  // Phone
  'auth/invalid-verification-code':
    'The verification code is invalid.',

  'auth/invalid-verification-id':
    'The verification ID is invalid.',

  // Firebase Config
  'auth/operation-not-allowed':
    'This authentication method is not enabled.',

  'auth/configuration-not-found':
    'Authentication configuration is missing.',

  'auth/invalid-api-key':
    'Invalid Firebase API key.',

  'auth/app-deleted':
    'Firebase app has been deleted.',

  'auth/project-not-found':
    'Firebase project not found.',

  // Generic
  'permission-denied':
    'You do not have permission to perform this action.',

  'unavailable':
    'Service is currently unavailable.',

  'not-found':
    'Requested resource was not found.',

  'already-exists':
    'This record already exists.',

  'failed-precondition':
    'Operation failed due to an unmet condition.',

  'resource-exhausted':
    'Resource limit exceeded.',

  'internal':
    'An internal server error occurred.',

  'unknown':
    'An unknown error occurred.'
};
