import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../empleado.service';
import { Empleado } from '../contact';
import { ActivatedRoute } from '@angular/router/src/router_state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
  providers: [EmpleadoService]
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[];
  empleado: Empleado; 
  username: string;
  password: string;  
  nombre: string;
  tipo: string;

  constructor(private empleadoService: EmpleadoService, private router: Router) { }

  addEmpleado()
  {
    const newEmpleado ={
      username: this.username,
      password: this.password,
      nombre: this.nombre,
      tipo: this.tipo
    }
    
    this.empleadoService.addEmpleado(newEmpleado).subscribe(empleado=>{
      console.log(empleado)
      this.empleados.push(empleado);
    });
  }

  deleteEmpleado(id:any)
  {
    var empleados = this.empleados;
    this.empleadoService.deleteEmpleado(id).subscribe(data=>
      {
        if(data.n==1)
        {
         for(var i = 0 ; i < empleados.length; i++)
         {
           if(empleados[i]._id == id)
           {
             empleados.splice(i,1);
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
    this.empleadoService.getEmpleados().subscribe( empleados => this.empleados=empleados);
  }

}

