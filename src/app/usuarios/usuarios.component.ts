import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../contact';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UsuarioService]
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[];
  usuario: Usuario;   
  nombre: string; 
  direccion: string;

  constructor(private usuarioService: UsuarioService) { }

  addUsuario()
  {
    const newUsuario ={
      nombre: this.nombre, 
      direccion: this.direccion 
    }
    
    this.usuarioService.addUsuario(newUsuario).subscribe(usuario=>{
      console.log(usuario)
      this.usuarios.push(usuario);
    });
  }

  deleteUsuario(id:any)
  {
    var usuarios = this.usuarios;
    this.usuarioService.deleteUsuario(id).subscribe(data=>
      {
        if(data.n==1)
        {
         for(var i = 0 ; i < usuarios.length; i++)
         {
           if(usuarios[i]._id == id)
           {
             usuarios.splice(i,1);
           }
         }
      }
    })
  }

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe( usuarios => this.usuarios=usuarios);
  }

}

