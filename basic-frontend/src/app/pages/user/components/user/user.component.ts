import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../../../core/services/api.service";
import {UserService} from "../../../../core/services/user.service";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user_id: string;
  user: any;


  constructor(private apiService: ApiService, private router: Router, private userService: UserService) {
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
      console.log("done1")
      console.log(this.user_id)
      this.userService.updateLocalStorage(this.user_id)
      this.user = {
        _id: localStorage.getItem("_id"),
        settings: localStorage.getItem("settings"),
        username: localStorage.getItem("username"),
        email: localStorage.getItem("email")
      }
      this.user.settings = JSON.parse(this.user.settings)
    }
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(["user/login"])
  }

  pushSettings(): void {
    this.apiService.pushSettings(this.user.settings, this.user._id)
  }


  private start(): void {
    window.addEventListener("storage", this.storageEventListener.bind(this));
  }

  private storageEventListener(event: StorageEvent) {
    if (event.storageArea == localStorage) {
      console.log("storage")
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
