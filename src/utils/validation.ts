import { VALIDATION } from '../constants';

// Email validation
export const validateEmail = (email: string): string | true => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return 'Email is required';
  }
  
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  
  if (email.length > VALIDATION.EMAIL.MAX_LENGTH) {
    return `Email must be less than ${VALIDATION.EMAIL.MAX_LENGTH} characters`;
  }
  
  return true;
};

// Password validation
export const validatePassword = (password: string): string | true => {
  if (!password) {
    return 'Password is required';
  }
  
  if (password.length < VALIDATION.PASSWORD.MIN_LENGTH) {
    return `Password must be at least ${VALIDATION.PASSWORD.MIN_LENGTH} characters`;
  }
  
  if (password.length > VALIDATION.PASSWORD.MAX_LENGTH) {
    return `Password must be less than ${VALIDATION.PASSWORD.MAX_LENGTH} characters`;
  }
  
  // Check for at least one uppercase letter, one lowercase letter, and one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
  if (!passwordRegex.test(password)) {
    return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
  }
  
  return true;
};

// Username validation
export const validateUsername = (username: string): string | true => {
  if (!username) {
    return 'Username is required';
  }
  
  if (username.length < VALIDATION.USERNAME.MIN_LENGTH) {
    return `Username must be at least ${VALIDATION.USERNAME.MIN_LENGTH} characters`;
  }
  
  if (username.length > VALIDATION.USERNAME.MAX_LENGTH) {
    return `Username must be less than ${VALIDATION.USERNAME.MAX_LENGTH} characters`;
  }
  
  // Check for alphanumeric characters and underscores only
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    return 'Username can only contain letters, numbers, and underscores';
  }
  
  return true;
};

// Confirm password validation
export const validateConfirmPassword = (password: string, confirmPassword: string): string | true => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }
  
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  
  return true;
};

// Seed validation (for password reset)
export const validateSeed = (seed: string): string | true => {
  if (!seed) {
    return 'Security code is required';
  }
  
  if (seed.length < VALIDATION.SEED.MIN_LENGTH) {
    return `Security code must be at least ${VALIDATION.SEED.MIN_LENGTH} characters`;
  }
  
  if (seed.length > VALIDATION.SEED.MAX_LENGTH) {
    return `Security code must be less than ${VALIDATION.SEED.MAX_LENGTH} characters`;
  }
  
  return true;
};

// Required field validation
export const validateRequired = (value: string, fieldName: string): string | true => {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  
  return true;
};

// Number validation
export const validateNumber = (value: string, fieldName: string, min?: number, max?: number): string | true => {
  const numValue = parseFloat(value);
  
  if (isNaN(numValue)) {
    return `${fieldName} must be a valid number`;
  }
  
  if (min !== undefined && numValue < min) {
    return `${fieldName} must be at least ${min}`;
  }
  
  if (max !== undefined && numValue > max) {
    return `${fieldName} must be less than or equal to ${max}`;
  }
  
  return true;
};

// Date validation
export const validateDate = (date: string, fieldName: string): string | true => {
  if (!date) {
    return `${fieldName} is required`;
  }
  
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return `${fieldName} must be a valid date`;
  }
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (dateObj < today) {
    return `${fieldName} cannot be in the past`;
  }
  
  return true;
};

// Date range validation
export const validateDateRange = (startDate: string, endDate: string): string | true => {
  const startValidation = validateDate(startDate, 'Start date');
  if (startValidation !== true) {
    return startValidation;
  }
  
  const endValidation = validateDate(endDate, 'End date');
  if (endValidation !== true) {
    return endValidation;
  }
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (end <= start) {
    return 'End date must be after start date';
  }
  
  return true;
};

// File validation
export const validateFile = (file: File, maxSize?: number, allowedTypes?: string[]): string | true => {
  if (!file) {
    return 'File is required';
  }
  
  if (maxSize && file.size > maxSize) {
    const maxSizeMB = maxSize / (1024 * 1024);
    return `File size must be less than ${maxSizeMB}MB`;
  }
  
  if (allowedTypes && !allowedTypes.includes(file.type)) {
    return `File type must be one of: ${allowedTypes.join(', ')}`;
  }
  
  return true;
};

// Phone number validation
export const validatePhoneNumber = (phone: string): string | true => {
  if (!phone) {
    return 'Phone number is required';
  }
  
  // Basic phone number validation (adjust regex based on your requirements)
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    return 'Please enter a valid phone number';
  }
  
  return true;
};
