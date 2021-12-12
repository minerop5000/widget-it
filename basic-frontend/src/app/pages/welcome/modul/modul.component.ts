import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from "../../../core/services/message-service.service";
import {ModuleService} from "../../../core/services/module.service";
import {ApiService} from "../../../core/services/api.service";
import {WeatherService} from "../../../core/services/weather.service";

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

  constructor(private messageService: MessageService, private moduleService: ModuleService, private apiService: ApiService, private weatherService: WeatherService) {
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
    } else if (this.modType == "weather") {
      this.weatherService.getWeather("").subscribe(number => {
        console.log(number)
      })
    } else if (this.modType == "counter") {
      this.moduleService.getModule(this.moduleID).subscribe(a => {
        this.content = a.content
        if (!this.content["counter"]) {
          this.content["counter"] = 0
        }
        console.log(this.content.counter)
      })
    } else if (this.modType == "notes") {
      this.moduleService.getModule(this.moduleID).subscribe(a => {
        this.content = a.content
        if (!this.content["notes"]) {
          this.content["notes"] = ""
        }
        console.log(this.content.notes)
      })
    }
  }

  counterMinus() {
    this.content["counter"] -= 1
    this.moduleService.updateModule(this.moduleID, this.name, this.content).subscribe(
    )
  }

  counterPlus() {
    this.content["counter"] += 1
    this.moduleService.updateModule(this.moduleID, this.name, this.content).subscribe(
    )
  }

  onInputChange(event: any) {
    console.log(event.target.value);
    this.moduleService.updateModule(this.moduleID, this.name, {notes: event.target.value}).subscribe(
    )
  }
}
