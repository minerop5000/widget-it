import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {CreateEchoInput, Echo} from '../../models/echo.model';
import {catchError} from 'rxjs/operators';
import {RegisterUser, User} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
  }

  createEcho(echo: CreateEchoInput): Observable<Echo> {
    return this.http.post<Echo>(
      `${this.baseUrl}/echo`,
      echo
    ).pipe(
      catchError((err) => {
        console.log('In Service:', err);
        return throwError(err);
      })
    );
  }

  doError(): Observable<Echo> {
    return this.http.post<Echo>(
      `${this.baseUrl}/echo`,
      {}
    ).pipe(
      catchError((err) => {
        console.log('In Service:', err);
        return throwError(err);
      })
    );
  }

  getEchos(contains?: string): Observable<Echo[]> {
    return this.http.get<Echo[]>(
      `${this.baseUrl}/echo`,
      {
        params: contains ? {
          contains
        } : undefined
      }
    );
  }

  registerUser(echo: RegisterUser): Observable<User> {
    return this.http.post<User>(
      `${this.baseUrl}/user/register`,
      echo
    ).pipe(
      catchError((err) => {
        console.log('In Service:', err);
        return throwError(err);
      })
    );
  }
}
