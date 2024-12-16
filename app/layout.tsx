import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import "./globals.css";
import NavBar from "@/components/Header/NavBar";
import Providers from "./provider";
import { serverSession } from "@/auth";



export const metadata: Metadata = {
  title: "VideoStream",
  description: "VideoStream - videos sharing platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await serverSession()
  return (
    <html lang="en">
      <body>
        <Providers session={session}>
        <AppRouterCacheProvider>
        <NavBar/>
        {children}
        </AppRouterCacheProvider> 
        </Providers>
      </body>
    </html>
  );
}
