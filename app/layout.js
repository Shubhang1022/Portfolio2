import './globals.css'
import { Inter, Russo_One, Orbitron } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const russo = Russo_One({ subsets: ['latin'], weight: '400', variable: '--font-russo' })
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })

export const metadata = {
  title: 'Shubhang — Full Stack Developer | AI Engineer | UI/UX Designer',
  description: 'Cinematic developer portfolio of Shubhang. Full stack, AI and UI/UX — crafted with a spider-verse soul.',
  icons: {
    icon: 'https://customer-assets.emergentagent.com/job_d2581c17-2329-4bd0-b1dc-d1732adefe4a/artifacts/alm67zts_download%20%281%29.jpg',
    shortcut: 'https://customer-assets.emergentagent.com/job_d2581c17-2329-4bd0-b1dc-d1732adefe4a/artifacts/alm67zts_download%20%281%29.jpg',
  },
  openGraph: {
    title: 'Shubhang — Cinematic Portfolio',
    description: 'Full Stack Developer · AI Engineer · UI/UX Designer',
    images: ['https://customer-assets.emergentagent.com/job_d2581c17-2329-4bd0-b1dc-d1732adefe4a/artifacts/mpgx56wi_spidey.jpg'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${russo.variable} ${orbitron.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body className="bg-[#050505] text-[#F5F5F5] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
