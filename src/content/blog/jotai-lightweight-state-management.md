# Jotai: When Redux is Overkill and Context is Too Much Work

Redux for a boolean? Context provider hell? There's a better way.

I needed to show a notification badge in the header when data changed deep in the app. My options: Redux (too much setup), Context (re-render issues), or prop drilling (no thanks).

Jotai solved it in 5 minutes. It's useState but global, without the ceremony.

```bash
npm install jotai
```

That's it. No store, no configuration.

## Basic Example

```typescript
// atoms/notifications.ts
import { atom } from 'jotai';

export const hasNewNotificationsAtom = atom(false);
```

In the header component:

```typescript
// components/Header.tsx
'use client';

import { useAtom } from 'jotai';
import { hasNewNotificationsAtom } from '@/atoms/notifications';

export const Header = () => {
  const [hasNewNotifications] = useAtom(hasNewNotificationsAtom);

  return (
    <div>
      <NotificationIcon />
      {hasNewNotifications && <Badge>New!</Badge>}
    </div>
  );
};
```

Deep in some other component:

```typescript
// components/SomeRandomComponent.tsx
'use client';

import { useSetAtom } from 'jotai';
import { hasNewNotificationsAtom } from '@/atoms/notifications';

export const DataFetcher = () => {
  const setHasNewNotifications = useSetAtom(hasNewNotificationsAtom);

  useEffect(() => {
    // When new data comes in
    setHasNewNotifications(true);
  }, [newData]);

  return <div>...</div>;
};
```

Done. No provider, no setup. Only the header re-renders when the atom changes.

## Derived State

```typescript
// atoms/notifications.ts
import { atom } from 'jotai';

export const notificationsAtom = atom([]);

// Derived atom - automatically updates when notifications change
export const notificationCountAtom = atom(
  (get) => get(notificationsAtom).length
);

export const hasNewNotificationsAtom = atom(
  (get) => get(notificationCountAtom) > 0
);
```

Now in your header:

```typescript
'use client';

import { useAtomValue } from 'jotai';
import { notificationCountAtom } from '@/atoms/notifications';

export const Header = () => {
  const count = useAtomValue(notificationCountAtom);

  return (
    <div>
      <NotificationIcon />
      {count > 0 && <Badge>{count}</Badge>}
    </div>
  );
};
```

Auto-updates when notifications change. No useEffect needed.

## Async Atoms

```typescript
// atoms/user.ts
import { atom } from 'jotai';

export const userIdAtom = atom(null);

export const userDataAtom = atom(async (get) => {
  const userId = get(userIdAtom);
  if (!userId) return null;

  const response = await fetch(`/api/users/${userId}`);
  return response.json();
});
```

Using it:

```typescript
'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import { Suspense } from 'react';
import { userIdAtom, userDataAtom } from '@/atoms/user';

function UserProfile() {
  const userData = useAtomValue(userDataAtom); // This suspends while loading
  
  return <div>{userData.name}</div>;
}

export const App = () => {
  const setUserId = useSetAtom(userIdAtom);

  return (
    <div>
      <button onClick={() => setUserId(123)}>Load User</button>
      
      <Suspense fallback={<div>Loading...</div>}>
        <UserProfile />
      </Suspense>
    </div>
  );
};
```

When `userId` changes, it refetches automatically. Suspense handles loading.

## Write-Only Atoms

```typescript
// atoms/actions.ts
import { atom } from 'jotai';
import { userDataAtom } from './user';

export const refreshUserAtom = atom(
  null, // no read value
  async (get, set) => {
    const response = await fetch('/api/users/current');
    const data = await response.json();
    set(userDataAtom, data); // Update another atom
  }
);
```

Using it:

```typescript
'use client';

import { useSetAtom } from 'jotai';
import { refreshUserAtom } from '@/atoms/actions';

export const RefreshButton = () => {
  const refreshUser = useSetAtom(refreshUserAtom);

  return (
    <button onClick={() => refreshUser()}>
      Refresh User Data
    </button>
  );
};
```

