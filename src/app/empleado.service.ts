import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Empleado} from './contact';
import 'rxjs/add/operator/map';

@Injectable()
export class EmpleadoService {

  constructor(private http: Http) { }

  //Retrieving EmpleadoService

  getEmpleados()
  {
    return this.http.get('http://localhost:3000/api/empleados').map(res => res.json());
  }

  //add method
  addEmpleado(newEmpleado)
  {
    console.log(newEmpleado);
    console.log('Empleado');
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/empleado', newEmpleado, {headers:headers}).map(res => res.json());
  }

  //Delete method
  deleteEmpleado(id)
  {
    return this.http.delete('http://localhost:3000/api/empleado/'+id).map(res => res.json());
  }
}

