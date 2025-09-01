"use server";

import { signIn } from "@/auth";
import { connectdb } from "@/lib/utils";
import { User } from "@/models/user";
import { hash } from "bcryptjs";

const signup = async (name: string, email: string, password: string) => {
  try {
    await connectdb();

    const user = await User.findOne({ email });

    if (user) throw new Error("user already exists, please Login");

    const hashedpassword = await hash(password, 8);

    await User.create({
      name,
      email,
      password: hashedpassword,
    });
  } catch (error) {
    const err = error as Error;
    return err.message;
  }
};

const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    const err = error as Error;
    return err.message;
  }
};

export { signup, login };