Redux actions without Redux.

## Organization

```
atoms/
  ├── user.ts          // User-related state
  ├── notifications.ts // Notification state
  ├── filters.ts       // Filter state for lists
  └── ui.ts           // UI state (modals, sidebars, etc.)
```

Each file exports multiple related atoms:

```typescript
// atoms/filters.ts
import { atom } from 'jotai';

export const searchQueryAtom = atom('');
export const selectedCategoryAtom = atom('all');
export const sortOrderAtom = atom('desc');

// Derived atom that combines all filters
export const filtersAtom = atom((get) => ({
  search: get(searchQueryAtom),
  category: get(selectedCategoryAtom),
  sort: get(sortOrderAtom),
}));
```

## Persistence

```typescript
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Automatically syncs with localStorage
export const themeAtom = atomWithStorage('theme', 'light');
export const userPreferencesAtom = atomWithStorage('preferences', {
  emailNotifications: true,
  darkMode: false,
});
```

Auto-syncs with localStorage. Restores on reload.

## When NOT to Use It

**Server state**: Use React Query instead.

```typescript
// ❌ Don't do this with Jotai
const usersAtom = atom(async () => {
  const response = await fetch('/api/users');
  return response.json();
});

// ✅ Do this with React Query
const { data: users } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers
});
```

**Forms**: Use React Hook Form.

**Everything**: Don't replace all state. Use it for shared client state.

## Modal State Example

```typescript
// atoms/modals.ts
import { atom } from 'jotai';

type ModalType = 'edit-user' | 'delete-confirm' | 'settings' | null;

export const activeModalAtom = atom<ModalType>(null);
export const modalDataAtom = atom<any>(null);

// Helper atoms for specific modals
export const isEditUserModalOpenAtom = atom(
  (get) => get(activeModalAtom) === 'edit-user'
);

export const openEditUserModalAtom = atom(
  null,
  (get, set, userId: number) => {
    set(modalDataAtom, { userId });
    set(activeModalAtom, 'edit-user');
  }
);

export const closeModalAtom = atom(
  null,
  (get, set) => {
    set(activeModalAtom, null);
    set(modalDataAtom, null);
  }
);
```

Using it anywhere:

```typescript
'use client';

import { useSetAtom } from 'jotai';
import { openEditUserModalAtom } from '@/atoms/modals';

export const UserRow = ({ userId }) => {
  const openEditModal = useSetAtom(openEditUserModalAtom);

  return (
    <tr>
      <td>User {userId}</td>
      <td>
        <button onClick={() => openEditModal(userId)}>
          Edit
        </button>
      </td>
    </tr>
  );
};
```

And the modal:

```typescript
'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import {
  isEditUserModalOpenAtom,
  modalDataAtom,
  closeModalAtom
} from '@/atoms/modals';

export const EditUserModal = () => {
  const isOpen = useAtomValue(isEditUserModalOpenAtom);
  const data = useAtomValue(modalDataAtom);
  const closeModal = useSetAtom(closeModalAtom);

  if (!isOpen) return null;

  return (
    <Modal onClose={closeModal}>
      <h2>Edit User {data.userId}</h2>
      {/* Modal content */}
    </Modal>
  );
};
```

No prop drilling, no providers.

## Gotchas

**Create atoms outside components**:

```typescript
// ❌ Don't do this
const MyComponent = () => {
  const myAtom = atom(0); // Creates a new atom on every render
  // ...
};

// ✅ Do this
const myAtom = atom(0); // Created once, outside component

const MyComponent = () => {
  const [value] = useAtom(myAtom);
  // ...
};
```

**Use DevTools**: `npm install jotai-devtools` to see all atoms and debug.

## When to Use It


It's the middle ground between useState (too local) and Redux (too much ceremony).

Start small. Pick one feature using prop drilling or context. Move it to Jotai. If you like it, use it more. If not, no big deal.

For me, it's now my default for shared client state. Simple to explain, fast to implement, easy to maintain.

