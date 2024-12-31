"use client"

//import { signIn } from '@/app/auth'
//import { AuthError } from 'next-auth'
//import { redirect } from "next/navigation"

import { doCredentialLogin } from "@/components/ui/auth/actions";

import { useState } from "react";
import { useRouter } from "next/navigation";


export function SignInForm() {
    const router = useRouter();
    const [error, setError] = useState("");

    async function onSubmit(event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const response = await doCredentialLogin(formData);
            if (!!response.error) {
                console.error(response.error);
                setError(response.error.message);
            } else {
                router.push("/");
            }
        } catch (e) {
            console.error(e);
            setError("Check your credentials");
        }
    }


    return (
        <>
            <div className="text-xl text-red-500">{error}</div>
            <form 
                className="my-5 flex flex-col items-center border p-3 border-gray-200 rounded-md"
                onSubmit={onSubmit}>
                <div className="my-2">
                    <label htmlFor="email">Email Address</label>
                    <input className="border mx-2 border-gray-500 rounded" type="email" name="email" id="email" />
                </div>

                <div className="my-2">
                    <label htmlFor="password">Password</label>
                    <input className="border mx-2 border-gray-500 rounded" type="password" name="password" id="password" />
                </div>

                <button type="submit" className="bg-orange-300 mt-4 rounded flex justify-center items-center w-36">
                    Submit
                </button>
            </form>
        </>
    );
};


/*

const SIGNIN_ERROR_URL = "/";

export function SignInForm() {
  return (
    <div>
<form
      action={async (formData) => {
        "use server"
        try {
          await signIn("credentials", formData)

        } catch (error) {
          if (error instanceof AuthError) {
            return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
          }
          throw error
        }
        
      }}
    />
      </div>
    
      )
}


*/

