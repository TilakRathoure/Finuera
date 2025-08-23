import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Page from "@/components/Client/Login";



const CardDemo=async()=>{

  const session =await auth();

  if(session?.user) return redirect("/");
  
  return (
    <Page/>
  )


}

export default CardDemo;
