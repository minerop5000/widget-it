import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
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
  editNameMode = false
  @ViewChild('myInput') myInput: ElementRef;

  constructor(private messageService: MessageService, private moduleService: ModuleService, private apiService: ApiService, private weatherService: WeatherService, private hostElement: ElementRef) {
  }

  delete(): void {
    this.messageService.delete(this.moduleID);
  }

  ngOnInit(): void {

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
      })
    } else if (this.modType == "notes") {
      this.moduleService.getModule(this.moduleID).subscribe(a => {
        this.content = a.content
        if (!this.content["notes"]) {
          this.content["notes"] = ""
        }
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

  editName() {
    this.editNameMode = true
    //todo focus
  }

  nameChanged(event: any) {
    this.editNameMode = false
    this.moduleService.updateModule(this.moduleID, this.name, this.content).subscribe(
    )
    console.log("change")
  }
}
