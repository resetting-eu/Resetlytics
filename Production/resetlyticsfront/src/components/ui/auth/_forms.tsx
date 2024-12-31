/* 'use client';

import { signIn } from "@/app/auth";
import { login } from '@/lib/auth/01-auth';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { signup } from '@/lib/auth/01-auth';


export function LoginForm() {
  const [state, action] = useFormState(login, undefined);

  return (
    <form action={action}>
      <div className="flex flex-col gap-2">
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            placeholder="m@example.com"
            type="email"
          />
          {state?.errors?.email && (
            <p className="text-sm text-red-500">{state.errors.email}</p>
          )}
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <label htmlFor="password">Password</label>
            <Link className="text-sm underline" href="#">
              Forgot your password?
            </Link>
          </div>
          <input id="password" type="password" name="password" />
          {state?.errors?.password && (
            <p className="text-sm text-red-500">{state.errors.password}</p>
          )}
        </div>
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <LoginButton />
      </div>
    </form>
  );
}

export function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button aria-disabled={pending} type="submit" className="mt-4 w-full">
      {pending ? 'Submitting...' : 'Sign up'}
    </button>
  );
}


export function SignupForm() {
  const [state, action] = useFormState(signup, undefined);

  return (
    <form action={action}>
      <div className="flex flex-col gap-2">
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" placeholder="John Doe" />
        </div>
        {state?.errors?.name && (
          <p className="text-sm text-red-500">{state.errors.name}</p>
        )}
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" placeholder="john@example.com" />
        </div>
        {state?.errors?.email && (
          <p className="text-sm text-red-500">{state.errors.email}</p>
        )}
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
        </div>
        {state?.errors?.password && (
          <div className="text-sm text-red-500">
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
        <SignupButton />
      </div>
    </form>
  );
}

export function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <button aria-disabled={pending} type="submit" className="mt-2 w-full">
      {pending ? 'Submitting...' : 'Login'}
    </button>
  );
}


// from documentation

export function SignIn() {
    return (
        <form
            action = {async (formData) => {
                "use server"
                await signIn("credentials", formData)
            }}
        >
            <label>
                Email 
                <input name="email" type="email"/>
            </label>
            <label>
                Password 
                <input name="password" type="password"/>
            </label>
            <button>Sign In</button>
        </form>
    )

}
 */
// Next.js Client

/*
import { signIn } from "next-auth/react"
 
export function SignIn() {
  return <Button onClick={() => signIn()}>Sign In</Button>
}
*/
