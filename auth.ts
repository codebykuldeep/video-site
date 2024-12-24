import { AuthOptions, getServerSession, User,  } from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserForAuth, providerloginAction } from "./utils/user-auth";
import { credType } from "./helper/authTypes";



const authOptions: AuthOptions = {
    
  providers: [
        GitHubProvider({
      clientId: process.env.GITHUB_CLIENT as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials){
            
          const user =(await getUserForAuth(credentials as credType) as unknown) as User;
          
          return user;
        }
    })
  ],
  session: {
    strategy: "jwt", 
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account!.provider === 'github') {
        providerloginAction(user);
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        // On first time sign-in, add user data to JWT
        token.id = user.id;
        token.email = user.email;
      }
      
      return token;
    },
    async session({ session, token }) {
      // Pass the user data from the JWT token to the session
      //storing the user data so that we can access it throughout whole application
      
  
      session.user!.id = token.id as string;
      session.user!.email = token.email;
      
      return session;
    },
  },
}


const serverSession = () => getServerSession(authOptions)

export { authOptions, serverSession }