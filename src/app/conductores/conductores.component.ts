import { Component, OnInit } from '@angular/core';
import { ConductorService } from '../conductor.service';
import { Conductor } from '../contact';
import { ActivatedRoute } from '@angular/router/src/router_state';
import { Router } from '@angular/router'


@Component({
  selector: 'app-conductores',
  templateUrl: './conductores.component.html',
  styleUrls: ['./conductores.component.css'],
  providers: [ConductorService]
})
export class ConductoresComponent implements OnInit {
  conductores: Conductor[];
  conductor: Conductor;   
  nombre: string;

  constructor(private conductorService: ConductorService, private router: Router) { }

  addConductor()
  {
    const newConductor ={
      nombre: this.nombre,
    }
    
    this.conductorService.addConductor(newConductor).subscribe(conductor=>{
      console.log(conductor)
      this.conductores.push(conductor);
    });
  }

  deleteConductor(id:any)
  {
    var conductores = this.conductores;
    this.conductorService.deleteConductor(id).subscribe(data=>
      {
        if(data.n==1)
        {
         for(var i = 0 ; i < conductores.length; i++)
         {
           if(conductores[i]._id == id)
           {
             conductores.splice(i,1);
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
    this.conductorService.getConductores().subscribe( conductores => this.conductores=conductores);
  }

}

