import { auth } from "@/auth";
import Page from "@/components/Client/Signu";
import { redirect } from "next/navigation";

const SignupPage = async() => {
  const session=await auth();
 
  if(session?.user) return redirect("/");

  return <Page/>
};

export default SignupPage;
