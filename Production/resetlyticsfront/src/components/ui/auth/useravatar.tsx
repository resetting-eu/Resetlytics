import Image from 'next/image'
import { auth } from "@/app/auth"

export default async function UserAvatar({ }) {
  const session = await auth()
 
  // if (!session.user) return null
// <img src={session.user.image} alt="User Avatar" />
  return (
    <div>

    </div>
  )
  }

  // VER EM 
  // https://authjs.dev/getting-started/session-management/get-session

// server side
/* 
import { auth } from "@/lib/auth/auth"
 
export default async function UserAvatar() {
  const session = await auth()
 
  if (!session.user) return null
 
  return (
    <div>
      <img src={session.user.image} alt="User Avatar" />
    </div>
  )
}
 */