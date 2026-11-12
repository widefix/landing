export const teamRoles = [
  { id: 'architect', name: 'Solution architect', rate: '80', hours: '2', required: true },
  { id: 'developer', name: 'Developer', rate: '50', hours: '8', required: false },
  { id: 'qa', name: 'QA', rate: '35', hours: '2', required: false },
] as const;

export type RoleId = typeof teamRoles[number]['id'];
export type TeamMember = { count: string; rate: string; hours: string };
export type TeamConfiguration = Record<RoleId, TeamMember>;

export const workingPeriods = [
  { id: 'week', name: 'Week', days: 5, label: '5 working days' },
  { id: 'month', name: 'Month', days: 260 / 12, label: '21 2/3 working days on average' },
  { id: 'quarter', name: 'Quarter', days: 65, label: '65 working days' },
  { id: 'year', name: 'Year', days: 260, label: '260 working days' },
] as const;

export function defaultTeam(): TeamConfiguration {
  return {
    architect: { count: '1', rate: '80', hours: '2' },
    developer: { count: '0', rate: '50', hours: '8' },
    qa: { count: '0', rate: '35', hours: '2' },
  };
}

export function fieldError(value: string, field: 'rate' | 'hours' | 'count'): string | undefined {
  if (value.trim() === '' || !Number.isFinite(Number(value))) {
    return 'Enter a number.';
  }
  const number = Number(value);
  if (field === 'count' && (!Number.isSafeInteger(number) || number < 0)) {
    return 'Enter a whole number of people, zero or more.';
  }
  if (field === 'hours' && (number <= 0 || number > 24)) {
    return 'Enter more than 0 and no more than 24 hours.';
  }
  if (field === 'rate' && (number < 0 || number > 1_000_000)) {
    return 'Enter a rate from $0 to $1,000,000.';
  }
}

export function validTeam(team: TeamConfiguration): boolean {
  return Number(team.architect.count) === 1 && teamRoles.every(({ id }) =>
    !fieldError(team[id].count, 'count') && !fieldError(team[id].rate, 'rate') && !fieldError(team[id].hours, 'hours'));
}

export function dailyTeamCost(team: TeamConfiguration): number {
  if (!validTeam(team)) {
    throw new Error('Cannot calculate an invalid team configuration.');
  }
  return teamRoles.reduce((total, { id }) => {
    const member = team[id];
    return total + Number(member.count) * Number(member.rate) * Number(member.hours);
  }, 0);
}

export function teamFragment(team: TeamConfiguration): string {
  if (!validTeam(team)) {
    throw new Error('Cannot share an invalid team configuration.');
  }
  const params = new URLSearchParams({ v: '2' });
  for (const { id } of teamRoles) {
    params.set(`${id}-count`, String(Number(team[id].count)));
    params.set(`${id}-rate`, String(Number(team[id].rate)));
    params.set(`${id}-hours`, String(Number(team[id].hours)));
  }
  return params.toString();
}

export function teamFromFragment(fragment: string): TeamConfiguration {
  const params = new URLSearchParams(fragment.replace(/^#/, ''));
  const team = defaultTeam();
  const keys = Array.from(params.keys());
  const version = params.get('v');
  if ((version !== '1' && version !== '2') || keys.length !== 10 || new Set(keys).size !== 10) {
    throw new Error('Unrecognized team link.');
  }
  for (const { id } of teamRoles) {
    const count = params.get(`${id}-${version === '1' ? 'included' : 'count'}`);
    const rate = params.get(`${id}-rate`);
    const hours = params.get(`${id}-hours`);
    if (count === null || (version === '1' && count !== '0' && count !== '1') || rate === null || hours === null) {
      throw new Error('Incomplete team link.');
    }
    team[id] = { count, rate, hours };
  }
  if (!validTeam(team)) {
    throw new Error('Invalid headcounts, rates, hours, or missing solution architect.');
  }
  return team;
}
