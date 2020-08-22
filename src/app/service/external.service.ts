import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExternalService {

  private hostCountries = 'restcountries.eu/rest/v2';
  private proxyUrl = environment.proxyUrl;
  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<any>{
    return this.http.get<any>(`${this.proxyUrl}/${this.hostCountries}/all?fields=name`);
  }
}
