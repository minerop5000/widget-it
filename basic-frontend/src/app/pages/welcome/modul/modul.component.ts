import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-modul',
  templateUrl: './modul.component.html',
  styleUrls: ['./modul.component.css']
})
export class ModulComponent implements OnInit {
  @Input() name: string;
  constructor() { }

  ngOnInit(): void {
  }

}
