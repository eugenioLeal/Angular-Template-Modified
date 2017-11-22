import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Transporte} from './contact';
import 'rxjs/add/operator/map';

@Injectable()
export class TransporteService {

  constructor(private http: Http) { }

  //Retrieving 

  getTransportes()
  {
    return this.http.get('http://localhost:3000/api/transportes').map(res => res.json());
  }

  //add method
  addTransporte(newTransporte)
  {
    console.log(newTransporte);
    console.log('Transporte');
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/transporte', newTransporte, {headers:headers}).map(res => res.json());
  }

  //Delete method
  deleteTransporte(id)
  {
    return this.http.delete('http://localhost:3000/api/transporte/'+id).map(res => res.json());
  }
}

