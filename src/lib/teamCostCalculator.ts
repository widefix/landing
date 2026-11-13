export const roleIds = ['architect', 'developer', 'qa'] as const;
export type RoleId = typeof roleIds[number];

export const roleNames: Record<RoleId, string> = {
  architect: 'Solution architect',
  developer: 'Developer',
  qa: 'QA',
};

// Single source for the published starting rates; keep the blog and service pages in sync.
export const defaultRates: Record<RoleId, string> = { architect: '80', developer: '50', qa: '35' };

export const periods = [
  { id: 'week', name: 'Week', weeks: 1, label: '1 week' },
  { id: 'month', name: 'Month', weeks: 52 / 12, label: '52 ÷ 12 weeks on average' },
  { id: 'quarter', name: 'Quarter', weeks: 13, label: '13 weeks' },
  { id: 'year', name: 'Year', weeks: 52, label: '52 weeks' },
] as const;

export type Mode = 'budget' | 'team';

export type CalculatorState = {
  mode: Mode;
  rates: Record<RoleId, string>;
  architectShare: string;
  qaShare: string;
  budget: string;
  developerCount: string;
  developerHours: string;
  qaCount: string;
  qaHours: string;
};

export type FieldName =
  | 'budget' | 'architectShare' | 'qaShare'
  | 'developerCount' | 'developerHours' | 'qaCount' | 'qaHours'
  | 'rate-architect' | 'rate-developer' | 'rate-qa'
  | 'team' | 'rates';
export type Errors = Partial<Record<FieldName, string>>;

export type Estimate = { weeklyHours: Record<RoleId, number>; weeklyCost: number };

export const limits = {
  rate: 1_000_000,
  budget: 1_000_000,
  hoursPerWeek: 60,
  headcount: 1000,
  architectShare: { min: 1, max: 50 },
} as const;

export function defaultState(): CalculatorState {
  return {
    mode: 'budget',
    rates: { ...defaultRates },
    architectShare: '10',
    qaShare: '0',
    budget: '',
    developerCount: '1',
    developerHours: '6',
    qaCount: '0',
    qaHours: '2',
  };
}

export const exampleArchitectShare = '7';

export const examples = [
  { id: 'budget-1500', label: '$1,500 a month', build: () => budgetExample('1500') },
  { id: 'budget-3000', label: '$3,000 a month', build: () => budgetExample('3000') },
  { id: 'team-25', label: '25 hours a week', build: () => teamExample('22', '12') },
  { id: 'team-40', label: '40 hours a week', build: () => teamExample('36', '10') },
] as const;

function budgetExample(budget: string): CalculatorState {
  return { ...defaultState(), mode: 'budget', budget, architectShare: exampleArchitectShare };
}

function teamExample(developerHours: string, architectShare: string): CalculatorState {
  return { ...defaultState(), mode: 'team', developerCount: '1', developerHours, architectShare };
}

function parse(value: string): number | undefined {
  if (value.trim() === '') return undefined;
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}

function checkRate(value: string): string | undefined {
  const rate = parse(value);
  if (rate === undefined) return 'Enter a number.';
  if (rate < 0 || rate > limits.rate) return 'Enter a rate from $0 to $1,000,000.';
}

function checkCount(value: string): string | undefined {
  const count = parse(value);
  if (count === undefined) return 'Enter a whole number.';
  if (!Number.isInteger(count) || count < 0 || count > limits.headcount) return 'Enter a whole number from 0 to 1,000.';
}

function checkHours(value: string): string | undefined {
  const hours = parse(value);
  if (hours === undefined) return 'Enter a number.';
  if (hours <= 0 || hours > limits.hoursPerWeek) return `Enter more than 0 and no more than ${limits.hoursPerWeek} hours a week.`;
}

