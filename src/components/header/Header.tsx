'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
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
                <Link href="/showcases">Showcases</Link>
              </li>
              <li className={pathname === '/services' ? 'active' : ''}>
                <Link href="/services">Services</Link>
              </li>
              <li className={pathname === '/contact' ? 'active' : ''}>
                <Link href="/contact">Contact</Link>
              </li>
              <li className={pathname?.includes('blog') ? 'active' : ''}>
                <Link href="https://widefix.com/blog" target="_blank">Blog</Link>
              </li>
            </ul>
          </nav>
          <div className="cta-button">
            <a
              className="button primary small"
              href="https://calendly.com/andrei-kaleshka/30min"
              target="_blank"
              rel="nofollow"
            >
              Schedule call
            </a>
          </div>
          <button className="menu-toggle">&#9776;</button>
        </div>
      </header>
    </>
  )
}
