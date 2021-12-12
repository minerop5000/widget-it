import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  // var options = {
  //   method: 'POST',
  //   url: 'https://accuweatherstefan-skliarovv1.p.rapidapi.com/getImagesByLocationKey',
  //   headers: {
  //     'content-type': 'application/x-www-form-urlencoded',
  //     'x-rapidapi-host': 'AccuWeatherstefan-skliarovV1.p.rapidapi.com',
  //     'x-rapidapi-key': 'da286b8082mshf9c151c6234938ap1a3a8ajsn5e92482ed801'
  //   },
  //   data: {locationKey: 'stuttgart', resolution: '<REQUIRED>', apiKey: '<REQUIRED>'}
  // };

  constructor(private http: HttpClient) {


  }

  getWeather(loc: any): Observable<any> {
    return this.http.post<any>(
      `https://accuweatherstefan-skliarovv1.p.rapidapi.com/getImagesByLocationKey`,
      {},
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'x-rapidapi-host': 'AccuWeatherstefan-skliarovV1.p.rapidapi.com',
          'x-rapidapi-key': 'da286b8082mshf9c151c6234938ap1a3a8ajsn5e92482ed801'
        }
      }
    ).pipe(
      catchError((err) => {
        console.log('In Service:', err);
        return throwError(err);
      })
    );
  }
}
