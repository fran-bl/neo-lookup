import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSwitcher } from "@/components/theme-switcher";
import type { Metadata } from "next";
import { Rubik, Rubik_Mono_One } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

const rubikMonoOne = Rubik_Mono_One({
  variable: "--font-rubik-mono-one",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Near Earth Object Lookup",
  description: "A simple Next.js application to look up near-Earth objects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={rubik.className} suppressHydrationWarning>
      <body
        className={`${rubik.variable} ${rubikMonoOne.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeSwitcher />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
