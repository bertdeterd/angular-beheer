import { Injectable } from "@angular/core";
import { Headers, Response, Http } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { Eenheid } from './Eenheid';

@Injectable()
export class EenhedenService {
  private eenhedenUrl = process.env.SERVICE_URI + "CodeListSet?$filter=Id%20eq%20%27Eenheid%27&sap-client=200"; 
  private headers = new Headers({ "Content-Type": "application/json" });

  constructor(private http: Http) {}

  getEenheden(): Promise<Eenheid[]> {
    return this.http
      .get(this.eenhedenUrl)
      .toPromise()
      .then(this._mapEenheden);
  }

  _mapEenheden(response:Response): Eenheid[]{
   return response.json().d.results as Eenheid[];
  }

}
