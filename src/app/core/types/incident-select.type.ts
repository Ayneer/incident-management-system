import { IncidentCardAction } from "./incident-card-action.type";
import { Incident } from "../interfaces/incident.interface";

export type IncidentSelect = {
    readonly incident: Incident,
    readonly action: IncidentCardAction
}