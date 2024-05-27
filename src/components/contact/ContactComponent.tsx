import Image from 'next/image'

export default function ContactComponent() {
  return (
    <section className="hero has-vertical-paddings">
      <div className="inner">
        <div className="hero-block-left">
          <h1>Contact us for <span>cost-effective</span> tech solutions for <span>your</span> business challenges</h1>
          <div className="button-container">
            <a className="button primary" href="https://calendly.com/andrei-kaleshka/30min" target="_blank" rel="nofollow">
              Schedule a call now
            </a>
          </div>
        </div>
        <div className="hero-block-right">
          <picture>
            <source srcSet="/img/contact.webp?as=webp&width=800" type="image/webp" />
            <Image
              src="/img/contact.webp?width=800"
              alt="Optimise your app to get more customers"
              width="543"
              height="474"
            />
          </picture>
        </div>
      </div>
      <div className="inner">
        <p>
          Submit your inquiry via <a href="mailto:call@widefix.com" target="_blank">email</a>.
          Or simply schedule a call using this <a href="https://calendly.com/andrei-kaleshka/30min" target="_blank" rel="nofollow">form</a>.
        </p>
      </div>
      <div className="inner">
        <p>
          We provide our services to clients worldwide, spanning the United States, Europe, North and South America, the United Kingdom of Great Britain, Australia, and beyond.
        </p>
      </div>
    </section>
  )
}
