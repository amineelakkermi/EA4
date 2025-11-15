import Image from 'next/image'
import Link from 'next/link'
import { JSX } from 'react'
import logo2 from '../public/logo2.png';

type Social = {
  id: 'facebook' | 'instagram' | 'tiktok' | 'snapchat' | 'x'
  href: string
  label: string
  icon: JSX.Element
}

const socials: Social[] = [
  {
    id: 'instagram',
    href: 'https://www.instagram.com/code_journeyyy/',
    label: 'Instagram',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    id: 'tiktok',
    href: 'https://www.tiktok.com/@codejourneyyy',
    label: 'TikTok',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48" fill="currentColor">
        <path d="M41.5 17.6c-4.3-.9-7.8-3.8-9.3-7.8V34c0 6.1-5 11-11.1 11S10 40.1 10 34s5-11 11.1-11c.7 0 1.4.1 2 .2v6.6c-.6-.2-1.3-.3-2-.3-3 0-5.4 2.4-5.4 5.4S18.1 40 21.1 40s5.4-2.4 5.4-5.4V4.5h6.6c1.2 5.1 5.4 9.2 10.7 10.3v6.8z" />
      </svg>
    ),
  },
 

]

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto w-full max-w-7xl py-4 px-6 sm:px-10">
        <div className="h-16 sm:h-20 flex items-center justify-between">
          {/* Logo (EA4 text) */}
          <div className="logo">
            <Link href='/'>
            <Image src={logo2} width={50} height={50} alt='logo' />
            </Link>
          </div>

          {/* Socials */}
          <ul className="flex items-center gap-4 sm:gap-5">
            {socials.map((s) => (
              <li key={s.id}>
                <Link
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full ring-1 ring-white/70 hover:bg-white/10 transition"
                >
                  {s.icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}