# Toast Notifications: Just Call It From Anywhere

I used to hate implementing toast notifications. Every project had some weird setup where you had to import a context, wrap your component, pass functions around... it was annoying.

Then I figured out how to make a toast utility that you can literally just import and call from anywhere. No context, no providers, no prop drilling. Just `toast.success('it worked')` and you're done.

## My Requirements Were Simple

1. Call it from any component
2. Call it from custom hooks
3. Call it from utility functions
4. Call it from server actions (Next.js thing)
5. Don't make me think about it

## The Setup

Using `sonner` because it's the best toast library and I'll fight anyone who disagrees. Also Material-UI for styling because that's what we use at work.

```bash
npm install sonner @mui/material @mui/icons-material @emotion/react @emotion/styled
```

## The Base Component

Made a custom snackbar with MUI styling:

```typescript
// components/toast/BaseSnackbar.tsx
'use client';

import { SnackbarContent, Theme } from '@mui/material';
import {
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { toast as sonnerToast } from 'sonner';

interface ToastProps {
  id: string | number;
  title: string;
  variant: 'success' | 'error' | 'warning';
  icon?: React.ReactNode;
  closeHandler?: () => void;
  actionText?: string;
  actionHandler?: () => void;
}

export const BaseSnackbar = (props: ToastProps) => {
  const getStyle = (theme: Theme) => {
    switch (props.variant) {
      case 'success':
        return { backgroundColor: theme.palette.success.main, color: '#fff' };
      case 'error':
        return { backgroundColor: theme.palette.error.main, color: '#fff' };
      case 'warning':
        return { backgroundColor: theme.palette.warning.main, color: '#fff' };
    }
  };

  const getIcon = () => {
    if (props.icon) return props.icon;
    switch (props.variant) {
      case 'success': return <SuccessIcon />;
      case 'error': return <ErrorIcon />;
      case 'warning': return <WarningIcon />;
    }
  };

  return (
    <SnackbarContent
      sx={theme => ({ fontWeight: 500, minWidth: 300, ...getStyle(theme) })}
      message={
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {getIcon()}
          <span>{props.title}</span>
        </div>
      }
      action={
        <>
          {props.actionText && (
            <button
              onClick={() => {
                props.actionHandler?.();
                sonnerToast.dismiss(props.id);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              {props.actionText}
            </button>
          )}
          <button
            onClick={() => {
              sonnerToast.dismiss(props.id);
              props.closeHandler?.();
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '20px'
            }}
          >
            ✕
          </button>
        </>
      }
    />
  );
};
```

## The Magic Utility

This is the part that makes it work everywhere:

```typescript
// utils/toast.tsx
'use client';

import { toast as sonnerToast } from 'sonner';
import { BaseSnackbar } from '@/components/toast/BaseSnackbar';

interface ToastOptions {
  icon?: React.ReactNode;
  closeHandler?: () => void;
  actionText?: string;
  actionHandler?: () => void;
  position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';
}

export const toast = {
  success: (message: string, options?: ToastOptions) =>
    sonnerToast.custom(
      id => <BaseSnackbar id={id} title={message} variant="success" {...options} />,
      { position: options?.position || 'bottom-center' }
    ),

  error: (message: string, options?: ToastOptions) =>
    sonnerToast.custom(
      id => <BaseSnackbar id={id} title={message} variant="error" {...options} />,
      { position: options?.position || 'bottom-center' }
    ),

  warning: (message: string, options?: ToastOptions) =>
    sonnerToast.custom(
      id => <BaseSnackbar id={id} title={message} variant="warning" {...options} />,
      { position: options?.position || 'bottom-center' }
    )
};
```

## Add It To Your App

```typescript
// app/layout.tsx
import { Toaster } from 'sonner';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
```

## Using It (The Easy Part)

In a component:

```typescript
'use client';

import { toast } from '@/utils/toast';

export const UserForm = () => {
  const handleSubmit = async (data) => {
    try {
      await saveUser(data);
      toast.success('User saved!');
    } catch (error) {
      toast.error('Failed to save user');
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
};
```

