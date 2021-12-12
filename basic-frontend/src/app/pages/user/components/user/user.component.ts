import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../../../core/services/api.service";
import {UserService} from "../../../../core/services/user.service";
import {MessageService} from "../../../../core/services/message-service.service";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user_id: string;
  user: any;


  constructor(private apiService: ApiService, private router: Router, private userService: UserService, private messageService: MessageService) {
    this.start();
  }

  ngOnDestroy() {
    this.stop();
  }

  ngOnInit(): void {
    this.user_id = localStorage.getItem("_id");
    if (!this.user_id) {
      this.router.navigate(["user/login"])
    } else {
      this.userService.updateLocalStorage(this.user_id)
      this.user = {
        _id: localStorage.getItem("_id"),
        settings: localStorage.getItem("settings"),
        username: localStorage.getItem("username"),
        email: localStorage.getItem("email")
      }
      this.user.settings = JSON.parse(this.user.settings)
      this.apiService.getUserInfo(localStorage.getItem("_id")).subscribe(data => {
        console.log(data)
        if (data.settings.color) {
          this.user.settings.color = data.settings.color
        }
      })
    }
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(["user/login"])
    this.messageService.setUpdateColor()
  }

  pushSettings(): void {
    this.apiService.pushSettings(this.user.settings, this.user._id)
    this.messageService.setUpdateColor()
    this.apiService.getUserInfo(localStorage.getItem("_id")).subscribe(data => {
      console.log(data)
      if (data.settings.color) {
        this.user.settings.color = data.settings.color
      }
    })
  }

  resetColor(){
    this.user.settings.color = "#e0dddd"
    this.apiService.pushSettings(this.user.settings, this.user._id)
    this.messageService.setUpdateColor()
    this.apiService.getUserInfo(localStorage.getItem("_id")).subscribe(data => {
      console.log(data)
      if (data.settings.color) {
        this.user.settings.color = data.settings.color
      }
    })
  }


  private start(): void {
    window.addEventListener("storage", this.storageEventListener.bind(this));
  }

  private storageEventListener(event: StorageEvent) {
    if (event.storageArea == localStorage) {
      this.user = {
        _id: localStorage.getItem("_id"),
        settings: localStorage.getItem("settings"),
        username: localStorage.getItem("username"),
        email: localStorage.getItem("email")
      }
      this.user.settings = JSON.parse(this.user.settings)
    }
  }

  private stop(): void {
    window.removeEventListener("storage", this.storageEventListener.bind(this));
  }
}
