"use client";

import { useEffect } from "react";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }) {
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const isDark = savedMode ? savedMode === "true" : prefersDark;
    const isDark2 = document.documentElement.classList.contains("dark");

    document.documentElement.classList.toggle("dark", isDark, isDark2);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
