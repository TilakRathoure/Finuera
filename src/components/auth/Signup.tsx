"use client";

import { signup } from "@/server/actions/auth";
import { redirect } from "next/navigation";
import { useState } from "react";
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
import Link from "next/link";
import { Label } from "../ui/label";
import { BlurIn } from "../ui/motion";

const Signup = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="page-shell atmosphere flex min-h-[100svh] items-center justify-center px-4 pb-4 pt-20 md:pt-[5.25rem]">
      <BlurIn className="w-full max-w-sm">
        <Card className="border-border/70 bg-card/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-display text-2xl font-semibold tracking-tight">
              Create an account
            </CardTitle>
            <CardDescription>
              A few details — then your finance workspace.
            </CardDescription>
            <CardAction>
              <Link href="/login">
                <Button variant="link">Log in</Button>
              </Link>
            </CardAction>
          </CardHeader>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (loading) return;

              const formdata = new FormData(e.currentTarget);
              const name = formdata.get("name") as string;
              const email = formdata.get("email") as string;
              const password = formdata.get("password") as string;

              if (!name || !email || !password) {
                toast.error("Please fill all fields");
                return;
              }

              setLoading(true);
              const loa = toast.loading("creating");
              try {
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
              } finally {
                setLoading(false);
              }
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

            <CardFooter className="mt-5 flex-col gap-2">
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? "Loading…" : "Sign up"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </BlurIn>
    </div>
  );
};

export default Signup;
