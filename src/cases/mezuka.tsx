import { CategoryName, ResultBoxColor, Showcase, SwiperSlideColor } from '@/enums';

const mezuka: Showcase = {
  slug: 'mezuka-food-delivery-platform',
  category: CategoryName.devDesign,
  preview: {
    title: 'Food Delivery MVP Built from Scratch',
    companyName: 'Mezuka',
    solution: 'MVP Development & Technical Leadership',
    results: 'Built a food-ordering MVP from scratch, integrated payments and restaurant workflows, and built a 10-developer team. The product did not launch because of a market-fit mismatch.',
    wrapperColor: SwiperSlideColor.green,
    buttonColor: SwiperSlideColor.green,
    companyImageSrc: '/img/showcases/clients/mezuka.svg',
    url: '',
  },
  body: {
    bannerTopTitle: <h1>A food delivery MVP built from scratch</h1>,
    bannerTopImageSrc: '/img/showcases/mezuka/customer-ordering.png',
    description: 'From startup requirements to a working food-ordering MVP',
    descriptionText: <p>Mezuka was a startup building a minimum viable product (MVP) for an online food-ordering and delivery platform. Customers could find restaurants and customize dishes such as pizzas, burgers and hot dogs. WideFix founder Andrei Kaleshka built the application from scratch and led its technical development between December 2014 and June 2016.</p>,
    detailsTitle: 'Own the product and the engineering organization',
    detailsText: <p>As CTO and engineering team lead, Andrei analyzed business requirements, made architecture and deployment decisions, planned delivery, reviewed code and built a team of 10 developers. He established the development workflow alongside hands-on implementation.</p>,
    detailsImageSrc: '/img/showcases/mezuka/backoffice-design.png',
    problemText: <p>The platform needed to connect customer ordering with restaurant operations: searchable delivery areas, customizable dishes, online payments, invoices and automated order communication. Building those capabilities required coordinating product requirements, integrations and infrastructure.</p>,
    solutionFirstText: <p>Built order management and invoicing and integrated Authorize.net payments. Twilio automated phone calls, and an eFax integration delivered orders by fax, connecting customer orders with restaurant operations.</p>,
    solutionSecondText: <p>Configured automated deployment and SSL, wrote unit and end-to-end tests, and completed the server PCI compliance process requested by Visa. As the product evolved, refactored its server-rendered interface into a single-page application.</p>,
    resultBoxes: [
      { color: ResultBoxColor.lightGreen, imageSrc: '/img/showcases/case/icons/flag.svg', number: 'From scratch', message: 'Food-ordering MVP built' },
      { color: ResultBoxColor.lightBlue, imageSrc: '/img/showcases/case/icons/user.svg', number: '10 developers', message: 'Engineering team built' },
      { color: ResultBoxColor.green, imageSrc: '/img/showcases/case/icons/link.svg', number: 'Integrated', message: 'Payments, invoicing, calls and fax' },
    ],
    resultText: <p>The engineering work produced a working MVP, integrated ordering workflows and an established development team. Mezuka did not go live because of a market-fit mismatch. This case study documents product development and technical leadership; it does not claim commercial traction, customer growth or production reliability.</p>,
    helpTitle: 'Planning a new Rails application?',
  },
  metadata: {
    title: 'Mezuka: Food Delivery MVP Built from Scratch - WideFix',
    description: 'How WideFix founder Andrei Kaleshka built the Mezuka MVP from scratch: food ordering, Authorize.net payments, map search, restaurant integrations and a 10-developer team.',
  },
};
export default mezuka;
