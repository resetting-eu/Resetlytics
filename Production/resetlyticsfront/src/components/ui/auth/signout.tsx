

import { doLogout } from "@/components/ui/auth/actions"
 
export default function SignOutPage() {
  return (
    <div>
      <h5>Are you sure you want to sign out?</h5>
      <form
        action={doLogout} >
        <button className="bg-blue-400 my-2 text-white p-1 rounded" type="submit">Sign out</button>
      </form>
    </div>
  )
}
