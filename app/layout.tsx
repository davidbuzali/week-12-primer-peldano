import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Primer Peldaño | Tu trabajo también cuenta',
  description: 'Evidencia de trabajo existente, mapeada con criterios visibles y sin puntaje global.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX">
      <body>{children}</body>
    </html>
  )
}
