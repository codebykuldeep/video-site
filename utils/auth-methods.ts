"use server";

import { UserType } from "@/helper/commonTypes";
import { serverValidation } from "@/helper/validation";
import { getUser, insertUser } from "@/lib/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signUpAction(state: string, formData: FormData) {
  const { name, email, password } = Object.fromEntries(formData.entries());
  let data: UserType;
  if (
    typeof name === "string" &&
    typeof email === "string" &&
    typeof password === "string"
  ) {
    data = { name, email, password };
    const error = serverValidation(data);

    if (Object.entries(error).length > 0) {
      
      return "Please enter valid inputs !";
    }

    try {
      insertUser(data);
    } catch (error: any) {
      return `error : ${error.message}`;
    }

    redirect("/home");
  }
  return '';
}

export async function loginAction(prevState: string, formData: FormData) {
 
  const { name, email, password } = Object.fromEntries(formData.entries());
  let data: UserType;
  if (typeof email === "string" && typeof password === "string") {
    data = { email, password };
    const error = serverValidation(data);

    if (Object.entries(error).length > 0) {
      return "Please enter valid inputs !";
    }
    
    try {
      const user: any = getUser(data.email);
      if (user.password === data.password) {
        
        redirect("/home");
      } else {
        return `Please check your crendentials`;
      }
    } catch (error: any) {
      return `Please check your crendentials`;
    }
  }

  return '';
}