In a custom hook:

```typescript
import { toast } from '@/utils/toast';

export const useUserMutation = () => {
  const mutation = useMutation({
    mutationFn: saveUser,
    onSuccess: () => toast.success('Saved!'),
    onError: () => toast.error('Failed')
  });

  return mutation;
};
```

In a utility function:

```typescript
import { toast } from '@/utils/toast';

export const deleteUser = async (id: number) => {
  try {
    await api.delete(`/users/${id}`);
    toast.success('User deleted');
  } catch (error) {
    toast.error('Delete failed');
  }
};
```

## With Actions

This is where it gets fun. You can add action buttons:

```typescript
toast.success('File uploaded!', {
  actionText: 'View',
  actionHandler: () => router.push('/files/123')
});

toast.error('Connection lost', {
  actionText: 'Retry',
  actionHandler: async () => await retryConnection()
});
```

I use this for undo actions all the time:

```typescript
const handleDelete = async (id: number) => {
  await deleteItem(id);
  
  toast.success('Item deleted', {
    actionText: 'Undo',
    actionHandler: async () => {
      await restoreItem(id);
      toast.success('Item restored!');
    }
  });
};
```

## Different Positions

```typescript
// Less important stuff
toast.info('New message', { position: 'top-right' });

// Important actions
toast.success('Payment processed'); // bottom-center by default
```

## Loading Toasts

For longer operations:

```typescript
const handleUpload = async (file: File) => {
  const toastId = toast.info('Uploading...');
  
  try {
    await uploadFile(file);
    sonnerToast.dismiss(toastId);
    toast.success('Upload complete!');
  } catch (error) {
    sonnerToast.dismiss(toastId);
    toast.error('Upload failed');
  }
};
```

Or use sonner's promise helper:

```typescript
import { toast as sonnerToast } from 'sonner';

await sonnerToast.promise(
  saveData(),
  {
    loading: 'Saving...',
    success: 'Saved!',
    error: 'Failed to save'
  }
);
```

## Real Example: Form Submission

```typescript
const handleSubmit = async (formData) => {
  try {
    setLoading(true);
    await submitForm(formData);
    
    toast.success('Form submitted!', {
      actionText: 'View',
      actionHandler: () => router.push('/submissions')
    });
    
    reset();
  } catch (error) {
    toast.error(error.message || 'Something went wrong');
  } finally {
    setLoading(false);
  }
};
```

## Domain-Specific Toasts

I make these for common operations:

```typescript
// utils/userToasts.ts
import { toast } from './toast';

export const userToasts = {
  created: () => toast.success('User created'),
  updated: () => toast.success('User updated'),
  deleted: () => toast.success('User deleted'),
  error: (action: string) => toast.error(`Failed to ${action} user`)
};

// Usage
userToasts.created();
```

Saves time when you're doing the same operations over and over.

## What I Like About This

**No setup per component**: Just import and call. No providers, no context, no nothing.

**Works everywhere**: Components, hooks, utils, server actions - doesn't matter.

**Type-safe**: TypeScript knows what options you can pass.

**Customizable**: Want a custom icon? Position? Action button? All there.

**MUI styled**: Matches the rest of our app without extra work.

## What to Watch Out For

**Don't spam toasts**: In loops or rapid-fire operations, you'll get 50 toasts. Be smart about when you call it.

**Server components**: The toast utility itself is client-side. You can call it from server actions, but not server components directly.

**Loading toasts**: Always dismiss them. I've left loading toasts up by accident more times than I want to admit.

## Wrapping Up

This setup has saved me so much time. No more:
- "How do I show a toast from this random utility?"
- "Do I need to pass the toast function through props?"
- "Why isn't the toast context working here?"

Just import it, call it, done.

If you're still using some complicated toast setup with providers and contexts, try this instead. Way simpler.