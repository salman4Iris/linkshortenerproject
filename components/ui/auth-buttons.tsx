'use client';

import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { cn } from '@/lib/utils';

const authButtonClass = cn(
  'group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50',
  'h-8 gap-1.5 px-2.5'
);

const defaultButtonClass = cn(authButtonClass, 'bg-primary text-primary-foreground [a]:hover:bg-primary/80');

const outlineButtonClass = cn(
  authButtonClass,
  'border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50'
);

export function AuthSignInButton() {
  return (
    <SignInButton mode="modal">
      <button className={outlineButtonClass}>Sign In</button>
    </SignInButton>
  );
}

export function AuthSignUpButton() {
  return (
    <SignUpButton mode="modal">
      <button className={defaultButtonClass}>Sign Up</button>
    </SignUpButton>
  );
}
