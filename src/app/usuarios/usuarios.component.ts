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
  exportTableToCSV(filename){
    var csv = [];
    var rows = document.querySelectorAll("table tr"); 

    for (var i = 0; i < rows.length; i++){
      var row = [], cols = rows[i].querySelectorAll("td, th");
      for (var j = 0; j < cols.length; j++){
        row.push(cols[j].textContent);
       
      }
      csv.push(row.join(","));
    }

    //download csv file

    var csvFile;
    var downloadLink;

    csvFile = new Blob([csv.join("\n")],{type:"text/csv"});

    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";

    document.body.appendChild(downloadLink);

    downloadLink.click();
    
  }

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe( usuarios => this.usuarios=usuarios);
  }

}

