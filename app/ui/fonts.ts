import { Inter, Montserrat, Lusitana } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700', '800', '900'],
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
  adjustFontFallback: true,
});

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const lusitana = Lusitana({
  subsets: ['latin'],
  weight: ['400', '700'],
})
