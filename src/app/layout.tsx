import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Archie.Money - Retirement Projection Made Simple',
  description: 'Answer a few questions, get a clear roadmap for your retirement with Archie.Money. Calculate your projected retirement income and get personalized recommendations.',
  keywords: 'retirement planning, financial planning, 4% rule, retirement calculator, investment advice',
  icons: {
    icon: '/ArchieLogo.png',
    shortcut: '/ArchieLogo.png',
    apple: '/ArchieLogo.png',
  },
  openGraph: {
    title: 'Archie.Money - Retirement Projection Made Simple',
    description: 'Answer a few questions, get a clear roadmap for your retirement with Archie.Money.',
    url: 'https://archie.money',
    siteName: 'Archie.Money',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Archie.Money - Retirement Projection Made Simple',
    description: 'Answer a few questions, get a clear roadmap for your retirement with Archie.Money.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Analytics 4 */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-primary-bg text-text-primary antialiased min-h-screen`}>
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
} 