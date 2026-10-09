import type { Metadata } from 'next';
import { socialPreview, socialTwitter } from '@/lib/socialPreview';

import LinkIndicator from '@/components/LinkIndicator';
import ClutchWidget from '@/components/ClutchWidget';
import SituationIcon from '@/components/rails/SituationIcon';
import RailsFAQ from '@/components/rails/RailsFAQ';
import { OwnershipProcess, OwnershipCTA, RailsCall } from '@/components/rails/RailsOwnership';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  twitter: socialTwitter('/img/rails-ownership-hero.svg', 'Your Rails application, in good hands'),
  openGraph: {
    title: 'Ruby on Rails Application Ownership - WideFix',
    description: 'WideFix takes ownership of existing Ruby on Rails applications: handover, stabilization, maintenance, upgrades and ongoing feature development.',
    url: 'https://widefix.com',
    siteName: 'WideFix',
    type: 'website',
    images: [socialPreview('/img/rails-ownership-hero.svg', 'Your Rails application, in good hands')],
  },
};

export default function HomePage() {
  return (
    <main className="rails-home">
      <section className="rails-section rails-hero">
        <div className="inner rails-hero-grid">
          <div>
            <p className="rails-eyebrow">Ruby on Rails application ownership</p>
            <h1>We take ownership of existing <span>Ruby on Rails</span> applications</h1>
            <p className="rails-lead">Need someone to take over your Rails app?</p>
            <p className="rails-intro">We maintain, stabilize and improve existing Rails applications from production issues and upgrades to new features and infrastructure. Keep your product moving without unnecessary rewrites or rebuilding your engineering team.</p>
            <div className="rails-actions"><RailsCall /><Link href="#how-we-take-over">How we take over <LinkIndicator /></Link></div>
          </div>
          <div className="rails-hero-aside">
            <Image src="/img/rails-ownership-hero.svg" alt="Your Rails application supported through takeover, stabilization, maintenance and ongoing development" width={560} height={490} priority />
            <p>Ongoing maintenance + product development</p>
          </div>
        </div>
      </section>
      <section className="clients has-vertical-paddings">
        <div className="inner">
          <header id="clients">
            <h2>Clients who <span>trusted</span> us with their projects</h2>
            <p>
              We provide our services to clients worldwide, spanning the United States, Europe, North and South America, the United Kingdom of Great Britain, Australia, and beyond.
            </p>
          </header>
          <div className="container">
            <div className="client">
              <Image src="/img/showcases/clients/hipchip.svg" alt="HipChip" width={180} height={54} />
            </div>
            <div className="client">
              <Image src="/img/showcases/clients/tma-sport.svg" alt="TMA Sport" width={106} height={70} />
            </div>
            <div className="client">
              <picture>
                <source srcSet="/img/clients/toptal.webp" type="image/webp" />
                <Image src="/img/clients/toptal.png" alt="Toptal icon" width="116" height="32" />
              </picture>
            </div>
            <div className="client">
              <picture>
                <source srcSet="/img/clients/hubstaff.webp" type="image/webp" />
                <Image src="/img/clients/hubstaff.png" alt="Hubstaff icon" width="150" height="32" />
              </picture>
            </div>
            <div className="client">
              <svg xmlns="http://www.w3.org/2000/svg" width="190" height="45" viewBox="0 0 295.299 66.068">
                <defs>
                  <linearGradient id="2DERaw" x1="0.103" y1="1.006" x2="1.092" y2="-0.156" gradientUnits="objectBoundingBox">
                    <stop offset="0" stopColor="#a03c95" stopOpacity="0"></stop>
                    <stop offset="1" stopColor="#49c7f2"></stop>
                  </linearGradient>
                  <linearGradient id="GMz8hs" x1="-0.053" y1="1.193" x2="0.931" y2="0.031" href="#2DERaw">
                  </linearGradient>
                  <linearGradient id="9ZjmPy" x1="-0.208" y1="1.417" x2="1.399" y2="-0.588" href="#2DERaw">
                  </linearGradient>
                </defs>
                <g transform="translate(-903.897 -807.225)">
                  <g transform="translate(903.897 807.225)">
                    <path
                      d="M953.512,807.46c9.864,3.983,16.417,11.1,16.014,22.6a21.4,21.4,0,0,1-2.232,8.572c-4.758,9.484-9.882,18.785-14.813,28.184a11.474,11.474,0,0,1-8.607,6.442c-5.459.963-11.629-3.7-12.057-9.248a12.911,12.911,0,0,1,1.5-7.34q8.663-16.133,17.184-32.343a34.736,34.736,0,0,0,3.937-11.057A9.4,9.4,0,0,0,953.512,807.46Z"
                      transform="translate(-915.243 -807.321)" fill="#b700ba"></path>
                    <path
                      d="M1006.039,807.351c6.234,2.749,11.39,6.236,14.124,12.444a21.312,21.312,0,0,1-.444,19.156c-4.9,9.52-10.026,18.928-15.009,28.407a10.859,10.859,0,0,1-10.578,5.926,10.639,10.639,0,0,1-9.63-8.493,10.749,10.749,0,0,1,1.043-7.534q8.5-15.962,16.968-31.937a38.259,38.259,0,0,0,4.4-11.683A9.716,9.716,0,0,0,1006.039,807.351Z"
                      transform="translate(-936.6 -807.276)" fill="#b700ba"></path>
                    <path
                      d="M910.886,807.225c5.19,2.438,9.828,5.043,12.725,9.841,4.6,7.616,4.734,15.365.336,23.072-2.3,4.035-6.076,5.7-10.619,5.249a10.492,10.492,0,0,1-9.156-8.274,11.128,11.128,0,0,1,1.08-7.827c2.327-4.285,4.806-8.51,6.056-13.287C912.06,813.125,912.549,810.254,910.886,807.225Z"
                      transform="translate(-903.896 -807.225)" fill="#b700ba"></path>
                  </g><text transform="translate(1002.196 843.073)" fontSize="33" fontFamily="Avenir-Medium, Avenir"
                    fontWeight="500" fill="#000">
                    <tspan x="0" y="0" letterSpacing="0.23em">WORSHI</tspan>
                    <tspan y="0">P</tspan>
                  </text><text transform="translate(1098.316 865.3)" fontSize="14" fontFamily="Avenir-Book, Avenir"
                    fill="#000">
                    <tspan x="-87.479" y="0" letterSpacing="1.75em">ONLIN</tspan>
                    <tspan y="0">E</tspan>
                  </text>
                  <g transform="translate(903.897 807.225)">
                    <path
                      d="M953.512,807.46c9.864,3.983,16.417,11.1,16.014,22.6a21.4,21.4,0,0,1-2.232,8.572c-4.758,9.484-9.882,18.785-14.813,28.184a11.474,11.474,0,0,1-8.607,6.442c-5.459.963-11.629-3.7-12.057-9.248a12.911,12.911,0,0,1,1.5-7.34q8.663-16.133,17.184-32.343a34.736,34.736,0,0,0,3.937-11.057A9.4,9.4,0,0,0,953.512,807.46Z"
                      transform="translate(-915.243 -807.321)" fill="url(#2DERaw)"></path>
                    <path
                      d="M1006.039,807.351c6.234,2.749,11.39,6.236,14.124,12.444a21.312,21.312,0,0,1-.444,19.156c-4.9,9.52-10.026,18.928-15.009,28.407a10.859,10.859,0,0,1-10.578,5.926,10.639,10.639,0,0,1-9.63-8.493,10.749,10.749,0,0,1,1.043-7.534q8.5-15.962,16.968-31.937a38.259,38.259,0,0,0,4.4-11.683A9.716,9.716,0,0,0,1006.039,807.351Z"
                      transform="translate(-936.6 -807.276)" fill="url(#GMz8hs)"></path>
                    <path
                      d="M910.886,807.225c5.19,2.438,9.828,5.043,12.725,9.841,4.6,7.616,4.734,15.365.336,23.072-2.3,4.035-6.076,5.7-10.619,5.249a10.492,10.492,0,0,1-9.156-8.274,11.128,11.128,0,0,1,1.08-7.827c2.327-4.285,4.806-8.51,6.056-13.287C912.06,813.125,912.549,810.254,910.886,807.225Z"
                      transform="translate(-903.896 -807.225)" fill="url(#9ZjmPy)"></path>
                  </g>
                </g>
              </svg>
            </div>
            <div className="client">
              <Image src="/img/showcases/clients/costa-del-home.svg" alt="Costa Del Home" width={250} height={100} />
            </div>
            <div className="client">
              <picture>
                <source srcSet="/img/clients/activeplatform.webp" type="image/webp" />
                <Image src="/img/clients/activeplatform.png" alt="ActivePlatform icon" width="201" height="24" />
              </picture>
            </div>
            <div className="client">
              <picture>
                <source srcSet="/img/clients/palladium.webp" type="image/webp" />
                <Image src="/img/clients/palladium.png" alt="Palladium icon" width="180" height="20" />
              </picture>
            </div>
            <div className="client">
              <picture>
                <source srcSet="/img/clients/schildr.webp" type="image/webp" />
                <Image src="/img/clients/schildr.png" alt="SCHILDR icon" width="180" height="50" />
              </picture>
            </div>
            <div className="client">
              <svg xmlns="http://www.w3.org/2000/svg" width="283" height="38" viewBox="0 0 283 38" fill="none"><path d="M134.824 12.5906C131.264 12.5906 128.168 13.7774 125.588 16.0995C123.008 18.4215 121.718 21.4144 121.718 25.078C121.718 28.7417 123.008 31.7861 125.588 34.1598C128.168 36.5334 131.264 37.7202 134.824 37.7202C139.159 37.7202 143.029 35.811 145.299 32.5601L139.468 28.4321C138.436 30.0317 136.888 30.8573 134.824 30.8573C133.225 30.8573 131.831 30.3413 130.645 29.2577C129.458 28.1741 128.839 26.7808 128.839 25.078C128.839 23.4268 129.458 22.0852 130.645 21.0531C131.831 19.9695 133.225 19.4535 134.824 19.4535C136.888 19.4535 138.436 20.2791 139.468 21.8788L145.299 17.6991C142.977 14.4482 139.107 12.5906 134.824 12.5906Z" fill="#0F4E54"></path><path d="M173.398 37.2042V13.1066H166.277V15.7899C164.625 13.4678 161.529 12.5906 159.259 12.5906C156.008 12.5906 153.17 13.7774 150.693 16.0995C148.216 18.4215 146.978 21.4144 146.978 25.1296C146.978 28.8449 148.216 31.8893 150.693 34.2114C153.17 36.5334 156.008 37.6686 159.259 37.6686C160.394 37.6686 161.684 37.4106 163.077 36.843C164.522 36.2754 165.606 35.5014 166.277 34.4694V37.2042H173.398ZM160.446 30.8573C158.846 30.8573 157.453 30.3413 156.214 29.2577C155.028 28.1741 154.408 26.7808 154.408 25.1296C154.408 23.4784 155.028 22.1368 156.214 21.0531C157.453 19.9695 158.846 19.4019 160.446 19.4019C163.542 19.4019 166.277 21.6724 166.277 25.1296C166.277 28.5869 163.542 30.8573 160.446 30.8573Z" fill="#0F4E54"></path><path d="M185.643 28.7933C185.643 22.3948 187.655 19.1955 191.628 19.1955C193.073 19.1955 194.312 19.4535 195.292 19.9179L196.582 13.4678C195.395 12.9002 194.054 12.5906 192.454 12.5906C189.719 12.5906 186.829 14.7578 185.643 18.9375V13.1066H178.47V37.2042H185.643V28.7933Z" fill="#0F4E54"></path><path d="M206.017 25.078C206.017 21.5692 208.494 19.3503 211.59 19.3503C214.686 19.3503 217.163 21.724 217.163 25.078C217.163 28.5869 214.686 30.9089 211.59 30.9089C208.494 30.9089 206.017 28.4321 206.017 25.078ZM205.863 34.2114C207.049 36.4302 209.836 37.7202 212.932 37.7202C216.131 37.7202 218.866 36.585 221.136 34.263C223.458 31.9409 224.594 28.8965 224.594 25.2328C224.594 21.466 223.458 18.4215 221.136 16.0995C218.866 13.7774 216.131 12.5906 212.932 12.5906C209.836 12.5906 207.049 13.9322 205.863 16.0479V0H198.742V37.2042H205.863V34.2114Z" fill="#0F4E54"></path><path d="M239.277 30.5993C236.233 30.5993 233.859 28.3805 233.859 25.078C233.859 21.9304 236.233 19.6083 239.277 19.6083C242.322 19.6083 244.747 21.9304 244.747 25.078C244.747 28.3805 242.373 30.5993 239.277 30.5993ZM248.153 34.1598C250.578 31.8377 251.816 28.7933 251.816 25.078C251.816 21.3628 250.578 18.3699 248.153 16.0479C245.727 13.7258 242.786 12.5906 239.277 12.5906C235.768 12.5906 232.827 13.7258 230.402 16.0479C227.977 18.3699 226.79 21.3628 226.79 25.078C226.79 28.7933 227.977 31.8377 230.402 34.1598C232.827 36.4818 235.768 37.617 239.277 37.617C242.786 37.617 245.727 36.4818 248.153 34.1598Z" fill="#0F4E54"></path><path d="M262.582 24.4588C262.582 21.2079 264.079 19.5567 267.02 19.5567C269.548 19.5567 271.2 21.2596 271.2 24.3556V37.2042H278.372V22.8076C278.372 16.0479 275.121 12.5906 269.548 12.5906C266.71 12.5906 263.872 14.1902 262.582 16.6155V13.1066H255.41V37.2042H262.582V24.4588Z" fill="#0F4E54"></path><path fillRule="evenodd" clipRule="evenodd" d="M33.7558 13.1066V37.2042H40.8767V13.1066H33.7558ZM37.3163 0C34.8394 0 32.827 1.85763 32.827 4.17967C32.827 6.50171 34.8394 8.41094 37.3163 8.41094C39.7415 8.41094 41.7024 6.50171 41.7024 4.17967C41.7024 1.85763 39.7415 0 37.3163 0ZM13.9322 8.51414C16.6671 8.51414 18.7311 9.54616 20.2275 11.6618C21.724 13.7774 22.4464 16.3575 22.4464 19.5051C22.4464 22.6012 21.724 25.1812 20.2275 27.2453C18.7311 29.3093 16.6671 30.3413 13.9322 30.3413H7.53372V8.51414H13.9322ZM13.9322 37.2042C18.9375 37.2042 22.8592 35.553 25.6972 32.2505C28.5353 28.9481 29.9801 24.7168 29.9801 19.5051C29.9801 14.2934 28.5353 10.0622 25.6972 6.70811C22.8592 3.35406 18.9375 1.65123 13.9322 1.65123H0V37.2042H13.9322ZM48.1847 3.87006H55.3056V13.1066H60.3625V18.7827H55.3056V37.2042H48.1847V18.7827H43.7986V13.1066H48.1847V3.87006ZM74.5217 12.5906C70.9613 12.5906 67.8652 13.7774 65.2852 16.0995C62.7051 18.4215 61.4151 21.4144 61.4151 25.078C61.4151 28.7417 62.7051 31.7861 65.2852 34.1598C67.8652 36.5334 70.9613 37.7202 74.5217 37.7202C78.8562 37.7202 82.7262 35.811 84.9967 32.5601L79.1658 28.4321C78.1338 30.0317 76.5857 30.8573 74.5217 30.8573C72.9221 30.8573 71.5289 30.3413 70.342 29.2577C69.1552 28.1741 68.536 26.7808 68.536 25.078C68.536 23.4268 69.1552 22.0852 70.342 21.0531C71.5289 19.9695 72.9221 19.4535 74.5217 19.4535C76.5857 19.4535 78.1338 20.2791 79.1658 21.8788L84.9967 17.6991C82.6746 14.4482 78.8046 12.5906 74.5217 12.5906ZM100.394 19.5567C97.7622 19.5567 95.595 21.1047 95.595 24.4588V37.2042H88.4225V0H95.595V16.8735C96.0594 15.4803 96.9366 14.4482 98.3299 13.7258C99.7231 12.9518 101.065 12.5906 102.355 12.5906C108.598 12.5906 112.004 16.7187 112.004 24.0976V37.2042H104.832V24.3556C104.832 21.4144 102.716 19.5567 100.394 19.5567ZM282.799 22.8925H117.499V27.186H282.799V22.8925Z" fill="#2FB67C"></path></svg>
            </div>
            <div className="client">
              <svg width="138" height="24" viewBox="0 0 138 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0 0V24L23.9997 0H0ZM14.4006 14.4002L4.8 24H24.0003L14.4006 14.4002Z" fill="#0035EF"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M73.468 19.5343L75.1503 16.5429C75.8549 17.2286 76.7785 17.8596 78.0269 17.8596C79.7359 17.8596 80.8065 16.7072 80.8065 14.923L80.7996 2.68115H84.6943V14.9777C84.6943 19.3144 82.042 21.3185 78.3242 21.3185C76.507 21.3185 74.7706 20.824 73.468 19.5343ZM58.5039 14.5003L61.3264 6.57958L64.1488 14.5003H58.5039ZM65.2083 17.7455L66.3201 20.9897H70.7183L63.7425 2.68177H58.9103L51.9078 20.9897H56.3044L57.4445 17.7455H65.2083ZM38.8654 13.6609L44.3488 20.9898H49.0985L41.4172 11.2727L48.6105 2.68185H43.8599L37.4469 10.8616V2.68185H33.6002V20.9898H37.4469V15.3625L38.8654 13.6609ZM95.6196 14.2692L98.4429 6.57958L101.265 14.2692H95.6196ZM102.325 17.9767L103.437 20.9897H107.836L100.859 2.68177H96.026L89.0235 20.9897H93.4209L94.5602 17.9767H102.325ZM123.448 15.5004C123.448 14.348 122.634 13.3425 121.113 13.3425H116.084V17.5132H121.113C122.579 17.5132 123.448 16.8179 123.448 15.5004ZM123.095 8.03416C123.095 6.88089 122.281 6.15782 120.978 6.15782H116.084V10.0973H120.978C122.281 10.0973 123.095 9.18655 123.095 8.03416ZM112.189 20.9895V2.68152H121.818C125.266 2.68152 127.03 4.90549 127.03 7.34759C127.03 9.65325 125.619 11.1906 123.909 11.5478C125.835 11.8494 127.383 13.744 127.383 16.0497C127.383 18.7942 125.565 20.9895 122.117 20.9895H112.189ZM137.85 20.9898H134.004V2.68185H137.85V20.9898Z" fill="#040506"/>
              </svg>
            </div>
            <div className="client">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 504 117" width="200" height="46">
                <path d="M93.91 53.52H90.1V42.78c0-20.77-16.9-37.67-37.67-37.67s-37.67 16.9-37.67 37.67V53.2h-3.81V42.78c0-22.87 18.61-41.48 41.48-41.48s41.48 18.61 41.48 41.48v10.74zm48 40.31c-3.34 0-6.28-.54-8.8-1.63-2.53-1.09-4.55-2.59-6.07-4.52-1.52-1.92-2.43-4.15-2.73-6.68h9.79c.3 1.47 1.12 2.72 2.47 3.76 1.34 1.04 3.07 1.56 5.2 1.56 2.12 0 3.68-.43 4.67-1.29s1.48-1.85 1.48-2.96c0-1.62-.71-2.72-2.12-3.3-1.42-.58-3.39-1.15-5.92-1.71l-4.93-1.29c-1.67-.5-3.2-1.15-4.59-1.93s-2.52-1.8-3.38-3.04-1.29-2.77-1.29-4.59c0-3.34 1.33-6.15 3.98-8.43 2.66-2.28 6.39-3.42 11.2-3.42 4.45 0 8.01 1.04 10.66 3.11 2.66 2.08 4.24 4.93 4.74 8.58h-9.18c-.56-2.78-2.66-4.18-6.3-4.18-1.82 0-3.23.35-4.21 1.06-.99.71-1.48 1.59-1.48 2.66 0 1.11.73 2 2.2 2.66s3.42 1.27 5.84 1.82c2.63.61 5.05 1.28 7.25 2.01s3.96 1.82 5.28 3.26c1.31 1.44 1.97 3.51 1.97 6.19.05 2.33-.56 4.43-1.82 6.3-1.27 1.87-3.09 3.34-5.47 4.4-2.39 1.07-5.2 1.6-8.44 1.6zm24.29-.91V38.27h9.72v22.77c1.26-2.08 2.97-3.71 5.12-4.9s4.62-1.78 7.4-1.78c4.66 0 8.26 1.47 10.82 4.4 2.55 2.93 3.83 7.24 3.83 12.9v21.25h-9.64V72.57c0-3.24-.65-5.72-1.94-7.44s-3.33-2.58-6.11-2.58c-2.73 0-5 .96-6.79 2.88-1.8 1.92-2.69 4.61-2.69 8.05v19.43h-9.72zm64.22.91c-3.64 0-6.92-.83-9.83-2.5s-5.21-3.98-6.91-6.94-2.54-6.39-2.54-10.29.86-7.32 2.58-10.29c1.72-2.96 4.03-5.28 6.94-6.94 2.91-1.67 6.19-2.5 9.83-2.5 3.59 0 6.84.83 9.75 2.5s5.21 3.98 6.91 6.94 2.54 6.39 2.54 10.29-.85 7.32-2.54 10.29c-1.7 2.96-4.01 5.28-6.94 6.94-2.94 1.66-6.2 2.5-9.79 2.5zm0-8.43c2.53 0 4.73-.95 6.6-2.85s2.81-4.72 2.81-8.46-.94-6.57-2.81-8.46c-1.87-1.9-4.05-2.85-6.53-2.85-2.58 0-4.8.95-6.64 2.85-1.85 1.9-2.77 4.72-2.77 8.46 0 3.75.92 6.57 2.77 8.46 1.85 1.9 4.04 2.85 6.57 2.85zm27.93 24.22V55.27H267l1.06 5.39c1.21-1.67 2.82-3.14 4.82-4.4s4.59-1.9 7.78-1.9c3.54 0 6.7.86 9.49 2.58 2.78 1.72 4.98 4.07 6.6 7.06s2.43 6.38 2.43 10.17-.81 7.17-2.43 10.13-3.82 5.29-6.6 6.98c-2.78 1.7-5.95 2.54-9.49 2.54-2.83 0-5.31-.53-7.44-1.59-2.12-1.06-3.85-2.55-5.16-4.48v21.86h-9.71zm20.27-24.29c3.09 0 5.64-1.04 7.67-3.11 2.02-2.07 3.04-4.76 3.04-8.05s-1.01-6-3.04-8.12c-2.02-2.13-4.58-3.19-7.67-3.19-3.14 0-5.71 1.05-7.7 3.15-2 2.1-3 4.8-3 8.08 0 3.29 1 5.98 3 8.08 1.99 2.11 4.56 3.16 7.7 3.16zm35.22 7.59l-11.01-37.65h9.64l6.53 27.1 7.59-27.1h10.78l7.59 27.1 6.6-27.1h9.64l-11.08 37.65h-10.09l-8.05-28.16-8.05 28.16h-10.09zm58.74-43.5c-1.77 0-3.23-.53-4.36-1.59-1.14-1.06-1.71-2.4-1.71-4.02s.57-2.95 1.71-3.98c1.14-1.04 2.59-1.56 4.36-1.56s3.23.52 4.36 1.56c1.14 1.04 1.71 2.37 1.71 3.98 0 1.62-.57 2.96-1.71 4.02-1.13 1.06-2.59 1.59-4.36 1.59zm-4.85 43.5V55.27h9.71v37.65h-9.71zm19.88 0V55.27h8.65l.91 7.06a15.87 15.87 0 0 1 5.58-5.81c2.35-1.44 5.12-2.16 8.31-2.16V64.6h-2.73c-2.12 0-4.02.33-5.69.99s-2.97 1.8-3.91 3.42-1.4 3.87-1.4 6.75v17.15h-9.72zm47.67.91c-3.79 0-7.16-.81-10.09-2.43-2.94-1.62-5.24-3.9-6.91-6.83s-2.5-6.32-2.5-10.17c0-3.9.82-7.36 2.47-10.4 1.64-3.04 3.92-5.4 6.83-7.1s6.34-2.54 10.29-2.54c3.69 0 6.96.81 9.79 2.43s5.05 3.83 6.64 6.64 2.39 5.93 2.39 9.37a35.39 35.39 0 0 1-.04 1.75l-.12 1.9h-28.62c.2 2.93 1.23 5.24 3.07 6.91 1.85 1.67 4.09 2.5 6.72 2.5 1.97 0 3.63-.44 4.97-1.33 1.34-.88 2.34-2.04 3-3.45h9.87c-.71 2.38-1.89 4.54-3.53 6.49s-3.67 3.48-6.07 4.59-5.12 1.67-8.16 1.67zm.08-31.58c-2.38 0-4.48.67-6.3 2.01s-2.99 3.38-3.49 6.11h18.75c-.15-2.48-1.06-4.45-2.73-5.92-1.68-1.47-3.75-2.2-6.23-2.2zm44.32 31.58c-3.54 0-6.7-.86-9.49-2.58-2.78-1.72-4.98-4.07-6.6-7.06-1.62-2.98-2.43-6.38-2.43-10.17s.81-7.17 2.43-10.13 3.82-5.29 6.6-6.98c2.78-1.7 5.95-2.54 9.49-2.54 2.83 0 5.31.53 7.44 1.59s3.85 2.56 5.16 4.48V38.27H502v54.65h-8.65l-1.06-5.39c-1.21 1.67-2.82 3.14-4.82 4.4s-4.6 1.9-7.79 1.9zm2.05-8.5c3.14 0 5.7-1.05 7.7-3.15s3-4.79 3-8.08-1-5.98-3-8.08-4.57-3.15-7.7-3.15c-3.09 0-5.64 1.04-7.67 3.11-2.02 2.08-3.04 4.76-3.04 8.05s1.01 6 3.04 8.12c2.03 2.11 4.59 3.18 7.67 3.18z" fill="#003041"/>
                <path d="M38.29 37.44s2.45-.44 5.78 10.72S58.56 94.1 60.59 98.73c2.03 4.64 5.22 19.13 11.3 16.66 6.09-2.46 11.59-11.59 11.59-11.59l-5.04-33.67-.37-1.23-2.36-6.71-4.31-14.03C68.1 37 65.66 37.29 65.66 37.29s-27.11-.11-27.37.15z" fill="#f10257"/>
                <path d="M65.98 37.29s-2.46-.29-5.8 10.87C56.85 59.32 45.69 94.1 43.66 98.73c-2.03 4.64-5.22 19.13-11.3 16.66-6.09-2.46-11.59-11.59-11.59-11.59l5.21-34.19.2-.72 2.36-6.71 4.31-14.03c3.3-11.16 5.74-10.87 5.74-10.87l27.39.01z" fill="#003041"/>
                <path d="M2 34.56l23.38-2.37s-.38 81.32 8.3 83.5l-22.55-3.62c.01.01-8.89 3.21-9.13-77.51z" fill="#f10257"/>
                <path d="M102.35 34.56l-23.38-2.37s.38 81.32-8.3 83.5l22.55-3.62c-.01.01 8.89 3.21 9.13-77.51z" fill="#003041"/>
              </svg>
            </div>
          </div>
        </div>
      </section>
      <section className="rails-section rails-situations">
        <div className="inner">
          <p className="rails-eyebrow">Does this sound familiar?</p>
          <h2>Your Rails application needs an owner</h2>
          <p className="rails-intro">You have a live product and customers who rely on it. You need someone who can understand the existing system and take responsibility for what comes next.</p>
          <div className="rails-card-grid">
            {([
              ['handover', 'Your developer left', 'Your developer or agency moved on. You need a reliable team to take over the codebase and keep the product running.'],
              ['expertise', 'Your team needs Rails expertise', 'Your team knows the business, but needs experienced Rails engineers to guide decisions and deliver the work.'],
              ['production', 'Production issues keep returning', 'Slow pages, failed jobs or unreliable deployments pull your attention away from your customers.'],
              ['upgrades', 'Ruby and Rails are falling behind', 'Outdated versions and dependencies make changes harder. You need a safe, incremental upgrade plan.'],
              ['momentum', 'Development has slowed down', 'Every feature feels risky or takes too long. You need someone to untangle the code and restore momentum.'],
              ['ownership', 'You need an owner, not just a fix', 'You want a partner who understands the whole application and can maintain it while shipping new features.'],
            ] as const).map(([kind, title, text]) => <article className="rails-card" key={title}><div className="rails-situation-heading"><SituationIcon kind={kind} /><h3>{title}</h3></div><p>{text}</p></article>)}
          </div>
          <Link className="rails-text-link" href="/ruby-on-rails-application-takeover">Explore our Rails application takeover service <LinkIndicator /></Link>
        </div>
      </section>
      <OwnershipProcess />
      <section className="rails-section" id="services">
        <div className="inner">
          <p className="rails-eyebrow">One team for the whole application</p>
          <h2>Rails specialists who can handle the rest of your stack too</h2>
          <p className="rails-intro">We look after the existing application and develop what comes next: upgrades, production fixes, PostgreSQL, background jobs, performance, infrastructure, integrations, CI/CD, monitoring, security, architecture and new features.</p>
          <ul className="rails-stack" aria-label="Technologies we work with">{['Ruby on Rails', 'PostgreSQL', 'Redis', 'React', 'React Native', 'AWS', 'Heroku', 'Docker'].map(tech => <li key={tech}>{tech}</li>)}</ul>
          <Link className="rails-text-link" href="/services">See our full capabilities <LinkIndicator /></Link>
        </div>
      </section>
      <section className="rails-section rails-tinted">
        <div className="inner">
          <p className="rails-eyebrow">Real applications. Practical results.</p>
          <h2>Existing systems, moving forward</h2>
          <div className="rails-card-grid rails-case-grid">
            <article className="rails-card"><Image src="/img/showcases/clients/shopwired.svg" width={160} height={48} alt="ShopWired" /><h3>A production background queue stopped processing jobs</h3><p>We diagnosed the bottlenecks, restored processing and eliminated recurring H12 errors on Heroku.</p><Link href="/showcases/shopwired-queue-optimization">Read the queue recovery story <LinkIndicator /></Link></article>
            <article className="rails-card"><Image src="/img/showcases/clients/wo.svg" width={160} height={48} alt="Worship Online" /><h3>Stripe and the application disagreed about subscriptions</h3><p>We corrected webhook processing and historical data, recovered subscriptions and added monitoring to catch future inconsistencies.</p><Link href="/showcases/stripe-integration">See how we restored consistency <LinkIndicator /></Link></article>
            <article className="rails-card"><Image src="/img/showcases/clients/wo.svg" width={160} height={48} alt="Worship Online" /><h3>A live Rails product needed a new experience</h3><p>We gradually redesigned the application with zero downtime while keeping existing mobile clients working.</p><Link href="/showcases/ruby-on-rails-redesign">Explore the gradual redesign <LinkIndicator /></Link></article>
          </div>
          <Link className="rails-text-link" href="/showcases">View all case studies <LinkIndicator /></Link>
        </div>
      </section>
      <section className="expertise has-vertical-paddings">
        <div className="inner">
          <header id="proven-track">
            <h2>Why trust us with an existing Rails application?</h2>
            <p>
              Meet the Rails specialists behind the work: a Toptal-verified founder, a published book, practical upgrade experience and open-source tools built for real codebases.
            </p>
          </header>
          <div className="container">
            <div className="item toptal-resume">
              <Link rel="noopener noreferrer nofollow" href="https://www.toptal.com/resume/andrei-kaleshka"
                target="_blank" aria-label="View Andrei Kaleshka’s verified Toptal profile">
                <Image className="verified-expert-art" src="/img/verified-rails-expert.svg"
                  alt="Andrei Kaleshka, WideFix founder - Verified Expert in Engineering on Toptal"
                  width={320} height={394} />
              </Link>
              <p>WideFix founder is among the top 3% of freelance developers accepted worldwide by Toptal.</p>
            </div>
            <div className="item book">
              <Link rel="nofollow" href="https://www.packtpub.com/product/rake-task-management-essentials/9781783280773"
                target="_blank">
                <div className="content">
                  <span>BOOK</span>
                </div>
              </Link>
              <p>A book authored by the founder of WideFix, Andrei Kaleshka.</p>
            </div>
            <div className="item tech-blog">
              <Link href="https://widefix.com/blog/spike-of-signups-business-threat/" target="_blank">
                <div className="content">
                  <span>Article</span>
                  <h3>Fake signups: a threat to your business</h3>
                </div>
              </Link>
              <p>Recent tech problem solved by us for a client.</p>
            </div>
            <div className="item rails-upgrade">
              <Link href="https://widefix.com/blog/ruby-and-rails-upgrade-personal-experience/" target="_blank">
                <div className="content">
                  <span>Article</span>
                  <h3>Ruby and Rails upgrade: personal experience</h3>
                </div>
              </Link>
              <p>Featured article on our blog describes a step-by-step approach to upgrading the Ruby and Rails stack.</p>
            </div>
            <div className="item migration-data">
              <Link rel="nofollow" href="https://github.com/ka8725/migration_data" target="_blank">
                <div className="content">
                  <span>Open-Sourced Library</span>
                  <h3>Migration Data</h3>
                </div>
              </Link>
              <p>An open-sourced library developed by us to improve our daily developer task routine.</p>
            </div>
            <div className="item actual-db-schema">
              <Link href="/actual-db-schema">
                <div className="content">
                  <span>Open-Sourced Library</span>
                  <h3>Actual DB Schema</h3>
                </div>
              </Link>
              <p>Keeps Rails development databases aligned with the current branch by handling phantom migrations.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="achievements has-vertical-paddings">
        <div className="inner">
          <header>
            <h2>Rails expertise you can <span>build on</span></h2>
            <p>Open-source contributions, production results and recognition from clients and the Ruby community</p>
          </header>
          <div className="achievements-grid">
            <div className="achievement-item">
              <div className="number">Top 3%</div>
              <p>WideFix founder among <Link href="https://www.toptal.com/resume/andrei-kaleshka" target="_blank" rel="nofollow">top software engineers worldwide</Link> (Toptal)</p>
              <div className="achievement-tags">
                <div className="achievement-tag founder">Founder</div>
              </div>
            </div>
            <div className="achievement-item">
              <div className="number">4000%</div>
              <p><Link href="https://widefix.com/showcases/seo-optimization" target="_blank" rel="nofollow">Increased organic Google traffic</Link> through app optimization</p>
              <div className="achievement-tags">
                <div className="achievement-tag solutions">Solutions</div>
                <div className="achievement-tag team">Team</div>
              </div>
            </div>
            <div className="achievement-item">
              <div className="number">4M+</div>
              <p>Total downloads of our <Link href="https://rubygems.org/profiles/ka8725" target="_blank" rel="nofollow">open-sourced libraries</Link></p>
              <div className="achievement-tags">
                <div className="achievement-tag solutions">Solutions</div>
                <div className="achievement-tag founder">Founder</div>
              </div>
            </div>
            <div className="achievement-item">
              <div className="number">3M+</div>
              <p><Link href="https://rubygems.org/gems/migration_data" target="_blank" rel="nofollow">Migration Data</Link> - our most popular library downloads</p>
              <div className="achievement-tags">
                <div className="achievement-tag solutions">Solutions</div>
                <div className="achievement-tag team">Team</div>
              </div>
            </div>
            <div className="achievement-item">
              <div className="number">400K+</div>
              <p><Link href="https://rubygems.org/gems/actual_db_schema" target="_blank" rel="nofollow">Actual DB Schema</Link> - our latest valuable library downloads</p>
              <div className="achievement-tags">
                <div className="achievement-tag solutions">Solutions</div>
                <div className="achievement-tag team">Team</div>
              </div>
            </div>
            <div className="achievement-item">
              <div className="number achievement-heading">Cost Savings</div>
              <p><Link href="https://www.linkedin.com/feed/update/urn:li:activity:7379533312295395328/" target="_blank" rel="nofollow">Optimize software efficiently</Link> - no extra infrastructure costs</p>
              <div className="achievement-tags">
                <div className="achievement-tag solutions">Solutions</div>
                <div className="achievement-tag team">Team</div>
              </div>
            </div>
            <div className="achievement-item">
              <div className="number">30%<span className="achievement-metric-label">Revenue</span></div>
              <p><Link href="https://widefix.com/blog/prevent-account-sharing-with-mfa/" target="_blank" rel="nofollow">Prevented account sharing</Link> increasing client revenue by 30%</p>
              <div className="achievement-tags">
                <div className="achievement-tag solutions">Solutions</div>
                <div className="achievement-tag team">Team</div>
              </div>
            </div>
            <div className="achievement-item">
              <div className="number">4.9★</div>
              <p><Link href="https://play.google.com/store/apps/details?id=com.worshiponline.iosapp" target="_blank" rel="nofollow">Mobile app created from scratch</Link> - top ratings on both stores</p>
              <div className="achievement-tags">
                <div className="achievement-tag solutions">Solutions</div>
                <div className="achievement-tag team">Team</div>
              </div>
            </div>
            <div className="achievement-item">
              <div className="number achievement-heading">Most Trusted</div>
              <p><Link href="https://www.linkedin.com/feed/update/urn:li:activity:7376194644583350272/" target="_blank" rel="nofollow">Recognized by Techreviewer.co</Link> as most trusted development partner</p>
              <div className="achievement-tags">
                <div className="achievement-tag team">Team</div>
              </div>
            </div>
            <div className="achievement-item">
              <div className="number">4.8/5</div>
              <p><Link href="https://clutch.co/profile/widefix#reviews" target="_blank" rel="nofollow">Average client rating on Clutch</Link> - industry-leading satisfaction</p>
              <div className="achievement-tags">
                <div className="achievement-tag team">Team</div>
              </div>
            </div>
            <div className="achievement-item">
              <div className="number">5★</div>
              <p>Published author of <Link href="https://www.amazon.com/-/es/Rake-Management-Essentials-Andrey-Koleshko/dp/1783280778" target="_blank" rel="nofollow">&ldquo;Rails Task Management Essentials&rdquo;</Link> book</p>
              <div className="achievement-tags">
                <div className="achievement-tag founder">Founder</div>
              </div>
            </div>
            <div className="achievement-item">
              <div className="number achievement-heading">Spotlighted Tweet</div>
              <p><Link href="https://x.com/yukihiro_matz/status/1249973865544970241" target="_blank" rel="nofollow">Quoted by Yukihiro &ldquo;Matz&rdquo; Matsumoto</Link> - Ruby language creator</p>
              <div className="achievement-tags">
                <div className="achievement-tag founder">Founder</div>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="reviews has-vertical-paddings">
        <div className="inner">
          <header id="reviews">
            <h2>Read what our <span>clients</span> have to say.</h2>
            <div className="button-container">
              <Link className="button primary" href="https://calendly.com/andrei-kaleshka/30min" target="_blank"
                rel="nofollow">Discuss your Rails application</Link>
            </div>
          </header>
          <div className="slider-wrapper">
            <ClutchWidget />
          </div>
        </div>
      </section>
      <RailsFAQ />
      <OwnershipCTA />
    </main>
  );
}
