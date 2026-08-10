import { auth } from "@/server/auth";
import Page from "@/components/auth/Signup";
import { redirect } from "next/navigation";

const SignupPage = async() => {
  const session=await auth();
 
  if(session?.user) return redirect("/");

  return <Page/>
};

export default SignupPage;
