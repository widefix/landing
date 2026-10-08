// Case-specific copy keeps service positioning tied to the work actually delivered.
export interface ShowcasePositioning {
  hook: string;
  steps: [string, string];
  cardLabel: string;
  headline: string;
  value: string;
  help: string;
  theme: 'green' | 'purple' | 'amber';
  title: string;
  description: string;
}

export const showcasePositioning: Record<string, ShowcasePositioning> = {
  'public-api-development': {
    steps: ['Deliver the API and backoffice', 'Refactor the shared Rails backend'],
    cardLabel: 'Existing Rails app development',
    hook: 'EXISTING RAILS APPLICATION DEVELOPMENT',
    headline: 'A new API. An existing portal that keeps working',
    value: 'Extend the Rails application your business already depends on. Reusing and improving the existing backend helped deliver a new portal without an unnecessary rewrite or disruption to the old one.',
    help: 'Need technical ownership for your existing Rails app?', theme: 'green',
    title: 'Palladium: Existing Rails App & GraphQL API Development - WideFix',
    description: 'GraphQL API and backoffice delivery for an existing Rails app: shared backend improvements, protected data integrity, and an uninterrupted legacy portal.',
  },
  'tma-sport-lokkaroom-financial-report': {
    steps: ['Build the Rails reporting interface', 'Consolidate three financial sources'],
    cardLabel: 'Rails reporting integrations',
    hook: 'RAILS INTEGRATIONS + FINANCIAL REPORTING',
    headline: 'Three payment sources. One financial report',
    value: 'Add the reporting your business needs to an existing Ruby on Rails application. A consolidated view of transactions and charges gives the team one place to review financial activity across platforms.',
    help: 'Need new reporting or integrations in your Rails app?', theme: 'green',
    title: 'TMA Sport: Rails Financial Reporting & Stripe Integrations - WideFix',
    description: 'Ruby on Rails and ActiveAdmin financial reporting for Lokkaroom, consolidating EventCube, Shopify and Stripe in response to an urgent business request.',
  },
  'palladium-rails-upgrade': {
    steps: ['Resolve dependencies and startup failures', 'Adapt code loading and framework behavior'],
    cardLabel: 'Legacy Rails maintenance',
    hook: 'LEGACY RAILS MAINTENANCE + UPGRADES',
    headline: 'Keep the existing Rails app. Upgrade its foundation',
    value: 'Legacy Rails maintenance means working through dependencies and framework changes in the codebase you already have. An incremental upgrade preserves that investment and creates a path forward without rebuilding the application.',
    help: 'Need a team to maintain and upgrade your legacy Rails application?', theme: 'purple',
    title: 'Palladium: Legacy Rails Maintenance & Ruby Upgrade - WideFix',
    description: 'Upgraded an existing Rails app to Ruby 3.4.4 and Rails 7.2, resolving 27 documented compatibility issues. Incremental validation without a rewrite.',
  },
  'costa-del-home-crm-enhancement': {
    steps: ['Migrate relationships incrementally', 'Switch the interface and retire old associations'],
    cardLabel: 'Rails feature development',
    hook: 'EXISTING RAILS APP + NEW FEATURES',
    headline: 'More flexible property management. Zero downtime',
    value: 'Keep your product moving with new features in the existing Rails application. A staged relationship migration preserved the business’s data and kept the CRM available to its users.',
    help: 'Need to add features to a live Rails application?', theme: 'green',
    title: 'CostaDelHome: Rails CRM Development Without Downtime - WideFix',
    description: 'Supported a busy Rails team and added multiple managers per property with zero downtime, preserving existing data and users through a staged CRM migration.',
  },
  'costa-del-home-search-performance': {
    steps: ['Optimize the existing search', 'Deliver a faster search experience'],
    cardLabel: 'Rails performance consultants',
    hook: 'RAILS PERFORMANCE CONSULTANTS',
    headline: 'Search in 100ms. Keep customers moving',
    value: 'A slow existing application can hold back everyday work. Targeted performance optimization improved the search experience without asking the business to replace its product.',
    help: 'Looking for Rails performance consultants for a slow app?', theme: 'amber',
    title: 'CostaDelHome: Rails Performance Optimization, 100× Faster Search - WideFix',
    description: 'Stepped in as Rails performance consultants for a busy team, reducing CostaDelHome search loads from 10 seconds to 100ms: 100× faster, a 99% reduction.',
  },
  'costa-del-home-heroku-to-aws': {
    steps: ['Move services to AWS with Dokku', 'Reduce the monthly hosting bill'],
    cardLabel: 'Infrastructure cost optimization',
    hook: 'APPLICATION INFRASTRUCTURE + COST OPTIMIZATION',
    headline: 'The same product. A smaller hosting bill',
    value: 'Infrastructure should match the application’s actual needs. Moving hosting to AWS with Dokku reduced the ongoing bill and freed budget for the business and its next product improvements.',
    help: 'Need help with Rails infrastructure and hosting costs?', theme: 'green',
    title: 'Costa Del Home: Heroku to AWS Migration & Cost Optimization - WideFix',
    description: 'Supported CostaDelHome’s busy developer with a Heroku to AWS migration using Dokku, cutting hosting costs from €400 to €50 per month: an 87.5% saving.',
  },
  'costa-del-home-stripe-integration': {
    steps: ['Integrate Stripe into the existing app', 'Reduce manual payment collection'],
    cardLabel: 'Stripe payment automation',
    hook: 'EXISTING APPLICATION + PAYMENT AUTOMATION',
    headline: 'Automatic payments. Less work for the accountant',
    value: 'Improve the application around the work your team does every day. Adding Stripe to the existing product replaced manual cash collection and reduced the administrative effort needed to get paid.',
    help: 'Need Stripe integration in your existing Rails app?', theme: 'amber',
    title: 'Costa Del Home: Stripe Integration & Payment Automation - WideFix',
    description: 'Brought Stripe expertise to support CostaDelHome’s busy Rails team, automate payments in the existing app, and reduce accountant workload by 90%.',
  },
  'stripe-integration': {
    steps: ['Repair webhooks and reconcile subscriptions', 'Monitor payment consistency'],
    cardLabel: 'Payment integration rescue',
    hook: 'PRODUCTION ISSUE RESOLUTION + REVENUE PROTECTION',
    headline: 'Fix the payment integration. Recover recurring revenue',
    value: 'Maintaining an existing application includes protecting the revenue it earns. We traced inconsistent subscription data, corrected the integration, and added monitoring so the team could keep track of payment health.',
    help: 'Need help rescuing a broken Stripe integration?', theme: 'purple',
    title: 'WorshipOnline: Stripe Integration Repair & Revenue Recovery - WideFix',
    description: 'Repaired Stripe webhook and subscription inconsistencies, recovered approximately $525 MRR, and addressed estimated future losses of up to $1,500 MRR.',
  },
  'prevent-account-sharing': {
    steps: ['Set up Metabase and introduce targeted MFA', 'Limit sessions and measure the results'],
    cardLabel: 'Subscription revenue protection',
    hook: 'APPLICATION MAINTENANCE + REVENUE PROTECTION',
    headline: 'Reduce account sharing. Protect subscription revenue',
    value: 'Improve the existing product where the business is losing value. We installed and configured Metabase for data analysis, then used it to measure the results of targeted MFA and session limits while keeping the subscription application in place.',
    help: 'Need to stabilize revenue and improve your existing app?', theme: 'green',
    title: 'WorshipOnline: Account Sharing Prevention & Revenue Protection - WideFix',
    description: 'Installed and configured Metabase to analyze account sharing and measure MFA and session-limit results, helping stop a 5% monthly revenue decline.',
  },
  'ruby-on-rails-redesign': {
    steps: ['Introduce the new interface gradually', 'Validate the transition with users'],
    cardLabel: 'Legacy Rails modernization',
    hook: 'LEGACY RAILS APPLICATION MODERNIZATION',
    headline: 'A new interface. The Rails backend your business relies on',
    value: 'Modernize an old Rails app while preserving the backend, mobile API, and existing service. A gradual interface rollout let the business improve conversions without an unnecessary application rewrite.',
    help: 'Need to modernize an old Rails app without rebuilding it?', theme: 'amber',
    title: 'WorshipOnline: Legacy Rails App Redesign, Zero Downtime - WideFix',
    description: 'Modernized an existing Ruby on Rails app with a staged UI redesign and zero downtime, achieving 20% more daily signups and 30% revenue growth.',
  },
  'shopwired-queue-optimization': {
    steps: ['Repair queue handling and dispatch', 'Expand and stabilize integrations'],
    cardLabel: 'Production app rescue',
    hook: 'PRODUCTION APP RESCUE + PERFORMANCE CONSULTING',
    headline: 'Unblock the queue. Get the business moving again',
    value: 'App rescue starts with the production problem that is stopping the business. Repairing job dispatch, fixing integrations, and adding monitoring restored reliable processing in the existing platform.',
    help: 'Need performance consultants to rescue a stalled production app?', theme: 'green',
    title: 'Shopwired: Production App Rescue & Queue Optimization - WideFix',
    description: 'Rescued Shopwired’s stalled DelayedJob queue, cleared 100k+ stuck jobs, eliminated daily Heroku H12 errors, and added third-party integrations.',
  },
  'seo-optimization': {
    steps: ['Redesign the legacy Rails application first', 'Introduce gradual SEO improvements'],
    cardLabel: 'Technical SEO optimization',
    hook: 'TECHNICAL SEO + EXISTING PRODUCT GROWTH',
    headline: 'Make the existing product easier to find',
    value: 'We took ownership of a legacy Ruby on Rails application left by its previous developer. We redesigned it first, then introduced gradual SEO improvements to help the existing product attract more customers and turn search traffic into business growth.',
    help: 'Need technical SEO improvements for your existing product?', theme: 'purple',
    title: 'WorshipOnline: Technical SEO, Traffic & Conversion Growth - WideFix',
    description: 'Legacy Ruby on Rails app takeover: redesign followed by gradual SEO improvements delivered 4000% more organic traffic and 300% more conversions for WorshipOnline.',
  },
};
