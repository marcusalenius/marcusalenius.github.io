import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { Inconsolata } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const nunitoSans = Nunito_Sans({ subsets: ["latin"] });
const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-inconsolata",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alenius.io"),
  title: "Marcus Alenius",
  description: "",
  authors: [{ name: "Marcus Alenius" }],
  creator: "Marcus Alenius",
  openGraph: {
    type: "website",
    url: "https://alenius.io",
    title: "Marcus Alenius",
    siteName: "Marcus Alenius",
    description: "",
  },
  twitter: {
    card: "summary_large_image",
    site: "@site",
    creator: "@creator",
    title: "Marcus Alenius",
    description: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunitoSans.className} ${inconsolata.variable}`}>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  );
}
