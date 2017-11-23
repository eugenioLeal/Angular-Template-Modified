import { Component, OnInit } from '@angular/core';
import { SucursalService } from '../sucursal.service';
import { Sucursal } from '../contact';


@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css'],
  providers: [SucursalService]
})
export class SucursalesComponent implements OnInit {
  sucursales: Sucursal[];
  sucursal: Sucursal;   
  direccion: string;


  constructor(private sucursalService: SucursalService) { }

  addSucursal()
  {
    const newSucursal ={
      direccion: this.direccion
    }
    
    this.sucursalService.addSucursal(newSucursal).subscribe(sucursal=>{
      console.log(sucursal)
      this.sucursales.push(sucursal);
    });
  }

  deleteSucursal(id:any)
  {
    var sucursales = this.sucursales;
    this.sucursalService.deleteSucursal(id).subscribe(data=>
      {
        if(data.n==1)
        {
         for(var i = 0 ; i < sucursales.length; i++)
         {
           if(sucursales[i]._id == id)
           {
             sucursales.splice(i,1);
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
    this.sucursalService.getSucursales().subscribe( sucursales => this.sucursales=sucursales);
  }

}

