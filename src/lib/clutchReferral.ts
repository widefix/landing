export type ReferralParams = Record<string, string | string[] | undefined>;

type ClutchDirectory = {
  label: string;
  focus: string;
  description: string;
};

const softwareDescription = 'Tell us about your product, the workflows you need to improve and what you want to build next. We’ll discuss how our Rails development, application takeover and ongoing maintenance experience fits your project.';
const webDescription = 'Tell us about your web application, the experience your users need and what is holding development back. We’ll discuss a practical plan for improvements, integrations and ongoing maintenance.';
const smallBusinessDescription = 'Tell us what your business needs from its software, your priorities and your budget. We’ll discuss a focused scope for improving your application and keeping it maintained as your business grows.';
const fintechDescription = 'Tell us about your financial product, payment workflows, integrations and current technical challenges. We’ll discuss the development and maintenance work your application needs and the requirements your team must meet.';

export const clutchDirectories: Record<string, ClutchDirectory> = {
  'developers-financial-services-industry': { label: 'Custom software development for fintech', focus: 'fintech software project', description: fintechDescription },
  'developers-small-business': { label: 'Custom software development for small businesses', focus: 'small business software', description: smallBusinessDescription },
  'developers-information-technology-industry': { label: 'Custom software development for IT services', focus: 'IT services software', description: 'Tell us about the systems your team and clients rely on, the integrations you need and where delivery needs support. We’ll discuss how we can help with Rails development, application handover and ongoing maintenance.' },
  'developers-ruby-rails': { label: 'Ruby on Rails development', focus: 'Rails application', description: 'Tell us where your Rails application stands today, what needs attention and what you want to build next. We’ll discuss a practical path for handover, upgrades, maintenance and ongoing development.' },
  'pl-developers-small-business': { label: 'Software development for small businesses in Poland', focus: 'small business software', description: 'Looking for a software development partner in Poland? Tell us about your business, application, priorities and budget. We’ll discuss a focused scope for development and ongoing maintenance.' },
  'developers-poland': { label: 'Software development in Poland', focus: 'software project', description: `Looking for a software development partner in Poland? ${softwareDescription}` },
  'developers': { label: 'Custom software development', focus: 'custom software project', description: softwareDescription },
  'web-developers': { label: 'Web development', focus: 'web application', description: webDescription },
  'web-developers-financial-services-industry': { label: 'Web development for fintech', focus: 'fintech web application', description: fintechDescription },
  'web-developers-small-business': { label: 'Web development for small businesses', focus: 'small business web application', description: smallBusinessDescription },
  'pl-web-developers': { label: 'Web development in Poland', focus: 'web application', description: `Looking for a web development partner in Poland? ${webDescription}` },
  'pl-web-developers-warsaw': { label: 'Web development in Warsaw', focus: 'web application', description: `Looking for a web development partner in Warsaw? ${webDescription}` },
};

export function getClutchReferral(params: ReferralParams) {
  if (params.utm_source !== 'clutch.co' || params.utm_medium !== 'referral') return undefined;
  const campaign = params.utm_campaign;
  if (typeof campaign !== 'string' || !Object.hasOwn(clutchDirectories, campaign)) return undefined;
  return { campaign, ...clutchDirectories[campaign] };
}

export type ClutchReferral = NonNullable<ReturnType<typeof getClutchReferral>>;

// Stable paths for the directory links configured in Clutch.
export const clutchContactSlugs: Record<string, string> = {
  'developers-financial-services-industry': 'fintech-software',
  'developers-small-business': 'small-business-software',
  'developers-information-technology-industry': 'it-services-software',
  'developers-ruby-rails': 'ruby-on-rails',
  'pl-developers-small-business': 'small-business-software-poland',
  'developers-poland': 'software-development-poland',
  'developers': 'custom-software',
  'web-developers': 'web-development',
  'web-developers-financial-services-industry': 'fintech-web-development',
  'web-developers-small-business': 'small-business-web-development',
  'pl-web-developers': 'web-development-poland',
  'pl-web-developers-warsaw': 'web-development-warsaw',
};

export function getClutchContactPath(campaign: string) {
  return Object.hasOwn(clutchContactSlugs, campaign)
    ? `/contact/${clutchContactSlugs[campaign]}`
    : '/contact';
}
