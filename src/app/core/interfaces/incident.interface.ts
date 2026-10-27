import { IncidentCategory } from "../types/incident-category.type";
import { IncidentPriority } from "../types/incident-priority.type";
import { IncidentStatus } from "../types/incident-status.type";

export interface Incident {
    readonly id: string;
    title: string;
    description: string;
    category: IncidentCategory;
    priority: IncidentPriority;
    status: IncidentStatus;
    reporterId: string;
    assignedAgentId: string | undefined;
    createdAt: string;
    updateAt: string;
}