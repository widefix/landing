import assert from 'node:assert/strict';
import test from 'node:test';
import {
  defaultRates, defaultState, estimate, exampleArchitectShare, examples, isValid, periodTotals, pricingPlans, stateFragment,
  stateFromFragment, totalHours, validate, type CalculatorState,
} from './teamCostCalculator.ts';

function close(actual: number, expected: number, tolerance = 0.01) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} is not within ${tolerance} of ${expected}`);
}

function example(id: string): CalculatorState {
  const found = examples.find(item => item.id === id);
  assert.ok(found, id);
  return found.build();
}

function team(overrides: Partial<CalculatorState> = {}): CalculatorState {
  return { ...defaultState(), mode: 'team', ...overrides };
}

test('defaults use the published starting rates and open in budget mode without a budget', () => {
  const state = defaultState();
  assert.deepEqual(state.rates, defaultRates);
  assert.deepEqual(defaultRates, { architect: '80', developer: '50', qa: '35' });
  assert.equal(state.mode, 'budget');
  assert.equal(state.budget, '');
  assert.ok(validate(state).budget);
  assert.throws(() => estimate(state));
  assert.throws(() => stateFragment(state));
});

test('the default team is valid and costs about $1,531 a month', () => {
  const state = team();
  assert.ok(isValid(state));
  const periods = periodTotals(estimate(state));
  close(periods[0].cost, 353.33);
  close(periods[1].cost, 1531.11);
});

test('$1,500 a month at 7% architect share matches the article: about 28.8 hours, 2 architect hours', () => {
  const result = estimate(example('budget-1500'));
  const [week, month, quarter, year] = periodTotals(result);
  close(month.cost, 1500);
  close(quarter.cost, 4500);
  close(year.cost, 18000);
  close(week.cost, 346.15);
  close(month.hours, 28.79);
  close(result.weeklyHours.architect * 52 / 12, 2.02);
  close(result.weeklyHours.developer * 52 / 12, 26.78);
  close(month.hours, 1500 / (0.07 * 80 + 0.93 * 50), 1e-9);
});

test('$3,000 a month doubles the hours of $1,500 at the same split', () => {
  const small = totalHours(estimate(example('budget-1500')).weeklyHours);
  const large = totalHours(estimate(example('budget-3000')).weeklyHours);
  close(large, small * 2, 1e-9);
  close(periodTotals(estimate(example('budget-3000')))[1].hours, 57.58);
});

test('team examples reproduce the 25 and 40 hour weekly figures in the article', () => {
  const small = estimate(example('team-25'));
  close(small.weeklyHours.architect, 3, 1e-9);
  close(totalHours(small.weeklyHours), 25, 1e-9);
  close(small.weeklyCost, 1340, 1e-9);
  close(periodTotals(small)[1].cost, 5806.67);

  const large = estimate(example('team-40'));
  close(large.weeklyHours.architect, 4, 1e-9);
  close(totalHours(large.weeklyHours), 40, 1e-9);
  close(large.weeklyCost, 2120, 1e-9);
  close(periodTotals(large)[1].cost, 9186.67);
});

test('a 20% architect share with 32 developer hours reproduces the takeover example', () => {
  const result = estimate(team({ developerHours: '32', architectShare: '20' }));
  close(result.weeklyHours.architect, 8, 1e-9);
  close(result.weeklyCost, 2240, 1e-9);
  close(periodTotals(result)[1].cost, 9706.67);
});

test('headcounts multiply hours per person and the architect share follows total team hours', () => {
  const result = estimate(team({ developerCount: '3', developerHours: '10', qaCount: '2', qaHours: '5', architectShare: '10' }));
  assert.equal(result.weeklyHours.developer, 30);
  assert.equal(result.weeklyHours.qa, 10);
  close(result.weeklyHours.architect, 4.444, 0.001);
  close(totalHours(result.weeklyHours) * 0.1, result.weeklyHours.architect, 1e-9);
  close(result.weeklyCost, 2205.56);
});

test('setting headcount to zero removes a role and custom rates apply', () => {
  const state = team({ developerCount: '0', qaCount: '2', qaHours: '4', rates: { architect: '100', developer: '50', qa: '40' } });
  const result = estimate(state);
  assert.equal(result.weeklyHours.developer, 0);
  close(result.weeklyHours.architect, 8 * 0.1 / 0.9, 1e-9);
  close(result.weeklyCost, 8 * 40 + (8 * 0.1 / 0.9) * 100, 1e-9);
});

test('budget mode supports QA shares and a zero developer share', () => {
  const withQa = { ...defaultState(), budget: '3000', architectShare: '10', qaShare: '20' };
  const qaResult = estimate(withQa);
  close(qaResult.weeklyHours.qa / totalHours(qaResult.weeklyHours), 0.2, 1e-9);
  const all = { ...defaultState(), budget: '1000', architectShare: '50', qaShare: '50' };
  assert.ok(isValid(all));
  assert.equal(estimate(all).weeklyHours.developer, 0);
  assert.equal(validate({ ...all, qaShare: '51' }).qaShare, 'Architect and QA shares together cannot exceed 100%.');
});

test('free rates are allowed unless the whole team would be free', () => {
  const free = { ...defaultState(), budget: '1000', rates: { architect: '0', developer: '0', qa: '0' } };
  assert.ok(validate(free).rates);
  assert.throws(() => estimate(free));
  assert.ok(isValid({ ...free, rates: { architect: '0', developer: '50', qa: '0' } }));
});

test('invalid inputs never produce estimates or links', () => {
  for (const value of ['', ' ', '-1', 'NaN', 'Infinity', '1e309', '1000001']) {
    assert.ok(validate(team({ rates: { ...defaultRates, developer: value } }))['rate-developer'], `rate ${value}`);
  }
  for (const value of ['', '0', '-1', '60.01', 'abc']) {
    assert.ok(validate(team({ developerHours: value })).developerHours, `hours ${value}`);
    assert.ok(validate(team({ qaHours: value })).qaHours, `QA hours ${value}`);
  }
  for (const value of ['', '-1', '1.5', '1001', 'abc']) {
    assert.ok(validate(team({ developerCount: value })).developerCount, `count ${value}`);
  }
  for (const value of ['', '0', '0.99', '50.01', '100']) {
    assert.ok(validate(team({ architectShare: value })).architectShare, `share ${value}`);
  }
  for (const value of ['', '0', '-5', '1000001']) {
    assert.ok(validate({ ...defaultState(), budget: value }).budget, `budget ${value}`);
  }
  for (const state of [team({ developerHours: '' }), { ...defaultState(), budget: '0' }]) {
    assert.throws(() => estimate(state));
    assert.throws(() => stateFragment(state));
  }
});

test('a team mode estimate needs at least one developer or QA hour', () => {
  const state = team({ developerCount: '0', qaCount: '0' });
  assert.ok(validate(state).team);
  assert.throws(() => estimate(state));
  assert.ok(isValid(team({ developerCount: '0', qaCount: '1' })));
});

test('only the selected mode is validated', () => {
  assert.ok(isValid({ ...defaultState(), budget: '1500', developerHours: '' }));
  assert.ok(isValid(team({ budget: '', qaShare: 'x' })));
});

test('share links round-trip both modes without mutating defaults', () => {
  const budget = { ...defaultState(), budget: '2750.5', architectShare: '8', qaShare: '15', rates: { architect: '90', developer: '55', qa: '40' } };
  const team1 = team({ developerCount: '3', developerHours: '12.5', qaCount: '2', qaHours: '4', architectShare: '12.5' });
  for (const state of [budget, team1, example('budget-1500'), example('team-40')]) {
    const fragment = stateFragment(state);
    const loaded = stateFromFragment(`#${fragment}`);
    assert.equal(stateFragment(loaded), fragment);
    assert.equal(loaded.mode, state.mode);
    assert.equal(loaded.architectShare, String(Number(state.architectShare)));
    close(estimate(loaded).weeklyCost, estimate(state).weeklyCost, 1e-9);
  }
  assert.deepEqual(defaultState().rates, defaultRates);
  assert.equal(defaultState().budget, '');
});