export function validate(state: CalculatorState): Errors {
  const errors: Errors = {};
  for (const id of roleIds) {
    const error = checkRate(state.rates[id]);
    if (error) errors[`rate-${id}`] = error;
  }

  const architectShare = parse(state.architectShare);
  if (architectShare === undefined) {
    errors.architectShare = 'Enter a number.';
  } else if (architectShare < limits.architectShare.min || architectShare > limits.architectShare.max) {
    errors.architectShare = `Enter a share from ${limits.architectShare.min}% to ${limits.architectShare.max}%.`;
  }

  if (state.mode === 'budget') {
    const budget = parse(state.budget);
    if (budget === undefined) errors.budget = 'Enter a monthly budget.';
    else if (budget <= 0 || budget > limits.budget) errors.budget = 'Enter a budget above $0 and up to $1,000,000.';

    const qaShare = parse(state.qaShare);
    if (qaShare === undefined) errors.qaShare = 'Enter a number.';
    else if (qaShare < 0 || qaShare > 100) errors.qaShare = 'Enter a share from 0% to 100%.';
    else if (architectShare !== undefined && architectShare + qaShare > 100) errors.qaShare = 'Architect and QA shares together cannot exceed 100%.';

    if (!errors.architectShare && !errors.qaShare && !Object.keys(errors).some(key => key.startsWith('rate-')) && blendedRate(state) <= 0) {
      errors.rates = 'Set an hourly rate above $0 for at least one role in the team.';
    }
  } else {
    for (const [field, check] of [
      ['developerCount', checkCount], ['developerHours', checkHours],
      ['qaCount', checkCount], ['qaHours', checkHours],
    ] as const) {
      const error = check(state[field]);
      if (error) errors[field] = error;
    }
    if (!errors.developerCount && !errors.developerHours && !errors.qaCount && !errors.qaHours
      && Number(state.developerCount) * Number(state.developerHours) + Number(state.qaCount) * Number(state.qaHours) <= 0) {
      errors.team = 'Add at least one developer or QA hour. The architect\u2019s time is a share of the team\u2019s hours.';
    }
  }
  return errors;
}

export function isValid(state: CalculatorState): boolean {
  return Object.keys(validate(state)).length === 0;
}

function blendedRate(state: CalculatorState): number {
  const architect = Number(state.architectShare) / 100;
  const qa = Number(state.qaShare) / 100;
  const developer = Math.max(0, 1 - architect - qa);
  return architect * Number(state.rates.architect) + developer * Number(state.rates.developer) + qa * Number(state.rates.qa);
}

export function estimate(state: CalculatorState): Estimate {
  if (!isValid(state)) throw new Error('Cannot calculate an invalid configuration.');
  const architectShare = Number(state.architectShare) / 100;

  if (state.mode === 'budget') {
    const qaShare = Number(state.qaShare) / 100;
    const developerShare = Math.max(0, 1 - architectShare - qaShare);
    const weeklyCost = Number(state.budget) / periods[1].weeks;
    const totalHours = weeklyCost / blendedRate(state);
    return {
      weeklyCost,
      weeklyHours: { architect: totalHours * architectShare, developer: totalHours * developerShare, qa: totalHours * qaShare },
    };
  }

  const developer = Number(state.developerCount) * Number(state.developerHours);
  const qa = Number(state.qaCount) * Number(state.qaHours);
  const architect = (developer + qa) * architectShare / (1 - architectShare);
  const weeklyHours = { architect, developer, qa };
  const weeklyCost = roleIds.reduce((total, id) => total + weeklyHours[id] * Number(state.rates[id]), 0);
  return { weeklyHours, weeklyCost };
}

export function totalHours(hours: Record<RoleId, number>): number {
  return roleIds.reduce((total, id) => total + hours[id], 0);
}

export function periodTotals(result: Estimate) {
  const weeklyTotal = totalHours(result.weeklyHours);
  return periods.map(period => ({
    ...period,
    cost: result.weeklyCost * period.weeks,
    hours: weeklyTotal * period.weeks,
  }));
}

const commonKeys = ['v', 'mode', 'architect-share', 'rate-architect', 'rate-developer', 'rate-qa'];
const modeKeys: Record<Mode, string[]> = {
  budget: ['budget', 'qa-share'],
  team: ['developer-count', 'developer-hours', 'qa-count', 'qa-hours'],
};

