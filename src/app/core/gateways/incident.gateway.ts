import { Observable } from "rxjs";
import { Incident } from "../interfaces/incident.interface";

export abstract class IncidentGateway {
    abstract getIncidents(): Observable<Incident[]>;
}