import { Observable, of } from 'rxjs';
import { IncidentGateway } from '../../gateways/incident.gateway';
import { Incident } from '../../interfaces/incident.interface';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { mockIncidents } from '../mocks/incident.mock';

@Injectable({
  providedIn: 'root',
})
export class IncidentServiceApi implements IncidentGateway {
  private _http = inject(HttpClient);
  private _apiUrl = '';

  getIncidents(): Observable<Incident[]> {
    if(environment.envName === 'mock'){
        return of(mockIncidents);
    }
    return this._http.get<Incident[]>(environment.apiUrl+this._apiUrl);
  }
}
