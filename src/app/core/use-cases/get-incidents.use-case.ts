import { inject, Injectable } from "@angular/core";
import { IncidentGateway } from "../gateways/incident.gateway";
import { Observable } from "rxjs";
import { Incident } from "../interfaces/incident.interface";

@Injectable({
  providedIn: 'root'
})
export class GetIncidentsCaseUse {
    private _incidentGateway = inject(IncidentGateway);

    execute(): Observable<Incident[]> {
      return this._incidentGateway.getIncidents();
    }
}