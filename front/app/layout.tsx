import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from './providers' // 1. Importe o nosso novo arquivo de Providers
import './globals.css'

// Configuração correta das fontes para injetar no HTML via variáveis CSS
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: 'EduStock - Sistema de Gerenciamento de Estoque Escolar',
  description: 'Sistema moderno de gerenciamento de estoque escolar multi-escola. Controle de itens, movimentações, relatórios e muito mais.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0B1120' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      {/* 2. Aplicamos as variáveis das fontes no body para o Tailwind/CSS reconhecer */}
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background`}>
        
        {/* 3. Envolvemos a aplicação com o gerenciador do TanStack Query */}
        <Providers>
          {children}
        </Providers>

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}