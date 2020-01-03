import { Component, OnInit, Injectable  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Url {
  url: string;
}

@Injectable()
export class ConstantsService implements OnInit {

  baseAppUrl: string;
  private _jsonURL = 'assets/fake_server_ip.json';
  urls: Url[];

  constructor(private http: HttpClient) {

    this.getJSON().subscribe(data => {
      this.urls = data;
      this.baseAppUrl = this.urls[0].url;
      console.log(this.urls[0].url);
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }
  ngOnInit() {
  }

}