test('links carry only the fields for their mode', () => {
  const budgetKeys = Array.from(new URLSearchParams(stateFragment(example('budget-1500'))).keys());
  assert.ok(budgetKeys.includes('budget') && budgetKeys.includes('qa-share'));
  assert.ok(!budgetKeys.includes('developer-count'));
  const teamKeys = Array.from(new URLSearchParams(stateFragment(example('team-25'))).keys());
  assert.ok(teamKeys.includes('developer-hours') && teamKeys.includes('qa-count'));
  assert.ok(!teamKeys.includes('budget'));
});

test('malformed, incomplete, mixed and unsupported links are rejected', () => {
  const budget = stateFragment(example('budget-1500'));
  const teamFragment = stateFragment(example('team-25'));
  const invalid = [
    '', 'garbage', 'v=3', budget.replace('v=3', 'v=2'), budget.replace('v=3', 'v=4'),
    budget.replace('mode=budget', 'mode=other'), budget.replace('mode=budget', 'mode=team'),
    budget.replace(/&budget=[^&]*/, ''), `${budget}&developer-hours=6`, `${budget}&v=3`, `${budget}&extra=1`,
    budget.replace('budget=1500', 'budget='), budget.replace('budget=1500', 'budget=-1'),
    budget.replace('architect-share=7', 'architect-share=0'), budget.replace('architect-share=7', 'architect-share=51'),
    budget.replace('qa-share=0', 'qa-share=95'), budget.replace('rate-developer=50', 'rate-developer=abc'),
    teamFragment.replace('developer-hours=22', 'developer-hours=61'), teamFragment.replace('qa-count=0', 'qa-count=1.5'),
    teamFragment.replace('developer-count=1', 'developer-count=0'),
    teamFragment.replace(/&qa-hours=[^&]*/, ''),
  ];
  for (const fragment of invalid) {
    assert.throws(() => stateFromFragment(fragment), fragment);
  }
});