export function stateFragment(state: CalculatorState): string {
  if (!isValid(state)) throw new Error('Cannot share an invalid configuration.');
  const number = (value: string) => String(Number(value));
  const params = new URLSearchParams({ v: '3', mode: state.mode });
  params.set('architect-share', number(state.architectShare));
  for (const id of roleIds) params.set(`rate-${id}`, number(state.rates[id]));
  if (state.mode === 'budget') {
    params.set('budget', number(state.budget));
    params.set('qa-share', number(state.qaShare));
  } else {
    params.set('developer-count', number(state.developerCount));
    params.set('developer-hours', number(state.developerHours));
    params.set('qa-count', number(state.qaCount));
    params.set('qa-hours', number(state.qaHours));
  }
  return params.toString();
}

export function stateFromFragment(fragment: string): CalculatorState {
  const params = new URLSearchParams(fragment.replace(/^#/, ''));
  const mode = params.get('mode');
  if (params.get('v') !== '3' || (mode !== 'budget' && mode !== 'team')) {
    throw new Error('Unrecognized calculator link.');
  }
  const expected = [...commonKeys, ...modeKeys[mode]];
  const keys = Array.from(params.keys());
  if (keys.length !== expected.length || new Set(keys).size !== keys.length || !keys.every(key => expected.includes(key))) {
    throw new Error('Incomplete or unexpected calculator link.');
  }
  const read = (key: string) => params.get(key) as string;

  const state = defaultState();
  state.mode = mode;
  state.architectShare = read('architect-share');
  for (const id of roleIds) state.rates[id] = read(`rate-${id}`);
  if (mode === 'budget') {
    state.budget = read('budget');
    state.qaShare = read('qa-share');
  } else {
    state.developerCount = read('developer-count');
    state.developerHours = read('developer-hours');
    state.qaCount = read('qa-count');
    state.qaHours = read('qa-hours');
  }
  if (!isValid(state)) throw new Error('Invalid values in calculator link.');
  return state;
}

export type PricingPlan = {
  id: 'budget-1500' | 'budget-3000' | 'weekly';
  title: string;
  hours: string;
  coverage: string;
  href: string;
  linkLabel: string;
};

const wholeNumber = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const dollars = (value: number) => `$${wholeNumber.format(value)}`;

function exampleById(id: typeof examples[number]['id']): CalculatorState {
  const found = examples.find(item => item.id === id);
  if (!found) throw new Error(`Unknown example ${id}`);
  return found.build();
}

function calculatorPath(state: CalculatorState): string {
  return `/team-cost-calculator#${stateFragment(state)}`;
}

// Published plan figures come from the calculator's own examples so the site cannot drift from it.
export function pricingPlans(): PricingPlan[] {
  const monthly = (id: 'budget-1500' | 'budget-3000', title: string, coverage: string): PricingPlan => {
    const state = exampleById(id);
    const [week, month] = periodTotals(estimate(state));
    return {
      id,
      title,
      hours: `About ${wholeNumber.format(month.hours)} team hours a month, roughly ${wholeNumber.format(week.hours)} a week`,
      coverage,
      href: calculatorPath(state),
      linkLabel: `See ${title} in the calculator`,
    };
  };
  const small = exampleById('team-25');
  const smallMonth = periodTotals(estimate(small))[1].cost;
  const largeMonth = periodTotals(estimate(exampleById('team-40')))[1].cost;
  return [
    monthly('budget-1500', '$1,500 a month', 'Routine upkeep for a healthy application: dependency review, monitoring follow-up and small fixes.'),
    monthly('budget-3000', '$3,000 a month', 'Upkeep with room for features alongside it. Each feature is estimated against your codebase before we agree what to deliver.'),
    {
      id: 'weekly',
      title: '25 to 40 hours a week',
      hours: `About ${dollars(smallMonth)} to ${dollars(largeMonth)} a month`,
      coverage: 'Upkeep with planned improvements and feature work in one backlog. The initial assessment is priced case by case.',
      href: calculatorPath(small),
      linkLabel: 'See 25 hours a week in the calculator',
    },
  ];
}
