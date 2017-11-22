import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Usuario} from './contact';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {

  constructor(private http: Http) { }

  //Retrieving 

  getUsuarios()
  {
    return this.http.get('http://localhost:3000/api/usuarios').map(res => res.json());
  }

  //add method
  addUsuario(newUsuario)
  {
    console.log(newUsuario);
    console.log('Usuario');
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/usuario', newUsuario, {headers:headers}).map(res => res.json());
  }

  //Delete method
  deleteUsuario(id)
  {
    return this.http.delete('http://localhost:3000/api/usuario/'+id).map(res => res.json());
  }
}

