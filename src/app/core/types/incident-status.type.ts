export const STATUS = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'] as const;
export type IncidentStatus = typeof STATUS[number];
