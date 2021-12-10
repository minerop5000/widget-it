import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from "../../../core/services/message-service.service";

@Component({
  selector: 'app-modul',
  templateUrl: './modul.component.html',
  styleUrls: ['./modul.component.css']
})
export class ModulComponent implements OnInit {
  @Input() name: string;
  @Input() moduleID: string;

  constructor(private messageService: MessageService) {
    console.log("qwe")
  }

  delete(): void {
    // send message to subscribers via observable subject
    this.messageService.delete(this.moduleID);
  }

  ngOnInit(): void {
  }
}
