# Toast Migration - Remaining Components

The following components still need to be updated to use the new toast system. Here's how to migrate each one:

## Components to Update

### 1. `src/Components/Ads/Ads.tsx`
**Current:** `import { toast } from 'react-toastify';`
**Replace with:** `import { useToastMessages, handleApiError } from '../../utils/toastUtils';`

**Usage changes:**
- Replace `toast.success()` with `toastMessages.showAdCreateSuccess()`
- Replace `toast.error()` with `toastMessages.showAdCreateError()`
- Use `handleApiError(error, toastMessages)` for error handling

### 2. `src/Components/Bookings/Bookings.tsx`
**Current:** `import { toast } from 'react-toastify';`
**Replace with:** `import { useToastMessages, handleApiError } from '../../utils/toastUtils';`

**Usage changes:**
- Replace `toast.success()` with `toastMessages.showBookingCreateSuccess()`
- Replace `toast.error()` with `toastMessages.showBookingCreateError()`
- Use `handleApiError(error, toastMessages)` for error handling

### 3. `src/Components/Reviews/Reviews.tsx`
**Current:** `import { toast } from 'react-toastify';`
**Replace with:** `import { useToastMessages, handleApiError } from '../../utils/toastUtils';`

**Usage changes:**
- Replace `toast.success()` with `toastMessages.showReviewCreateSuccess()`
- Replace `toast.error()` with `toastMessages.showReviewCreateError()`
- Use `handleApiError(error, toastMessages)` for error handling

### 4. `src/Components/Authentication/ChangePassword/ChangePassword.tsx`
**Current:** `import { toast } from 'react-toastify';`
**Replace with:** `import { useToastMessages, handleApiError } from '../../../utils/toastUtils';`

**Usage changes:**
- Replace `toast.success()` with `toastMessages.showPasswordChangeSuccess()`
- Replace `toast.error()` with `toastMessages.showPasswordChangeError()`
- Use `handleApiError(error, toastMessages)` for error handling

### 5. `src/Components/Reviews/AddReview.tsx`
**Current:** `import { toast } from 'react-toastify';`
**Replace with:** `import { useToastMessages, handleApiError } from '../../utils/toastUtils';`

**Usage changes:**
- Replace `toast.success()` with `toastMessages.showReviewCreateSuccess()`
- Replace `toast.error()` with `toastMessages.showReviewCreateError()`
- Use `handleApiError(error, toastMessages)` for error handling

### 6. `src/Components/LandingPage/sections/RateSection.tsx`
**Current:** `import { toast } from 'react-toastify';`
**Replace with:** `import { useToastMessages, handleApiError } from '../../../utils/toastUtils';`

**Usage changes:**
- Replace `toast.success()` with `toastMessages.showReviewCreateSuccess()`
- Replace `toast.error()` with `toastMessages.showReviewCreateError()`
- Use `handleApiError(error, toastMessages)` for error handling

### 7. `src/Components/Pay/Pay.tsx`
**Current:** `import { toast } from 'react-toastify';`
**Replace with:** `import { useToastMessages, handleApiError } from '../../utils/toastUtils';`

**Usage changes:**
- Replace `toast.success()` with `toastMessages.showPaymentSuccess()`
- Replace `toast.error()` with `toastMessages.showPaymentError()`
- Use `handleApiError(error, toastMessages)` for error handling

### 8. `src/Components/Facilities/Facilities.tsx`
**Current:** `import { toast } from 'react-toastify';`
**Replace with:** `import { useToastMessages, handleApiError } from '../../utils/toastUtils';`

**Usage changes:**
- Replace `toast.success()` with `toastMessages.showFacilityCreateSuccess()`
- Replace `toast.error()` with `toastMessages.showFacilityCreateError()`
- Use `handleApiError(error, toastMessages)` for error handling

### 9. `src/Components/Rooms/Rooms.tsx`
**Current:** `import { toast } from 'react-toastify';`
**Replace with:** `import { useToastMessages, handleApiError } from '../../utils/toastUtils';`

**Usage changes:**
- Replace `toast.success()` with `toastMessages.showRoomCreateSuccess()`
- Replace `toast.error()` with `toastMessages.showRoomCreateError()`
- Use `handleApiError(error, toastMessages)` for error handling

### 10. `src/Components/RoomDetails/RoomDetails.tsx`
**Current:** `import { toast } from "react-toastify";`
**Replace with:** `import { useToastMessages, handleApiError } from "../../utils/toastUtils";`

**Usage changes:**
- Replace `toast.success()` with `toastMessages.showFavoriteAddSuccess()`
- Replace `toast.error()` with `toastMessages.showFavoriteAddError()`
- Use `handleApiError(error, toastMessages)` for error handling

### 11. `src/Components/AvilableRooms/AvilableRooms.tsx`
**Current:** `import { toast } from "react-toastify";`
**Replace with:** `import { useToastMessages, handleApiError } from "../../utils/toastUtils";`

**Usage changes:**
- Replace `toast.success()` with `toastMessages.showBookingCreateSuccess()`
- Replace `toast.error()` with `toastMessages.showBookingCreateError()`
- Use `handleApiError(error, toastMessages)` for error handling

## Migration Pattern

For each component, follow this pattern:

1. **Add the import:**
```tsx
import { useToastMessages, handleApiError } from '../path/to/utils/toastUtils';
```

2. **Add the hook:**
```tsx
const toastMessages = useToastMessages();
```

3. **Replace toast calls:**
```tsx
// Old
toast.success('Success message');
toast.error('Error message');

// New
toastMessages.showSuccess('Success message');
toastMessages.showError('Error message');
// Or use specific methods like:
toastMessages.showRoomCreateSuccess();
toastMessages.showBookingCreateError();
```

4. **Update error handling:**
```tsx
// Old
} catch (error) {
  toast.error(error.message);
}

// New
} catch (error) {
  handleApiError(error, toastMessages);
}
```

## Quick Migration Script

You can use this search and replace pattern in your editor:

**Search:** `import { toast } from 'react-toastify';`
**Replace:** `import { useToastMessages, handleApiError } from '../utils/toastUtils';`

**Search:** `toast.success(`
**Replace:** `toastMessages.showSuccess(`

**Search:** `toast.error(`
**Replace:** `toastMessages.showError(`

**Search:** `toast.warning(`
**Replace:** `toastMessages.showWarning(`

**Search:** `toast.info(`
**Replace:** `toastMessages.showInfo(`

## Benefits of Migration

1. **Consistent messaging** across your application
2. **Better error handling** with automatic status code detection
3. **Type safety** with TypeScript
4. **Centralized management** of toast messages
5. **Easier maintenance** and updates

## Testing

After migration, test each component to ensure:
- Success messages appear correctly
- Error messages are appropriate
- Network errors are handled properly
- Authentication errors are handled correctly

The new toast system will provide a much better user experience with consistent, professional-looking notifications throughout your application.
