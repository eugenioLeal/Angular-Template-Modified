import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../factura.service';
import { Factura } from '../contact';
import { ActivatedRoute } from '@angular/router/src/router_state';
import { Router } from '@angular/router';



@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css'],
  providers: [FacturaService]
})
export class FacturasComponent implements OnInit {
  facturas: Factura[];
  factura: Factura;   
  precio: number;
  direccion_dest: string;
  nombre_usuario_dest: string; 
  paquete: string;
  fecha: string;


  constructor(private facturaService: FacturaService, private router: Router) { }

  addFactura()
  {
    const newFactura ={
      precio: this.precio, 
      direccion_dest: this.direccion_dest,
      nombre_usuario_dest: this.nombre_usuario_dest, 
      paquete: this.paquete,
      fecha: this.fecha
    }
    
    this.facturaService.addFactura(newFactura).subscribe(factura=>{
      console.log(factura)
      this.facturas.push(factura);
    });
  }

  deleteFactura(id:any)
  {
    var facturas = this.facturas;
    this.facturaService.deleteFactura(id).subscribe(data=>
      {
        if(data.n==1)
        {
         for(var i = 0 ; i < facturas.length; i++)
         {
           if(facturas[i]._id == id)
           {
             facturas.splice(i,1);
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
    this.facturaService.getFacturas().subscribe( facturas => this.facturas=facturas);
  }

}

