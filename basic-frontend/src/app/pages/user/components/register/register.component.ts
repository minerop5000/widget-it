import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Echo} from "../../../../models/echo.model";
import {ApiService} from "../../../../core/services/api.service";
import {User} from "../../../../models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', "../../user.css"]
})
export class RegisterComponent implements OnInit {


  constructor(private apiService: ApiService, private router: Router) {
    // this.loadEchos();
  }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    // todo check retype password
    console.log(f.value)


    this.apiService.registerUser({
      username: f.value.username,
      email: f.value.email,
      password: f.value.password
    }).subscribe((data: User) => {
      console.log(data);
      localStorage.setItem("_id", data._id)
      this.router.navigate([""])
      //if (this.echos) {
      //this.echos.push(data);
      //this.echos.sort((a, b) => a.message.localeCompare(b.message));
      //} else {
      // this.echos = [data];
      //}
    });
  }
}
