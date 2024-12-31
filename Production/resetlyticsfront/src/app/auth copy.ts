import NextAuth , { CredentialsSignin, type DefaultSession } from "next-auth"
import { string, ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "@/lib/auth/zod"
import PostgresAdapter from "@auth/pg-adapter"
import { Pool } from "pg"

import bcrypt from 'bcrypt';

// Careful: logic dealing with plaintext password strings
class CustomError extends CredentialsSignin {
  code = "custom_error"
 }
 
import { getUserFromDb, getUserByEmail } from "@/lib/db/user/getuser"


declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's company. */
      company: string
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"]
  }
}

const pool = new Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })
 
  const getUser = async (credentials: Partial<Record<"password" | "email", string>>) => {
    try {
      let user = null

      // to check kind of words, restrictions
      const { email, password } = await signInSchema.parseAsync(credentials)

      // logic to salt and hash the password

      const pwHash = await bcrypt.hash(password, 10);

      // logic to verify if user exists
        user = getUserByEmail(email);

        //user = await getUserFromDb(email, pwHash)

        console.log(user);
        if (user) {
            const isMatch = user?.password === credentials.password;

            if (isMatch) {
                return user;
            } else {
                throw new Error("Email or Password is not correct");
            }
        } else {
            throw new Error("User not found");
        }
    } catch (error) {
      if (error instanceof ZodError) {
        // Return `null` to indicate that the credentials are invalid
        return null
      }
    }
}

  
export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth(() => {
  // Create a `Pool` inside the request handler.
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  
  return {
    callbacks: {
      session({ session, token, user }) {
        // `session.user.company` is now a valid property, and will be type-checked
        // in places like `useSession().data.user` or `auth().user`
        return {
          ...session,
          user: {
            ...session.user,
            //company: user.company,
          },
        }
      },
      authorized: async ({ auth }) => {
        // Logged in users are authenticated, otherwise redirect to login page
        return !!auth
      },
    },
    adapter: PostgresAdapter(pool),
    session: {
      strategy: 'jwt'
    },
    providers: [
      Credentials({
        // adding fields to be submitted
        credentials: {
          email: {},
          password: {},
        },
        authorize: async (Credentials) => {
          if (Credentials === null) {
            throw new CustomError()
         }
         return await getUser(Credentials) // assuming it returns a User or null
        }
        
      })
    ],
  }
})



function isValidCredentials(credentials: Partial<Record<"password" | "email", unknown>>) {
  throw new Error("Function not implemented.")
}
/*

{/* a seguir a credencials:{} 
        authorize: async (credentials) => {

          try {
            
            user = await getUserFromDb(email, pwHash)

            if (!user) {
              // no user found, so this is the 1st attempt to login
              // we could do registration now if we want to
              throw new Error("User not found")
            }
            // return user object with their profile data
            return user
          } catch (error) {
            if (error instanceof ZodError) {
              // Return `null` to indicate that the credentials are invalid
              return null
            }

          }
        },
        


*/
/*
DATABASE_HOST=localhost
DATABASE_NAME=dbrelytics
DATABASE_USER=adriano
DATABASE_PASSWORD=alpgadmin
*/

/*

The SQL schema for the tables used by this adapter is as follows

CREATE TABLE verification_token
(
  identifier TEXT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  token TEXT NOT NULL,
 
  PRIMARY KEY (identifier, token)
);
 
CREATE TABLE accounts
(
  id SERIAL,
  "userId" INTEGER NOT NULL,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  "providerAccountId" VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  id_token TEXT,
  scope TEXT,
  session_state TEXT,
  token_type TEXT,
 
  PRIMARY KEY (id)
);
 
CREATE TABLE sessions
(
  id SERIAL,
  "userId" INTEGER NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  "sessionToken" VARCHAR(255) NOT NULL,
 
  PRIMARY KEY (id)
);
 
CREATE TABLE users
(
  id SERIAL,
  name VARCHAR(255),
  email VARCHAR(255),
  "emailVerified" TIMESTAMPTZ,
  image TEXT,
 
  PRIMARY KEY (id)
);
 

*/

/*

ONE SHOULD USE MORE ADVANCED THAN EMAIL/PASSWORD!
BUT IN OUR CASE, WE STICK WITH IT

The Credentials provider allows you to handle signing 
in with arbitrary credentials, such as a username and 
password, domain, or two factor authentication or hardware 
device (e.g. YubiKey U2F / FIDO).
It is intended to support use cases where you have an 
existing system you need to authenticate users against.
It comes with the constraint that users authenticated 
in this manner are not persisted in the database, and 
consequently that the Credentials provider can only be 
 if JSON Web Tokens are enabled for sessions.

*/

/////////////////

// https://authjs.dev/getting-started/session-management/protecting
