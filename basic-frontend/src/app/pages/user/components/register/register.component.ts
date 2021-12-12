import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ApiService} from "../../../../core/services/api.service";
import {User} from "../../../../models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', "../../user.css"]
})
export class RegisterComponent implements OnInit {
  pas1: any;
  pas2: any;


  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem("_id")) {
      this.router.navigate(["../user"])
      return
    }
    localStorage.clear();
  }

  onSubmit(f: NgForm) {
    if (this.pas1 == this.pas2 && this.pas1) {
      this.apiService.registerUser({
        username: f.value.username,
        email: f.value.email,
        password: f.value.password
      }).subscribe((data: User) => {
        localStorage.setItem("_id", data._id);
        localStorage.setItem("username", data.username);
        localStorage.setItem("settings", JSON.stringify(data.settings));
        localStorage.setItem("email", data.email);
        this.router.navigate([""])
      });
    }else{
      f.setValue({"username": f.value.username, "password": "",email: f.value.email, "pas": ""})
    }
  }
}

