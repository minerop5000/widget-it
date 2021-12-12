import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {
  }

  getWeather(city: string): Observable<any> {
    return this.http.get<any>(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7af13cc263df04c09c703007d21093c9`
    ).pipe(
      catchError((err) => {
        if(err.status == "Not Found"){
          return new Observable()
        }
        console.log('In Service:', err);
        return throwError(err);
      })
    );
  }
}
