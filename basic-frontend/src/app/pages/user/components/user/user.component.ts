import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user_id: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.user_id = localStorage.getItem("_id");
    if(!this.user_id){
      this.router.navigate(["user/login"])
    }
  }

  logOut():void{
    localStorage.removeItem("_id");
    this.router.navigate(["user/login"])
  }

}
