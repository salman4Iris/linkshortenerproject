# Authentication & Authorization Standards

## Overview

All authentication and authorization in this project is handled exclusively by **Clerk**. No custom authentication mechanisms, other auth providers, or workarounds should be implemented.

## Clerk Integration

### Setup

Required environment variables:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
```

### Basic Usage

Import the `auth()` function from Clerk in server components and API routes:

```typescript
import { auth } from '@clerk/nextjs/server';
```

## Authentication Patterns

### Server Components

Check authentication in server components using `await auth()`:

```typescript
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }
  
  return <div>Protected content</div>;
}
```

### API Routes

Protect API routes by checking authentication:

```typescript
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  // Protected logic
  return NextResponse.json({ data: 'success' });
}
```

### Layout-Level Protection

Protect entire route segments using protected layouts:

```typescript
// app/dashboard/layout.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }
  
  return <>{children}</>;
}
```

## Route-Specific Standards

### Dashboard Route (`/dashboard`)

- **Status**: Protected
- **Requirement**: User must be logged in
- **Redirect**: Unauthenticated users → `/sign-in`
- **Implementation**: Protected layout at `app/dashboard/layout.tsx`

The `/dashboard` layout must verify authentication and redirect unauthorized users.

### Homepage (`/`)

- **Status**: Public with conditional redirect
- **Requirement**: Logged-in users must be redirected to `/dashboard`
- **Implementation**: Check authentication in `app/page.tsx` or `app/layout.tsx`

```typescript
// app/page.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const { userId } = await auth();
  
  if (userId) {
    redirect('/dashboard');
  }
  
  return <div>Public homepage content</div>;
}
```

## Sign In & Sign Up

### Modal Implementation

Clerk sign-in and sign-up modals should always be triggered as modals, not full-page redirects.

Use Clerk's `<SignInButton>` and `<SignUpButton>` components with modal mode:

```typescript
import { SignInButton, SignUpButton } from '@clerk/nextjs';

export function AuthButtons() {
  return (
    <>
      <SignInButton mode="modal">
        <button>Sign In</button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button>Sign Up</button>
      </SignUpButton>
    </>
  );
}
```

### Clerk Root Layout

Wrap your application with Clerk's provider in the root layout:

```typescript
// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

## Authorization

### User ID Access

After authentication, access the user ID for database operations:

```typescript
const { userId } = await auth();
// Use userId to filter data to current user
```

### Database-Level Authorization

Always filter database queries by the authenticated user:

```typescript
import { db } from '@/db';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Filter by userId
  const userLinks = await db.query.links.findMany({
    where: (table) => eq(table.userId, userId),
  });
  
  return NextResponse.json(userLinks);
}
```

## Security Guidelines

### Do's ✅

- ✅ Always check `userId` before accessing protected resources
- ✅ Filter database queries by authenticated `userId`
- ✅ Use `redirect()` for unauthenticated access to protected routes
- ✅ Return 401 status for unauthorized API requests
- ✅ Trust Clerk's session management
- ✅ Use modals for sign-in/sign-up flows

### Don'ts ❌

- ❌ Never implement custom authentication
- ❌ Never skip authentication checks
- ❌ Never expose user data without authorization
- ❌ Never log authentication tokens
- ❌ Never use other auth providers (Auth0, NextAuth, etc.)
- ❌ Never hardcode authentication logic

## Error Handling

Handle authentication failures gracefully:

```typescript
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Process authenticated request
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

## Testing

When testing protected routes, mock Clerk authentication:

```typescript
jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn(),
}));

// In tests
const { auth } = require('@clerk/nextjs/server');
auth.mockResolvedValue({ userId: 'test-user-id' });
```

## Clerk Admin Functions

For administrative operations (triggered by privileged users only):

```typescript
import { auth } from '@clerk/nextjs/server';

export async function performAdminAction() {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Not authenticated');
  }
  
  // Check if user is admin (via database lookup or Clerk metadata)
  const isAdmin = await checkIfAdmin(userId);
  
  if (!isAdmin) {
    throw new Error('Not authorized');
  }
  
  // Perform admin action
}
```

## References

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Next.js Integration](https://clerk.com/docs/quickstarts/nextjs)
- [Session & User Object](https://clerk.com/docs/references/nextjs/auth)
