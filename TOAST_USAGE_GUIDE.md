# Toast Notification System Guide

This guide explains how to use the comprehensive toast notification system implemented throughout your StayCation Booking project.

## Overview

The toast notification system provides a consistent way to show user feedback across your entire application. It includes:

- **Predefined messages** for common operations
- **Error handling** for API calls
- **Consistent styling** and behavior
- **TypeScript support** for better development experience

## Quick Start

### 1. Basic Usage

```tsx
import { useToastMessages } from '../utils/toastUtils';

const MyComponent = () => {
  const toastMessages = useToastMessages();

  const handleSuccess = () => {
    toastMessages.showSuccess('Operation completed successfully!');
  };

  const handleError = () => {
    toastMessages.showError('Something went wrong!');
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>
    </div>
  );
};
```

### 2. API Error Handling

```tsx
import { useToastMessages, handleApiError } from '../utils/toastUtils';

const MyComponent = () => {
  const toastMessages = useToastMessages();

  const handleApiCall = async () => {
    try {
      const response = await api.createRoom(roomData);
      toastMessages.showRoomCreateSuccess();
    } catch (error) {
      handleApiError(error, toastMessages);
    }
  };
};
```

## Available Toast Methods

### Authentication Toasts

```tsx
// Login
toastMessages.showLoginSuccess();
toastMessages.showLoginError('Custom error message');

// Registration
toastMessages.showRegisterSuccess();
toastMessages.showRegisterError('Custom error message');

// Password Management
toastMessages.showPasswordChangeSuccess();
toastMessages.showPasswordChangeError();
toastMessages.showPasswordResetSent();
toastMessages.showPasswordResetError();

// Logout
toastMessages.showLogoutSuccess();
```

### Room Management Toasts

```tsx
// Room Operations
toastMessages.showRoomCreateSuccess();
toastMessages.showRoomCreateError('Custom error message');
toastMessages.showRoomUpdateSuccess();
toastMessages.showRoomUpdateError('Custom error message');
toastMessages.showRoomDeleteSuccess();
toastMessages.showRoomDeleteError();
toastMessages.showRoomFetchError();
toastMessages.showRoomNotFound();
```

### Booking Management Toasts

```tsx
// Booking Operations
toastMessages.showBookingCreateSuccess();
toastMessages.showBookingCreateError('Custom error message');
toastMessages.showBookingUpdateSuccess();
toastMessages.showBookingUpdateError('Custom error message');
toastMessages.showBookingCancelSuccess();
toastMessages.showBookingCancelError();
toastMessages.showBookingFetchError();

// Payment
toastMessages.showPaymentSuccess();
toastMessages.showPaymentError('Custom error message');

// Validation
toastMessages.showAlreadyBooked();
toastMessages.showInvalidDates();
```

### User Management Toasts

```tsx
// User Operations
toastMessages.showUserCreateSuccess();
toastMessages.showUserCreateError('Custom error message');
toastMessages.showUserUpdateSuccess();
toastMessages.showUserUpdateError('Custom error message');
toastMessages.showUserDeleteSuccess();
toastMessages.showUserDeleteError();
toastMessages.showUserFetchError();

// Profile
toastMessages.showProfileUpdateSuccess();
toastMessages.showProfileUpdateError();
```

### Advertisement Management Toasts

```tsx
// Ad Operations
toastMessages.showAdCreateSuccess();
toastMessages.showAdCreateError('Custom error message');
toastMessages.showAdUpdateSuccess();
toastMessages.showAdUpdateError('Custom error message');
toastMessages.showAdDeleteSuccess();
toastMessages.showAdDeleteError();
toastMessages.showAdFetchError();
```

### Facility Management Toasts

```tsx
// Facility Operations
toastMessages.showFacilityCreateSuccess();
toastMessages.showFacilityCreateError('Custom error message');
toastMessages.showFacilityUpdateSuccess();
toastMessages.showFacilityUpdateError('Custom error message');
toastMessages.showFacilityDeleteSuccess();
toastMessages.showFacilityDeleteError();
toastMessages.showFacilityFetchError();
```

### Favorites & Reviews Toasts

```tsx
// Favorites
toastMessages.showFavoriteAddSuccess();
toastMessages.showFavoriteAddError();
toastMessages.showFavoriteRemoveSuccess();
toastMessages.showFavoriteRemoveError();
toastMessages.showFavoriteFetchError();

// Reviews
toastMessages.showReviewCreateSuccess();
toastMessages.showReviewCreateError('Custom error message');
toastMessages.showReviewUpdateSuccess();
toastMessages.showReviewUpdateError('Custom error message');
toastMessages.showReviewDeleteSuccess();
toastMessages.showReviewDeleteError();
toastMessages.showReviewFetchError();
```

### General Error Handling Toasts

```tsx
// Network & Server Errors
toastMessages.showNetworkError();
toastMessages.showServerError();

// Authorization Errors
toastMessages.showUnauthorized();
toastMessages.showForbidden();

// General Errors
toastMessages.showValidationError();
toastMessages.showNotFound();
toastMessages.showSuccess('Custom success message');
toastMessages.showError('Custom error message');
toastMessages.showWarning('Custom warning message');
toastMessages.showInfo('Custom info message');
```

## Advanced Usage

### Custom Toast Options

You can pass custom options to any toast method:

```tsx
toastMessages.showSuccess('Custom message', {
  autoClose: 5000,
  position: 'top-center',
  hideProgressBar: true
});
```

