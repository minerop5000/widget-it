import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {User} from "../../../../models/user.model";
import {ApiService} from "../../../../core/services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', "../../user.css"]
})
export class LoginComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    console.log(f.value)
    console.log(f.valid)


    this.apiService.loginUser({
      username: f.value.username,
      password: f.value.password
    }).subscribe((data: User) => {
      console.log("login", data);
      this.updateLocalStorage(data._id)
      this.router.navigate([""])
    });
  }

  updateLocalStorage(_id: string) {
    this.apiService.getUserInfo(_id).subscribe((data: User) => {
      console.log(data);
      localStorage.setItem("_id", data._id);
      localStorage.setItem("username", data.username);
      localStorage.setItem("settings", JSON.stringify(data.settings));
      localStorage.setItem("email", data.email);
    });
  }

}

