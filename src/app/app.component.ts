import { Component, OnInit } from '@angular/core';
import { Eenheid } from 'services/Eenheid';
import { EenhedenService } from 'services/eenheden.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  eenheden : Eenheid[];

  constructor( private eenhedenService: EenhedenService){}

  ngOnInit(){
     this.eenhedenService
        .getEenheden()
        .then((data:Eenheid[]) => this._mapResults(data));
  }

  _mapResults(resp:Eenheid[]){
    this.eenheden = resp;
  }

}
