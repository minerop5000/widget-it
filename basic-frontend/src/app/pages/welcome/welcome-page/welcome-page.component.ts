import {Component, OnInit} from '@angular/core';
import {Echo} from "../../../models/echo.model";
import {ApiService} from "../../../core/services/api.service";
import {ModuleService} from "../../../core/services/module.service";
import {MessageService} from "../../../core/services/message-service.service";

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

  listOfModulTypes = ["notes", "weather", "counter"]
  moduleList: any = []

  constructor(private apiService: ApiService, private moduleService: ModuleService, private messageService: MessageService) {
    this.loadEchos();

    this.messageService.getMessage().subscribe(message => {
      console.log(message)
      var index = this.moduleList.map((x: { [x: string]: any; }) => {
        return x["_id"];
      }).indexOf(message["idToDelete"]);

      this.moduleList.splice(index, 1);
      console.log(this.moduleList);
    });
    //todo api user remove
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

    let t = this.moduleService.createModule(type, "new module", {})
    t.subscribe(data => {
      console.log(data)
      this.moduleList.push(data)
      console.log(this.moduleList)
    })
  }

  // ngOnDestroy() {
  //   // unsubscribe to ensure no memory leaks
  //   this.subscription.unsubscribe();
  // }
}
