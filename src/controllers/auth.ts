"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Username and password are required." };
  }

  try {
    // 1. Find user in database
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return { error: "Invalid username or password." };
    }

    // 2. Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { error: "Invalid username or password." };
    }

    // 3. Set secure session cookie
    const cookieStore = await cookies();
    cookieStore.set("auth_session", JSON.stringify({ 
      id: user.id, 
      username: user.username, 
      role: user.role 
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    // 4. Redirect on success
  } catch (err) {
    console.error("Login Error:", err);
    return { error: "An unexpected error occurred. Please try again later." };
  }

  redirect("/dashboard");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_session");
  redirect("/login");
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("auth_session");
  if (!session) return null;
  
  try {
    return JSON.parse(session.value);
  } catch {
    return null;
  }
}
