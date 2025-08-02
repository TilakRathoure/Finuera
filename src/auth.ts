import NextAuth, { CredentialsSignin } from "next-auth"
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET
    }),
    Credentials({
        name: "Credentials",
        credentials:{
            email:{
                label:"Email",
                type:"email",
            },
            password:{
                label:"Password", type:"password"},
        },
        authorize: async ({email,password})=>{
            console.log(email,password);

            if(typeof email !=="string") throw new CredentialsSignin("Email is not valid")

            const user={email, id: "dfd"};

            if(password!="passcode")
                throw new CredentialsSignin("Password does not match");
            else return user;

        }
    })
  ],
})
