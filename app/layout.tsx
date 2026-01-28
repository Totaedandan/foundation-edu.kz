import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata = {
  title: "Foundation — Your Gateway to Higher Education",
  description: "Подготовка к поступлению в зарубежные университеты: IELTS, SAT, AP, Research, Counseling.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
