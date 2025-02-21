import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/components/PosthogProvider";

const jetbrainsMono = localFont({
  src: "./fonts/JetBrainsMono-Regular.woff2",
  variable: "--font-jetbrains-mono",
  weight: "100 900",
});

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jan Hoon",
  description: "Data and Platform Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} ${jetbrainsMono.variable} antialiased bg-gray-800 text-gray-100`}
      >
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
