export const CATEGORIES = ['RED', 'HARDWARE', 'SOFTWARE', 'CREDENTIALS', 'CIBE', 'OTHER', 'UNDEFINED'] as const;
export type IncidentCategory = typeof CATEGORIES[number];
