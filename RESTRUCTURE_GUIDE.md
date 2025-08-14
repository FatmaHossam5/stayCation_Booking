# StayCation Booking - Project Restructure Guide

## Overview

This document outlines the comprehensive restructuring of the StayCation Booking application to improve organization, scalability, and maintainability.

## New Project Structure

```
src/
├── components/           # React components organized by feature
│   ├── auth/            # Authentication components
│   ├── booking/         # Booking-related components
│   ├── room/            # Room management components
│   ├── admin/           # Admin-specific components
│   ├── user/            # User-specific components
│   └── shared/          # Reusable shared components
├── hooks/               # Custom React hooks
├── services/            # API service layer
├── lib/                 # Core libraries and configurations
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
├── constants/           # Application constants
├── Context/             # React Context providers
└── assets/              # Static assets
```

## Key Improvements

### 1. **Centralized Type Definitions** (`src/types/index.ts`)
- All TypeScript interfaces and types in one place
- Strongly typed API responses and form data
- Consistent type usage across the application

### 2. **Constants Management** (`src/constants/index.ts`)
- API endpoints, routes, validation rules, and messages
- Environment-specific configurations
- Centralized error and success messages

### 3. **Enhanced API Layer** (`src/lib/api.ts`)
- Centralized axios instance with interceptors
- Automatic token management
- Consistent error handling
- Type-safe API client methods

### 4. **Service Layer** (`src/services/`)
- Feature-specific API services
- Business logic separation
- Reusable service methods

### 5. **Custom Hooks** (`src/hooks/`)
- `useAuth` - Authentication operations
- `useToast` - Toast notifications
- Reusable business logic

### 6. **Utility Functions** (`src/utils/`)
- `validation.ts` - Form validation functions
- `helpers.ts` - Common helper functions
- Date formatting, currency formatting, etc.

### 7. **Shared Components** (`src/components/shared/`)
- `ErrorBoundary` - React error handling
- `LoadingSpinner` - Loading states
- `EmptyState` - Empty data states
- Reusable UI components

## Migration Guide

### 1. Update Imports

**Before:**
```typescript
import { AuthContext } from '../../../Context/AuthContext';
import axios from 'axios';
```

**After:**
```typescript
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';
```

### 2. Use New API Client

**Before:**
```typescript
const response = await axios.post(`${baseUrl}/admin/users/login`, credentials, {
  headers: reqHeaders
});
```

**After:**
```typescript
const response = await authService.login(credentials);
```

### 3. Use Custom Hooks

**Before:**
```typescript
const { userData, saveUserData, baseUrl, reqHeaders } = useContext(AuthContext);
```

**After:**
```typescript
const { user, login, logout, isAuthenticated } = useAuth();
```

### 4. Use Validation Utilities

**Before:**
```typescript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  setError('Invalid email');
}
```

**After:**
```typescript
import { validateEmail } from '../../utils/validation';

const emailValidation = validateEmail(email);
if (emailValidation !== true) {
  setError(emailValidation);
}
```

### 5. Use Helper Functions

**Before:**
```typescript
const formattedDate = new Date(date).toLocaleDateString();
const formattedPrice = `$${price.toFixed(2)}`;
```

**After:**
```typescript
import { formatDate, formatCurrency } from '../../utils/helpers';

const formattedDate = formatDate(date);
const formattedPrice = formatCurrency(price);
```

## Best Practices

### 1. **Component Organization**
- Group components by feature, not by type
- Keep components small and focused
- Use composition over inheritance

### 2. **State Management**
- Use React hooks for local state
- Use Context for global state
- Keep state as close to where it's used as possible

### 3. **API Calls**
- Always use the service layer
- Handle errors consistently
- Use TypeScript for type safety

### 4. **Error Handling**
- Use ErrorBoundary for React errors
- Handle API errors in services
- Provide user-friendly error messages

### 5. **Performance**
- Use React.memo for expensive components
- Implement proper loading states
- Optimize bundle size with code splitting

## File Naming Conventions

- **Components**: PascalCase (e.g., `ResetPassword.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`)
- **Services**: camelCase (e.g., `authService.ts`)
- **Utilities**: camelCase (e.g., `validation.ts`)
- **Types**: PascalCase (e.g., `User.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS`)

## Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://upskilling-egypt.com:3000/api/v0
VITE_API_TIMEOUT=10000
```

## Testing Strategy

### 1. **Unit Tests**
- Test utility functions
- Test custom hooks
- Test service methods

### 2. **Component Tests**
- Test component rendering
- Test user interactions
- Test error states

### 3. **Integration Tests**
- Test API integration
- Test authentication flow
- Test booking flow

## Deployment Considerations

### 1. **Environment Variables**
- Use Vite environment variables
- Never commit sensitive data
- Validate environment configuration

### 2. **Build Optimization**
- Enable code splitting
- Optimize bundle size
- Use proper caching strategies

### 3. **Error Monitoring**
- Implement error tracking
- Monitor API performance
- Track user analytics

## Common Patterns

### 1. **Form Handling**
```typescript
import { useForm } from 'react-hook-form';
import { validateEmail, validatePassword } from '../../utils/validation';

const { control, handleSubmit, formState: { errors } } = useForm({
  mode: "onBlur",
  resolver: yupResolver(validationSchema)
});
```

### 2. **API Calls with Loading States**
```typescript
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState('');

const handleSubmit = async (data) => {
  setIsLoading(true);
  setError('');
  
  try {
    await authService.login(data);
    // Handle success
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};
```

### 3. **Toast Notifications**
```typescript
import { useToast } from '../../hooks/useToast';

const { showSuccessToast, showErrorToast } = useToast();

// Usage
showSuccessToast('Operation completed successfully');
showErrorToast('Something went wrong');
```

## Troubleshooting

### Common Issues

1. **Import Paths**: Ensure all import paths are updated to reflect the new structure
2. **Type Errors**: Check that all types are properly imported from `src/types`
3. **API Errors**: Verify that the API client is properly configured
4. **Context Errors**: Ensure Context providers are wrapping the application

### Debugging Tips

1. Use React DevTools for component debugging
2. Use Network tab for API debugging
3. Check console for TypeScript errors
4. Verify environment variables are loaded

## Future Enhancements

1. **State Management**: Consider implementing Zustand for complex state
2. **Testing**: Add comprehensive test coverage
3. **Performance**: Implement React.lazy for code splitting
4. **Accessibility**: Add ARIA labels and keyboard navigation
5. **Internationalization**: Add i18n support for multiple languages

## Conclusion

This restructuring provides a solid foundation for scaling the application. The new structure promotes:

- **Maintainability**: Clear separation of concerns
- **Scalability**: Modular architecture
- **Type Safety**: Comprehensive TypeScript usage
- **Reusability**: Shared components and utilities
- **Testability**: Isolated business logic

Follow these patterns and guidelines to maintain consistency as the application grows.
