import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bibliothèque de Français",
  description: "Catálogo e controle de acervo de livros de francês por nível CEFR.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}