import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"], 
});

const poppins = Poppins({ 
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["600"], 
});

export const metadata: Metadata = {
  title: "Day One",
  description: "Everything your business needs online.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* Add both font variables to the body */}
      <body className={`${inter.variable} ${poppins.variable} font-inter font-normal antialiased`}>
        {children}
      </body>
    </html>
  );
}