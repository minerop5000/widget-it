import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {MessageService} from "./message-service.service";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  getWeather(city: string): Observable<any> {
    return this.http.get<any>(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7af13cc263df04c09c703007d21093c9`
    ).pipe(
      catchError((err) => {
        this.messageService.setNoWeather()
        console.log('In Service:', err);
        return throwError(err);
      })
    );
  }
}
