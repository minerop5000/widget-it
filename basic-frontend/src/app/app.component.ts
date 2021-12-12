import {Component} from '@angular/core';
import {filter} from "rxjs/operators";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ApiService} from "./core/services/api.service";
import {MessageService} from "./core/services/message-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  back_color: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private titleService: Title,
              private apiService: ApiService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => {
      var rt = this.getChild(this.activatedRoute)
      rt.data.subscribe((data: { title: string; }) => {
        this.titleService.setTitle(data.title)
      })
    })


    this.updateColor()

    this.messageService.updateColor().subscribe(() => {
      this.updateColor()
    })
  }

  updateColor() {
    this.back_color = "#e0dddd"
    if (!!localStorage.getItem("_id")) {
      this.apiService.getUserInfo(localStorage.getItem("_id")).subscribe(user => {
        console.log(user)
        if (user.settings.color) {
          this.back_color = user.settings.color
        }
      })
    }
  }

  // @ts-ignore
  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }

  }
}
