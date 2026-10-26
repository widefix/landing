import { CategoryName, ResultBoxColor, Showcase, SwiperSlideColor } from '@/enums';

const budgetingkid: Showcase = {
  slug: 'budgetingkid',
  category: CategoryName.devDesign,
  preview: {
    title: 'A family budgeting MVP kept free for everyone',
    companyName: 'BudgetingKid',
    solution: 'MVP Development & Product Ownership',
    results: 'Built for our own family, BudgetingKid became a working Rails product with a public app and source code. We chose to keep it free and noncommercial after exploring the cost of selling it.',
    wrapperColor: SwiperSlideColor.green,
    buttonColor: SwiperSlideColor.green,
    companyImageSrc: '/img/showcases/clients/budgetingkid.svg',
    url: '',
  },
  body: {
    bannerTopTitle: <h1>A family budgeting MVP kept free for everyone</h1>,
    bannerTopImageSrc: '/img/showcases/budgetingkid.svg',
    description: 'Built for our own family and available for yours',
    descriptionText: <p>We built BudgetingKid for our own use: a practical way to manage a child&apos;s pocket money and discuss spending and saving together. The project grew into a working application that anyone can now use for free.</p>,
    detailsTitle: 'A useful product needs a workable business model',
    detailsText: <p>We explored a public commercial launch, then concluded that selling and marketing the product would be too expensive for us. With no marketing budget, we decided to keep BudgetingKid public, free and noncommercial.</p>,
    detailsImageSrc: '/img/showcases/budgetingkid.svg',
    problemText: <p>The first goal was to solve our own family&apos;s budgeting problem. Exploring a wider launch raised a separate question: could we justify the cost of reaching and acquiring customers?</p>,
    solutionFirstText: <p>We built the allowance-tracking application in Ruby on Rails and a separate Next.js landing page. Parents can create a child&apos;s account, set a weekly allowance, track expenses and share access with family members.</p>,
    solutionSecondText: <p>WideFix founder Andrei Kaleshka took BudgetingKid through a startup school for social projects and graduated from the program with this project. He found the experience very valuable for thinking through the product and the practical work of bringing it to a wider audience.</p>,
    resultBoxes: [
      { color: ResultBoxColor.lightGreen, imageSrc: '/img/showcases/case/icons/flag.svg', number: 'Live', message: 'Working family budgeting application' },
      { color: ResultBoxColor.lightBlue, imageSrc: '/img/showcases/case/icons/link.svg', number: 'Public', message: 'Application and landing page source code' },
      { color: ResultBoxColor.lightGreen, imageSrc: '/img/showcases/case/icons/user.svg', number: 'Free', message: 'Available to everyone, noncommercial' },
    ],
    resultText: <p>BudgetingKid remains publicly available and free to use. We chose not to pursue a commercial launch because the sales and marketing costs did not make sense for our budget. The result is a useful family tool, a public codebase and valuable product-building experience.</p>,
    helpTitle: 'Have a practical problem an MVP could solve?',
  },
  metadata: {
    title: 'BudgetingKid: A Free Family Budgeting MVP - WideFix',
    description: 'How WideFix built BudgetingKid for its own family, explored a commercial launch and kept the Rails allowance tracker free and public, with open-source code.',
  },
};

export default budgetingkid;
