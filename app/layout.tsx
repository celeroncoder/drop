import "./globals.css";
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { ClerkProvider, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Toaster } from "@/components/ui/toaster";
import { LoaderPinwheelIcon } from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "drop",
  description: "drop stuff here...",
  icons: {
    icon: "/favicon.svg", // Specify the path to the SVG favicon
    shortcut: "/favicon.svg", // Optional shortcut icon
    apple: "/favicon.svg", // Optional Apple touch icon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistMono.variable} antialiased font-mono`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ClerkLoading>
              <div className="flex min-h-screen w-full items-center justify-center overflow-hidden">
                <LoaderPinwheelIcon className="size-10 stroke-2 animate-spin" />
              </div>
            </ClerkLoading>
            <ClerkLoaded>
              <QueryProvider>
                <NextSSRPlugin
                  /**
                   * The `extractRouterConfig` will extract **only** the route configs
                   * from the router to prevent additional information from being
                   * leaked to the client. The data passed to the client is the same
                   * as if you were to fetch `/api/uploadthing` directly.
                   */
                  routerConfig={extractRouterConfig(ourFileRouter)}
                />
                {children}
                <Toaster />
              </QueryProvider>
            </ClerkLoaded>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
