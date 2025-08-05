import NextAuth, { CredentialsSignin } from "next-auth"
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { User } from "./models/user";
import { compare } from "bcryptjs";
 
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
        authorize: async (credentials)=>{

            const email=credentials.email as string;
            const password=credentials.password as string;

            if(!email || !password) throw new CredentialsSignin("Please Provide both email and password");

            const user= await User.findOne({email}).select("+password");

            if(!user) throw new CredentialsSignin("Invalid Email or password");

            if(!user.password) throw new CredentialsSignin("You signed in from Google earlier");

            const isMatch =await compare(password,user.password);

            if(!isMatch) throw new CredentialsSignin("Invalid email or password");

            return {name:user.name,email:user.email,id:user._id};

        }
    })
  ],
})
