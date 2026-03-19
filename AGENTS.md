# Link Shortener Project - Agent Instructions

This document provides comprehensive coding standards and best practices for LLMs working on the Link Shortener project. All contributors and AI agents must adhere to these guidelines.

## ⚠️ CRITICAL: Read Documentation Before ANY Code Generation

**BEFORE generating, modifying, or reviewing ANY code, you MUST read the relevant individual instruction files in the `/docs` directory.** This is not optional. Every feature, component, API endpoint, and database operation is governed by specific guidelines documented in those files.

**Failure to consult the appropriate `/docs` files first will result in code that violates project standards.**

## Project Overview

**Project**: Link Shortener  
**Type**: Full-Stack Web Application  
**Framework**: Next.js 16 (App Router)  
**Language**: TypeScript  
**Database**: PostgreSQL with Drizzle ORM  
**Authentication**: Clerk  
**UI Components**: shadcn/ui with Tailwind CSS  

### Tech Stack

```json
{
  "frontend": ["React 19", "Next.js 16", "Tailwind CSS", "shadcn/ui"],
  "backend": ["Next.js API Routes", "TypeScript"],
  "database": ["PostgreSQL", "Drizzle ORM"],
  "auth": ["Clerk NextAuth"],
  "tooling": ["ESLint", "TypeScript 5"]
}
```

## Documentation Reference

**This project follows detailed coding standards organized in the `/docs` directory. ALWAYS read the relevant documentation files BEFORE generating ANY code.** Do not skip this step.

Each document below covers specific aspects of development and contains mandatory requirements:

- **[Authentication & Authorization](docs/authentication-authorization.md)** — Clerk authentication and authorization patterns (READ THIS before touching auth-related code)
- **[UI Components](docs/ui-components.md)** — shadcn/ui component standards and usage guidelines (READ THIS before creating any UI components)


## Core Principles


### 5. Security by Default

- Protect API routes with authentication checks
- Validate and sanitize all user input
- Never log sensitive data (passwords, tokens)
- Use Clerk for authentication - no custom implementations
- See [Authentication & Authorization](docs/authentication-authorization.md)



## Development Workflow

### Before Writing Code

1. **READ RELEVANT DOCUMENTATION FIRST**: Before ANY code generation, read the relevant `/docs` files. This is mandatory, not optional.
2. **Understand Requirements**: Read related documentation sections completely
3. **Type Definitions**: Define interfaces first using TypeScript
4. **Database Schema**: Check schema changes against standards
5. **Component Design**: Plan component hierarchy and props

### During Development

1. **Follow Type Safety**: Use strict TypeScript practices
2. **Test Locally**: Run type checking and linting before committing
3. **Write Tests**: Include unit tests for critical logic
4. **Document Code**: Add comments for complex logic only

### Code Review Checklist

- [ ] TypeScript: No `any`, proper type annotations, strict mode compliance
- [ ] React/Next.js: Server components by default, no prop drilling, proper hook usage
- [ ] Database: Parameterized queries, proper relations, validation
- [ ] Styling: Tailwind classes, responsive design, dark mode support
- [ ] Security: Auth checks, input validation, no sensitive data logging
- [ ] Error Handling: Custom error classes, meaningful messages, logging
- [ ] Testing: Unit tests for logic, component tests for UI
- [ ] Accessibility: Semantic HTML, ARIA labels, keyboard support

## File Structure

```
/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page (server component)
│   ├── api/                 # API routes
│   │   ├── links/
│   │   │   ├── route.ts     # GET, POST handlers
│   │   │   └── [id]/
│   │   │       └── route.ts # PUT, DELETE handlers
│   │   └── ...
│   ├── dashboard/           # Protected routes
│   │   └── layout.tsx       # Auth check
│   └── ...
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── layouts/             # Layout wrappers
│   ├── features/            # Feature-specific components
│   └── ...
├── db/
│   ├── schema.ts            # Drizzle schema definitions
│   └── index.ts             # Database client export
├── lib/
│   ├── utils.ts             # Utility functions
│   └── ...
├── docs/                    # Agent instructions (THIS DIRECTORY)
│   ├── authentication-authorization.md
│   
├── public/                  # Static assets
├── drizzle.config.ts       # Drizzle ORM configuration
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── eslint.config.mjs       # ESLint configuration
└── package.json
```

