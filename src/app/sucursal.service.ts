import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Sucursal} from './contact';
import 'rxjs/add/operator/map';

@Injectable()
export class SucursalService {

  constructor(private http: Http) { }

  //Retrieving 

  getSucursales()
  {
    return this.http.get('http://localhost:3000/api/sucursales').map(res => res.json());
  }

  //add method
  addSucursal(newSucursal)
  {
    console.log(newSucursal);
    console.log('Sucursal');
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/sucursal', newSucursal, {headers:headers}).map(res => res.json());
  }

  //Delete method
  deleteSucursal(id)
  {
    return this.http.delete('http://localhost:3000/api/sucursal/'+id).map(res => res.json());
  }
}

