export const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'UNDEFINED'] as const;
export type IncidentPriority = typeof PRIORITIES[number];