test('every example is valid and uses the published starting rates', () => {
  for (const item of examples) {
    const state = item.build();
    assert.ok(isValid(state), item.id);
    assert.deepEqual(state.rates, defaultRates);
    assert.ok(totalHours(estimate(state).weeklyHours) > 0);
  }
});

test('published pricing plans come from the calculator examples and match the article', () => {
  const plans = pricingPlans();
  assert.deepEqual(plans.map(plan => plan.id), ['budget-1500', 'budget-3000', 'weekly']);
  assert.equal(plans[0].hours, 'About 29 team hours a month, roughly 7 a week');
  assert.equal(plans[1].hours, 'About 58 team hours a month, roughly 13 a week');
  assert.equal(plans[2].hours, 'About $5,807 to $9,187 a month');
  assert.equal(exampleArchitectShare, '7');
  for (const plan of plans) {
    assert.ok(plan.href.startsWith('/team-cost-calculator#'), plan.id);
    const state = stateFromFragment(plan.href.split('#')[1]);
    assert.deepEqual(state.rates, defaultRates);
    assert.ok(!plan.title.endsWith('.'), 'titles must not end with a period');
    assert.ok(plan.coverage.length > 0 && plan.linkLabel.endsWith('in the calculator'));
  }
  assert.equal(stateFromFragment(plans[0].href.split('#')[1]).budget, '1500');
  assert.equal(stateFromFragment(plans[1].href.split('#')[1]).budget, '3000');
  assert.equal(stateFromFragment(plans[2].href.split('#')[1]).developerHours, '22');
  for (const plan of plans.slice(0, 2)) {
    assert.ok(!/mid-size/i.test(plan.coverage), 'the mid-size claim was deliberately removed');
  }
});
