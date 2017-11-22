import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Factura} from './contact';
import 'rxjs/add/operator/map';

@Injectable()
export class FacturaService {

  constructor(private http: Http) { }

  //Retrieving 

  getFacturas()
  {
    return this.http.get('http://localhost:3000/api/facturas').map(res => res.json());
  }

  //add method
  addFactura(newFactura)
  {
    console.log(newFactura);
    console.log('Factura');
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/factura', newFactura, {headers:headers}).map(res => res.json());
  }

  //Delete method
  deleteFactura(id)
  {
    return this.http.delete('http://localhost:3000/api/factura/'+id).map(res => res.json());
  }
}

