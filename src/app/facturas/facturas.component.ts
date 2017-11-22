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
  precio: string;
  direccion_dest: string;
  nombre_usuario_dest: string; 
  fecha: Date;


  constructor(private facturaService: FacturaService, private router: Router) { }

  addFactura()
  {
    const newFactura ={
      precio: this.precio, 
      direccion_dest: this.direccion_dest,
      nombre_usuario_dest: this.nombre_usuario_dest, 
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

  ngOnInit() {
    this.facturaService.getFacturas().subscribe( facturas => this.facturas=facturas);
  }

}

