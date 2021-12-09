import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user_id: string;
  user: any;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.user_id = localStorage.getItem("_id");
    if (!this.user_id) {
      this.router.navigate(["user/login"])
    } else {
      this.user = {
        _id: localStorage.getItem("_id"),
        settings: localStorage.getItem("settings"),
        username: localStorage.getItem("username"),
        email: localStorage.getItem("email")
      }
    }
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(["user/login"])
  }

}
