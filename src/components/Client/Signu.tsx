'use client'
import { signup } from '@/actions/server';
import { redirect } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from '../ui/card';
import { Input } from '../ui/input';
import Link from 'next/link';
import { Label } from '../ui/label';

const Login = () => {
  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Enter your details below to sign up.
          </CardDescription>
          <CardAction>
            <Link href="/login">
              <Button variant="link">Log In</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <form
          action={async (formdata: FormData) => {
            const name = formdata.get("name") as string;
            const email = formdata.get("email") as string;
            const password = formdata.get("password") as string;

            if (!name || !email || !password) {
              toast.error("Please fill all fields");
              return;
            }
            const loa = toast.loading("creating");

            const check = await signup(name, email, password);

            if (check)
              toast.error(check, {
                id: loa,
              });
            else
              toast.success("Success", {
                id: loa,
              });
            redirect("/login");
          }}
        >
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" name="name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" name="email" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" name="password" />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2 mt-5">
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
            {/* <Button variant="outline" className="w-full">
              Sign up with Google
            </Button> */}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Login