'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  useEffect(() => {
    const toggleButton = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    const handleClick = () => {
      if (nav) {
        nav.classList.toggle('visible');
      }
    };

    if (toggleButton) {
      toggleButton.addEventListener('click', handleClick);
    }

    return () => {
      if (toggleButton) {
        toggleButton.removeEventListener('click', handleClick);
      }
    };
  }, [])

  return (
    <>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-NPVP4Z5"
          height="0" width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      <header id="header">
        <div className="inner">
          <div className="logo">
            <a href="/">
              <Image
                src="/img/logo/h-s.svg"
                width={136}
                height={30}
                alt="WIDEFIX Logo"
              />
            </a>
          </div>
          <nav className="top-nav">
            <ul>
              <li className={pathname?.startsWith('/showcases') ? 'active' : ''}>
                <Link href="/showcases"><svg className="header-nav-icon" aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg><span>Showcases</span></Link>
              </li>
              <li className={pathname === '/services' ? 'active' : ''}>
                <Link href="/services"><svg className="header-nav-icon" aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12a23 23 0 0 0 18 0M12 11v4" /></svg><span>Services</span></Link>
              </li>
              <li className={pathname === '/career' ? 'active' : ''}>
                <Link href="/career"><svg className="header-nav-icon" aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21h16M6 21v-6h4v6m0 0V10h4v11m0 0V5h4v16M4 10l5-5 4 2 6-5" /></svg><span>Career</span></Link>
              </li>
              <li className={pathname === '/team' ? 'active' : ''}>
                <Link href="/team"><svg className="header-nav-icon" aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3" /><path d="M3 21v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 4v2" /></svg><span>Team</span></Link>
              </li>
              <li className={pathname === '/contact' ? 'active' : ''}>
                <Link href="/contact"><svg className="header-nav-icon" aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg><span>Contact</span></Link>
              </li>
              <li className={pathname?.includes('blog') ? 'active' : ''}>
                <Link href="https://widefix.com/blog" target="_blank"><svg className="header-nav-icon" aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 7h8M8 11h8M8 15h5" /></svg><span>Blog</span></Link>
              </li>
            </ul>
          </nav>
          <div className="cta-button">
            <a className="button primary small" href="https://calendly.com/andrei-kaleshka/30min" target="_blank" rel="noopener noreferrer nofollow">
              Schedule a call
            </a>
          </div>
          <button className="menu-toggle">&#9776;</button>
        </div>
      </header>
    </>
  )
}
