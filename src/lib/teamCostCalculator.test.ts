import assert from 'node:assert/strict';
import test from 'node:test';
import {
  dailyTeamCost, defaultTeam, fieldError, teamFragment, teamFromFragment,
  validTeam, workingPeriods,
} from './teamCostCalculator.ts';

test('default team requires an architect at $80 per hour for two hours daily', () => {
  const team = defaultTeam();
  assert.equal(dailyTeamCost(team), 160);
  assert.equal(team.developer.rate, '50');
  assert.equal(team.qa.rate, '35');
  team.architect.count = '0';
  assert.equal(validTeam(team), false);
  assert.throws(() => dailyTeamCost(team));
  assert.throws(() => teamFragment(team));
});

test('all role combinations and agreed working periods produce the expected totals', () => {
  for (const [developer, qa, expected] of [
    [false, false, 160], [true, false, 560], [false, true, 230], [true, true, 630],
  ] as const) {
    const team = defaultTeam();
    team.developer.count = developer ? '1' : '0';
    team.qa.count = qa ? '1' : '0';
    assert.equal(dailyTeamCost(team), expected);
  }
  const totals = workingPeriods.map(period => 630 * period.days);
  assert.deepEqual(totals, [3150, 13650, 40950, 163800]);
});

test('fractional hours, custom rates and free work are supported', () => {
  const team = defaultTeam();
  team.architect = { count: '1', hours: '1.5', rate: '92.75' };
  team.qa = { count: '1', hours: '.25', rate: '0' };
  assert.equal(dailyTeamCost(team), 139.125);
});

test('invalid inputs never produce estimates or share links', () => {
  for (const value of ['', ' ', '-1', 'NaN', 'Infinity', '1e309']) {
    assert.ok(fieldError(value, 'rate'));
    assert.ok(fieldError(value, 'hours'));
  }
  assert.ok(fieldError('0', 'hours'));
  assert.ok(fieldError('24.01', 'hours'));
  assert.ok(fieldError('1000001', 'rate'));
  assert.equal(fieldError('24', 'hours'), undefined);
  assert.equal(fieldError('0', 'rate'), undefined);
  const team = defaultTeam();
  team.architect.hours = '';
  assert.throws(() => dailyTeamCost(team));
  assert.throws(() => teamFragment(team));
});

test('share links round-trip all selections, hours and rates without mutating defaults', () => {
  const team = defaultTeam();
  team.developer = { count: '3', rate: '61.25', hours: '6.5' };
  team.qa = { count: '2', rate: '42.5', hours: '1.5' };
  const fragment = teamFragment(team);
  assert.deepEqual(teamFromFragment(`#${fragment}`), team);
  assert.equal(teamFragment(teamFromFragment(fragment)), fragment);
  assert.notEqual(fragment, teamFragment(defaultTeam()));
  assert.equal(defaultTeam().developer.count, '0');
});

test('malformed, incomplete and unsupported shared configurations are rejected', () => {
  const fragment = teamFragment(defaultTeam());
  for (const invalid of [
    '', 'garbage', fragment.replace('v=2', 'v=3'),
    fragment.replace('architect-count=1', 'architect-count=0'),
    fragment.replace('architect-count=1', 'architect-count=2'),
    fragment.replace('architect-rate=80', 'architect-rate=-80'),
    fragment.replace('architect-hours=2', 'architect-hours=25'),
    fragment.replace('architect-hours=2', 'architect-hours='),
    fragment.replace('qa-count=0', 'qa-count=yes'),
    fragment.replace('qa-count=0', 'qa-count=1.5'),
    fragment.replace('developer-count=0', 'developer-count=-1'),
    fragment.replace('&developer-count=0', ''),
    fragment.replace('&qa-hours=2', ''),
    `${fragment}&v=2`,
  ]) {
    assert.throws(() => teamFromFragment(invalid));
  }
});

test('multiple developers and QA multiply each role cost across all working periods', () => {
  const team = defaultTeam();
  team.developer.count = '3';
  team.qa.count = '2';
  assert.equal(dailyTeamCost(team), 1500);
  assert.deepEqual(workingPeriods.map(period => dailyTeamCost(team) * period.days),
    [7500, 32500, 97500, 390000]);
  team.developer.count = '0';
  assert.equal(dailyTeamCost(team), 300);
  team.qa.count = '0';
  assert.equal(dailyTeamCost(team), 160);
});

test('counts must be nonnegative safe whole numbers', () => {
  for (const count of ['', ' ', '-1', '1.5', 'Infinity', 'NaN', '9007199254740992']) {
    assert.ok(fieldError(count, 'count'));
    const team = defaultTeam();
    team.developer.count = count;
    assert.equal(validTeam(team), false);
    assert.throws(() => dailyTeamCost(team));
    assert.throws(() => teamFragment(team));
  }
  assert.equal(fieldError('0', 'count'), undefined);
  assert.equal(fieldError('12', 'count'), undefined);
});

test('original shared links still restore zero or one person per role', () => {
  const fragment = 'v=1&architect-included=1&architect-rate=90&architect-hours=3&developer-included=1&developer-rate=55&developer-hours=6&qa-included=0&qa-rate=40&qa-hours=2';
  const team = teamFromFragment(fragment);
  assert.equal(team.architect.count, '1');
  assert.equal(team.developer.count, '1');
  assert.equal(team.qa.count, '0');
  assert.equal(dailyTeamCost(team), 600);
  assert.deepEqual(teamFromFragment(teamFragment(team)), team);
  assert.throws(() => teamFromFragment(fragment.replace('developer-included=1', 'developer-included=2')));
});
