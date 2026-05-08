import type { Metadata } from "next";
import "./globals.css";
import "bangul-vue/dist/bangul.css";

export const metadata: Metadata = {
  title: "Test Case 2 – Bangul via Veaury",
  description: "Using Bangul Vue 3 components in Next.js via Veaury bridge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
