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
    this.transporteService.getTransportes().subscribe( transportes => this.transportes=transportes);
  }

}

