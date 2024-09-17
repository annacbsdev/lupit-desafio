import Aside from "./components/Aside";
import Header from "./components/Header";
import './globals.css'

import { Roboto } from 'next/font/google';

// Importa a fonte Roboto
const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'Your App Title',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        <Header />
        <div className="flex">
          <Aside />
          {children}
        </div>
      </body>
    </html>
  );
}
