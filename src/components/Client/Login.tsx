"use client";

import { login } from "@/actions/server";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Link from "next/link";

const Page = () => {
  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm ">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link href="/signup">
              <Button variant="link">Sign Up</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <form
          action={async (formdata: FormData) => {
            const email = formdata.get("email") as string;
            const password = formdata.get("password") as string;

            if (!email || !password) {
              toast.error("Please provide all fields");
              return;
            }

            const get = await login(email, password);

            if (get) {
              toast.error(get);
              return;
            }

            toast.success("successs");
            redirect("/");
          }}
        >
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" name="email" />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" name="password" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2 mt-5">
            <Button type="submit" className="w-full">
              Login
            </Button>
            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Page;
