import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <>
      <section className="page-footer">
        <div className="inner">
          <footer>
            <div className="footer-left">
              © 2024 Widefix. All rights reserved.
            </div>
            <div className="footer-right">
              <ul>
                <li>
                  <Link href="https://www.linkedin.com/company/widefix/" target="_blank" rel="nofollow">
                    <Image src="../img/icons/linkedin.svg" alt="LinkedIn Icon" width="24" height="24" />
                  </Link>
                </li>
                <li>
                  <Link href="https://clutch.co/profile/widefix" target="_blank" rel="nofollow">
                    <Image src="../img/icons/clutch.svg" alt="Clutch Icon" width="24" height="24" />
                  </Link>
                </li>
                <li>
                  <Link href="https://github.com/widefix" target="_blank" rel="nofollow">
                    <Image src="../img/icons/github.svg" alt="GitHub Icon" width="24" height="24" />
                  </Link>
                </li>
                <li>
                  <Link href="https://twitter.com/ka8725" target="_blank" rel="nofollow">
                    <Image src="../img/icons/twitter.svg" alt="Twitter Icon" width="24" height="24" />
                  </Link>
                </li>
              </ul>
            </div>
          </footer>
        </div>
      </section>

      <section className="back-to-top">
        <div className="inner">
          <div className="back-to-top-wrapper">
            <span>Back to Top</span>
            <a id="toTop" href="#header">
              <Image src="../img/icons/back-to-top.svg" alt="Back to Top" width="28" height="28" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
