type Situation = 'handover' | 'expertise' | 'production' | 'upgrades' | 'momentum' | 'ownership' | 'review' | 'priorities' | 'communication' | 'payments';

const paths: Record<Situation, React.ReactNode> = {
  communication: <><path d="M4 5h24v17H15l-7 6v-6H4zM9 11h14M9 16h10" /></>,
  payments: <><rect x="3" y="7" width="26" height="19" rx="3" /><path d="M3 13h26M8 20h6m7 0h3" /></>,
  review: <><path d="M17 27H5V4h14l5 5v6M19 4v6h5M9 13h8M9 18h5" /><circle cx="22" cy="22" r="5" /><path d="m26 26 4 4" /></>,
  priorities: <><path d="M5 7h3m5 0h14M5 16h3m5 0h14M5 25h3m5 0h14" /><path d="m4 6 2 2 3-4m-5 11 2 2 3-4m-5 11 2 2 3-4" /></>,
  handover: <><circle cx="10" cy="8" r="3" /><path d="M4 21v-2a6 6 0 0 1 12 0M18 11h9m-4-4 4 4-4 4" /></>,
  expertise: <><path d="m6 9-4 5 4 5m20-10 4 5-4 5M18 7l-4 14" /><path d="m11 25 5-3 5 3v4l-5-2-5 2z" /></>,
  production: <><path d="M4 5h24v22H4zM4 11h24M8 8h.01M11 8h.01" /><path d="m8 20 4-4 4 7 4-9 4 6" /></>,
  upgrades: <><path d="M8 12a10 10 0 0 1 17-3l3 3M28 5v7h-7M24 20A10 10 0 0 1 7 23l-3-3M4 27v-7h7M16 22V12m-4 4 4-4 4 4" /></>,
  momentum: <><path d="M7 26a12 12 0 1 1 18 0M7 17h2M23 17h2M16 7v2M8 9l2 2M24 9l-2 2M16 19l5-6" /><circle cx="16" cy="19" r="2" /><path d="M12 27h8" /></>,
  ownership: <><path d="m16 3 11 4v8c0 7-5 12-11 15C10 27 5 22 5 15V7z" /><path d="m11 16 4 4 7-8" /></>,
};

export default function SituationIcon({ kind }: { kind: Situation }) {
  return (
    <span className="rails-situation-icon" aria-hidden="true">
      <svg viewBox="0 0 32 32" width={28} height={28} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" focusable="false">
        {paths[kind]}
      </svg>
    </span>
  );
}
