import FocusedServicePage, { serviceMetadata, type FocusedService } from '@/components/rails/FocusedServicePage';

const service: FocusedService = {
  slug: 'ruby-on-rails-upgrade-consulting',
  title: 'Ruby on Rails Upgrade Consulting | WideFix',
  description: 'Plan and implement Ruby and Rails upgrades for an existing application. Resolve compatibility blockers, test critical workflows and release changes in agreed stages.',
  heading: 'Rails upgrade consulting for the product your customers already use',
  intro: 'Tell us what is making your upgrade urgent or holding it back. We investigate your existing Rails application, agree priorities and a practical target with you, then handle compatibility fixes, testing and release within the agreed scope and budget. Your team gets a clear next step without having to turn every blocker into a technical ticket.',
  image: '/img/showcases/palladium-rails-upgrade.svg',
  imageWidth: 687,
  imageHeight: 377,
  imageAlt: 'Palladium Ruby and Rails upgrade illustrated as a staged modernization project',
  cta: 'Discuss your Rails upgrade',
  sections: [
    { id: 'when-to-start', title: 'Move an overdue or stalled upgrade forward', items: [
      { title: 'An aging stack needs attention', icon: 'upgrades', detail: 'Outdated Ruby, Rails or gems make maintenance harder. We review your dependencies and deployment environment to choose a target and sequence that fit your application.' },
      { title: 'Your team is stuck on compatibility', icon: 'expertise', detail: 'Get help investigating failing tests, dependency conflicts, framework changes and code loading. We work through the blockers with your engineers or take on the agreed implementation.' },
      { title: 'Product work still needs to ship', icon: 'priorities', detail: 'Agree upgrade milestones alongside business priorities. Keep changes reviewable and separate unrelated refactoring so the work has a clear purpose and budget.' },
    ] },
    { id: 'delivery', title: 'Technical delivery from investigation through release', items: [
      { title: 'A plan grounded in your codebase', icon: 'review', detail: 'Inspect versions, dependencies, test coverage and deployment constraints. Investigate uncertain blockers before committing to estimates, and agree the first implementation milestone.' },
      { title: 'Compatibility fixes and workflow checks', icon: 'ownership', detail: 'Update Ruby, Rails and gems in manageable steps. Address deprecated APIs and loading issues, and add or adapt checks for the payments, permissions, jobs and integrations affected by the changes.' },
      { title: 'Staged release and handover', icon: 'handover', detail: 'Validate the agreed changes in staging, prepare release and recovery steps, and deploy within the agreed release window. Record remaining work and operational notes so your team can maintain the result.' },
    ] },
    { id: 'working-together', title: 'Clear responsibilities and scope at each milestone', items: [
      { title: 'Bring the business priorities', icon: 'communication', detail: 'Share your deadlines, critical workflows and available budget. You approve priorities and business trade-offs; WideFix organizes the technical investigation and delivery.' },
      { title: 'Agree what each stage includes', icon: 'priorities', detail: 'Confirm access, acceptance checks, scope and budget before implementation. Large dependency replacements or data migrations may need a separate milestone; extra work needs your approval.' },
      { title: 'Keep ownership after the upgrade', icon: 'momentum', detail: 'Receive a summary of changes, checks performed and follow-up priorities. Continue with your own team or agree ongoing WideFix maintenance, including support availability and response expectations.' },
    ] },
  ],
  evidence: [
    { title: 'Palladium: Ruby and Rails upgrade', icon: 'upgrades', detail: 'Our documented upgrade work includes separate Ruby and Rails stages, compatibility fixes and background job loading considerations.', href: '/showcases/palladium-rails-upgrade' },
    { title: 'Worship Online: storage modernization', icon: 'handover', detail: 'See a staged Paperclip to ActiveStorage migration that preserved existing uploads and public URLs.', href: '/showcases/worshiponline-paperclip-activestorage' },
  ],
  articles: [
    { title: 'Ruby and Rails upgrade: personal experience', icon: 'review', detail: 'Read our account of upgrading Ruby from 3.1 to 3.4 and Rails from 6.1 to 7.2, including gem compatibility, Zeitwerk and background job class names. These are project-specific lessons, not a prescribed target for every application.', href: '/blog/ruby-and-rails-upgrade-personal-experience/' },
    { title: 'Planning a Rails upgrade', icon: 'priorities', detail: 'Understand the questions to resolve before estimating implementation and choosing release milestones.', href: '/blog/planning-a-rails-upgrade/' },
  ],
  relatedServicesIntro: 'Start with a bounded assessment, combine upgrades with ongoing maintenance, or hand over technical ownership of your application.',
  reading: [
    { title: 'Ruby and Rails upgrade assessment', icon: 'review', detail: 'Need a plan before implementation? Scope an investigation of blockers, critical workflows and the first delivery milestone.', href: '/ruby-on-rails-upgrade-assessment' },
    { title: 'Ongoing Rails maintenance', icon: 'ownership', detail: 'Keep dependency updates, production fixes and feature work in one prioritized backlog after the upgrade.', href: '/ruby-on-rails-maintenance' },
    { title: 'Legacy Rails maintenance', icon: 'upgrades', detail: 'Combine incremental upgrades with test coverage and modernization of an aging application.', href: '/legacy-ruby-on-rails-maintenance' },
    { title: 'Rails application takeover', icon: 'handover', detail: 'Give the application a technical owner when the original developer or agency is no longer available.', href: '/ruby-on-rails-application-takeover' },
  ],
};

export const metadata = serviceMetadata(service);

export default function Page() {
  return <FocusedServicePage service={service} />;
}
