# nuqs + React Hooks: Managing Modal State Without Losing Your Mind

So I was working on this feature at Veryable where we needed to open a confirmation modal from like 6 different places, and every time I needed to add another trigger point, I died a little inside. Prop drilling through 4-5 components, keeping track of which modal was open, what data it needed... it was getting ridiculous.

Then someone on the team mentioned `nuqs` and honestly, it sounded weird at first. "Put your modal state in the URL?" But after trying it, I'm never going back.

## The Problem (aka My Life Before nuqs)

Picture this: You've got a user edit modal. You need to open it from:
- The user list page
- A detail view
- Some random button in a sidebar
- Oh, and now from a notification too

So you end up with this mess:

```tsx
const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [editingUserId, setEditingUserId] = useState(null);

// Pass these down through 47 components
// Hope nobody refreshes the page
// Die inside when product asks to add another trigger point
```

Yeah. Not great.

## What I Actually Did (nuqs + Custom Hooks)

First, install nuqs:
```bash
npm install nuqs
```

The idea is simple - your modal state lives in the URL. So instead of `useState`, you use `nuqs` to manage query parameters. Here's what my actual hook looks like:

```typescript
// hooks/useUserEditModal.ts
import { parseAsBoolean, parseAsInteger, useQueryStates } from 'nuqs';

export const useUserEditModal = () => {
  return useQueryStates({
    editUserModal: parseAsBoolean.withDefault(false),
    userId: parseAsInteger.withDefault(0)
  });
};
```

That's literally it. Your URL becomes `?editUserModal=true&userId=123` and now you can read/write that state from anywhere.

## Using It (This is Where It Gets Good)

The modal itself:

```tsx
// components/UserEditModal.tsx
'use client';

import { useUserEditModal } from '@/hooks/useUserEditModal';

export const UserEditModal = () => {
  const [{ editUserModal, userId }, setModalState] = useUserEditModal();
  
  const handleClose = () => {
    setModalState({ editUserModal: false, userId: 0 });
  };

  if (!editUserModal) return null;

  return (
    <Modal open={editUserModal} onClose={handleClose}>
      <div>Editing user {userId}</div>
      <button onClick={handleClose}>Close</button>
    </Modal>
  );
};
```

And then literally anywhere else in your app:

```tsx
// Could be in a totally different file, doesn't matter
import { useUserEditModal } from '@/hooks/useUserEditModal';

export const SomeRandomComponent = () => {
  const [_, setModalState] = useUserEditModal();
  
  return (
    <button onClick={() => setModalState({ editUserModal: true, userId: 123 })}>
      Edit User
    </button>
  );
};
```

No prop drilling. No context. Just works.

## The Stuff That Made Me Actually Like This

**Deep linking just works**: Someone sends you `yourapp.com/dashboard?editUserModal=true&userId=42` and the modal pops right open. I didn't have to write any special code for this. Product manager sent me a URL with a bug in it, modal opened to the exact state, I fixed it. Felt like magic.

**Browser back button**: Users can close modals by hitting back. Again, didn't write any code for this. It just works because the URL changes.

**Multiple modals**: Just add more properties to your hook:

```typescript
export const useAllMyModals = () => {
  return useQueryStates({
    editUser: parseAsBoolean.withDefault(false),
    deleteUser: parseAsBoolean.withDefault(false),
    userId: parseAsInteger.withDefault(0),
    settingsOpen: parseAsBoolean.withDefault(false),
    // whatever else you need
  });
};
```

## Things I Learned The Hard Way

**Don't put everything in one hook**: I made this mistake. Had one giant `useAllModals()` hook and it got messy fast. Split them up by feature area.

**Add helper functions to make life easier**:

```typescript
export const useUserEditModal = () => {
  const [state, setState] = useQueryStates({
    editUserModal: parseAsBoolean.withDefault(false),
    userId: parseAsInteger.withDefault(0)
  });
  
  const openModal = (userId: number) => {
    setState({ editUserModal: true, userId });
  };
  
  const closeModal = () => {
    setState({ editUserModal: false, userId: 0 });
  };
  
  return { isOpen: state.editUserModal, userId: state.userId, openModal, closeModal };
};
```

Now it's just:
```tsx
const { openModal } = useUserEditModal();
<button onClick={() => openModal(123)}>Edit</button>
```

**Server components don't work with this**: Learned this the hard way. You need `'use client'` at the top of any file using nuqs. It's a client-side thing because... well, URLs change on the client.

**Don't put sensitive stuff in URLs**: I hope this is obvious but I'm saying it anyway. User IDs? Fine. Passwords or tokens? No.

## Real Talk

I was skeptical at first. "Managing state in the URL sounds hacky" is what I thought. But after using it for a few weeks, I can't imagine going back to the old way. 

No more prop drilling through 5 components just to open a modal. No more "wait, where did I define that state again?" No more losing modal state on refresh and having users complain.

The URL is basically a global state store that's been there the whole time. We just forgot about it because we were too busy installing state management libraries.

Anyway, try it out. Worst case, you spend 30 minutes and decide it's not for you. Best case, you never prop drill modal state again.

Worth it.

