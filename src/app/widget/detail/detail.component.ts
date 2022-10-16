import { Component, Input, OnInit } from '@angular/core';
import { delay, of } from 'rxjs';

@Component({
  selector: 'app-widget-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailWidgetComponent implements OnInit {

  @Input() data!: any | null

  constructor() { }

  ngOnInit(): void {
  }

  ImageInfo(slug: string) {
    return of(slug).pipe(delay(3000)).subscribe()
  }


}
