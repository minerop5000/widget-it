import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private subject = new Subject<any>();
  private subject2 = new Subject<any>();

  delete(id: string) {
    this.subject.next({idToDelete: id});
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  setNoWeather() {
    this.subject2.next({noWeather: true});
  }

  noWeather(): Observable<any> {
    return this.subject2.asObservable();
  }
}
