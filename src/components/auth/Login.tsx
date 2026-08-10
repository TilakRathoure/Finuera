"use client";

import { login } from "@/server/actions/auth";
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
import { BlurIn } from "../ui/motion";

const Login = () => {
  return (
    <div className="page-shell atmosphere flex min-h-[100svh] items-center justify-center px-4 pb-4 pt-20 md:pt-[5.25rem]">
      <BlurIn className="w-full max-w-sm">
        <Card className="border-border/70 bg-card/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-display text-2xl font-semibold tracking-tight">
              Welcome back
            </CardTitle>
            <CardDescription>
              Sign in with your email to continue.
            </CardDescription>
            <CardAction>
              <Link href="/signup">
                <Button variant="link">Sign up</Button>
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
            <CardFooter className="mt-5 flex-col gap-2">
              <Button type="submit" className="w-full">
                Log in
              </Button>
            </CardFooter>
          </form>
        </Card>
      </BlurIn>
    </div>
  );
};

export default Login;
