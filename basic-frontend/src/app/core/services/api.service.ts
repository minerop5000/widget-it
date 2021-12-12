import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {LoginUser, RegisterUser, User} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
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

  getUserCount(): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/user/numberOfUser`
    ).pipe(
      catchError((err) => {
        console.log('In Service:', err);
        return throwError(err);
      })
    );
  }

  pushSettings(settings: {}, _id: any) {
    this.http.post<string>(
      `${this.baseUrl}/user/settings`,
      {settings: settings, _id: _id}
    ).subscribe(data => {
    })
  }

}
