import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailWidgetComponent implements OnInit {

  @Input() Data?: string

  constructor() { }

  ngOnInit(): void {
  }

}
