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

  ngOnInit() {
    this.sucursalService.getSucursales().subscribe( sucursales => this.sucursales=sucursales);
  }

}

