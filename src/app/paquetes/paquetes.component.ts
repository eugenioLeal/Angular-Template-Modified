import { Component, OnInit } from '@angular/core';
import { PaqueteService } from '../paquete.service';
import { Paquete } from '../contact';


@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.css'],
  providers: [PaqueteService]
})
export class PaquetesComponent implements OnInit {
  paquetes: Paquete[];
  paquete: Paquete;   
  objeto:string;
  peso: string; 
  size: string;


  constructor(private paqueteService: PaqueteService) { }

  addPaquete()
  {
    const newPaquete ={
      objeto: this.objeto,
      peso: this.peso, 
      size: this.size
    }
    
    this.paqueteService.addPaquete(newPaquete).subscribe(paquete=>{
      console.log(paquete)
      this.paquetes.push(paquete);
    });
  }

  deletePaquete(id:any)
  {
    var paquetes = this.paquetes;
    this.paqueteService.deletePaquete(id).subscribe(data=>
      {
        if(data.n==1)
        {
         for(var i = 0 ; i < paquetes.length; i++)
         {
           if(paquetes[i]._id == id)
           {
             paquetes.splice(i,1);
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
    this.paqueteService.getPaquetes().subscribe( paquetes => this.paquetes=paquetes);
  }

}

