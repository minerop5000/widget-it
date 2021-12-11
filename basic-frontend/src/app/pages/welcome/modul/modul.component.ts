import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from "../../../core/services/message-service.service";
import {ModuleService} from "../../../core/services/module.service";
import {ApiService} from "../../../core/services/api.service";

@Component({
  selector: 'app-modul',
  templateUrl: './modul.component.html',
  styleUrls: ['./modul.component.css']
})
export class ModulComponent implements OnInit {
  @Input() name: string;
  @Input() moduleID: string;
  @Input() content: any;
  @Input() modType: string;

  constructor(private messageService: MessageService, private moduleService: ModuleService, private apiService: ApiService) {
  }

  delete(): void {
    // send message to subscribers via observable subject
    this.messageService.delete(this.moduleID);
  }

  ngOnInit(): void {
    this.moduleService.getModule(this.moduleID).subscribe(mod => {
      // this.module = mod
      // console.log("moduel: ")
      // console.log(this.module)
    })
    if (this.modType == "userCount") {
      this.apiService.getUserCount().subscribe(number => {
        this.content = number["numberOfUsers"];
        console.log(this.content)
      })
    }
  }
}
