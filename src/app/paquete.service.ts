import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Paquete} from './contact';
import 'rxjs/add/operator/map';

@Injectable()
export class PaqueteService {

  constructor(private http: Http) { }

  //Retrieving 

  getPaquetes()
  {
    return this.http.get('http://localhost:3000/api/paquetes').map(res => res.json());
  }

  //add method
  addPaquete(newPaquete)
  {
    console.log(newPaquete);
    console.log('Paquete');
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/paquete', newPaquete, {headers:headers}).map(res => res.json());
  }

  //Delete method
  deletePaquete(id)
  {
    return this.http.delete('http://localhost:3000/api/paquete/'+id).map(res => res.json());
  }
}

