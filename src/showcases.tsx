import { ReactNode } from 'react';

import SeoOptimization from '@/cases/seo-optimization';
import { CategoryName, ResultBoxColor, Showcase, SwiperSlideColor } from './enums';

const showcases: Showcase[] = [
  {
    slug: "public-api-development",
    category: CategoryName.devDesign,
    preview: {
      title: "Public API development for Palladium",
      companyName: "Palladium",
      solution: "API Development & Solutions Architecture",
      results: "Built an API and backoffice for a new portal without disrupting the old one. Reused and refactored the existing backend, protected data integrity and unblocked delivery across teams.",
      wrapperColor: SwiperSlideColor.green,
      buttonColor: SwiperSlideColor.green,
      companyImageSrc: "/img/clients/palladium.webp",
      url: '',
    },
    body: {
      bannerTopTitle: <h1><span className="oval">Public API development</span> for Palladium</h1>,
      bannerTopImageSrc: "/img/showcases/public-api-development.svg",
      description: "Public API development for Palladium",
      descriptionText: <p>Palladium needed an API for a new portal being built by another team. The existing portal had to keep working as before. We delivered the API and backoffice, improved the backend code used by both portals and prevented data integrity issues during the changes.</p>,
      detailsTitle: "GraphQL API development & technical leadership",
      detailsText: (
        <>
          <p>We implemented a <strong>GraphQL API</strong> for a stack using <strong>Ruby on Rails, PostgreSQL and Next.js</strong>.</p>
          <p>Instead of implementing the same business behavior twice, we reused code from the existing portal&apos;s backend. That meant changes made for the API also affected code the old portal depended on. We made local refactoring changes to support both interfaces, stabilize the existing system and keep their data consistent.</p>
          <ul className="showcase-tech-stack" aria-label="Technology stack">
            {['Ruby on Rails', 'PostgreSQL', 'Next.js', 'GraphQL'].map(tech => <li key={tech}>{tech}</li>)}
          </ul>
        </>
      ),
      detailsImageSrc: "/img/showcases/public-api-development.svg",
      problemText: <p>The API was consumed by a third-party team. Our work also depended on a service that team was responsible for, creating a circular dependency: we needed their integration to finish parts of our implementation, while the teams&apos; work depended on each other. Waiting would have held up both the API and the backoffice. At the same time, existing users still needed the old portal to function normally.</p>,
      solutionFirstText: <p>We built the new API with GraphQL and introduced a service adapter so our implementation could proceed independently of the unavailable external integration. It provided the behavior our side needed while the other team continued its work. This removed the immediate blocker and let us build the API and backoffice without waiting for that service to be ready.</p>,
      solutionSecondText: <p>In parallel, we refactored the specific backend code that the new API reused. We kept the existing portal&apos;s behavior intact, stabilized the affected functionality and addressed data integrity risks rather than carrying them into the new interface. We coordinated the API work with the third-party team throughout delivery.</p>,
      bannerSolutionPng: "/img/showcases/public-api-development.svg",
      bannerSolutionWebp: "/img/showcases/public-api-development.svg",
      resultBoxes: [
        { color: ResultBoxColor.lightBlue, imageSrc: "/img/showcases/case/icons/link.svg", message: "API & backoffice", number: "Delivered" },
        { color: ResultBoxColor.lightGreen, imageSrc: "/img/showcases/case/icons/flag.svg", message: "Existing system", number: "Stabilized" },
        { color: ResultBoxColor.lightGreen, imageSrc: "/img/showcases/case/icons/stock.svg", message: "Data integrity", number: "Protected" },
      ],
      resultText: <p>The new API and backoffice were completed despite the cross-team dependency. The old portal continued working without disruption. The shared backend was improved through local refactoring, the existing system was stabilized and data integrity issues were prevented. The service adapter gave our team a way to continue delivery instead of letting another team&apos;s unfinished integration stop the project.</p>,
      helpTitle: "Need to add an API to an existing application?",
    },
    metadata: {
      title: "Public API Development for Palladium - WideFix",
      description: "Public API development for Palladium: delivery without disrupting the existing portal, targeted refactoring to stabilize shared code and prevention of data integrity issues.",
    },
  },
  {
    slug: "hipchip-stripe-ach-integration",
    category: CategoryName.systemsIntegrations,
    preview: {
      title: "HipChip: Stripe & ACH integration",
      companyName: "HipChip",
      solution: "Stripe & ACH Integration",
      results: "Took ownership of a legacy Ruby on Rails app after its developer left, added automated tests, and delivered Stripe and ACH alongside performance and stability improvements.",
      wrapperColor: SwiperSlideColor.orange,
      buttonColor: SwiperSlideColor.orange,
      companyImageSrc: "/img/showcases/clients/hipchip.svg",
      url: '',
    },
    body: {
      bannerTopTitle: <h1><span className="oval">Stripe and ACH</span> integration for HipChip</h1>,
      bannerTopImageSrc: "/img/showcases/hipchip-stripe-ach.svg",
      description: "Stripe payments with Braintree retained as a backup",
      descriptionText: <p>We switched HipChip&apos;s payment processing from Braintree to Stripe while keeping Braintree available as a backup. We also integrated Stripe ACH payments.</p>,
      detailsTitle: "Payment integration for HipChip",
      detailsText: <p>HipChip needed to move its payment processing to Stripe without removing its existing Braintree integration. The work also included adding ACH payments through Stripe.</p>,
      detailsImageSrc: "/img/showcases/hipchip-stripe-ach.svg",
      problemText: <p>The application used Braintree for payments. The goal was to introduce Stripe and ACH payments while retaining Braintree as a backup option.</p>,
      solutionFirstText: <p>We integrated Stripe and switched the application&apos;s payment processing to it, keeping Braintree in place as a backup.</p>,
      solutionSecondText: <p>We also added Stripe ACH integration to support bank account payments alongside the new Stripe payment setup.</p>,
      bannerSolutionPng: "/img/showcases/hipchip-stripe-ach.svg",
      bannerSolutionWebp: "/img/showcases/hipchip-stripe-ach.svg",
      resultBoxes: [
        { color: ResultBoxColor.lightBlue, imageSrc: "/img/showcases/case/icons/money.svg", message: "Primary payment integration", number: "Stripe" },
        { color: ResultBoxColor.lightGreen, imageSrc: "/img/showcases/case/icons/link.svg", message: "Backup retained", number: "Braintree" },
        { color: ResultBoxColor.lightGreen, imageSrc: "/img/showcases/case/icons/flag.svg", message: "Bank account payments", number: "ACH" },
      ],
      resultText: <p>HipChip&apos;s payment setup now uses <strong>Stripe</strong>, includes <strong>ACH payments</strong>, and retains <strong>Braintree as a backup</strong>.</p>,
      helpTitle: "Need to migrate payment providers or add ACH payments?",
    },
    metadata: {
      title: "HipChip: Legacy Rails App Takeover, Stripe & ACH - WideFix",
      description: "Existing Rails app takeover for HipChip: ownership after its Rails developer left, automated tests, Stripe and ACH integration, and legacy Rails maintenance.",
    },
  },
  {
    slug: "tma-sport-lokkaroom-financial-report",
    category: CategoryName.systemsIntegrations,
    preview: {
      title: "Financial report system across EventCube, Shopify and Stripe",
      companyName: "TMA Sport",
      solution: "Financial Reporting & Integrations",
      results: "Built a consolidated financial reporting system for transactions and charges across EventCube, Shopify and Stripe in response to an urgent client request.",
      wrapperColor: SwiperSlideColor.green,
      buttonColor: SwiperSlideColor.green,
      companyImageSrc: "/img/showcases/clients/tma-sport.svg",
      url: '',
    },
    body: {
      bannerTopTitle: <h1>Lokkaroom <span className="oval">financial reporting</span> for TMA Sport</h1>,
      bannerTopImageSrc: "/img/showcases/lokkaroom-financial-report.svg",
      description: "One financial report across multiple platforms",
      descriptionText: <p>TMA Sport came to us with an urgent need: a system that could produce a financial report covering transactions and charges across EventCube, Shopify and Stripe.</p>,
      detailsTitle: "Lokkaroom financial report",
      detailsText: <p>We implemented Lokkaroom&apos;s reporting system on Ruby on Rails with ActiveAdmin, bringing together financial activity from EventCube, Shopify and Stripe.</p>,
      detailsImageSrc: "/img/showcases/lokkaroom-financial-report.svg",
      problemText: <p>The client&apos;s transactions and charges were spread across EventCube, Shopify and Stripe. They urgently needed a consolidated financial report covering all three sources.</p>,
      solutionFirstText: <p>We built the financial reporting interface with ActiveAdmin on Ruby on Rails, consolidating transactions and charges from EventCube, Shopify and Stripe.</p>,
      solutionSecondText: <p>Financial activity from EventCube, Shopify and Stripe was brought into a single reporting workflow, giving the client one place to review the combined data.</p>,
      bannerSolutionPng: "/img/showcases/lokkaroom-financial-report.svg",
      bannerSolutionWebp: "/img/showcases/lokkaroom-financial-report.svg",
      resultBoxes: [
        { color: ResultBoxColor.lightBlue, imageSrc: "/img/showcases/case/icons/link.svg", message: "Financial data sources", number: "3" },
        { color: ResultBoxColor.lightGreen, imageSrc: "/img/showcases/case/icons/piechart.svg", message: "Consolidated reporting system", number: "1" },
      ],
      resultText: <p>The Lokkaroom reporting system provides a consolidated view of transactions and charges across <strong>EventCube, Shopify and Stripe</strong>, addressing the client&apos;s urgent financial reporting requirement.</p>,
      helpTitle: "Need financial reporting across your business platforms?",
    },
    metadata: {
      title: "TMA Sport Lokkaroom Financial Reporting - WideFix",
      description: "How WideFix implemented Lokkaroom financial reporting for TMA Sport, using Rails and ActiveAdmin to consolidate transactions and charges across EventCube, Shopify and Stripe.",
    },
  },
  {
    slug: "palladium-rails-upgrade",
    category: CategoryName.devops,
    preview: {
      title: "Rails upgrade",
      companyName: "Palladium",
      solution: "Ruby & Rails Upgrade",
      results: "Upgraded an existing application from Ruby 3.1.4 and Rails 6.1.7.6 to Ruby 3.4.4 and Rails 7.2, resolving 27 documented compatibility issues.",
      wrapperColor: SwiperSlideColor.purple,
      buttonColor: SwiperSlideColor.purple,
      companyImageSrc: "/img/clients/palladium.webp",
      url: '',
    },
    body: {
      bannerTopTitle: <h1><span className="oval">Ruby and Rails</span> upgrade for Palladium</h1>,
      bannerTopImageSrc: "/img/showcases/palladium-rails-upgrade.svg",
      description: "Upgrading an established Rails application",
      descriptionText: <p>We updated Palladium&apos;s Ruby and Rails stack while addressing compatibility issues in its existing codebase.</p>,
      detailsTitle: "Ruby & Rails upgrade",
      detailsText: <p>The application used PostgreSQL, Sidekiq and GraphQL. We upgraded Ruby first, then Rails, to isolate issues.</p>,
      detailsImageSrc: "/img/showcases/palladium-rails-upgrade.svg",
      problemText: <p>Older Ruby versions faced Heroku deprecation. Dependencies and legacy code needed changes to work with the upgraded stack.</p>,
      solutionFirstText: <p>We updated dependencies and resolved test, asset compilation and application startup failures.</p>,
      solutionSecondText: <p>We addressed Zeitwerk loading and framework compatibility. <a href="https://widefix.com/blog/ruby-and-rails-upgrade-personal-experience/" target="_blank" rel="noopener noreferrer">Read the detailed upgrade log.</a></p>,
      bannerSolutionPng: "/img/showcases/palladium-rails-upgrade.svg",
      bannerSolutionWebp: "/img/showcases/palladium-rails-upgrade.svg",
      resultBoxes: [
        { color: ResultBoxColor.lightBlue, imageSrc: "/img/showcases/case/icons/flag.svg", message: "Ruby upgraded to", number: "3.4.4" },
        { color: ResultBoxColor.lightGreen, imageSrc: "/img/showcases/case/icons/flag.svg", message: "Rails upgraded to", number: "7.2" },
        { color: ResultBoxColor.lightGreen, imageSrc: "/img/showcases/case/icons/flag.svg", message: "Documented compatibility issues resolved", number: "27" },
      ],
      resultText: (
        <>
          <p>The application worked on Ruby 3.4.4 and Rails 7.2 after resolving <strong>27 documented compatibility issues</strong>, including dependencies, assets, code loading and framework behavior.</p>
          <p><strong>Initial improvements observed during validation:</strong> faster Rails server startup, quicker and more accurate console autocompletion, and apparently faster HTTP responses on Heroku. These were qualitative observations; the article reports that production rollout and performance measurements were still pending.</p>
          <p><strong>Earlier detection of loading issues:</strong> Zeitwerk&apos;s stricter conventions helped expose code-loading problems. We adapted the existing structure while preserving job class names to avoid breaking queued jobs.</p>
          <p><strong>Contributions beyond the project:</strong> the upgrade also led to a dry-auto_inject issue report and a RuboCop pull request.</p>
        </>
      ),
      helpTitle: "Need help upgrading an existing Rails application?",
      related: [{
        companyName: "Palladium",
        solution: "Ruby and Rails upgrade: personal experience",
        results: "Read the compatibility issues, fixes and lessons from the upgrade.",
        wrapperColor: SwiperSlideColor.purple,
        buttonColor: SwiperSlideColor.purple,
        companyImageSrc: "/img/clients/palladium.webp",
        url: "https://widefix.com/blog/ruby-and-rails-upgrade-personal-experience/",
      }],
    },
    metadata: {
      title: "Palladium Ruby & Rails Upgrade - WideFix",
      description: "Palladium's incremental Ruby and Rails upgrade: compatibility fixes, dependency updates and validation of an existing application.",
    },
  },
  {
    slug: "costa-del-home-crm-enhancement",
    category: CategoryName.devDesign,
    preview: {
      title: "Added advanced functionality to the CRM",
      companyName: "CostaDelHome",
      solution: "CRM Development & Data Migration",
      results: "Enabled multiple managers per property with zero-downtime data and relationship migrations, preserving the existing app and user experience.",
      wrapperColor: SwiperSlideColor.sea,
      buttonColor: SwiperSlideColor.sea,
      companyImageSrc: "/img/showcases/clients/costa-del-home.svg",
      url: '',
    },
    body: {
      bannerTopTitle: <h1>Added advanced functionality to the <span className="oval">CRM</span></h1>,
      bannerTopImageSrc: "/img/showcases/costa-del-home-crm.svg",
      description: "More flexible property management, without downtime",
      descriptionText: <p>We expanded CostaDelHome&apos;s CRM so a property could be associated with multiple managers instead of just one. Data and relationship migrations happened without downtime or disruption to existing users.</p>,
      detailsTitle: "CRM relationship migration for CostaDelHome",
      detailsText: <p>The CRM needed to support more flexible relationships between properties and managers. We changed the single-manager selection into a multiple-manager workflow while preserving existing assignments and keeping the production application available.</p>,
      detailsImageSrc: "/img/showcases/costa-del-home-crm.svg",
      problemText: <p>A property could have only one selected manager. Supporting multiple managers required changes to the database, application associations and selection interface in a live system that existing users depended on.</p>,
      solutionFirstText: <p>We rolled out the migration incrementally: introduced the new relationship structure, kept old and new data structures in sync, and migrated existing assignments before switching the application to the new associations.</p>,
      solutionSecondText: <p>We replaced the single-selection interface with multiple checkboxes, then removed the old relationship structure after the application had transitioned. <a href="https://blog.widefix.com/from-single-dd-to-multiple-checkboxes/" target="_blank" rel="noopener noreferrer">Read the step-by-step migration article.</a></p>,
      bannerSolutionPng: "/img/showcases/costa-del-home-crm.svg",
      bannerSolutionWebp: "/img/showcases/costa-del-home-crm.svg",
      resultBoxes: [
        { color: ResultBoxColor.lightGreen, imageSrc: "/img/showcases/case/icons/stock.svg", message: "Migration downtime", number: "Zero" },
        { color: ResultBoxColor.lightBlue, imageSrc: "/img/showcases/case/icons/user.svg", message: "Managers per property", number: "Multiple" },
        { color: ResultBoxColor.lightGreen, imageSrc: "/img/showcases/case/icons/flag.svg", message: "Disruption to existing users", number: "Zero" },
      ],
      resultText: <p>The CRM now supports multiple managers per property. Existing data and relationships were migrated with <strong>zero downtime and no disruption to existing users</strong>, allowing the business to add functionality while keeping its production application running.</p>,
      helpTitle: "Need to evolve your CRM without interrupting existing users?",
      related: [{
        title: "From Single drop-down to Multiple check-boxes",
        companyName: "CostaDelHome",
        solution: "Zero-Downtime Relationship Migration",
        results: "A step-by-step approach to changing database relationships and selection interfaces in a live Rails application.",
        wrapperColor: SwiperSlideColor.sea,
        buttonColor: SwiperSlideColor.sea,
        companyImageSrc: "/img/showcases/clients/costa-del-home.svg",
        url: "https://blog.widefix.com/from-single-dd-to-multiple-checkboxes/",
      }],
    },
    metadata: {
      title: "CostaDelHome CRM Enhancement & Zero-Downtime Migration - WideFix",
      description: "How WideFix enabled multiple managers per property in CostaDelHome's CRM with zero-downtime data and relationship migrations and no disruption to existing users.",
    },
  },
  {
    slug: "costa-del-home-search-performance",
    category: CategoryName.optimisations,
    preview: {
      title: "Improved page load speed of the search functionality",
      companyName: "CostaDelHome",
      solution: "Search Performance",
      results: "Reduced search page load time from 10 seconds to 100ms - a 99% reduction and 100× faster loading.",
      wrapperColor: SwiperSlideColor.sea,
      buttonColor: SwiperSlideColor.sea,
      companyImageSrc: "/img/showcases/clients/costa-del-home.svg",
      url: '',
    },
    body: {
      bannerTopTitle: <h1>Improved page load speed of the <span className="oval">search</span> functionality</h1>,
      bannerTopImageSrc: "/img/showcases/costa-del-home-search.svg",
      description: "Search pages loading in 100ms instead of 10 seconds",
      descriptionText: <p>We improved CostaDelHome&apos;s search functionality, reducing page load time from 10 seconds to 100ms.</p>,
      detailsTitle: "Search performance for CostaDelHome",
      detailsText: <p>CostaDelHome&apos;s search pages took 10 seconds to load. We improved their performance so the same functionality loaded in 100ms.</p>,
      detailsImageSrc: "/img/showcases/costa-del-home-search.svg",
      problemText: <p>Users had to wait 10 seconds for search pages to load, making it slow to find what they needed.</p>,
      solutionFirstText: <p>We optimized the application&apos;s search functionality to reduce page load time.</p>,
      solutionSecondText: <p>The improved search experience loads in 100ms instead of 10 seconds.</p>,
      bannerSolutionPng: "/img/showcases/costa-del-home-search.svg",
      bannerSolutionWebp: "/img/showcases/costa-del-home-search.svg",
      resultBoxes: [
        { color: ResultBoxColor.lightBlue, imageSrc: "/img/showcases/case/icons/stock.svg", message: "Load time before", number: "10 seconds" },
        { color: ResultBoxColor.lightGreen, imageSrc: "/img/showcases/case/icons/stock.svg", message: "Load time after", number: "100ms" },
        { color: ResultBoxColor.lightGreen, imageSrc: "/img/showcases/case/icons/piechart.svg", message: "Reduction in load time", number: "99%" },
      ],
      resultText: <p>Search page load time dropped from <strong>10 seconds to 100ms</strong> - a <strong>99% reduction</strong>. That means search pages now load <strong>100 times faster</strong>.</p>,
      helpTitle: "Need to improve your application's search performance?",
    },
    metadata: {
      title: "CostaDelHome Search Performance Optimization - WideFix",
      description: "How WideFix reduced CostaDelHome search page load time from 10 seconds to 100ms - a 99% reduction and 100× faster loading.",
    },
  },
  {
    slug: "costa-del-home-heroku-to-aws",
    category: CategoryName.devops,
    preview: {
      title: "Moved services from Heroku to AWS",
      companyName: "Costa Del Home",
      solution: "Infrastructure Migration",
      results: "Moved Costa Del Home from Heroku to AWS with Dokku, reducing hosting costs from €400 to €50 per month - eight times cheaper.",
      wrapperColor: SwiperSlideColor.green,
      buttonColor: SwiperSlideColor.green,
      companyImageSrc: "/img/showcases/clients/costa-del-home.svg",
      url: '',
    },
    body: {
      bannerTopTitle: <h1>Moved services from <span className="oval">Heroku</span> to <span className="stripe">AWS</span></h1>,
      bannerTopImageSrc: "/img/showcases/costa-del-home-aws.svg",
      description: "A smaller monthly infrastructure bill",
      descriptionText: <p>We moved Costa Del Home&apos;s services from Heroku to AWS and used Dokku for hosting, reducing monthly costs from €400 to €50.</p>,
      detailsTitle: "Heroku to AWS migration for Costa Del Home",
      detailsText: <p>After Heroku raised its service prices, Costa Del Home had a €400-per-month hosting contract despite the application not being heavily loaded. We moved its services to AWS with Dokku, bringing the monthly hosting cost down to €50.</p>,
      detailsImageSrc: "/img/showcases/costa-del-home-aws.svg",
      problemText: <p>Heroku raised its service prices, leaving the business with a €400-per-month contract for an application that was not heavily loaded. The hosting cost no longer matched the application&apos;s needs.</p>,
      solutionFirstText: <p>We moved the application&apos;s services from Heroku to AWS and used Dokku to host the application.</p>,
      solutionSecondText: <p>AWS with Dokku provided a lower-cost hosting setup, bringing the monthly bill down to €50.</p>,
      bannerSolutionPng: "/img/showcases/costa-del-home-aws.svg",
      bannerSolutionWebp: "/img/showcases/costa-del-home-aws.svg",
      resultBoxes: [
        { color: ResultBoxColor.lightBlue, imageSrc: "/img/showcases/case/icons/money.svg", message: "Monthly cost before", number: "€400" },
        { color: ResultBoxColor.lightGreen, imageSrc: "/img/showcases/case/icons/money.svg", message: "Monthly cost after", number: "€50" },
        { color: ResultBoxColor.lightGreen, imageSrc: "/img/showcases/case/icons/piechart.svg", message: "Cost reduction", number: "87.5%" },
      ],
      resultText: <p>Hosting is now <strong>eight times cheaper</strong>: €50 per month instead of €400. That saves <strong>€350 per month</strong>, an <strong>87.5% reduction</strong>, equivalent to €4,200 over a year at the same monthly costs.</p>,
      helpTitle: "Need to reduce your application’s infrastructure costs?",
    },
    metadata: {
      title: "Costa Del Home Heroku to AWS Migration - WideFix",
      description: "How WideFix moved Costa Del Home from Heroku to AWS with Dokku, reducing hosting costs from €400 to €50 per month - eight times cheaper.",
    },
  },
  {
    slug: "costa-del-home-stripe-integration",
    category: CategoryName.systemsIntegrations,
    preview: {
      title: "Integrated the app with Stripe from scratch",
      companyName: "Costa Del Home",
      solution: "Stripe Integration",
      results: "Replaced cash payment collection with automatic Stripe payments, reducing accountant workload by 90%.",
      wrapperColor: SwiperSlideColor.sea,
      buttonColor: SwiperSlideColor.sea,
      companyImageSrc: "/img/showcases/clients/costa-del-home.svg",
      url: '',
    },
    body: {
      bannerTopTitle: <h1>Integrated the app with <span className="oval">Stripe</span> from scratch</h1>,
      bannerTopImageSrc: "/img/showcases/costa-del-home-stripe.svg",
      description: "From cash payments to automatic collection",
      descriptionText: <p>We integrated Costa Del Home&apos;s application with Stripe so the business could collect payments automatically instead of relying on cash.</p>,
      detailsTitle: "Stripe integration for Costa Del Home",
      detailsText: <p>Costa Del Home needed a more convenient way to collect payments. We built the Stripe integration from scratch, replacing cash collection with an automated payment workflow.</p>,
      detailsImageSrc: "/img/showcases/costa-del-home-stripe.svg",
      problemText: <p>The business collected payments in cash, which was inconvenient and created manual work for the company accountant.</p>,
      solutionFirstText: <p>We integrated the existing application with Stripe from scratch to enable automatic payment collection.</p>,
      solutionSecondText: <p>The new payment workflow reduced the manual work involved in collecting payments and freed up the accountant&apos;s time.</p>,
      bannerSolutionPng: "/img/showcases/costa-del-home-stripe.svg",
      bannerSolutionWebp: "/img/showcases/costa-del-home-stripe.svg",
      resultBoxes: [{
        color: ResultBoxColor.lightGreen,
        imageSrc: "/img/showcases/case/icons/piechart.svg",
        message: "Reduction in accountant workload",
        number: "90%",
      }],
      resultText: <p>With Stripe collecting payments automatically, <strong>the company accountant&apos;s workload was reduced by 90%</strong>. The business gained a more convenient alternative to cash collection.</p>,
      helpTitle: "Need to automate payments in your application?",
    },
    metadata: {
      title: "Costa Del Home Stripe Integration - WideFix",
      description: "How WideFix integrated Costa Del Home with Stripe from scratch, automated payment collection and reduced accountant workload by 90%.",
    },
  },
  {
    slug: "stripe-integration",
    category: CategoryName.systemsIntegrations,
    preview: {
      title: "Stripe Data Consistency",
      companyName: "Worship Online",
      solution: "Stripe Integration",
      results: "We fixed data consistency issues between the app and Stripe.",
      wrapperColor: SwiperSlideColor.purple,
      buttonColor: SwiperSlideColor.purple,
      companyImageSrc: "/img/showcases/clients/wo.svg",
      url: ''
    },
    body: {
      bannerTopTitle: (
        <h1>
          Stripe Integration consistency <span className="oval">fix</span> to prevent financial <span className="stripe">losses</span>
        </h1>
      ),
      bannerTopImageSrc: "/img/showcases/wo.png",
      bannerTopImageWebpSrc: "/img/showcases/wo.webp",
      description: "Solved New User Payment Friction with Stripe Optimization",
      descriptionText: (
        <p>
          Identified and eliminated bottlenecks within the payment flow to <strong><i>improve conversion rates</i></strong> for new sign-ups.
        </p>
      ),
      detailsTitle: 'Stripe Integration',
      detailsText: (
        <p>
          We fixed data consistency issues between the app and Stripe. The fix resulted in an immediate recovery
          of $525 monthly recurring revenue (MRR) and <strong><i>prevented future financial losses that could be
          up to $1500 MRR.</i></strong>
        </p>
      ),
      detailsImageSrc: "/img/showcases/case/stripe-wo.svg",
      problemText: (
        <p>
          While the number of new users increased, the <strong><i>revenue slowly fell</i></strong>.
        </p>
      ),
      solutionFirstText: (
        <p>
          We gathered all the data from Stripe and saved it into our database. We then analyzed it using SQL and
          Metabase, revealing a severe Stripe integration breach. This breach was related to asynchronous
          communication and the unordered processing of webhooks. Our team worked together to come up with
          possible solutions and ultimately found an easy fix for the issue regarding the architecture. The fix
          didn`t pose any risks to the business. We were able to fix the architectural issue related to the
          webhook processing and correct the historical data. <strong><i>We also activated subscriptions for all
          users we could recover.</i></strong>
        </p>
      ),
      solutionSecondText: (
        <p>
          We have set up monitoring with Metabase and Slack to prevent the issue from happening again.
        </p>
      ),
      resultBoxes: [
        {
          color: ResultBoxColor.lightBlue,
          imageSrc: "/img/showcases/case/icons/stock.svg",
          message: "MRR increase",
          number: "$525"
        },
        {
          color: ResultBoxColor.lightGreen,
          imageSrc: "/img/showcases/case/icons/money.svg",
          message: "Loss Preventation",
          number: "$1500"
        },
      ],
      resultText: (
        <p>
          983 out of 9,471 premium users did not have an actual subscription, which is roughly 10%. Of these 983
          users, 514 had a &quot;deleted&quot; status, indicating they had not used the app for a long time. Only 469,
          equivalent to 5% of all premium users, could exploit the issue. However, only 79 of them had used the app in
          the last three months and received an attempt to reactivate their subscription. Out of these, 20 immediately
          acquired an active subscription. The rest got moved to the free plan. <strong><i>The reactivation of the subscriptions
          resulted in approximately a $525 MRR increase.</i></strong> The applied fix aims to prevent future financial losses that
          could amount to $1500 in MRR (these are rough calculations done on the historical data).
        </p>
      ),
      helpTitle: "Need help with Stripe integration?",
      related: [
        {
          companyName: "Worship Online",
          solution: "Stripe Integration",
          results: "How we reconciled app users with Stripe and prevented financial losses.",
          wrapperColor: SwiperSlideColor.purple,
          buttonColor: SwiperSlideColor.purple,
          companyImageSrc: "/img/showcases/clients/wo.svg",
          url: "https://widefix.com/blog/reconcile-app-users-against-stripe-and-prevent-financial-losses/"
        }
      ]
    },
    metadata: {
      title: "Stripe Integration - WideFix",
      description: "See how we fixed Stripe integration data consistency and prevented financial losses."
    }
  },
  {
    slug: "prevent-account-sharing",
    category: CategoryName.optimisations,
    preview: {
      companyName: "Worship Online",
      solution: "System Design",
      title: "Prevent Account Sharing",
      results: "We implemented an on-premises solution to combat account sharing.",
      wrapperColor: SwiperSlideColor.green,
      buttonColor: SwiperSlideColor.green,
      companyImageSrc: "/img/showcases/clients/wo.svg",
      url: ''
    },
    body: {
      bannerTopTitle: (
        <h1>
          Prevent account sharing to <span className="oval">stop</span> financial <span className="stripe">losses</span>
        </h1>
      ),
      bannerTopImageSrc: "/img/showcases/case/showcase-2-cybersecurity.jpg",
      bannerTopImageWebpSrc: "/img/showcases/case/showcase-2-cybersecurity.webp",
      description: "Solved the issue with account sharing by users",
      descriptionText: (
        <p>Added Multi-factor Authentication (MFA) to the project in a risk-free way for the business.
          That increased daily signups by roughly <b>30%</b>. The revenue has stopped descending <b>5%</b> monthly and recovered. That also has improved security.
        </p>
      ),
      detailsTitle: 'Stop account sharing',
      detailsText: (
        <p>
          We tackled declining revenue by combating widespread account sharing with <strong><i>Multi-factor Authentication (MFA) and login session limits</i></strong>. Through data analysis and monitoring, severe account sharers were targeted, leading to a <strong><i>30% increase</i></strong> in daily signups and a <strong><i>400% reduction in average</i></strong> login sessions per user. Revenue stabilized, <strong><i>preventing 5% monthly losses</i></strong>. The login session limit of three sessions per account enhanced security and accountability.
        </p>
      ),
      detailsImageSrc: "/img/showcases/case/auth-worshiponline.svg",
      problemText: (
        <p>
          The revenue was <strong><i>slowly descending</i></strong>. It was clear that this happened because the users <strong><i>shared their accounts</i></strong> because of the many logins they used to make daily.
        </p>
      ),
      solutionFirstText: (
        <p>
          We collected the necessary data to determine who shares their accounts and how severely. Then, we defined indicators showing the situation dynamics and started measuring and monitoring them. We used Metabase to monitor and analyze the data. The users who shared their accounts severely and for sure <strong><i>got Multi-factor Authentication (MFA) enabled</i></strong>, which we also implemented. That increased daily signups by <strong><i>roughly 30%</i></strong>. The average login session per user decreased <strong><i>from 6 to 1.5, or by 400%</i></strong>. Revenue has stopped declining.
        </p>
      ),
      solutionSecondText: (
        <p>
          Later, we implemented a <strong><i>login session limit</i></strong> so that one account could have a maximum of 3 simultaneous login sessions. That was possible only after we built the infrastructure around the measurement system.
        </p>
      ),
      resultBoxes: [
        {
          color: ResultBoxColor.darkBlue,
          imageSrc: "/img/showcases/case/icons/cancel.svg",
          message: "Revenue losses",
          number: "-5%"
        },
        {
          color: ResultBoxColor.green,
          imageSrc: "/img/showcases/case/icons/flag.svg",
          message: "Exploit The Issue",
          number: "-400%"
        },
        {
          color: ResultBoxColor.blue,
          imageSrc: "/img/showcases/case/icons/user.svg",
          message: "Monthly signups",
          number: "+27%"
        },
      ],
      resultText: (
        <p>
          Daily signups increased by <strong><i>30%</i></strong>, login sessions per user <strong><i>decreased by 400%</i></strong>, and revenue stopped declining. Our solution <strong><i>prevented 5%</i></strong> monthly revenue losses.
        </p>
      ),
      helpTitle: "Need for help with performance optimization?",
      related: [
        {
          companyName: "Worship Online",
          solution: "Stripe Integration",
          results: "We fixed data consistency issues between the app and Stripe.",
          wrapperColor: SwiperSlideColor.purple,
          buttonColor: SwiperSlideColor.purple,
          companyImageSrc: "/img/showcases/clients/wo.svg",
          url: "https://widefix.com/blog/prevent-account-sharing-with-mfa/"
        }
      ]
    },
    metadata: {
      title: "Prevent account sharing - WideFix",
      description: "See how we added Multi-Factor Authentication (MFA) and limitted login sessions per user and prevented 5% monthly financial losses."
    }
  },
  {
    slug: "build-crossplatform-mobile-application",
    category: CategoryName.devDesign,
    preview: {
      companyName: "Worship Online",
      solution: "Mobile App",
      title: "Mobile App & Audio Engineering",
      results: "React Native for iOS and Android, a custom C audio engine, and ownership through publication on both stores.",
      wrapperColor: SwiperSlideColor.orange,
      buttonColor: SwiperSlideColor.orange,
      companyImageSrc: "/img/showcases/clients/wo.svg",
      url: ''
    },
    body: {
      bannerTopTitle: (
        <h1>
          Launched a mobile app from scratch for both <span className="oval">iOS</span> and <span className="stripe">Android</span>
        </h1>
      ),
      bannerTopImageSrc: "/img/showcases/worshiponline-mobile-engine.svg",
      description: "Launch a mobile app for both iOS and Android platforms",
      descriptionText: (
        <p>
          Designed and built a mobile app from scratch for both iOS and Android platforms, featuring advanced <strong>Audio Signal Processing</strong> functionality. Now available on the <strong>App Store</strong> and <strong>Google Play</strong>.
        </p>
      ),
      detailsTitle: 'Mobile app development',
      detailsText: (
        <p>
          The client had dreamed of a new mobile app for many years. In just a few months, we developed the app from scratch, adapted the back-end for it, and finally launched it on the <strong>App Store</strong> and <strong>Google Play</strong>.
        </p>
      ),
      detailsImageSrc: "/img/showcases/case/mobile-app-wo.svg",
      bannerProblemWebp: "/img/showcases/case/mixer.webp",
      bannerProblemPng: "/img/showcases/case/mixer.png",
      problemText: (
        <p>
          While most of the functionality was straightforward to implement, the real-time <strong>audio mixer</strong> posed a significant challenge. The mixer needed to be both <strong>fast</strong> and <strong>reliable</strong> to ensure a seamless user experience. It was designed to mix multiple audio streams in real-time while applying effects such as stereo panning, adjusting the volume of individual tracks or all tracks simultaneously, rewinding, muting, and soloing tracks.
        </p>
      ),
      bannerSolutionWebp: "/img/showcases/case/mixer-solution.webp",
      bannerSolutionPng: "/img/showcases/case/mixer-solution.png",
      solutionFirstText: (
        <p>
          We built a custom audio-processing library from scratch in <strong>C</strong> and connected it to <strong>React Native</strong> through a native module. AI-generated prototypes failed to keep tracks synchronized, so we studied the signal-processing theory and implemented the timing and processing ourselves. This delivered the required functionality at a lower cost than the proprietary licensing options we evaluated.
        </p>
      ),
      solutionSecondText: (
        <p>
          We supported the client through publication on the <strong>Apple App Store</strong> and <strong>Google Play</strong>, maintained ownership of technical challenges, and continued helping the client team develop the product.
        </p>
      ),
      resultBoxes: [
        { color: ResultBoxColor.lightBlue, imageSrc: "/img/showcases/case/icons/stock.svg", message: "Shared React Native app", number: "2 platforms" },
        { color: ResultBoxColor.lightGreen, imageSrc: "/img/showcases/case/icons/money.svg", message: "Synchronized audio processing", number: "Native C" },
        { color: ResultBoxColor.green, imageSrc: "/img/showcases/case/icons/user.svg", message: "Publication and team support", number: "Both stores" }
      ],
      resultText: (
        <p>A live mobile product for iOS and Android, a reusable native audio engine, and client-team support through release and ongoing development.</p>
      ),
      helpTitle: "Looking for assistance with mobile app development?"
    },
    metadata: {
      title: "WorshipOnline Mobile App: React Native & Custom C Audio Engine - WideFix",
      description: "How WideFix built WorshipOnline for iOS and Android, developed a synchronized audio engine in C, and supported store publication."
    }
  },
  {
    slug: "ruby-on-rails-redesign",
    category: CategoryName.devDesign,
    preview: {
      companyName: "WorshipOnline",
      solution: "System Design",
      title: "Ruby on Rails App Redesign",
      results: "We redesigned the app with zero downtime, achieving 20% more signups and 30% revenue increase.",
      wrapperColor: SwiperSlideColor.yellow,
      buttonColor: SwiperSlideColor.blue,
      companyImageSrc: "/img/showcases/clients/wo.svg",
      url: ''
    },
    body: {
      bannerTopTitle: (
        <h1>
          Risk-free Ruby on Rails app <span className="oval">redesign</span> with zero <span className="stripe">downtime</span>
        </h1>
      ),
      bannerTopImageSrc: "/img/showcases/system-redesign.jpg",
      bannerTopImageWebpSrc: "/img/showcases/system-redesign.webp",
      bannerSolutionPng: "/img/showcases/system-redesign.jpg",
      bannerSolutionWebp: "/img/showcases/system-redesign.webp",
      description: "Complete UI/UX overhaul without disrupting existing users",
      descriptionText: (
        <p>
          Successfully redesigned and migrated a Ruby on Rails application to a new front-end while maintaining <strong><i>zero downtime</i></strong> and preserving full functionality for existing mobile app users. The gradual migration approach resulted in <strong><i>20% increase in daily signups</i></strong> and <strong><i>30% revenue growth</i></strong>.
        </p>
      ),
      detailsTitle: 'Zero-Risk Redesign Strategy',
      detailsText: (
        <p>
          We adopted the existing back-end for the new design and built a completely new front-end, seamlessly integrating it with the updated back-end architecture. <strong><i>All changes were implemented with zero downtime</i></strong> and no risks to the business or existing mobile app users. We implemented a gradual user migration system with the ability to switch back to the old UI in case of any issues, ensuring <strong><i>complete risk mitigation</i></strong>.
        </p>
      ),
      detailsImageSrc: "/img/showcases/case/redesign-architecture.svg",
      problemText: (
        <p>
          The existing Ruby on Rails application had an <strong><i>outdated user interface</i></strong> that was affecting user engagement and conversion rates, but a complete redesign posed significant risks to business continuity and existing mobile app functionality.
        </p>
      ),
      solutionFirstText: (
        <p>
          We implemented a sophisticated dual-interface system that allowed us to <strong><i>gradually migrate users to the new design</i></strong> while maintaining the old interface as a fallback option. The new front-end was built using modern technologies and seamlessly integrated with the existing Ruby on Rails back-end. We ensured that all existing API endpoints remained functional for the mobile app, preventing any disruption to mobile users.
        </p>
      ),
      solutionSecondText: (
        <p>
          The migration strategy included comprehensive testing, user feedback collection, and real-time monitoring to ensure optimal performance. Users could easily switch between the old and new interfaces during the transition period, providing <strong><i>maximum flexibility and risk mitigation</i></strong>.
        </p>
      ),
      resultBoxes: [
        {
          color: ResultBoxColor.green,
          imageSrc: "/img/showcases/case/icons/user.svg",
          message: "Daily signups increase",
          number: "+20%"
        },
        {
          color: ResultBoxColor.blue,
          imageSrc: "/img/showcases/case/icons/money.svg",
          message: "Revenue growth",
          number: "+30%"
        },
        {
          color: ResultBoxColor.lightGreen,
          imageSrc: "/img/showcases/case/icons/flag.svg",
          message: "System downtime",
          number: "0min"
        }
      ],
      resultText: (
        <p>
          The redesign was completed with <strong><i>zero downtime</i></strong> and no disruption to existing services. We achieved a <strong><i>20% increase in daily new user signups</i></strong> and a <strong><i>30% increase in revenue</i></strong>. The gradual migration approach ensured that all existing mobile app users continued to have uninterrupted service throughout the entire process.
        </p>
      ),
      helpTitle: "Need help with risk-free application redesign?",
      related: [
        {
          companyName: "WorshipOnline",
          solution: "Prevent account sharing",
          results: "We implemented an on-premises solution to combat account sharing.",
          wrapperColor: SwiperSlideColor.green,
          buttonColor: SwiperSlideColor.green,
          companyImageSrc: "/img/showcases/clients/wo.svg",
          url: "https://blog.widefix.com/risk-free-redesign-ruby-on-rails-app/"
        }
      ]
    },
    metadata: {
      title: "Ruby on Rails App Redesign - WideFix",
      description: "See how we redesigned a Ruby on Rails application with zero downtime, achieving 20% more signups and 30% revenue increase."
    }
  },
  {
    slug: "shopwired-queue-optimization",
    category: CategoryName.optimisations,
    preview: {
      title: "Queue Optimization",
      companyName: "Shopwired (Platform 21 Limited)",
      solution: "Background Jobs & Integrations",
      results: "We unblocked a completely stalled background jobs queue and eliminated daily H12 errors.",
      wrapperColor: SwiperSlideColor.sea,
      buttonColor: SwiperSlideColor.sea,
      companyImageSrc: "/img/showcases/clients/shopwired.svg",
      url: ''
    },
    body: {
      bannerTopTitle: (
        <h1>
          Eliminated daily <span className="oval">performance</span> bottlenecks and queue <span className="stripe">stalls</span>
        </h1>
      ),
      bannerTopImageSrc: "/img/showcases/shopwired.jpg",
      bannerTopImageWebpSrc: "/img/showcases/shopwired.webp",
      description: "Resolved Critical Performance Issues in E-commerce Platform",
      descriptionText: (
        <p>
          Unblocked a completely stalled background jobs queue and <strong><i>eliminated recurring H12 errors</i></strong> on Heroku that previously occurred multiple times per day.
        </p>
      ),
      detailsTitle: 'Queue Optimization & Integrations',
      detailsText: (
        <p>
          We optimized the DelayedJob queue by <strong><i>redesigning job handling and dispatching</i></strong>, fully eliminating daily performance bottlenecks and queue stalls. We also added multiple third-party integrations and fixed critical bugs in existing accounting and retail integrations.
        </p>
      ),
      detailsImageSrc: "/img/showcases/case/stallen-queue.svg",
      problemText: (
        <p>
          The background jobs queue was <strong><i>completely stalled</i></strong>, holding up critical processing of third-party API calls. The application suffered from <strong><i>recurring H12 errors</i></strong> on Heroku multiple times per day, severely impacting system reliability and user experience.
        </p>
      ),
      solutionFirstText: (
        <p>
          We performed a comprehensive analysis of the DelayedJob queue architecture and identified critical bottlenecks in job handling and dispatching. By <strong><i>redesigning the queue management system</i></strong>, we eliminated the daily performance issues and queue stalls that had plagued the platform. We implemented proper monitoring and error handling to prevent future incidents.
        </p>
      ),
      solutionSecondText: (
        <p>
          Additionally, we expanded the platform&apos;s capabilities by <strong><i>integrating multiple third-party services</i></strong> including Etsy, TikTok, Mailchimp, Awin, and Smiffys. We also fixed critical bugs in existing integrations with accounting systems (Xero, Kashflow, Clearbooks, QuickBooks) and retail platforms (Lightspeed/Vend), ensuring seamless data flow across all connected services.
        </p>
      ),
      resultBoxes: [
        {
          color: ResultBoxColor.green,
          imageSrc: "/img/showcases/case/icons/flag.svg",
          message: "Stuck jobs",
          number: "100k+ → 0"
        },
        {
          color: ResultBoxColor.orange,
          imageSrc: "/img/showcases/case/icons/stock.svg",
          message: "Job processing time",
          number: "Hours → ms"
        },
        {
          color: ResultBoxColor.blue,
          imageSrc: "/img/showcases/case/icons/cancel.svg",
          message: "H12 errors",
          number: "-100%"
        },
        {
          color: ResultBoxColor.lightBlue,
          imageSrc: "/img/showcases/case/icons/stock.svg",
          message: "New integrations",
          number: "5+"
        },
      ],
      resultText: (
        <p>
          We reduced the backlog from <strong><i>hundreds of thousands of stuck jobs to zero</i></strong>, cut job processing time from <strong><i>hours to milliseconds</i></strong>, and eliminated recurring H12 errors. The platform now processes background jobs reliably, and the addition of new integrations expanded the platform&apos;s e-commerce capabilities significantly. System uptime and reliability improved dramatically, providing a seamless experience for merchants and end users.
        </p>
      ),
      helpTitle: "Need help with performance optimization and integrations?",
      related: [
        {
          companyName: "Worship Online",
          solution: "System Design",
          results: "We implemented an on-premises solution to combat account sharing.",
          wrapperColor: SwiperSlideColor.green,
          buttonColor: SwiperSlideColor.green,
          companyImageSrc: "/img/showcases/clients/wo.svg",
          url: ''
        }
      ]
    },
    metadata: {
      title: "Shopwired Queue Optimization - WideFix",
      description: "See how we eliminated daily performance bottlenecks, unblocked stalled background jobs, and integrated multiple third-party services."
    }
  },
  {
    slug: "worshiponline-paperclip-activestorage",
    category: CategoryName.devops,
    preview: {
      title: "Paperclip to ActiveStorage",
      companyName: "WorshipOnline",
      solution: "Zero-downtime storage migration",
      results: "Replaced Paperclip with ActiveStorage through dual-writing, a resumable backfill, staged model cutovers and S3 key reconciliation.",
      wrapperColor: SwiperSlideColor.green,
      buttonColor: SwiperSlideColor.green,
      companyImageSrc: "/img/showcases/clients/wo.svg",
      url: ''
    },
    body: {
      bannerTopTitle: <h1>Moving off <span className="oval">Paperclip</span> without taking production offline</h1>,
      bannerTopImageSrc: "/img/showcases/worshiponline-storage-migration.svg",
      description: "A staged move to ActiveStorage for WorshipOnline",
      descriptionText: <p>We migrated a large library of production media from Paperclip to ActiveStorage without a big-bang cutover. New uploads were dual-written, existing files were backfilled, and models moved across in stages.</p>,
      detailsTitle: "Storage migration for WorshipOnline",
      detailsText: <p>Paperclip had become a maintenance and upgrade constraint. We introduced ActiveStorage alongside it, then adapted ActiveStorage keys, variants and public URLs to work with the application&apos;s existing media delivery patterns.</p>,
      detailsImageSrc: "/img/showcases/worshiponline-storage-migration.svg",
      problemText: <p>WorshipOnline had gigabytes of media in S3 and a live application that depended on established attachment behavior and public URLs. Replacing the storage layer all at once risked broken uploads, missing assets and a disruptive release.</p>,
      solutionFirstText: <p>We introduced dual-writing first: Paperclip remained available while new uploads also created ActiveStorage records. A backfill task copied existing Paperclip files into ActiveStorage, skipping records that already had an attachment. We then switched models to native ActiveStorage attachments incrementally.</p>,
      solutionSecondText: <p>Compatibility code preserved named variants and default URLs, generated readable UUID-based object keys, and served public S3 assets through CloudFront. After the model cutovers, we removed Paperclip and its database columns. Rails and Ruby upgrades followed later.</p>,
      bannerSolutionPng: "/img/showcases/worshiponline-storage-migration.svg",
      bannerSolutionWebp: "/img/showcases/worshiponline-storage-migration.svg",
      resultBoxes: [
        { color: ResultBoxColor.lightBlue, imageSrc: "/img/showcases/case/icons/link.svg", message: "Production cutover", number: "Staged" },
        { color: ResultBoxColor.lightGreen, imageSrc: "/img/showcases/case/icons/stock.svg", message: "Attachment systems", number: "Dual-written" },
        { color: ResultBoxColor.lightGreen, imageSrc: "/img/showcases/case/icons/flag.svg", message: "Paperclip dependency", number: "Removed" },
      ],
      resultText: <p>The app moved to ActiveStorage without a single all-at-once media cutover. Once Paperclip usage and columns were removed, the application was positioned to move on to newer Rails and Ruby versions.</p>,
      helpTitle: "Planning a storage migration for a live Rails application?",
    },
    metadata: {
      title: "WorshipOnline Paperclip to ActiveStorage Migration - WideFix",
      description: "How WideFix migrated WorshipOnline from Paperclip to ActiveStorage through dual-writing, a backfill, staged model cutovers, custom S3 keys and CloudFront URLs.",
    },
  },
  SeoOptimization
];

export default showcases;
