import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Alien } from '../models/alien';

@Injectable()
export class AliensService {

  private ALIENS_URL = 'https://red-wdp-api.herokuapp.com/api/mars/aliens';

  constructor(private http: Http) { } // dependency injector

  getData() {
    return this.http.get(this.ALIENS_URL)
               .map(this.extractAliens);
  }

  extractAliens(res: Response) {
    const aliens = res.json();
    return aliens;
  }

}
