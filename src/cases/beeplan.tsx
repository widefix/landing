import { CategoryName, ResultBoxColor, Showcase, SwiperSlideColor } from '@/enums';

const beeplan: Showcase = {
  slug: 'beeplan-crm-ai-project-manager',
  category: CategoryName.devDesign,
  preview: {
    title: 'A CRM for creatives with an AI project manager built in',
    companyName: 'Beeplan',
    solution: 'SaaS MVP Development & AI Integration',
    results: 'Built Beeplan’s Rails application: clients, projects, tasks, calendar and invoicing for creatives and studios, Beevo, an AI project manager in every plan, Stripe subscriptions and Flutter apps for iOS and Android in development.',
    wrapperColor: SwiperSlideColor.yellow,
    buttonColor: SwiperSlideColor.yellow,
    companyImageSrc: '/img/showcases/clients/beeplan-light.png',
    url: '',
  },
  body: {
    bannerTopTitle: <h1>A CRM for creatives with an AI project manager built in</h1>,
    bannerTopImageSrc: '/img/showcases/beeplan/hero.webp',
    description: 'Creatives lose their week to admin instead of creative work',
    descriptionText: <p>Beeplan is a CRM for creatives and small studios. Its premise is simple: creative people would rather spend their time on the work than inside a CRM, so the product has to do the admin for them, from recurring invoices to weekly task planning.</p>,
    detailsTitle: 'One workspace for the whole studio',
    detailsText: <p>Clients, team, projects, tasks, calendar, whiteboards, invoices and bookkeeping live in one place. When an invoice is due, Beeplan drafts it from the project and its rates; the creative reviews it and sends it in one click.</p>,
    detailsImageSrc: '/img/showcases/beeplan/hero.webp',
    problemText: <p>Designers, photographers and other creatives juggle separate tools for clients, tasks, calendars and billing, then repeat the same invoices every month. Beeplan needed to replace that patchwork without becoming another tool that demands constant upkeep.</p>,
    solutionFirstText: <p>We built Beeplan as a Ruby on Rails application on Heroku, with file storage on AWS and Cloudflare in front. The same backend serves the web app today and the iPhone and Android apps in development.</p>,
    solutionSecondText: <p>Beevo, the built-in AI project manager, is part of the product rather than an add-on. It reads the studio&apos;s projects, tasks, clients, calendar and documents to build plans, hand out tasks and prepare invoices.</p>,
    resultBoxes: [
      { color: ResultBoxColor.lightBlue, imageSrc: '/img/showcases/case/icons/link.svg', number: 'Rails', message: 'Backend and web application' },
      { color: ResultBoxColor.lightGreen, imageSrc: '/img/showcases/case/icons/stock.svg', number: 'Beevo AI', message: 'AI project manager included in every plan' },
      { color: ResultBoxColor.lightBlue, imageSrc: '/img/showcases/case/icons/flag.svg', number: 'Stripe', message: 'Solo, Teams and Lifetime plans' },
      { color: ResultBoxColor.lightGreen, imageSrc: '/img/showcases/case/icons/user.svg', number: 'Flutter', message: 'iOS and Android apps in development' },
    ],
    resultText: <p>Beeplan is live as a paid web product with a 14-day trial, three plans and an AI assistant that works on the studio&apos;s real data while keeping people in control of what it creates.</p>,
    helpTitle: 'Planning a SaaS MVP with AI built in?',
  },
  metadata: {
    title: 'Beeplan: CRM for Creatives with an AI Project Manager - WideFix',
    description: 'How we built Beeplan, a Ruby on Rails CRM for creatives and studios with a built-in AI project manager, Stripe subscriptions, Google Calendar sync and Flutter mobile apps in development.',
  },
};

export default beeplan;
