'use server'

import { signIn, signOut } from "@/app/auth";

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData: { get: (arg0: string) => any; }) {
  console.log("formData", formData);

  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (err) {
    throw err;
  }
}


/*
import { signIn } from '@/app/auth'

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn()
      }}
    >
      
      <button>Sign In</button>
      </form>
      )
}

*/