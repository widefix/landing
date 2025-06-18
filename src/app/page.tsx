import Image from 'next/image'
import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <section className="hero has-vertical-paddings">
        <div className="inner">
          <div className="hero-block-left">
            <h1>Leave <span>the tech</span> to us and focus on <span>growing</span> your business</h1>
            <div className="promise-block">
              <h2 className="title">Our promise to you</h2>
              <ul>
                <li>
                  <Image src="/img/promises/save-time.svg" alt="Save Time" width="24" height="24" />
                  <span>Your time saved</span>
                </li>
                <li>
                  <Image src="/img/promises/fix-app-problems.svg" alt="Fix app problems" width="24" height="24" />
                  <span>Tech issues fixed</span>
                </li>
                <li>
                  <Image src="/img/promises/get-more-customers.svg" alt="Get more customers" width="24" height="24" />
                  <span>Your business growth</span>
                </li>
              </ul>
            </div>
            <div className="button-container">
              <Link className="button primary" href="https://calendly.com/andrei-kaleshka/30min" target="_blank"
                rel="nofollow">Schedule a call now</Link>
            </div>
          </div>
          <div className="hero-block-right">
            <picture>
              <source srcSet="/img/hero-section-background.webp" type="image/webp" />
              <Image src="/img/hero-section-background.jpg" alt="Optimise your app to get more customers" width="543"
                height="474" />
            </picture>
          </div>
        </div>
        <div className="inner">
          <p>
            Unleash the full potential of your business with our expert Ruby on Rails consultant services.
            At our company, we handle the technical side of things so you can focus on growing your business.
            Trust our Ruby on Rails developers to deliver top-notch solutions that drive results.
            Contact us today to learn more.
          </p>
        </div>
      </section>

      <section className="banner-top">
        <div className="inner">
          <div className="banner-content">
            <h2>Your app is <span>not</span> ready</h2>
            <ul>
              <li>Customers won’t be impressed by your slow app.</li>
              <li>You have yet to fix underlying issues of your application.</li>
              <li>At Widefix, you will get a bug-free app your customers will love to use.</li>
            </ul>
          </div>
          <div className="img-wrapper">
            <picture>
              <source srcSet="/img/app-image.webp" type="image/webp" />
              <Image src="/img/app-image.png" alt="Your app is not ready" width="455" height="319" />
            </picture>
          </div>
        </div>
      </section>

      <section className="what-we-do has-vertical-paddings">
        <div className="inner">
          <div className="header" id="services">
            <h2>What we <span>do</span></h2>
            <p>
              It’s not enough to fix a bug. When you work with us, all underlying issues in your application get fixed.
              That way, your app won’t be slowed down by a new problem each week. To do this right at Widefix,
              our experts, including Ruby on Rails consultants and Ruby on Rails developers, are specialised in a wide range of Ruby applications, such as
              <strong>Ruby on Rails, Hanami, Sinatra, Grape, Roda, Rack, and fully custom Ruby applications.</strong>
            </p>
            <p>We also work with <strong>JavaScript: React, Next.js, ReactNative, Node.js</strong></p>
          </div>
          <div className="block-container">
            <div className="block">
              <div className="block-left">
                <Image src="/img/what-we-do/icon-optimization.svg" width="64" height="64"
                  alt="Icon for Optimization block" />
              </div>
              <div className="block-right">
                <h2>Optimization</h2>
                <ul>
                  <li>Application stability improvement</li>
                  <li>Performance improving</li>
                  <li>Fixing memory leaks</li>
                </ul>
              </div>
            </div>
            <div className="block">
              <div className="block-left">
                <Image src="/img/what-we-do/icon-devops-and-maintenance.svg" width="64" height="64"
                  alt="Icon for Devops & Maintenance block" />
              </div>
              <div className="block-right">
                <h2>Devops & Maintenance</h2>
                <ul>
                  <li>Code refactor</li>
                  <li>Bugs fixing</li>
                  <li>Deployment</li>
                </ul>
              </div>
            </div>
            <div className="block">
              <div className="block-left">
                <Image src="/img/what-we-do/icon-systems-integration.svg" width="64" height="64"
                  alt="Icon for Systems Integration block" />
              </div>
              <div className="block-right">
                <h2>Systems Integration</h2>
                <ul>
                  <li>End-to-end feature development</li>
                  <li>Designing & developing new design screens</li>
                  <li>REST API development & design</li>
                  <li>GraphQL Development</li>
                </ul>
              </div>
            </div>
            <div className="block">
              <div className="block-left">
                <Image src="/img/what-we-do/icon-development-and-design.svg" width="64" height="64"
                  alt="Icon for Development & Design block" />
              </div>
              <div className="block-right">
                <h2>Development & Design</h2>
                <ul>
                  <li>Payment gateways integration</li>
                  <li>Transaction SMS</li>
                  <li>Auto Phone calls integration</li>
                  <li>Monitoring & analytics tools</li>
                  <li>Making your app look good</li>
                </ul>
              </div>
            </div>
            <div className="block">
              <div className="block-left">
                <Image src="/img/what-we-do/icon-quality-assurance.svg" width="64" height="64"
                  alt="Icon for Quality Assurance block" />
              </div>
              <div className="block-right">
                <h2>Quality Assurance</h2>
                <ul>
                  <li>Increasing test coverage</li>
                  <li>Manual and Automated Testing</li>
                  <li>Performance testing</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="button-container">
            <Link className="button primary" href="https://calendly.com/andrei-kaleshka/30min" target="_blank"
              rel="nofollow">Schedule a call now</Link>
          </div>
        </div>
      </section>

      <section className="you-can-trust has-vertical-paddings">
        <div className="inner">
          <h2>Why you can <span>trust</span> WideFix for your application</h2>
          <div className="content-wrapper">
            <div className="left-content">
              <picture>
                <source srcSet="/img/you-can-trust.webp" type="image/webp" />
                <Image src="/img/you-can-trust.jpg" alt="You can trust WideFix" width="399" height="388" />
              </picture>
            </div>
            <div className="right-content">
              <div className="block m-expertise">
                <h3><Image src="/img/icons/expertise.svg" alt="Icon for Expertise and experience block" width="56"
                    height="56" /> Expertise and experience</h3>
                <p>Our team of experienced developers has a track record of delivering high-quality code and solving complex
                  problems. We have the skills and knowledge to tackle any project, no matter how challenging</p>
              </div>
              <div className="block m-innovative">
                <h3><Image src="/img/icons/innovative.svg" alt="Icon for Innovative solutions block" width="56" height="56" />
                  Innovative solutions</h3>
                <p>We stay on the cutting edge of technology and uses the latest tools to deliver the best solutions to
                  clients. Timely internal code review and QA ensure in maintaining high standards and meeting client
                  expectations.</p>
              </div>
              <div className="block m-support">
                <h3><Image src="/img/icons/support.svg" alt="Icon for Dedicated block" width="56" height="56" /> Dedicated
                  Support</h3>
                <p>We offer unparalleled support and customer service. Whether you have a question about your project or
                  need help troubleshooting, our team is always here to support you and ensure your project’s success.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="optimize-your-app has-vertical-paddings">
        <div className="inner">
          <header>
            <h2>You have a lot to consider. Let experts <span>optimize</span> your app that customers will love to use!</h2>
            <div className="button-wrapper"><Link className="button primary" href="https://calendly.com/andrei-kaleshka/30min"
                target="_blank" rel="nofollow">Schedule a call now</Link></div>
          </header>
          <div className="section-content">
            <div className="section-block">
              <Image src="/img/icons/waste-time.svg" alt="Icon for Stop wasting time" width="56" height="56" />
              <h3>Stop wasting time</h3>
              <p>You waste a lot of time by guessing how to optimize your app. Let the team of experts at Widefix help you
                out.</p>
            </div>
            <div className="section-block">
              <Image src="/img/icons/win-over.svg" alt="Icon for Win over your customers" width="56" height="56" />
              <h3>Win over your customers</h3>
              <p>With our expertise, your application will stand out in new markets. Customers will love to use your
                application!</p>
            </div>
            <div className="section-block">
              <Image src="/img/icons/fix-app.svg" alt="Icon for Fix underlying issues in your app" width="56" height="56" />
              <h3>Fix underlying issues in your app</h3>
              <p>Identify high-risk technical challenges with suggestions for best solution, technology stack & architecture
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="roadmap">
        <div className="inner">
          <header>
            <Image src="/img/decoration/crown.svg" alt="Crown icon" width="56" height="56" />
            <h2>It’s super easy to make your app a winner</h2>
            <span className="subtitle">Here’s what you need to do.</span>
          </header>
          <div className="section-content">
            <div className="section-block">
              <div className="curve">
                <Image src="/img/roadmap.svg" alt="Roadmap" width="800" height="400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="banner-bottom has-vertical-paddings">
        <div className="inner">
          <h2>Not sure what kind of support you need?</h2>
          <p>Optimise your app and get underlying issues fixed. You deserve an app customers will love to use.<br />If you
            would like to discuss your needs further, you can schedule a consultation with one of our experts</p>
          <div className="contacts">
            <div className="contact">
              <Image src="/img/icons/email.svg" alt="Icon for email" width="40" height="40" />
              <p>Email: <Link href="mailto:call@widefix.com">call@widefix.com</Link></p>
            </div>
            <div className="contact">
              <Image src="/img/icons/phone.svg" alt="Icon for phone" width="40" height="40" />
              <p>Phone: <Link href="tel:+48516295359">+48516295359</Link></p>
            </div>
          </div>

          <div className="button-container">
            <Link className="button primary" href="https://calendly.com/andrei-kaleshka/30min" target="_blank"
              rel="nofollow">Schedule a call now</Link>
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
              <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px" y="0px" viewBox="0 0 5000 2000" style={{ enableBackground: 'new 0 0 5000 2000' } as React.CSSProperties} xmlSpace="preserve">
                <style type="text/css">
                  {`.st0 {
                    fill: #999999;
                  }`}
                </style>
                <g>
                  <path className="st0" d="M2460.18,1335.8h-4.14v-27.21c0-10.05-0.15-20.11-0.44-30.16s-0.44-20.1-0.44-30.16
                      c0-8.87,0.59-18.23,1.77-28.09c1.18-9.85,3.31-19.61,6.36-29.27c3.06-9.66,7.15-18.82,12.27-27.5
                      c5.13-8.67,11.63-16.36,19.52-23.07c7.89-6.7,17.25-12.02,28.09-15.97c10.84-3.94,23.56-5.91,38.15-5.91
                      c14.39,0,27.01,1.97,37.85,5.91c10.84,3.95,20.21,9.22,28.09,15.82c7.89,6.61,14.4,14.15,19.52,22.62
                      c5.13,8.48,9.22,17.3,12.27,26.46c3.06,9.17,5.17,18.24,6.36,27.21c1.18,8.97,1.77,17.3,1.77,24.98c0,11.24-0.1,22.43-0.29,33.56
                      c-0.2,11.14-0.29,22.33-0.29,33.56v27.21h-4.14v-27.21h-202.26V1335.8z M2663.33,1250.04c0-12.81-1.53-23.75-4.58-32.82
                      c-3.05-9.07-7.2-16.71-12.42-22.92c-5.22-6.21-11.19-11.14-17.89-14.78c-6.7-3.64-13.75-6.41-21.14-8.28
                      c-7.39-1.87-14.78-3.11-22.18-3.7c-7.39-0.59-14.34-0.89-20.84-0.89c-15.97,0-30.41,0.99-43.32,2.96
                      c-12.91,1.97-23.95,5.87-33.12,11.68c-9.16,5.82-16.21,14-21.14,24.54c-4.93,10.55-7.4,24.4-7.4,41.54c0,3.95,0.05,7.5,0.15,10.65
                      c0.11,3.16,0.35,5.72,0.74,7.69h202.26C2663.03,1260,2663.33,1254.77,2663.33,1250.04z" />
                  <path className="st0" d="M2456.04,922.41h50.57v3.85c-3.35,0.99-7.64,2.66-12.86,5.03c-5.22,2.37-10.3,5.67-15.23,9.91
                      c-4.93,4.24-9.21,9.71-12.86,16.41c-3.64,6.71-5.47,14.89-5.47,24.55v47.02h91.37v-16.56c0-7.29-1.03-13.45-3.11-18.48
                      c-2.07-5.03-5.03-9.21-8.87-12.57c-3.84-3.35-8.47-6.11-13.9-8.28c-5.42-2.17-11.48-3.94-18.19-5.32v-3.85h91.96v3.85
                      c-5.72,1.38-11.24,3.01-16.56,4.88c-5.32,1.88-10,4.39-14.04,7.54c-4.04,3.16-7.25,7.05-9.61,11.68c-2.37,4.64-3.55,10.4-3.55,17.3
                      v19.81h106.74v-48.5c0-9.07-1.52-17.25-4.58-24.54c-3.06-7.29-7.34-13.75-12.86-19.37c-5.52-5.62-11.98-10.3-19.37-14.05
                      c-7.39-3.74-15.32-6.6-23.8-8.57v-3.85h64.76v188.95h-4.14v-27.2h-202.26v27.2h-4.14V922.41z" />
                  <path className="st0"
                    d="M2456.04,791.72h4.14v27.2h202.26v-48.79c0-6.5-1.08-13.06-3.25-19.66c-2.16-6.6-5.76-12.81-10.79-18.63
                      c-5.03-5.81-11.53-11.04-19.52-15.67c-7.98-4.63-17.69-8.23-29.12-10.79v-3.84h66.83V889h-4.14V861.8h-202.26V889h-4.14V791.72z" />
                </g>
                <g>
                  <path
                    d="M529.21,878.61c-6.5-19.49-14.32-40-23.47-61.56c-9.16-21.55-20.96-41.32-35.43-59.34c-14.48-18-32.48-32.77-54.03-44.28
                      c-21.56-11.52-48.27-17.27-80.15-17.27c-43.11,0-77.06,7.97-101.85,23.91c-24.8,15.94-43.55,38.08-56.24,66.43
                      c-12.7,28.34-20.81,62.15-24.36,101.41c-3.54,39.27-5.31,82.23-5.31,128.87c0,61.42,3.54,112.19,10.63,152.34
                      c7.08,40.16,18.16,72.05,33.21,95.65c15.06,23.62,34.54,40.16,58.46,49.6c23.91,9.45,52.39,14.17,85.47,14.17
                      c26.57,0,50.62-5.31,72.18-15.94c21.55-10.63,40.59-24.65,57.13-42.07c16.52-17.41,30.4-37.34,41.63-59.79
                      c11.21-22.43,19.49-45.75,24.8-69.97h14.17v187.76h-14.17c-2.96-7.08-6.5-11.96-10.63-14.61c-4.14-2.66-10.34-3.98-18.6-3.98
                      c-7.08,0-16.25,1.63-27.46,4.87c-11.22,3.25-24.07,6.8-38.53,10.63c-14.48,3.83-30.27,7.37-47.39,10.63
                      c-17.13,3.24-35.14,4.87-54.03,4.87c-43.11,0-84.73-8.41-124.88-25.24c-40.16-16.83-75.43-39.85-105.84-69.08
                      c-30.42-29.23-54.77-63.62-73.07-103.18C13.15,1103.88,4,1061.06,4,1015.01c0-50.18,10.19-95.66,30.56-136.4
                      c20.37-40.74,46.5-75.57,78.38-104.51c31.89-28.92,67.45-51.22,106.73-66.87c39.26-15.64,77.79-23.47,115.58-23.47
                      c18.89,0,36.45,1.77,52.7,5.31c16.23,3.54,31.29,7.24,45.17,11.07c13.87,3.85,26.42,7.53,37.64,11.07
                      c11.21,3.54,20.66,5.31,28.34,5.31c8.26,0,14.46-1.02,18.6-3.1c4.12-2.06,7.09-7.23,8.86-15.5h14.17v180.68H529.21z" />
                  <path d="M628,1013.59c14.26-28.52,32.55-52.9,54.87-73.16c22.32-20.25,47.32-35.85,75.02-46.81
                      c27.69-10.95,54.76-16.43,81.22-16.43c28.52,0,56.73,5.38,84.63,16.12c27.9,10.75,52.7,26.04,74.4,45.88
                      c21.7,19.84,39.26,43.92,52.7,72.23c13.43,28.31,20.15,60.24,20.15,95.78c0,31-6.31,60.45-18.91,88.35
                      c-12.61,27.9-29.55,52.39-50.84,73.47c-21.29,21.08-45.88,37.72-73.78,49.91c-27.9,12.19-57.35,18.29-88.35,18.29
                      c-30.59,0-59.93-5.89-88.04-17.67c-28.11-11.78-52.81-27.9-74.09-48.36c-21.29-20.46-38.34-44.53-51.15-72.23
                      c-12.82-27.69-19.22-57.66-19.22-89.9C606.61,1073.94,613.74,1042.11,628,1013.59z M715.1,1216.01
                      c4.96,28.31,12.71,50.84,23.25,67.58c10.54,16.74,24.18,28.42,40.92,35.03c16.74,6.62,36.68,9.92,59.83,9.92
                      c30.58,0,54.56-5.68,71.92-17.05c17.36-11.36,30.38-27.06,39.06-47.12c8.68-20.04,14.15-43.8,16.43-71.3
                      c2.27-27.48,3.41-57.35,3.41-89.58c0-28.93-0.93-56.52-2.79-82.77c-1.86-26.24-7.13-49.38-15.81-69.44
                      c-8.68-20.04-21.81-35.96-39.37-47.74c-17.57-11.78-41.85-17.67-72.85-17.67c-28.93,0-52.08,5.48-69.44,16.43
                      c-17.36,10.96-30.59,26.35-39.68,46.19c-9.1,19.84-15.09,43.4-17.98,70.68c-2.9,27.28-4.34,57.25-4.34,89.89
                      C707.66,1152.06,710.14,1187.7,715.1,1216.01z" />
                  <path d="M1132.96,1190.9c0.82,4.96,2.27,11.47,4.34,19.53c2.06,8.06,5.06,16.74,8.99,26.04c3.92,9.3,8.88,18.81,14.88,28.52
                      c5.99,9.72,13.33,18.71,22.01,26.97c9.5,9.51,18.7,16.74,27.59,21.7c8.88,4.96,17.36,8.58,25.42,10.85
                      c8.06,2.27,15.7,3.51,22.94,3.72c7.23,0.21,13.95,0.31,20.15,0.31c21.9,0,39.88-3.41,53.94-10.23
                      c14.05-6.82,25.11-15.19,33.17-25.11c8.06-9.92,13.74-20.35,17.05-31.31c3.3-10.95,4.96-20.56,4.96-28.83
                      c0-15.29-3.62-27.9-10.85-37.82c-7.24-9.92-16.84-18.18-28.83-24.8c-11.99-6.61-25.63-12.18-40.92-16.74
                      c-15.3-4.54-31-9.19-47.12-13.95c-16.12-4.74-31.83-10.33-47.12-16.74c-15.3-6.4-28.93-14.67-40.92-24.8
                      c-11.99-10.12-21.6-22.63-28.83-37.51c-7.24-14.88-10.85-33.48-10.85-55.8c0-16.53,3.72-32.44,11.16-47.74
                      c7.44-15.29,17.77-28.83,31-40.61c13.22-11.78,29.03-21.28,47.43-28.52c18.39-7.23,38.33-10.85,59.83-10.85
                      c13.64,0,25.62,1.24,35.96,3.72c10.33,2.48,19.42,5.07,27.28,7.75c7.85,2.69,14.77,5.27,20.77,7.75
                      c5.99,2.48,11.47,3.72,16.43,3.72c5.78,0,9.61-0.93,11.47-2.79c1.86-1.86,3.82-5.27,5.89-10.23h9.92v117.8h-8.06
                      c-4.96-14.46-10.23-28.72-15.81-42.78c-5.58-14.05-12.71-26.76-21.39-38.13c-8.68-11.36-19.64-20.56-32.86-27.59
                      c-13.23-7.02-29.97-10.54-50.22-10.54c-16.54,0-31.11,2.27-43.71,6.82c-12.61,4.55-23.25,10.54-31.93,17.98
                      c-8.68,7.44-15.3,15.71-19.84,24.8c-4.55,9.1-6.82,18.4-6.82,27.9c0,14.47,3.82,26.45,11.47,35.96
                      c7.64,9.51,17.67,17.67,30.07,24.49s26.55,12.71,42.47,17.67c15.91,4.96,32.24,10.13,48.98,15.5
                      c16.74,5.38,33.06,11.26,48.98,17.67c15.91,6.41,30.07,14.57,42.47,24.49c12.4,9.92,22.42,21.92,30.07,35.96
                      c7.64,14.06,11.47,31.42,11.47,52.08c0,20.26-4.14,39.48-12.4,57.66c-8.27,18.19-19.94,34.1-35.03,47.74
                      c-15.09,13.64-33.07,24.49-53.94,32.55c-20.88,8.06-44.13,12.09-69.75,12.09c-12.82,0-25.53-1.24-38.13-3.72
                      c-12.61-2.48-24.39-5.06-35.34-7.75c-10.96-2.68-20.67-5.27-29.14-7.75c-8.48-2.48-14.78-3.72-18.91-3.72
                      c-5.79,0-9.92,0.93-12.4,2.79c-2.48,1.86-4.76,5.69-6.82,11.47h-9.92V1190.9H1132.96z" />
                  <path d="M1625.22,895.79c-15.3,0-28.94,1.55-40.92,4.65c-11.99,3.1-22.74,8.48-32.24,16.12c-9.51,7.65-17.98,18.29-25.42,31.93
                      c-7.44,13.64-14.26,31-20.46,52.08h-8.06V887.11h388.73v113.46h-8.06c-6.2-21.08-13.02-38.44-20.46-52.08
                      c-7.44-13.64-15.92-24.28-25.42-31.93c-9.51-7.64-20.26-13.02-32.24-16.12c-11.99-3.1-25.63-4.65-40.92-4.65h-22.32v424.06h57.04
                      v8.68H1590.5v-8.68h57.04V895.79H1625.22z" />
                  <path d="M1935.2,1319.86l184.75-450.1h16.74l195.29,450.1h53.32v8.68h-208.31v-8.68h57.66l-71.92-166.15h-148.79l-68.82,166.15
                      h55.18v8.68h-117.18v-8.68H1935.2z M2017.04,1145.02h142.6l-73.16-169.26L2017.04,1145.02z" />
                </g>
                <g>
                  <path d="M3078.5,697.93v12.4h-81.48v290.5h255.96v-290.5h-81.48v-12.4h291.39v12.4h-81.48v605.81h81.48v12.4h-291.39v-12.4h81.48
                      v-302.9h-255.96v302.9h81.48v12.4h-291.39v-12.4h81.48V710.33h-81.48v-12.4H3078.5z" />
                  <path
                    d="M3523.59,1013.59c14.26-28.52,32.55-52.9,54.87-73.16c22.32-20.25,47.32-35.85,75.02-46.81
                      c27.69-10.95,54.76-16.43,81.22-16.43c28.52,0,56.73,5.38,84.63,16.12c27.9,10.75,52.7,26.04,74.4,45.88
                      c21.7,19.84,39.26,43.92,52.7,72.23c13.43,28.31,20.15,60.24,20.15,95.78c0,31-6.31,60.45-18.91,88.35
                      c-12.61,27.9-29.55,52.39-50.84,73.47c-21.29,21.08-45.88,37.72-73.78,49.91c-27.9,12.19-57.35,18.29-88.35,18.29
                      c-30.59,0-59.93-5.89-88.04-17.67c-28.11-11.78-52.8-27.9-74.09-48.36c-21.29-20.46-38.34-44.53-51.15-72.23
                      c-12.81-27.69-19.22-57.66-19.22-89.9C3502.2,1073.94,3509.33,1042.11,3523.59,1013.59z M3610.7,1216.01
                      c4.96,28.31,12.71,50.84,23.25,67.58s24.18,28.42,40.92,35.03c16.74,6.62,36.67,9.92,59.83,9.92c30.58,0,54.56-5.68,71.92-17.05
                      c17.36-11.36,30.38-27.06,39.06-47.12c8.68-20.04,14.15-43.8,16.43-71.3c2.27-27.48,3.41-57.35,3.41-89.58
                      c0-28.93-0.93-56.52-2.79-82.77c-1.86-26.24-7.13-49.38-15.81-69.44c-8.68-20.04-21.81-35.96-39.37-47.74
                      c-17.57-11.78-41.85-17.67-72.85-17.67c-28.93,0-52.08,5.48-69.44,16.43c-17.36,10.96-30.59,26.35-39.68,46.19
                      c-9.1,19.84-15.09,43.4-17.98,70.68c-2.89,27.28-4.34,57.25-4.34,89.89C3603.26,1152.06,3605.74,1187.7,3610.7,1216.01z" />
                  <path
                    d="M4160.61,887.11l107.25,308.75h1.24l109.12-308.75h155v8.68h-57.04v424.06h57.04v8.68h-203.35v-8.68h56.42V895.79h-1.24
                      l-152.51,432.74h-9.92l-153.13-432.74h-1.24v424.06h57.04v8.68h-124v-8.68h57.04V895.79h-57.04v-8.68H4160.61z" />
                  <path d="M4935.58,887.11v106.02h-8.06c-2.07-7.02-5.58-16.01-10.54-26.97c-4.96-10.94-11.88-21.59-20.77-31.93
                      c-8.89-10.32-20.36-19.31-34.41-26.97c-14.06-7.64-31.21-11.47-51.46-11.47h-98.58v191.57h34.72c15.29,0,28.21-2.17,38.75-6.51
                      c10.54-4.34,19.32-10.54,26.35-18.6c7.02-8.06,12.8-17.77,17.36-29.14c4.54-11.36,8.26-24.07,11.16-38.13h8.06v192.81h-8.06
                      c-2.9-11.98-6.31-23.56-10.23-34.72c-3.93-11.16-9.2-20.97-15.81-29.45c-6.62-8.47-14.78-15.19-24.49-20.15
                      c-9.71-4.96-21.81-7.44-36.27-7.44h-41.54v223.81h101.68c19.01,0,36.16-3.19,51.46-9.61c15.29-6.41,28.83-15.4,40.61-26.97
                      c11.78-11.57,21.59-25.11,29.45-40.61c7.85-15.5,13.84-32.13,17.98-49.91h8.06v135.77h-396.17v-8.68h57.04V895.79h-57.04v-8.68
                      H4935.58z" />
                </g>
              </svg>
              <footer>
                <Link href="https://clutch.co/profile/widefix#review-1399992" rel="nofollow" target="_blank"
                  className="button secondary small">Project Details <Image src="/img/icons/right-arrow.svg" alt="Right icon"
                    width="12" height="12" /></Link>
              </footer>
            </div>
            <div className="client">
              <picture>
                <source srcSet="/img/clients/activeplatform.webp" type="image/webp" />
                <Image src="/img/clients/activeplatform.png" alt="ActivePlatform icon" width="201" height="24" />
              </picture>
              <footer>
                <Link href="https://clutch.co/profile/widefix#review-2009400" rel="nofollow" target="_blank"
                  className="button secondary small">Project Details <Image src="/img/icons/right-arrow.svg" alt="Right icon"
                    width="12" height="12" /></Link>
              </footer>
            </div>
            <div className="client">
              <picture>
                <source srcSet="/img/clients/palladium.webp" type="image/webp" />
                <Image src="/img/clients/palladium.png" alt="Palladium icon" width="180" height="20" />
              </picture>
              <footer>
                <Link href="https://clutch.co/profile/widefix#review-2046865" rel="nofollow" target="_blank"
                  className="button secondary small">Project Details <Image src="/img/icons/right-arrow.svg" alt="Right icon"
                    width="12" height="12" /></Link>
              </footer>
            </div>
            <div className="client">
              <picture>
                <source srcSet="/img/clients/schildr.webp" type="image/webp" />
                <Image src="/img/clients/schildr.png" alt="SCHILDR icon" width="180" height="50" />
              </picture>
              <footer>
                <Link href="https://clutch.co/profile/widefix#review-1385286" rel="nofollow" target="_blank"
                  className="button secondary small">Project Details <Image src="/img/icons/right-arrow.svg" alt="Right icon"
                    width="12" height="12" /></Link>
              </footer>
            </div>
            <div className="client">
              <svg xmlns="http://www.w3.org/2000/svg" width="283" height="38" viewBox="0 0 283 38" fill="none"><path d="M134.824 12.5906C131.264 12.5906 128.168 13.7774 125.588 16.0995C123.008 18.4215 121.718 21.4144 121.718 25.078C121.718 28.7417 123.008 31.7861 125.588 34.1598C128.168 36.5334 131.264 37.7202 134.824 37.7202C139.159 37.7202 143.029 35.811 145.299 32.5601L139.468 28.4321C138.436 30.0317 136.888 30.8573 134.824 30.8573C133.225 30.8573 131.831 30.3413 130.645 29.2577C129.458 28.1741 128.839 26.7808 128.839 25.078C128.839 23.4268 129.458 22.0852 130.645 21.0531C131.831 19.9695 133.225 19.4535 134.824 19.4535C136.888 19.4535 138.436 20.2791 139.468 21.8788L145.299 17.6991C142.977 14.4482 139.107 12.5906 134.824 12.5906Z" fill="#0F4E54"></path><path d="M173.398 37.2042V13.1066H166.277V15.7899C164.625 13.4678 161.529 12.5906 159.259 12.5906C156.008 12.5906 153.17 13.7774 150.693 16.0995C148.216 18.4215 146.978 21.4144 146.978 25.1296C146.978 28.8449 148.216 31.8893 150.693 34.2114C153.17 36.5334 156.008 37.6686 159.259 37.6686C160.394 37.6686 161.684 37.4106 163.077 36.843C164.522 36.2754 165.606 35.5014 166.277 34.4694V37.2042H173.398ZM160.446 30.8573C158.846 30.8573 157.453 30.3413 156.214 29.2577C155.028 28.1741 154.408 26.7808 154.408 25.1296C154.408 23.4784 155.028 22.1368 156.214 21.0531C157.453 19.9695 158.846 19.4019 160.446 19.4019C163.542 19.4019 166.277 21.6724 166.277 25.1296C166.277 28.5869 163.542 30.8573 160.446 30.8573Z" fill="#0F4E54"></path><path d="M185.643 28.7933C185.643 22.3948 187.655 19.1955 191.628 19.1955C193.073 19.1955 194.312 19.4535 195.292 19.9179L196.582 13.4678C195.395 12.9002 194.054 12.5906 192.454 12.5906C189.719 12.5906 186.829 14.7578 185.643 18.9375V13.1066H178.47V37.2042H185.643V28.7933Z" fill="#0F4E54"></path><path d="M206.017 25.078C206.017 21.5692 208.494 19.3503 211.59 19.3503C214.686 19.3503 217.163 21.724 217.163 25.078C217.163 28.5869 214.686 30.9089 211.59 30.9089C208.494 30.9089 206.017 28.4321 206.017 25.078ZM205.863 34.2114C207.049 36.4302 209.836 37.7202 212.932 37.7202C216.131 37.7202 218.866 36.585 221.136 34.263C223.458 31.9409 224.594 28.8965 224.594 25.2328C224.594 21.466 223.458 18.4215 221.136 16.0995C218.866 13.7774 216.131 12.5906 212.932 12.5906C209.836 12.5906 207.049 13.9322 205.863 16.0479V0H198.742V37.2042H205.863V34.2114Z" fill="#0F4E54"></path><path d="M239.277 30.5993C236.233 30.5993 233.859 28.3805 233.859 25.078C233.859 21.9304 236.233 19.6083 239.277 19.6083C242.322 19.6083 244.747 21.9304 244.747 25.078C244.747 28.3805 242.373 30.5993 239.277 30.5993ZM248.153 34.1598C250.578 31.8377 251.816 28.7933 251.816 25.078C251.816 21.3628 250.578 18.3699 248.153 16.0479C245.727 13.7258 242.786 12.5906 239.277 12.5906C235.768 12.5906 232.827 13.7258 230.402 16.0479C227.977 18.3699 226.79 21.3628 226.79 25.078C226.79 28.7933 227.977 31.8377 230.402 34.1598C232.827 36.4818 235.768 37.617 239.277 37.617C242.786 37.617 245.727 36.4818 248.153 34.1598Z" fill="#0F4E54"></path><path d="M262.582 24.4588C262.582 21.2079 264.079 19.5567 267.02 19.5567C269.548 19.5567 271.2 21.2596 271.2 24.3556V37.2042H278.372V22.8076C278.372 16.0479 275.121 12.5906 269.548 12.5906C266.71 12.5906 263.872 14.1902 262.582 16.6155V13.1066H255.41V37.2042H262.582V24.4588Z" fill="#0F4E54"></path><path fillRule="evenodd" clipRule="evenodd" d="M33.7558 13.1066V37.2042H40.8767V13.1066H33.7558ZM37.3163 0C34.8394 0 32.827 1.85763 32.827 4.17967C32.827 6.50171 34.8394 8.41094 37.3163 8.41094C39.7415 8.41094 41.7024 6.50171 41.7024 4.17967C41.7024 1.85763 39.7415 0 37.3163 0ZM13.9322 8.51414C16.6671 8.51414 18.7311 9.54616 20.2275 11.6618C21.724 13.7774 22.4464 16.3575 22.4464 19.5051C22.4464 22.6012 21.724 25.1812 20.2275 27.2453C18.7311 29.3093 16.6671 30.3413 13.9322 30.3413H7.53372V8.51414H13.9322ZM13.9322 37.2042C18.9375 37.2042 22.8592 35.553 25.6972 32.2505C28.5353 28.9481 29.9801 24.7168 29.9801 19.5051C29.9801 14.2934 28.5353 10.0622 25.6972 6.70811C22.8592 3.35406 18.9375 1.65123 13.9322 1.65123H0V37.2042H13.9322ZM48.1847 3.87006H55.3056V13.1066H60.3625V18.7827H55.3056V37.2042H48.1847V18.7827H43.7986V13.1066H48.1847V3.87006ZM74.5217 12.5906C70.9613 12.5906 67.8652 13.7774 65.2852 16.0995C62.7051 18.4215 61.4151 21.4144 61.4151 25.078C61.4151 28.7417 62.7051 31.7861 65.2852 34.1598C67.8652 36.5334 70.9613 37.7202 74.5217 37.7202C78.8562 37.7202 82.7262 35.811 84.9967 32.5601L79.1658 28.4321C78.1338 30.0317 76.5857 30.8573 74.5217 30.8573C72.9221 30.8573 71.5289 30.3413 70.342 29.2577C69.1552 28.1741 68.536 26.7808 68.536 25.078C68.536 23.4268 69.1552 22.0852 70.342 21.0531C71.5289 19.9695 72.9221 19.4535 74.5217 19.4535C76.5857 19.4535 78.1338 20.2791 79.1658 21.8788L84.9967 17.6991C82.6746 14.4482 78.8046 12.5906 74.5217 12.5906ZM100.394 19.5567C97.7622 19.5567 95.595 21.1047 95.595 24.4588V37.2042H88.4225V0H95.595V16.8735C96.0594 15.4803 96.9366 14.4482 98.3299 13.7258C99.7231 12.9518 101.065 12.5906 102.355 12.5906C108.598 12.5906 112.004 16.7187 112.004 24.0976V37.2042H104.832V24.3556C104.832 21.4144 102.716 19.5567 100.394 19.5567ZM282.799 22.8925H117.499V27.186H282.799V22.8925Z" fill="#2FB67C"></path></svg>
            </div>
            <div className="client">
              <svg width="138" height="24" viewBox="0 0 138 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0 0V24L23.9997 0H0ZM14.4006 14.4002L4.8 24H24.0003L14.4006 14.4002Z" fill="#0035EF"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M73.468 19.5343L75.1503 16.5429C75.8549 17.2286 76.7785 17.8596 78.0269 17.8596C79.7359 17.8596 80.8065 16.7072 80.8065 14.923L80.7996 2.68115H84.6943V14.9777C84.6943 19.3144 82.042 21.3185 78.3242 21.3185C76.507 21.3185 74.7706 20.824 73.468 19.5343ZM58.5039 14.5003L61.3264 6.57958L64.1488 14.5003H58.5039ZM65.2083 17.7455L66.3201 20.9897H70.7183L63.7425 2.68177H58.9103L51.9078 20.9897H56.3044L57.4445 17.7455H65.2083ZM38.8654 13.6609L44.3488 20.9898H49.0985L41.4172 11.2727L48.6105 2.68185H43.8599L37.4469 10.8616V2.68185H33.6002V20.9898H37.4469V15.3625L38.8654 13.6609ZM95.6196 14.2692L98.4429 6.57958L101.265 14.2692H95.6196ZM102.325 17.9767L103.437 20.9897H107.836L100.859 2.68177H96.026L89.0235 20.9897H93.4209L94.5602 17.9767H102.325ZM123.448 15.5004C123.448 14.348 122.634 13.3425 121.113 13.3425H116.084V17.5132H121.113C122.579 17.5132 123.448 16.8179 123.448 15.5004ZM123.095 8.03416C123.095 6.88089 122.281 6.15782 120.978 6.15782H116.084V10.0973H120.978C122.281 10.0973 123.095 9.18655 123.095 8.03416ZM112.189 20.9895V2.68152H121.818C125.266 2.68152 127.03 4.90549 127.03 7.34759C127.03 9.65325 125.619 11.1906 123.909 11.5478C125.835 11.8494 127.383 13.744 127.383 16.0497C127.383 18.7942 125.565 20.9895 122.117 20.9895H112.189ZM137.85 20.9898H134.004V2.68185H137.85V20.9898Z" fill="#040506"/>
              </svg>
              <footer>
                <Link href="https://clutch.co/profile/widefix#review-225249" rel="nofollow" target="_blank"
                  className="button secondary small">Project Details <Image src="/img/icons/right-arrow.svg" alt="Right icon"
                    width="12" height="12" /></Link>
              </footer>
            </div>
          </div>
        </div>
      </section>

      <section className="expertise has-vertical-paddings">
        <div className="inner">
          <header id="proven-track">
            <h2>Widefix has a proven track record in application development. Read more about our expertise.</h2>
            <p>
              All of that outstanding work has been recognized by our clients and partners. We are proud to be a leading global Ruby on Rails consulting company.
            </p>
          </header>
          <div className="container">
            <div className="item">
              <Link rel="nofollow" href="https://www.packtpub.com/product/rake-task-management-essentials/9781783280773"
                target="_blank">
                <div className="content">
                  <span>BOOK</span>
                </div>
              </Link>
              <p>A book authored by the founder of WideFix, Andrei Kaleshka.</p>
            </div>
            <div className="item">
              <Link href="https://widefix.com/blog/spike-of-signups-business-threat/" target="_blank">
                <div className="content">
                  <span>TECH BLOG</span>
                  <h3>Fake signups: a threat to your business</h3>
                </div>
              </Link>
              <p>A recent technology problem that was solved for one of our clients.</p>
            </div>
            <div className="item">
              <Link rel="nofollow" href="https://github.com/ka8725/migration_data" target="_blank">
                <div className="content">
                  <span>Open-Sourced Library</span>
                  <h3>Migration Data</h3>
                </div>
              </Link>
              <p>An open-sourced library developed by us to improve our daily developer task routine..</p>
            </div>
            <div className="item">
              <Link rel="nofollow" href="https://github.com/widefix/actual_db_schema" target="_blank">
                <div className="content">
                  <span>Open-Sourced Library</span>
                  <h3>Actual DB Schema</h3>
                </div>
              </Link>
              <p>An open-sourced library developed by us to improve our daily developer task routine..</p>
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
                rel="nofollow">Schedule a call now</Link>
            </div>
          </header>
          <Link href="https://clutch.co/profile/widefix#reviews" target="_blank" rel="nofollow">
            <picture>
              <source srcSet="/img/powered-by-clutch.webp" type="image/webp" />
              <Image src="/img/powered-by-clutch.png" alt="Clutch Logo" width="130" height="20" />
            </picture>
          </Link>
          <div className="slider-wrapper">
            <div className="slider">
              <div className="slide">
                <div className="slide-inner">
                  <div className="slide-item">
                    <div className="client-card">
                      <header>
                        <div className="header">
                          <div className="right-header">
                            <cite className="name">Damian Repovs</cite>
                            <p className="job">Founder & CEO, Costa del Home</p>
                          </div>
                        </div>
                        <blockquote>
                          WideFix did really amazing work on the backend to enable our growth.
                        </blockquote>
                      </header>
                      <footer>
                        <div className="left-footer">
                          <div className="star-rating">
                            <span className="rating-point">5.0</span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                          </div>
                        </div>
                        <div className="right-footer">
                          <p className="verified-review">
                            <Image src="/img/icons/verified.svg" width="16" height="16" alt="Verified icon" />
                            <span>Verified Review</span>
                          </p>
                        </div>
                      </footer>
                    </div>
                  </div>
                  <div className="slide-item">
                    <div className="client-card">
                      <header>
                        <div className="header">
                          <div className="right-header">
                            <cite className="name">Tatiana Solodovnikova</cite>
                            <p className="job">Founder & Project Manager, CertifyIt</p>
                          </div>
                        </div>
                        <blockquote>
                          “It was their speedy response that stood out.”
                        </blockquote>
                      </header>
                      <footer>
                        <div className="left-footer">
                          <div className="star-rating">
                            <span className="rating-point">5.0</span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                          </div>
                        </div>
                        <div className="right-footer">
                          <p className="verified-review">
                            <Image src="/img/icons/verified.svg" width="16" height="16" alt="Verified icon" />
                            <span>Verified Review</span>
                          </p>
                        </div>
                      </footer>
                    </div>
                  </div>
                  <div className="slide-item">
                    <div className="client-card">
                      <header>
                        <div className="header">
                          <div className="right-header">
                            <cite className="name">Sean Flannagan</cite>
                            <p className="job">Principal Product Manager, Kajabi LLC</p>
                          </div>
                        </div>
                        <blockquote>
                          “Step by step, tangible progress is made, and the product metrics reflect that.”
                        </blockquote>
                      </header>
                      <footer>
                        <div className="left-footer">
                          <div className="star-rating">
                            <span className="rating-point">5.0</span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                          </div>
                        </div>
                        <div className="right-footer">
                          <p className="verified-review">
                            <Image src="/img/icons/verified.svg" width="16" height="16" alt="Verified icon" />
                            <span>Verified Review</span>
                          </p>
                        </div>
                      </footer>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="slider-footer">
              <div className="slide-indicator">
                <span className="indicator-item active"></span>
              </div>
              <div className="slider-controls">
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
