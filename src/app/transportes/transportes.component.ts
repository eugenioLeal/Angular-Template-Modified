import { Component, OnInit } from '@angular/core';
import { TransporteService } from '../transporte.service';
import { Transporte } from '../contact';


@Component({
  selector: 'app-tranportes',
  templateUrl: './transportes.component.html',
  styleUrls: ['./transportes.component.css'],
  providers: [TransporteService]
})
export class TransportesComponent implements OnInit {
  transportes: Transporte[];
  transporte: Transporte;   
  tipo: string; 
  placa: string; 
  disponibilidad: boolean;
  ubicacion: string;

  constructor(private transporteService: TransporteService) { }

  addTransporte()
  {
    const newTransporte ={
      tipo: this.tipo,
      placa: this.placa,
      disponibilidad: this.disponibilidad,
      ubicacion: this.ubicacion
    }
    
    this.transporteService.addTransporte(newTransporte).subscribe(transporte=>{
      console.log(transporte)
      this.transportes.push(transporte);
    });
  }

  deleteTransporte(id:any)
  {
    var transportes = this.transportes;
    this.transporteService.deleteTransporte(id).subscribe(data=>
      {
        if(data.n==1)
        {
         for(var i = 0 ; i < transportes.length; i++)
         {
           if(transportes[i]._id == id)
           {
             transportes.splice(i,1);
           }
         }
      }
    })
  }

  ngOnInit() {
    this.transporteService.getTransportes().subscribe( transportes => this.transportes=transportes);
  }

}

