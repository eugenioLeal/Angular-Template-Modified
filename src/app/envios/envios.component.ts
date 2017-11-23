import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EnvioService } from '../envio.service';
import { Envio } from '../contact';
import { ActivatedRoute } from '@angular/router/src/router_state';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { SharedService } from './../layouts/shared-service';

@Component({
  selector: 'app-envios',
  templateUrl: './envios.component.html',
  styleUrls: ['./envios.component.css'],

  providers: [EnvioService]
})
export class EnviosComponent implements OnInit {
  envios: Envio[];
  pageTitle: string = 'Envios';
  rows = [];
  temp = [];
  loadingIndicator: boolean = true;
  columns = [
    { prop: 'name' },
    { name: 'Company' },
    { name: 'Gender' }
  ];
  envio: Envio;
  sucursal_ini: string;
  sucursal_fin: string; 
  paquete: string; 
  usuario: string; 
  empleado: string;
  factura: string; 
  conductor: string; 
  transporte: string; 
  fecha: string; 

  ene = 0;
  feb = 0;
  mar = 0;
  abri = 0;
  mayo = 0;
  jun = 0;
  jul = 0;
  ago = 0; 
  sep = 0;
  oct = 0;
  nov = 0;
  dic = 0;

  constructor(private envioService: EnvioService, 
    private router: Router, 
    private _sharedService: SharedService)
  {
   
  }
  
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

  getEnvios()
  {
    let _barChartData: any[] = new Array(this.barChartData.length);
    _barChartData[0] = {data: new Array(this.barChartData[0].data.length), label: this.barChartData[0].label};
    var envios = this.envios;
    this.envioService.getEnvios().subscribe(data=>{
      for (let envio of envios){
        if( envio.fecha > "01/01/2017" && envio.fecha < "01/31/2017" ){
          this.ene=this.ene +1;
        }
        else if ( envio.fecha > "02/0/2017" && envio.fecha < "02/31/2017" ){
          this.feb=this.feb +1;
        }
        else if ( envio.fecha > "03/0/2017" && envio.fecha < "03/31/2017" ){
          this.mar=this.mar +1;
        }
        else if ( envio.fecha > "04/0/2017" && envio.fecha < "04/31/2017" ){
          this.abri=this.abri +1;
        }
        else if ( envio.fecha > "05/0/2017" && envio.fecha < "05/31/2017" ){
          this.mayo=this.mayo +1;
        }
        else if ( envio.fecha > "06/0/2017" && envio.fecha < "06/31/2017" ){
          this.jun=this.jun +1;
        }
        else if ( envio.fecha > "07/0/2017" && envio.fecha < "07/31/2017" ){
          this.jul=this.jul +1;
        }
        else if ( envio.fecha > "08/0/2017" && envio.fecha < "08/31/2017" ){
          this.ago=this.ago +1;
        }
        else if ( envio.fecha > "09/0/2017" && envio.fecha < "09/31/2017" ){
          this.sep=this.sep +1;
        }
        else if ( envio.fecha > "10/0/2017" && envio.fecha < "10/31/2017" ){
          this.oct=this.oct +1;
        }
        else if ( envio.fecha > "11/0/2017" && envio.fecha < "11/31/2017" ){
          this.nov=this.nov +1;
        }
        else if ( envio.fecha > "12/0/2017" && envio.fecha < "12/31/2017" ){
          this.dic=this.dic +1;
        }
      }
      
      _barChartData[0].data[0]=this.ene;
      _barChartData[0].data[1]=this.feb;
      _barChartData[0].data[2]=this.mar;
      _barChartData[0].data[3]=this.abri;
      _barChartData[0].data[4]=this.mayo;
      _barChartData[0].data[5]=this.jun;
      _barChartData[0].data[6]=this.jul;
      _barChartData[0].data[7]=this.ago;
      _barChartData[0].data[8]=this.sep;
      _barChartData[0].data[9]=this.oct;
      _barChartData[0].data[10]=this.nov;
      _barChartData[0].data[11]=this.dic;

      this.barChartData = _barChartData;
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
    this.envioService.getEnvios().subscribe( envios => this.envios=envios);
    console.log("obteniento archivos");
  }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartData: any[] = [
    {data: [  this.ene ,this.feb, this.mar, this.abri, this.mayo, this.jun, this.jul, this.ago, this.sep, 
      this.oct, this.nov, this.dic], label: '2017'}
  ];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartLabels: string[] = [
    'Ene',
    'Feb',
    'Marz',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic'
  ];

}
