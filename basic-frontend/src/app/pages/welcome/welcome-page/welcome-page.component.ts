import {Component, Injector, OnInit} from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {ModuleService} from "../../../core/services/module.service";
import {MessageService} from "../../../core/services/message-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  userid: String;

  listOfModulTypes = ["notes", "weather", "counter", "userCount"]
  moduleList: any = []

  constructor(private apiService: ApiService, private moduleService: ModuleService, private messageService: MessageService, private router: Router, private injector: Injector) {
    if (!localStorage.getItem("_id")) {
      this.router.navigate(["user/login"])
    }

    this.apiService.getUserInfo(localStorage.getItem("_id")).subscribe(user => {
      if (user.settings.moduleList) {
        for (let mod of user.settings.moduleList) {
          moduleService.getModule(mod).subscribe(module => {
            this.moduleList.push(module)
          })
        }
      }
    })

    this.messageService.getMessage().subscribe(message => {
      var index = this.moduleList.map((x: { [x: string]: any; }) => {
        return x["_id"];
      }).indexOf(message["idToDelete"]);

      this.moduleList.splice(index, 1);
      let t = []
      for (let i of this.moduleList) {
        t.push(i["_id"])
      }
      this.apiService.pushSettings({moduleList: t}, this.userid)
    });
  }

  ngOnInit(): void {
    this.userid = localStorage.getItem("_id")
  }

  createModule(type: string) {
    let name = "widget name";
    if (type == "weather") name = "stuttgart";
    let t = this.moduleService.createModule(type, name, {})
    t.subscribe(data => {
      this.moduleList.push(data)
      let t = []
      for (let i of this.moduleList) {
        t.push(i["_id"])
      }
      this.apiService.pushSettings({moduleList: t}, this.userid)
      this.moduleService.moduelContent = this.moduleList
    })
  }
}
