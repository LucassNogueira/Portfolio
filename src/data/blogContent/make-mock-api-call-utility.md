# Building Features Before the Backend Exists (makeMockApiCall)

Real talk - waiting on backend APIs is the worst part of frontend development. You're ready to build something, you've got the designs, you know exactly what you need to do, and then... "oh the API isn't ready yet, maybe next sprint?"

So here's what I do now: I just build it anyway.

## The Problem

You need to build a user dashboard. Backend says it'll be 2 weeks. What do you do?

Option A: Wait 2 weeks, build nothing, feel unproductive  
Option B: Build the whole thing with mock data, swap in the real API later

I pick B every time now.

## The Setup

I have two utilities: `makeApiCall` (the real one) and `makeMockApiCall` (my development cheat code).

Here's the real API wrapper - nothing fancy:

```typescript
// utils/makeApiCall.ts
export const makeApiCall = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
};
```

## The Mock Version (This is Where It Gets Good)

Started simple:

```typescript
// utils/makeMockApiCall.ts
export const makeMockApiCall = async <T>(data: T): Promise<T> => {
  const randomDelay = Math.floor(Math.random() * 1000) + 500;
  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, randomDelay);
  });
};
```

But then I realized I could make it way more useful:

```typescript
interface MockConfig {
  delay?: number;
  minDelay?: number;
  maxDelay?: number;
  shouldError?: boolean;
  errorMessage?: string;
  successRate?: number; // 0-100
}

export const makeMockApiCall = async <T>(
  data: T,
  config: MockConfig = {}
): Promise<T> => {
  const {
    delay,
    minDelay = 500,
    maxDelay = 2000,
    shouldError = false,
    errorMessage = 'Mock API call failed',
    successRate = 100
  } = config;

  // Calculate delay
  const actualDelay = delay !== undefined
    ? delay
    : Math.floor(Math.random() * (maxDelay - minDelay)) + minDelay;

  // Wait (simulates network)
  await new Promise(resolve => setTimeout(resolve, actualDelay));

  // Maybe throw an error
  const shouldSucceed = Math.random() * 100 < successRate;
  if (shouldError || !shouldSucceed) {
    throw new Error(errorMessage);
  }

  return data;
};
```

## How I Actually Use This

Say I'm building a user list. Backend's not ready. I just do this:

```typescript
const fetchUsers = async () => {
  const mockUsers = [
    { id: 1, name: 'Lucas', email: 'lucas@example.com', role: 'admin' },
    { id: 2, name: 'Sarah', email: 'sarah@example.com', role: 'user' },
  ];

  return makeMockApiCall(mockUsers, {
    delay: 1000 // Realistic delay
  });
};
```

Ship the feature, show it to the PM, everyone's happy. When the real API is ready, I just replace `makeMockApiCall` with the real `makeApiCall`. Takes like 2 minutes.

## Testing Loading States

Want to see how your skeleton screens look?

```typescript
// Slow response to see loading states
const users = await makeMockApiCall(mockData, { delay: 5000 });
```

Want to test error handling?

```typescript
// Always fails
try {
  await makeMockApiCall(mockData, {
    shouldError: true,
    errorMessage: 'User not found'
  });
} catch (error) {
  // Your error UI shows up
}
```

Want to test flaky networks?

```typescript
// 30% chance of failure
await makeMockApiCall(mockData, {
  successRate: 70,
  minDelay: 1000,
  maxDelay: 5000
});
```

## Actual Component Example

```typescript
'use client';

import { useState, useEffect } from 'react';
import { makeMockApiCall } from '@/utils/makeMockApiCall';
// When ready: import { makeApiCall } from '@/utils/makeApiCall';

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        
        const mockUsers = [
          { id: 1, name: 'Lucas' },
          { id: 2, name: 'Sarah' }
        ];
        
        // Using mock for now
        const data = await makeMockApiCall(mockUsers, { delay: 1000 });
        
        // When API is ready, swap to this:
        // const data = await makeApiCall('/api/users');
        
        setUsers(data);
      } catch (err) {
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};
```

When the API is ready, just swap out the mock call for the real one. Comment out the mock data, uncomment the real call, done.

## Generating Mock Data

I got tired of typing out mock data, so I made helpers:

```typescript
export const generateMockUser = (overrides?) => ({
  id: Math.floor(Math.random() * 1000),
  name: `User ${Math.floor(Math.random() * 100)}`,
  email: `user${Math.floor(Math.random() * 100)}@example.com`,
  role: Math.random() > 0.5 ? 'admin' : 'user',
  ...overrides
});

export const generateMockUsers = (count: number) => {
  return Array.from({ length: count }, () => generateMockUser());
};

// Usage
const users = generateMockUsers(50);
await makeMockApiCall(users, { delay: 1000 });
```

## Preset Configs for Common Scenarios

```typescript
export const MOCK_PRESETS = {
  fast: { delay: 100 },
  slow: { delay: 3000 },
  error: { shouldError: true, errorMessage: 'Network error' },
  flaky: { successRate: 70, minDelay: 500, maxDelay: 3000 }
};

// Usage
await makeMockApiCall(data, MOCK_PRESETS.flaky);
```

## Why This Changed My Workflow

Before: Wait for backend, build feature in a rush when it's finally ready, find bugs, can't test edge cases easily.

Now: Build feature immediately, test all scenarios (loading, errors, slow networks), backend catches up eventually, swap in real API, ship.

I've built entire features and demoed them to stakeholders before the backend existed. They have no idea it's fake data. Then when the real API is ready, I just swap the function call. 

It's honestly one of those things that seems obvious in hindsight but took me way too long to figure out.

## A Few Gotchas

**Don't forget to swap**: I've definitely shown a demo with mock data when I thought I was using real data. Always double-check which function you're calling.

**Keep mocks updated**: When the API contract changes, update your mocks. Otherwise you'll have type mismatches.

**Mock data can lie**: Your mock might work perfectly but the real API returns slightly different data. Always test with real APIs before shipping.

**Performance differences**: Mock is fast. Real API might be slow. Don't be surprised when things get slower in production.

## Wrapping Up

Having a good mock API setup is like having a superpower. Backend isn't ready? Doesn't matter. Want to test error states? Easy. Need to demo something? Done.

It's not complicated - you're just returning data wrapped in a promise. But the time it saves is insane.

Try it on your next feature. Build with mocks, swap in the real API later. You'll wonder why you ever waited around doing nothing.