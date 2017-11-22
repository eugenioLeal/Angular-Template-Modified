import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EnvioService } from '../envio.service';
import { Envio } from '../contact';
import { ActivatedRoute } from '@angular/router/src/router_state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-envios',
  templateUrl: './envios.component.html',
  styleUrls: ['./envios.component.css'],

  providers: [EnvioService]
})
export class EnviosComponent implements OnInit {
  envios: Envio[];
  envio: Envio;
  sucursal_ini: string;
  sucursal_fin: string; 
  paquete: string; 
  usuario: string; 
  empleado: string;
  factura: string; 
  conductor: string; 
  transporte: string; 
  fecha: Date; 

  constructor(private envioService: EnvioService, private router: Router) {}

  addEnvio()
  {
    const newEnvio ={
      sucursal_ini: this.sucursal_ini,
      sucursal_fin: this.sucursal_fin, 
      paquete: this.paquete, 
      usuario: this.usuario, 
      empleado: this.empleado,
      factura: this.factura, 
      conductor: this.conductor, 
      transporte: this.transporte, 
      fecha: this.fecha
    }
    
    this.envioService.addEnvio(newEnvio).subscribe(envio=>{
      console.log(envio)
      this.envios.push(envio);
    });
  }

  deleteEnvio(id:any)
  {
    var envios = this.envios;
    this.envioService.deleteEnvio(id).subscribe(data=>
      {
        if(data.n==1)
        {
         for(var i = 0 ; i < envios.length; i++)
         {
           if(envios[i]._id == id)
           {
             envios.splice(i,1);
           }
         }
      }
    })
  }

  ngOnInit() {
    this.envioService.getEnvios().subscribe( envios => this.envios=envios);
    console.log("obteniento archivos");
  }

}
