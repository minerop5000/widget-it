import {Component, Injector, OnInit} from '@angular/core';
import {Echo} from "../../../models/echo.model";
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

  createInput: string;
  filterInput: string;

  echos: Echo[];
  userid: String;

  listOfModulTypes = ["notes", "weather", "counter", "userCount"]
  moduleList: any = []

  constructor(private apiService: ApiService, private moduleService: ModuleService, private messageService: MessageService, private router: Router, private injector: Injector) {
    if (!localStorage.getItem("_id")) {
      this.router.navigate(["user/login"])
    }

    this.apiService.getUserInfo(localStorage.getItem("_id")).subscribe(user => {
      console.log(user)
      if (user.settings.moduleList) {
        for (let mod of user.settings.moduleList) {
          moduleService.getModule(mod).subscribe(module => {
            this.moduleList.push(module)
            console.log(this.moduleList)
          })
        }
      }
    })

    this.loadEchos();
    const A = this.injector.get('A');
    console.log(A);

    this.messageService.getMessage().subscribe(message => {
      var index = this.moduleList.map((x: { [x: string]: any; }) => {
        return x["_id"];
      }).indexOf(message["idToDelete"]);

      this.moduleList.splice(index, 1);
      console.log("delete")
      console.log(this.moduleList)
      let t = []
      for (let i of this.moduleList) {
        t.push(i["_id"])
      }
      console.log(t)
      this.apiService.pushSettings({moduleList: t}, this.userid)
    });
  }


  ngOnInit(): void {
    this.userid = localStorage.getItem("_id")
  }

  addEcho(): void {
    this.apiService.createEcho({
      message: this.createInput
    }).subscribe((data: Echo) => {
      if (this.echos) {
        this.echos.push(data);
        this.echos.sort((a, b) => a.message.localeCompare(b.message));
      } else {
        this.echos = [data];
      }
    });
  }

  loadEchos(): void {
    this.apiService.getEchos(this.filterInput)
      .subscribe((data: Echo[]) => {
        this.echos = data;
        this.echos.sort((a, b) => a.message.localeCompare(b.message));
      });
  }

  error(): void {
    this.apiService.doError().subscribe((data: Echo) => {
      console.log(data);
    }, (error: any) => {
      console.log('In Component:', error);
    });
  }

  createModule(type: string) {
    console.log("create" + type)

    let t = this.moduleService.createModule(type, "stuttgart", {})
    t.subscribe(data => {
      console.log(data)
      this.moduleList.push(data)
      console.log(this.moduleList)
      let t = []
      for (let i of this.moduleList) {
        t.push(i["_id"])
      }
      console.log("pushung")
      console.log(t)
      this.apiService.pushSettings({moduleList: t}, this.userid)
      this.moduleService.moduelContent = this.moduleList
    })
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
  }
}
