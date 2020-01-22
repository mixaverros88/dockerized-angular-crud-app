import { Component, OnInit, Injectable  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Map } from 'rxjs';

export interface Url {
  url: string;
}

@Injectable()
export class ConstantsService implements OnInit {

  baseAppUrl: string;

  constructor(private http: HttpClient) {

    this.getJSON().subscribe(data => {
      let   urls: Url[];
      urls = data;
      this.baseAppUrl = urls[0].url;
      // console.log(this.urls[0].url);
      console.log(this.baseAppUrl);
    });

  }

  public getJSON(): Observable<any> {
    return this.http.get('assets/fake_server_ip.json');
  }
  ngOnInit() {
  }

}