### Direct Toast Methods

You also have access to the underlying toast methods:

```tsx
// Direct methods
toastMessages.showToast('Message', 'success', options);
toastMessages.dismissToast(toastId);
toastMessages.dismissAll();
```

### Error Handling Helper

The `handleApiError` function automatically handles different types of API errors:

```tsx
try {
  await apiCall();
  toastMessages.showSuccess('Success!');
} catch (error) {
  // This will automatically show appropriate error messages based on status codes
  handleApiError(error, toastMessages);
}
```

The function handles:
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 5xx: Server Error
- Network errors
- Custom error messages

## Implementation Examples

### Example 1: Room Creation Component

```tsx
import React, { useState } from 'react';
import { useToastMessages, handleApiError } from '../utils/toastUtils';
import { roomService } from '../services/roomService';

const AddRoomComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toastMessages = useToastMessages();

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    
    try {
      await roomService.createRoom(formData);
      toastMessages.showRoomCreateSuccess();
      // Navigate or refresh data
    } catch (error) {
      handleApiError(error, toastMessages);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

### Example 2: Booking Component

```tsx
import React from 'react';
import { useToastMessages, handleApiError } from '../utils/toastUtils';
import { bookingService } from '../services/bookingService';

const BookingComponent = () => {
  const toastMessages = useToastMessages();

  const handleBooking = async (bookingData) => {
    try {
      // Validate dates
      if (!isValidDateRange(bookingData.checkIn, bookingData.checkOut)) {
        toastMessages.showInvalidDates();
        return;
      }

      await bookingService.createBooking(bookingData);
      toastMessages.showBookingCreateSuccess();
      
      // Process payment
      await paymentService.processPayment(bookingData.payment);
      toastMessages.showPaymentSuccess();
      
    } catch (error) {
      if (error.code === 'ROOM_ALREADY_BOOKED') {
        toastMessages.showAlreadyBooked();
      } else {
        handleApiError(error, toastMessages);
      }
    }
  };

  return (
    <div>
      {/* Booking form */}
    </div>
  );
};
```

### Example 3: User Profile Component

```tsx
import React from 'react';
import { useToastMessages, handleApiError } from '../utils/toastUtils';
import { userService } from '../services/userService';

const ProfileComponent = () => {
  const toastMessages = useToastMessages();

  const handlePasswordChange = async (passwordData) => {
    try {
      await userService.changePassword(passwordData);
      toastMessages.showPasswordChangeSuccess();
    } catch (error) {
      handleApiError(error, toastMessages);
    }
  };

  const handleProfileUpdate = async (profileData) => {
    try {
      await userService.updateProfile(profileData);
      toastMessages.showProfileUpdateSuccess();
    } catch (error) {
      handleApiError(error, toastMessages);
    }
  };

  return (
    <div>
      {/* Profile forms */}
    </div>
  );
};
```

## Best Practices

### 1. Use Predefined Messages

Always use the predefined toast messages when possible for consistency:

```tsx
// ✅ Good
toastMessages.showRoomCreateSuccess();

// ❌ Avoid
toastMessages.showSuccess('Room created successfully!');
```

### 2. Handle API Errors Properly

Use the `handleApiError` helper for consistent error handling:

```tsx
// ✅ Good
try {
  await apiCall();
  toastMessages.showSuccess('Success!');
} catch (error) {
  handleApiError(error, toastMessages);
}

// ❌ Avoid
try {
  await apiCall();
  toastMessages.showSuccess('Success!');
} catch (error) {
  toastMessages.showError(error.message);
}
```

### 3. Show Loading States

Combine toast notifications with loading states:

```tsx
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async () => {
  setIsLoading(true);
  try {
    await apiCall();
    toastMessages.showSuccess('Success!');
  } catch (error) {
    handleApiError(error, toastMessages);
  } finally {
    setIsLoading(false);
  }
};
```

### 4. Use Appropriate Toast Types

- **Success**: For successful operations
- **Error**: For errors and failures
- **Warning**: For validation issues and warnings
- **Info**: For informational messages

### 5. Keep Messages Concise

Keep toast messages short and clear:

```tsx
// ✅ Good
toastMessages.showRoomCreateSuccess();

// ❌ Avoid
toastMessages.showSuccess('The room has been successfully created and added to the system. You can now view it in the rooms list.');
```

## Configuration

The toast system is configured in `src/Context/ToastContext.tsx` with the following default settings:

- **Position**: Top-right
- **Auto-close**: 3 seconds
- **Theme**: Colored
- **Progress bar**: Visible
- **Draggable**: Yes
- **Pause on hover**: Yes

You can customize these settings by modifying the `defaultToastOptions` object.

## Testing

To test the toast system, you can use the `ToastExample` component located at:
`src/Components/shared/common/ToastExample.tsx`

This component provides buttons to test all available toast methods.

## Migration Guide

If you're migrating from the old toast system:

1. Replace `import { toast } from 'react-toastify'` with `import { useToastMessages } from '../utils/toastUtils'`
2. Replace `toast.success()` with `toastMessages.showSuccess()`
3. Replace `toast.error()` with `toastMessages.showError()`
4. Use `handleApiError(error, toastMessages)` for API error handling

## Support

For questions or issues with the toast system, refer to:
- `src/utils/toastUtils.ts` - Main utility file
- `src/Context/ToastContext.tsx` - Context provider
- `src/hooks/useToast.ts` - Hook implementation
- `ToastExample.tsx` - Usage examples
