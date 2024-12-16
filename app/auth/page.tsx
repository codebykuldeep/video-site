import AuthLayout from "@/components/AuthPage/AuthLayout";
import { routeProtect } from "@/utils/user-auth";

export default async function AuthPage() {
  await routeProtect();
  return (
    <>
    <AuthLayout/>
    </>
  )
}
