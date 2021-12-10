import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {OwnModule} from "../../models/module.model";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private readonly baseUrl = 'http://localhost:3000/api/module';

  constructor(private http: HttpClient) {
  }

  createModule(type: String, name: string, content: {}): Observable<OwnModule> {
    return this.http.post<OwnModule>(
      `${this.baseUrl}/create/${type}`,
      {name: name, content: content}
    ).pipe(
      catchError((err) => {
        console.log('In Service:', err);
        return throwError(err);
      })
    );
  }
}
