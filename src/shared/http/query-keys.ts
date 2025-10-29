export const qk = {
  opportunities: (filters?: unknown) => ["opportunities", filters] as const,
  partners: (filters?: unknown) => ["partners", filters] as const,
  partnerDetail: (id: string) => ["partner", id] as const,
  reps: (filters?: unknown) => ["reps", filters] as const,
  users: (filters?: unknown) => ["users", filters] as const,
  cases: (filters?: unknown) => ["cases", filters] as const,
  caseTimeline: (id: string) => ["case-timeline", id] as const,
  reportDetail: (id: string) => ["report-detail", id] as const,
};
