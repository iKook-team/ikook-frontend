import localFont from 'next/font/local'

export const fontSans = localFont({
  src: '../public/fonts/inter-var.woff2',
  variable: '--font-sans',
  display: 'swap',
})

export const fontMono = localFont({
  src: '../public/fonts/fira-code.woff2',
  variable: '--font-mono',
  display: 'swap',
})
