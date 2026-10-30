import { CategoryName, ResultBoxColor, Showcase, SwiperSlideColor } from '@/enums';

const korner: Showcase = {
  slug: 'korner-sports-club-management-platform',
  category: CategoryName.devDesign,
  preview: {
    title: 'A sports club platform taken from MVP to both app stores',
    companyName: 'Korner',
    solution: 'MVP Development & Cross-Platform Mobile App',
    results: 'Korner grew from a court-booking MVP into a platform for soccer and padel clubs: a Rails backend, an admin dashboard and a Flutter app published on the App Store and Google Play, live since January 2024.',
    wrapperColor: SwiperSlideColor.green,
    buttonColor: SwiperSlideColor.green,
    companyImageSrc: '/img/showcases/clients/korner-light.svg',
    url: '',
  },
  body: {
    bannerTopTitle: <h1>A sports club platform taken from MVP to both app stores</h1>,
    bannerTopImageSrc: '/img/showcases/korner/admin-dashboard.webp',
    description: 'Club operations deserved better than calls and spreadsheets',
    descriptionText: <p>Korner started with a frustration its founder, Yasir Guzman, knew as a regular club player: courts brought people together, but bookings, payments and daily operations ran on disconnected systems, phone calls and manual confirmations.</p>,
    detailsTitle: 'From a booking app to a club ecosystem',
    detailsText: <p>The first version focused on reserving synthetic soccer fields in Barranquilla, Colombia, including public reservations that help players find others to complete a team. The product then grew into an admin dashboard, player and venue websites, a point of sale, tournaments, classes and reporting.</p>,
    detailsImageSrc: '/img/showcases/korner/admin-dashboard.webp',
    problemText: <p>Club administrators deal with empty hours, last-minute cancellations, poor visibility into revenue and repetitive tasks. Players need a fast way to find and book a court. Both sides had to be served by one connected system.</p>,
    solutionFirstText: <p>The backend is a Ruby on Rails application that powers the admin dashboard and the APIs behind the player experience. Clubs manage schedules, prices per field, bookings, payments, inventory, tournaments and reports from one place.</p>,
    solutionSecondText: <p>The player app is built with Flutter from a single codebase for iOS and Android. It was taken through the full cycle: build, App Store and Google Play review, publication and ongoing releases.</p>,
    resultBoxes: [
      { color: ResultBoxColor.lightBlue, imageSrc: '/img/showcases/case/icons/link.svg', number: 'Rails', message: 'Backend and admin dashboard' },
      { color: ResultBoxColor.lightGreen, imageSrc: '/img/showcases/case/icons/stock.svg', number: 'Flutter', message: 'One codebase for iOS and Android' },
      { color: ResultBoxColor.lightBlue, imageSrc: '/img/showcases/case/icons/user.svg', number: '4 sports', message: 'Soccer, padel, squash and volleyball' },
      { color: ResultBoxColor.lightGreen, imageSrc: '/img/showcases/case/icons/flag.svg', number: '2024', message: 'Live on the App Store and Google Play since' },
    ],
    resultText: <p>Korner is a live product serving soccer, padel and multi-sport clubs, with a Rails backend, an admin dashboard and a Flutter app on both stores. Version 2 shipped in 2026, and the Android app was updated for Android 16 compatibility and improved Google sign-in.</p>,
    helpTitle: 'Planning an MVP with a mobile app?',
  },
  metadata: {
    title: 'Korner: Sports Club Platform from MVP to iOS & Android - WideFix',
    description: 'How Korner went from a court-booking MVP to a sports club platform with a Ruby on Rails backend and a Flutter app built, released and published on the App Store and Google Play.',
  },
};

export default korner;