## Command Reference

### Development

```bash
# Start development server
npm run dev

# Type check
npx tsc --noEmit

# Lint code
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

### Database

```bash
# Generate migrations
npx drizzle-kit generate

# Apply migrations
npx drizzle-kit migrate

# Open database studio
npx drizzle-kit studio
```

## Quick Reference: Common Tasks

### Creating a New API Endpoint

1. **CHECK DOCS FIRST**: Review relevant documentation in `/docs`
2. Create file: `app/api/[feature]/route.ts`
3. Export named functions: `GET`, `POST`, etc.
4. Add authentication check with `await auth()`
5. Validate input with Zod
6. Return proper status codes
7. Add error handling with custom error classes

### Creating a New Component

1. **CHECK DOCS FIRST**: Review component guidelines in `/docs`
2. Create directory: `components/[ComponentName]/`
3. Define props interface in `types.ts`
4. Implement component in `index.tsx`
5. Use TypeScript for prop types
6. Add accessibility attributes
7. Write unit tests

### Adding Database Table

1. **CHECK DOCS FIRST**: Review database standards in `/docs`
2. Add to `db/schema.ts`
3. Define relations if needed
4. Generate migration: `npx drizzle-kit generate`
5. Add Zod schema for validation
6. Update related API endpoints

### Implementing Authentication

1. **CHECK DOCS FIRST**: Read [Authentication & Authorization](docs/authentication-authorization.md) completely
2. Use `import { auth } from '@clerk/nextjs/server'`
3. Call `const { userId } = await auth()` in server components/routes
4. Redirect unauthenticated users with `redirect('/sign-in')`
5. Return 401 for API routes without auth
6. Check authorization with database lookups

## Quality Standards

### TypeScript Compilation

All code must pass strict TypeScript compilation with zero errors:
```bash
npx tsc --noEmit
```

### ESLint

All code must pass ESLint checks:
```bash
npm run lint
```

### Type Coverage

Aim for 100% type coverage in new code. Use TypeScript's type inference wisely but always be explicit about public APIs.

### Testing Requirements

- Unit tests for utility functions
- Component tests for interactive UI
- Integration tests for important workflows
- Aim for 80%+ coverage on critical paths

## Common Pitfalls to Avoid

### TypeScript

- ❌ Using `any` type
- ❌ Not providing return types on functions
- ❌ Ignoring TypeScript errors with `@ts-ignore`
- ✅ Use proper type definitions and let inference help

### React/Next.js

- ❌ Using client components unnecessarily
- ❌ Fetching data in client components with useEffect
- ❌ Prop drilling without context
- ✅ Server components by default, fetch in server components

### Database

- ❌ String concatenation in SQL queries
- ❌ Not validating user input before database operations
- ❌ Ignoring database errors
- ✅ Use Drizzle query builders, always validate

### Styling

- ❌ Inline CSS styles
- ❌ Missing responsive design
- ❌ No dark mode consideration
- ✅ Tailwind classes, test on mobile, support dark mode

### Security

- ❌ Logging sensitive data
- ❌ Skipping authentication checks
- ❌ Trusting user input without validation
- ✅ Always validate, check auth, log safely

## Environment Variables

### Required Variables

```bash
# Database
DATABASE_URL=postgresql://...

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
```

### Optional Variables

```bash
# CORS
CORS_ORIGIN=http://localhost:3000

# Environment
NODE_ENV=development|production
```

## Deployment

Projects follow Next.js deployment best practices:

- Use environment variables for configuration
- Build for production: `npm run build`
- All TypeScript must compile without errors
- All tests must pass
- ESLint must pass

## Getting Help

When implementing features:

1. **Check the relevant docs**: Start with the document matching your task
2. **Review examples**: Look at similar code in the codebase
3. **Type safety first**: Let TypeScript guide your implementation
4. **Test thoroughly**: Write tests for new functionality
5. **Ask questions**: When uncertain, ask for clarification

## When to Update These Standards

These guidelines should be updated when:

- New patterns emerge across the codebase
- Best practices change
- New tools or frameworks are adopted
- Team consensus shifts on conventions

Updates should be discussed and documented in the relevant guide files.

---

**Last Updated**: March 2026  
**Maintained By**: Development Team  
**Version**: 1.0
