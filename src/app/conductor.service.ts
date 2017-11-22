import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Conductor} from './contact';
import 'rxjs/add/operator/map';

@Injectable()
export class ConductorService {

  constructor(private http: Http) { }

  //Retrieving ConductorService

  getConductores()
  {
    return this.http.get('http://localhost:3000/api/conductores').map(res => res.json());
  }

  //add method
  addConductor(newConductor)
  {
    console.log(newConductor);
    console.log('Conductor');
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/conductor', newConductor, {headers:headers}).map(res => res.json());
  }

  //Delete method
  deleteConductor(id)
  {
    return this.http.delete('http://localhost:3000/api/conductor/'+id).map(res => res.json());
  }
}

