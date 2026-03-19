# UI Components Standards

All UI elements in the Link Shortener application use **shadcn/ui** components. Custom components are not permitted—all interactive UI must be built from the shadcn/ui component library.

## Overview

shadcn/ui is a collection of re-usable components built on top of Radix UI and Tailwind CSS. Components are fully typed with TypeScript and support theming out of the box.

## Core Principles

1. **No Custom Components**: Always use shadcn/ui components instead of creating custom UI elements
2. **Composability**: Combine existing components to create complex UI patterns
3. **Type Safety**: All components are fully typed—leverage TypeScript for props
4. **Consistency**: Use shadcn/ui theming and styling system across the application
5. **Accessibility**: shadcn/ui components follow WAI-ARIA standards by default

## Installing Components

New shadcn/ui components are added using the CLI:

```bash
npx shadcn-ui@latest add [component-name]
```

Example:
```bash
# Add button component
npx shadcn-ui@latest add button

# Add form components
npx shadcn-ui@latest add input
npx shadcn-ui@latest add form
npx shadcn-ui@latest add label
```

Components are installed to `components/ui/` directory.

## Common Components

### Layout & Navigation

- **Card** — Container for grouped content
- **Sheet** — Side drawer or modal overlay
- **Dialog** — Modal dialog for important interactions
- **Tabs** — Tabbed content organization
- **Navigation Menu** — Main navigation structure

### Forms

- **Input** — Text input field
- **Textarea** — Multi-line text input
- **Button** — Interactive button element
- **Checkbox** — Toggle boolean value
- **Radio Group** — Select one option from multiple
- **Select** — Dropdown selection
- **Label** — Form field labels
- **Form** — Form wrapper with validation support (use with `react-hook-form`)

### Display

- **Badge** — Labels and tags
- **Alert** — Important messages and notifications
- **Toast** — Temporary notifications
- **Spinner** — Loading indicator
- **Skeleton** — Content placeholder while loading

### Feedback

- **Progress** — Progress bars and indeterminate progress
- **Tooltip** — Contextual help text on hover
- **Alert Dialog** — Confirmation dialogs
- **Sonner** — Toast notifications (integrated with shadcn/ui)

## Usage Examples

### Basic Button

```tsx
import { Button } from '@/components/ui/button';

export function MyComponent() {
  return (
    <Button onClick={() => console.log('Clicked')}>
      Click me
    </Button>
  );
}
```

### Form with Input

```tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function InputForm() {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Enter email" />
      </div>
      <Button type="submit">Submit</Button>
    </div>
  );
}
```

### With React Hook Form

```tsx
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function FormExample() {
  const form = useForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="user@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

### Dialog Example

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function DialogExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogDescription>
            Are you sure you want to proceed?
          </DialogDescription>
        </DialogHeader>
        <Button>Confirm</Button>
      </DialogContent>
    </Dialog>
  );
}
```

## Styling with Tailwind CSS

All shadcn/ui components use Tailwind CSS for styling. Customize component appearance using Tailwind utility classes:

```tsx
import { Button } from '@/components/ui/button';

export function StyledButton() {
  return (
    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
      Custom Styled Button
    </Button>
  );
}
```

### Common Tailwind Patterns

- **Spacing**: `p-4`, `m-2`, `gap-3`, `space-y-2`
- **Colors**: `bg-primary`, `text-destructive`, `border-muted`
- **Sizing**: `w-full`, `h-10`, `max-w-md`
- **Responsive**: `sm:`, `md:`, `lg:` prefixes
- **Dark Mode**: `dark:bg-slate-900`, `dark:text-white`

## Do's and Don'ts

### ✅ DO

- Use shadcn/ui components for all UI elements
- Check if a component exists before creating custom code
- Compose multiple components to build complex UI
- Use TypeScript for component prop types
- Follow shadcn/ui accessibility guidelines
- Customize with Tailwind CSS classes

### ❌ DON'T

- Create custom UI components from scratch
- Use inline styles instead of Tailwind classes
- Skip accessibility attributes (aria-labels, roles, etc.)
- Create non-standard button or input elements
- Mix styling approaches (CSS modules, styled-components, etc.)
- Ignore component composition patterns

## Integration with Forms

For complex forms, use **react-hook-form** with shadcn/ui:

1. Install form components: `npx shadcn-ui@latest add form`
2. Use `useForm` hook from react-hook-form
3. Wrap fields with `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`
4. Leverage Zod for schema validation

## Accessibility

All shadcn/ui components are built on Radix UI primitives and include:

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation
- Focus management
- Screen reader support

Always:
- Provide `htmlFor` attributes on labels
- Include meaningful `aria-label` on icon-only buttons
- Test keyboard navigation
- Verify screen reader compatibility

## Dark Mode Support

shadcn/ui components automatically support dark mode. Ensure:

- Your layout includes dark mode configuration
- Test components in both light and dark modes
- Use semantic color classes (`text-foreground`, `bg-background`)

## Theming

Components use CSS variables for theming. Adjust colors in `globals.css` or your theme configuration:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.6%;
  --primary: 0 0% 9%;
  /* ... more variables ... */
}

.dark {
  --background: 0 0% 3.6%;
  --foreground: 0 0% 98%;
  /* ... more variables ... */
}
```

## Troubleshooting

### Component not found
- Run `npx shadcn-ui@latest add [component-name]`
- Check that import path is correct: `@/components/ui/`

### Styling issues
- Verify Tailwind CSS is configured in `tailwind.config.ts`
- Check that global CSS includes shadcn/ui base styles
- Ensure Tailwind classes are being recognized by your IDE

### Accessibility issues
- Use the shadcn/ui docs for component-specific accessibility guidance
- Test with keyboard navigation and screen readers
- Include proper ARIA attributes

## Resources

- **shadcn/ui Docs**: https://ui.shadcn.com/
- **Radix UI**: https://www.radix-ui.com/
- **Tailwind CSS**: https://tailwindcss.com/
- **React Hook Form**: https://react-hook-form.com/

---

**Version**: 1.0  
**Last Updated**: March 2026
