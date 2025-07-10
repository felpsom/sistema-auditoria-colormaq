
// Improved password hashing for demo (in production, use proper hashing)
export const hashPassword = (password: string): string => {
  // Simple but more secure hash for demo purposes
  const salt = 'audit_system_salt_2024';
  return btoa(password + salt);
};

export const verifyPassword = (password: string, hashedPassword: string): boolean => {
  const hashedInput = hashPassword(password);
  console.log('Comparing passwords:', { hashedInput, hashedPassword, match: hashedInput === hashedPassword });
  return hashedInput === hashedPassword;
};
