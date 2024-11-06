import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });
const ffvf = localFont({ src: "../../public/fonts/PIXEL.ttf" });

export const metadata = {
  title: "PLVYSTYLE",
  description: "Find out your playstyle",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ffvf.className}>{children}</body>
    </html>
  );
}
