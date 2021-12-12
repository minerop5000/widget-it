import {Injectable} from '@angular/core';
import {User} from "../../models/user.model";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) {
  }

  updateLocalStorage(_id: string) {
    return this.apiService.getUserInfo(_id).subscribe((data: User) => {
      console.log(data);
      localStorage.setItem("_id", data._id);
      localStorage.setItem("username", data.username);
      localStorage.setItem("settings", JSON.stringify(data.settings));
      localStorage.setItem("email", data.email);
      console.log("set done")
    });
  }
}
