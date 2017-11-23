import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Envio} from './contact';
import 'rxjs/add/operator/map';

@Injectable()
export class EnvioService {

  constructor(private http: Http) { }

  //Retrieving ContactService

  getEnvios()
  {
    return this.http.get('http://localhost:3000/api/envios').map(res => res.json());
  }

  getEnviosf(sucursal_ini)
  {
    return this.http.get('http://localhost:3000/api/enviosf/'+sucursal_ini).map(res=>res.json());
  }

  //add contact method
  addEnvio(newEnvio)
  {
    console.log(newEnvio);
    console.log('Envio');
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/envio', newEnvio, {headers:headers}).map(res => res.json());
  }

  //Delete method
  deleteEnvio(id)
  {
    return this.http.delete('http://localhost:3000/api/envio/'+id).map(res => res.json());
  }
}
