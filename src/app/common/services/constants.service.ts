import { Injectable  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ConstantsService {

  private _jsonURL = 'assets/fake_server_ip.json';

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
      console.log('ConstantsService: ' + JSON.stringify( data ));
    });
  }
  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }
}
