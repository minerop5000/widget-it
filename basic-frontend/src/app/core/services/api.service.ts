import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {CreateEchoInput, Echo} from '../../models/echo.model';
import {catchError} from 'rxjs/operators';
import {LoginUser, RegisterUser, User} from "../../models/user.model";

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

  registerUser(user: RegisterUser): Observable<User> {
    return this.http.post<User>(
      `${this.baseUrl}/user/register`,
      user
    ).pipe(
      catchError((err) => {
        console.log('In Service:', err);
        return throwError(err);
      })
    );
  }

  loginUser(user: LoginUser): Observable<User> {
    return this.http.post<User>(
      `${this.baseUrl}/user/login`,
      user
    ).pipe(
      catchError((err) => {
        console.log('In Service:', err);
        return throwError(err);
      })
    );
  }

  getUserInfo(user_id: string): Observable<User> {
    return this.http.post<User>(
      `${this.baseUrl}/user/getUserInfo`,
      {_id: user_id}
    ).pipe(
      catchError((err) => {
        console.log('In Service:', err);
        return throwError(err);
      })
    );
  }

  pushSettings(settings: {}, _id: any) {
    console.log("push")
    let t = this.http.post<any>(
      `${this.baseUrl}/user/settings`,
      {settings: settings, _id: _id}
    ).pipe(
      catchError((err) => {
        console.log('In Service:', err);
        return throwError(err);
      })
    );
    console.log("t")
    console.log(t)
  }
}
