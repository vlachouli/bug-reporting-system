import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpParams, HttpRequest, HttpResponse} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Bug } from './bug-dto';

@Injectable({
  providedIn: 'root'
})
export class BugService {

  service = "http://localhost:3000/bugs";

  constructor(public http: HttpClient) { }


  getAll(queryParams: Map<string, string>) : Observable<Bug[]> {
    let suffix = "";

    queryParams.forEach((value: string, key: string) => {
      if (suffix == "") {
        suffix += "?";
      } else {
        suffix += "&";
      }
      suffix += key + "=" + value;
    });
    return this.http.get<Bug[]>(`${this.service}/${suffix}`);
  }

  get(id: string) : Observable<Bug> {
    return this.http.get<Bug>(`${this.service}/${id}`);
  }

  create(object: Bug) {
    object.created = new Date();
    return this.http.post(this.service, object);
  }
  
  update(id: string, object: Bug) {
    return this.http.put(`${this.service}/${id}`, object);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.service}/${id}`);
  }
}
